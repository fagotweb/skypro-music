'use client';


import { useAppSelector } from '@/store/store';
import Centerblock from '@/components/Centerblock/Centerblock';

export default function FavoritesPage() {  

  const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
   
  return (
    <>
      {/* 2. Передаем данные напрямую в Centerblock */}
      <Centerblock 
        data={favoriteTracks} 
        title="Мой плейлист" 
        isLoading={fetchIsLoading}
        errorRes={fetchError} 
      />
    </>
  );
}
