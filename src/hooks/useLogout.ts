import { clearUser } from '@/store/features/authSlice';
import { useAppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = useCallback(() => {
    dispatch(clearUser()); // Полностью очищаем Redux и localStorage
    router.push('/music/main'); 
   }, [dispatch, router]);

  return logout;
};
