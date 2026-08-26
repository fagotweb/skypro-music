import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import ReduxProvider from '@/store/ReduxProvider';
import { formatTime } from '@/utils/helpers';
import Track from './Track';

// Мокаем наш хук лайков, чтобы изолировать компонент от Next.js роутера
jest.mock('@/hooks/useTrackLike', () => ({
  useLikeTrack: () => ({
    isLike: false,
    toggleLike: jest.fn(),
    isLoading: false,
    errorMsg: null,
  }),
}));

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0]; // Берем первый трек из массива

describe('Track component', () => {
  test('Отрисовка данных трека и базовые взаимодействия', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>
    );

    // Достаем первый элемент из массива найденных строк через [0]
    const titleElements = screen.getAllByText(mockTrack.name);
    expect(titleElements[0]).toBeInTheDocument();

    const authorElements = screen.getAllByText(mockTrack.author);
    expect(authorElements[0]).toBeInTheDocument();

    const albumElements = screen.getAllByText(mockTrack.album);
    expect(albumElements[0]).toBeInTheDocument();

    // Проверяем время трека, сгенерированное точно так же, как в компоненте
    const expectedTime = formatTime(mockTrack.duration_in_seconds);
    const timeElement = screen.getByText(expectedTime);
    expect(timeElement).toBeInTheDocument();
  });
});