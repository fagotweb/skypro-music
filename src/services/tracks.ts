import { TrackType } from '@/sharedTypes/sharedTypes';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://webdev-music-003b5b991590.herokuapp.com',
});

// Получение общего списка всех треков с API
export async function fetchAllTracks(): Promise<TrackType[]> {
  try {
    const response = await api.get('/catalog/track/all/');
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Не удалось загрузить треки');
    }
    throw new Error('Не удалось загрузить треки');
  }
}
