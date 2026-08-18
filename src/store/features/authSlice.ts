import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  username: string;
  access: string;
  refresh: string;
};

const initialState: initialStateType = {
  username: '',
  access: '',
  refresh: '',
};

const authSlice = createSlice({
  name: 'authSlice', // имя как у преподавателя
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    // Добавляем экшен для сохранения токенов, так как их нужно положить в Redux
    setTokens: (state, action: PayloadAction<{ access: string; refresh: string }>) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
    // Добавляем экшен для обновления только access (пригодится для refreshToken)
    setAccess: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
    },
    
    clearUser: (state) => {
      state.username = '';
      state.access = '';
      state.refresh = '';
      
      // Очищаем локальное хранилище браузера
      localStorage.removeItem('username');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
});

export const { setUsername, setTokens, setAccess, clearUser } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
