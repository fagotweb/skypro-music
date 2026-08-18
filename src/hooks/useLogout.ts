import { clearUser } from '@/store/features/authSlice';
import { useAppDispatch } from '@/store/store';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // Получаем текущий адрес страницы (например, '/music/favorites')
  const pathname = usePathname();

  const logout = useCallback(() => {
    // Всегда очищаем Redux и localStorage
    dispatch(clearUser());
    // Редирект проверяет, находится ли юзер на защищенной странице
    if (pathname.includes('/favorites')) {
      // Если был в Избранном — уводим на общую главную
      router.push('/music/main'); 
    }
    // Если он был в любом другом открытом месте, код ничего не делает, и юзер остается на той же странице
   }, [dispatch, router, pathname]);

  return logout;
};
