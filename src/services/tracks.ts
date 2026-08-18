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

// Функция добавления в избранное (Лайк)
export async function likeTrackRequest(id: number, access: string): Promise<void> {
  await api.post(`/catalog/track/${id}/favorite/`, {}, {
    headers: { Authorization: `Bearer ${access}` }
  });
}

// Функция удаления из избранного (Дизлайк)
export async function dislikeTrackRequest(id: number, access: string): Promise<void> {
  await api.delete(`/catalog/track/${id}/favorite/`, {
    headers: { Authorization: `Bearer ${access}` }
  });
}

// Функция получения всех избранных треков с бэкенда
export async function getFavoriteTracksRequest(access: string): Promise<TrackType[]> {
  const response = await api.get('/catalog/track/favorite/all/', {
    headers: { Authorization: `Bearer ${access}` }
  });
  return response.data.data || response.data;
}
