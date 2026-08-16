import axios from 'axios';

const api = axios.create({
  baseURL: 'https://webdev-music-003b5b991590.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Описываем структуру ответа для авторизации (токены и данные юзера)
interface AuthResponse {
  id: number;
  username: string;
  email: string;
  access?: string;
  refresh?: string;
}

// Описываем структуру ответа для получения токенов
interface TokenResponse {
  access: string;
  refresh: string;
}

// Описываем структуру ответа для обновления токена
interface RefreshTokenResponse {
  access: string;
}

// 1. Сервис регистрации
export async function signupUser({ email, password, username }: { email: string; password: string; username: string }): Promise<AuthResponse> {
  try {
    const response = await api.post('/user/signup/', { email, password, username });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Ошибка при регистрации';
      throw new Error(errorMessage);
    }
    throw new Error('Ошибка при регистрации');
  }
}

// 2. Сервис логина
export async function loginUser({ email, password }: { email: string; password: string }): Promise<AuthResponse> {
  try {
    const response = await api.post('/user/login/', { email, password });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Неверный email или пароль';
      throw new Error(errorMessage);
    }
    throw new Error('Неверный email или пароль');
  }
}

// 3. Сервис получения JWT токенов
export async function fetchTokens({ email, password }: { email: string; password: string }): Promise<TokenResponse> {
  try {
    const response = await api.post('/user/token/', { email, password });
    return response.data;
  } catch {
    throw new Error('Не удалось получить токены доступа');
  }
}

// 4. Сервис обновления токена
export async function refreshToken({ refresh }: { refresh: string }): Promise<RefreshTokenResponse> {
  try {
    const response = await api.post('/user/token/refresh/', { refresh });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.detail || 'Не удалось обновить токен доступа';
      throw new Error(errorMessage);
    }
    throw new Error('Не удалось обновить токен доступа');
  }
}