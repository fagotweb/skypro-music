import axios from 'axios';

const api = axios.create({
  baseURL: 'https://webdev-music-003b5b991590.herokuapp.com',
});

// Описываем структуру данных подборки, приходящей от сервера
interface PlaylistResponse {
  id: number;
  name: string;
  items: (string | number | { id: string | number; _id?: string | number })[];
}

// Получаем массив объектов/id подборки
export async function fetchSelectionIds(id: string): Promise<PlaylistResponse> {
  const response = await api.get(`/catalog/selection/${id}/`);
  return response.data?.data || response.data || null;
}
