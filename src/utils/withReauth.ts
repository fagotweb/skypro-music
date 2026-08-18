import { AxiosError } from 'axios';
import { AppDispatch } from '@/store/store';
import { clearUser, setAccess } from '@/store/features/authSlice';
import { refreshToken } from '@/services/auth';

export const withReauth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  access: string,
  refresh: string,
  dispatch: AppDispatch,
): Promise<T> => {
  try {
    // 1. Пытаемся выполнить запрос с текущим access токеном
    return await apiFunction(access);
  } catch (error) {
    const axiosError = error as AxiosError;

    // 2. Если ошибка 401 (токен просрочен), запускаем процесс обновления
    if (axiosError.response?.status === 401) {
      try {
        // Вызываем вашу функцию refreshToken, передавая объект { refresh }
        const newAccessToken = await refreshToken({ refresh }); 
        
        // Сохраняем новый токен в Redux через редюсер setAccess
        dispatch(setAccess(newAccessToken.access));
        
        // Обновляем токен в localStorage, чтобы он не потерялся при перезагрузке
        localStorage.setItem('access_token', newAccessToken.access);

        // 3. Повторяем исходный запрос уже с новым рабочим токеном
        return await apiFunction(newAccessToken.access);
      } catch {
        // Если даже refresh токен просрочен, пробрасываем ошибку дальше (например, для разлогина)
        // Очищаем Redux и localStorage через наш редюсер
        dispatch(clearUser());

        // Пробрасываем ошибку дальше, чтобы хуки-вызыватели знали, что сессия умерла
        throw new Error('Сессия устарела, необходима авторизация');
      
      }
    }

    // Если ошибка не связана с авторизацией (например, 500 или 404), просто пробрасываем её
    throw error;
  }
};
