import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReauth } from '@/utils/withReauth';
import { AxiosError } from 'axios';

// 1. Импортируем ваши функции запросов к API
import { likeTrackRequest, dislikeTrackRequest } from '@/services/tracks'; 
// 2. Импортируем редюсеры из вашего слайса
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice'; 
import { TrackType } from '@/sharedTypes/sharedTypes';

// Описываем тип возвращаемого значения хука, как у преподавателя
type ReturnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => Promise<void>; // Делаем функцию асинхронной для await
  isLike: boolean;
};

export const useLikeTrack = (track: TrackType | null): ReturnTypeHook => {
  const dispatch = useAppDispatch();
  
  // Достаем нужные данные из Redux
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Проверяем, лайкнут ли трек
  const isLike = favoriteTracks.some((t) => t._id === track?._id);

  const toggleLike = async () => {
    if (!access) {
      setErrorMsg('Нет авторизации');
      return;
    }

    if (!track) return;

    // Выбираем функцию запроса и редюсер в зависимости от текущего статуса лайка
    const actionApi = isLike ? dislikeTrackRequest : likeTrackRequest;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      // Вызываем обертку с авто-обновлением токена
      // Передаем правильные аргументы: apiFunction, access, refresh, dispatch
      await withReauth(
        (newToken) => actionApi(track._id, newToken || access),
        access,
        refresh,
        dispatch
      );

      // Если запрос к бэкенду прошел успешно, отправляем экшен в Redux
      dispatch(actionSlice(track));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMsg(error.response.data.message || 'Ошибка сервера');
        } else if (error.request) {
          setErrorMsg('Произошла ошибка. Попробуйте позже');
        } else {
          setErrorMsg('Неизвестная ошибка');
        }
      } else {
        setErrorMsg('Неизвестная ошибка');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};
