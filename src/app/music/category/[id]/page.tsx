'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { fetchAllTracks } from '@/services/tracks';
import { fetchSelectionIds } from '@/services/selections';

import Centerblock from '@/components/Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [playlistName, setPlaylistName] = useState<string>('Подборка');
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    // Запускаем оба запроса параллельно
    Promise.all([fetchAllTracks(), fetchSelectionIds(id)])
      .then(([allTracks, selectionData]) => {
        // 1. Извлекаем и сохраняем динамическое имя подборки из API
        const currentPlaylistName = selectionData?.name || 'Подборка';
        setPlaylistName(currentPlaylistName);

        // 2. Достаем массив элементов/ID треков из объекта подборки
        const selectionItems = selectionData?.items || [];

        // Извлекаем чистые ID из ответа сервера (бэкенд может прислать [{ id: 1 }] или)
        const selectionIds = selectionItems.map(
          (
            item:
              { _id?: string | number; id?: string | number } | string | number,
          ) =>
            typeof item === 'object' && item !== null
              ? item._id || item.id
              : item,
        );

        // Оставляем только те полноценные треки, которые есть в подборке
        const filteredTracks = allTracks.filter((track: TrackType) =>
          selectionIds.includes(track._id),
        );

        setTracks(filteredTracks);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data?.message || 'Ошибка сервера');
          } else if (error.request) {
            console.log(error.request);
            setError('Что-то с интернетом');
          } else {
            console.log('Error', error.message);
            setError('Неизвестная ошибка');
          }
        }
      });
  }, [id]);

  return (
    <>
      {error && (
        <div style={{ color: 'red', fontWeight: 'bold', padding: '10px 0' }}>
          {error}
        </div>
      )}

      <Centerblock data={tracks} title={playlistName} />
    </>
  );
}
