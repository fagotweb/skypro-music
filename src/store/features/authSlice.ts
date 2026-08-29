import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  username: string;
  access: string;
  refresh: string;
  isAuthChecked: boolean; // Флаг готовности проверки
};

const initialState: initialStateType = {
  username: '',
  access: '',
  refresh: '',
  isAuthChecked: false, // Изначально проверка не завершена
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    // Добавляем экшен для сохранения токенов, так как их нужно положить в Redux
    setTokens: (state, action: PayloadAction<{ access: string; refresh: string }>) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.isAuthChecked = true; // Как только токены проставились (пустые или полные) — проверка завершена
    },
    // Добавляем экшен для обновления только access (пригодится для refreshToken)
    setAccess: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
    },
    
    clearUser: (state) => {
      state.username = '';
      state.access = '';
      state.refresh = '';
      state.isAuthChecked = true; // При выходе состояние определено
      
      // Очищаем локальное хранилище браузера
      localStorage.removeItem('username');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
});

export const { setUsername, setTokens, setAccess, clearUser } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
