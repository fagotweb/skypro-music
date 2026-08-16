import { getFavoriteTracksRequest } from '@/services/tracks';
import { setUsername, setTokens } from '@/store/features/authSlice';
import { setFavoriteTracks } from '@/store/features/trackSlice';
import { useAppDispatch } from '@/store/store';
import { withReauth } from '@/utils/withReauth';
import { useEffect } from 'react';

export const useInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Безопасно считываем данные из localStorage на клиенте
    const access = localStorage.getItem('access_token') || '';
    const refresh = localStorage.getItem('refresh_token') || '';
    const username = localStorage.getItem('username') || '';

    // Записываем данные в Redux Store
    dispatch(setUsername(username));
    dispatch(setTokens({ access, refresh }));
    // Если пользователь авторизован, загружаем его лайки с бэкенда
    if (access && refresh) {
      const loadFavorites = async () => {
        try {
          // Запрашиваем любимые треки через обертку с авто-рефрешем
          const favTracks = await withReauth(
            (currentAccess) => getFavoriteTracksRequest(currentAccess),
            access,
            refresh,
            dispatch
          );
          
          // Записываем массив лайкнутых треков в Redux
          dispatch(setFavoriteTracks(favTracks));
        } catch (error) {
          console.error("Не удалось загрузить лайки при инициализации:", error);
        }
      };

      loadFavorites();
    }
  }, [dispatch]);
};
