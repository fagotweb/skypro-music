'use client'

import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { fetchAllTracks } from '@/services/tracks';

export default function Home() {

  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        setIsLoading(true);
        const tracksData = await fetchAllTracks();
        setTracks(tracksData); // Сохраняем реальные треки с сервера в стейт
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTracks();
  }, []);

  if (isLoading) return <div>Загрузка плейлиста...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <>
      {error && (
        <div style={{ color: 'red', fontWeight: 'bold', padding: '10px 0' }}>
          {error}
        </div>
      )}

      <Centerblock data={tracks} title="Треки" />
    </>
  );
}
