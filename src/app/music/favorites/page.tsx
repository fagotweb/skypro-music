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

   // Достаем токен и флаг проверки из состояния auth
  const { access, isAuthChecked } = useAppSelector((state) => state.auth);

  // Защита маршрута: если нет токена access -> отправляем на главную
  useEffect(() => {
    // Редирект работает после того, как хук useInitAuth прочитает localStorage
    if (isAuthChecked && !access) {
      router.replace('/music/main');
    }
  }, [access, isAuthChecked, router]);

  // Пока приложение считывает токены из localStorage, показываем загрузку
  if (!isAuthChecked) {
    return <div>Проверка авторизации...</div>;
  }

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
