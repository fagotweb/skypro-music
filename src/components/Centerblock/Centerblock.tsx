import cn from 'classnames';
import styles from './centerblock.module.css';
import Image from 'next/image';
import Search from '../Search/Search';
import Track from '../Track/Track';
import Filter from '../Filter/Filter';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import { useMemo } from 'react';

interface CenterblockProps {
  data: TrackType[];
  title: string;
  isLoading?: boolean;
  errorRes?: string | null;
}

export default function Centerblock({
  data,
  title,
  isLoading,
  errorRes,
}: CenterblockProps) {
  // Достаем текущие выбранные фильтры и поисковый запрос из Redux
  const { selectedAuthors, selectedGenres, selectedYear, searchQuery } =
    useAppSelector((state) => state.tracks);

  // Фильтруем массив data при изменении любых фильтров
  const filteredTracks = useMemo(() => {
    if (!data) return [];

    return data.filter((track) => {
      // А. Фильтрация по поисковой строке (работает по названию трека)
      // На случай, если searchValue в стейте еще нет, используем пустую строку по умолчанию
      const searchMatch = searchQuery
        ? track.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          track.author.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          track.album.toLowerCase().startsWith(searchQuery.toLowerCase())
        : true;

      // Б. Фильтрация по исполнителю (если массив пустой — подходят все)
      const authorMatch =
        selectedAuthors.length > 0
          ? selectedAuthors.includes(track.author)
          : true;

      // В. Фильтрация по жанру (если массив пустой — подходят все)
      const genreMatch =
        selectedGenres.length > 0
          ? track.genre.some((g) => selectedGenres.includes(g))
          : true;

      // Г. Фильтрация по годам выпуска (сортировка или фильтрация)
      const yearMatch = true;

      return searchMatch && authorMatch && genreMatch && yearMatch;
    });
  }, [data, selectedAuthors, selectedGenres, searchQuery]);

  // 3. Если выбрана сортировка по годам, сортируем отфильтрованный массив
  const sortedAndFilteredTracks = useMemo(() => {
    const tracksCopy = [...filteredTracks];

    if (selectedYear === 'Сначала новые') {
      return tracksCopy.sort(
        (a, b) =>
          new Date(b.release_date || 0).getTime() -
          new Date(a.release_date || 0).getTime(),
      );
    }
    if (selectedYear === 'Сначала старые') {
      return tracksCopy.sort(
        (a, b) =>
          new Date(a.release_date || 0).getTime() -
          new Date(b.release_date || 0).getTime(),
      );
    }

    return tracksCopy;
  }, [filteredTracks, selectedYear]);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={data} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={cn(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col04)}>
            <Image
              src="/img/icon/watch.svg"
              alt="watch"
              width={12}
              height={12}
              className={styles.playlistTitle__svg}
            />
          </div>
        </div>

        <div className={styles.content__playlist}>
          {errorRes && <div className={styles.error}>{errorRes}</div>}

          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={styles.playlist__item}>
                  {/* Вместо реального трека передаем флаг isLoading в компонент Track */}
                  <Track
                    isLoading={true}
                    track={{} as TrackType}
                    playlist={[]}
                  />
                </div>
              ))
            : // 4. Если загрузка завершена — выводим реальные треки
              sortedAndFilteredTracks?.map((track) => (
                <div key={track._id} className={styles.playlist__item}>
                  <Track track={track} playlist={data} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
