'use client'

import Centerblock from '@/components/Centerblock/Centerblock';

import { useAppSelector } from '@/store/store';

export default function Home() {

  // Забираем всё из глобального состояния, которое наполняет FetchingTracks
  const { allTracks, fetchError, fetchIsLoading } = useAppSelector(
    (state) => state.tracks
  );

  if (fetchIsLoading) return <div>Загрузка плейлиста...</div>;
  if (fetchError) return <div>Ошибка: {fetchError}</div>;

  return (
    <> 
      <Centerblock data={allTracks} title="Треки" />
    </>
  );
}
