'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { fetchSelectionIds } from '@/services/selections';

import Centerblock from '@/components/Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  // 1. Берем готовую базу всех треков из глобального стора
  const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );

  // Локальные стейты только для этой конкретной подборки
  const [playlistName, setPlaylistName] = useState<string>('Подборка');
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setTimeout(() => {
      setIsLoading(true);
    }, 0);

    // Ждем, пока FetchingTracks загрузит общую базу, и только потом делаем запрос
    if (!fetchIsLoading && allTracks.length) {     

      fetchSelectionIds(id)
        .then((selectionData) => {
          const currentPlaylistName = selectionData?.name || 'Подборка';
          setPlaylistName(currentPlaylistName);

          const selectionItems = selectionData?.items || [];

          // Получаем массив ID треков, входящих в эту категорию
          const selectionIds = selectionItems.map(
            (
              item:
                | { _id?: string | number; id?: string | number }
                | string
                | number,
            ) =>
              typeof item === 'object' && item !== null
                ? item._id || item.id
                : item,
          );

          // 2. Вместо повторного fetchAllTracks фильтруем уже имеющийся в Redux массив allTracks
          const filteredTracks = allTracks.filter((track: TrackType) =>
            selectionIds.includes(track._id),
          );

          setTracks(filteredTracks);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            setError(err.response?.data?.message || 'Ошибка сервера');
          } else {
            setError('Неизвестная ошибка');
          }
          setIsLoading(false);
        })        
    }
  }, [id, fetchIsLoading, allTracks]);

  return (
    <>
      <Centerblock data={tracks} 
        title={playlistName} 
        isLoading={isLoading}
        errorRes={error || fetchError} />
    </>
  );
}
