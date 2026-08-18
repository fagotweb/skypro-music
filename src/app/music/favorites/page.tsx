'use client';

import { useAppSelector } from '@/store/store';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FavoritesPage() {
  const router = useRouter();  

  const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );

  const access = useAppSelector((state) => state.auth.access);

  // 2. Защита маршрута: если нет токена access -> отправляем на главную
  useEffect(() => {
    if (!access) {
      router.replace('/music/main');
    }
  }, [access, router]);

  // Если токена нет, возвращаем null, чтобы страница не моргала старым контентом во время редиректа
  if (!access) {
    return null;
  }
   
  return (
    <>
      <Centerblock 
        data={favoriteTracks} 
        title="Мой плейлист" 
        isLoading={fetchIsLoading}
        errorRes={fetchError} 
      />
    </>
  );
}
