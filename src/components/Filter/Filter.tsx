"use client";

import { useState } from 'react';
import cn from 'classnames';
import FilterItem from '../FilterItem/FilterItem';
import { getUniqueValuesByKey } from '@/utils/helpers';
import styles from './filter.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { setYearFilter, toggleAuthorFilter, toggleGenreFilter } from '@/store/features/trackSlice';

// 1. Указываем, что фильтр принимает живой массив треков из API
interface FilterProps {
  tracks: TrackType[];
}

export default function Filter({ tracks }: FilterProps) {
  const dispatch = useAppDispatch(); // создаем диспетчер для работы кнопок
  
  // 1. Стейт для открытия окон ('author' | 'year' | 'genre' | null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Берем выбранные фильтры из Redux
  const selectedAuthors = useAppSelector((state) => state.tracks.selectedAuthors);
  const selectedGenres = useAppSelector((state) => state.tracks.selectedGenres);
  const selectedYear = useAppSelector((state) => state.tracks.selectedYear);

    // Данные для списков
  const uniqueAuthors = getUniqueValuesByKey(tracks, 'author');
  const uniqueGenres = getUniqueValuesByKey(tracks, 'genre');
  const uniqueYears = ['По умолчанию', 'Сначала новые', 'Сначала старые'];

  // Логика открытия/закрытия окон (взаимоисключающая)
  const handleToggleFilter = (filterName: string) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      {/* ФИЛЬТР ИСПОЛНИТЕЛЕЙ */}
      <div className={styles.filter__wrapper}>
        <div
          className={cn(styles.filter__button, { [styles.active]: activeFilter === 'author' })}
          onClick={() => handleToggleFilter('author')}
        >
          исполнителю
          {selectedAuthors.length > 0 && (
            <span className={styles.filter__counter}>{selectedAuthors.length}</span>
          )}
        </div>
        {activeFilter === 'author' && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {uniqueAuthors.map((author, index) => (
                <FilterItem
                  key={index}
                  value={author}
                  isActive={selectedAuthors.includes(author)}
                  onSelect={() => dispatch(toggleAuthorFilter(author))}
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ФИЛЬТР ГОДОВ */}
      <div className={styles.filter__wrapper}>
        <div
          className={cn(styles.filter__button, { [styles.active]: activeFilter === 'year' })}
          onClick={() => handleToggleFilter('year')}
        >
          году выпуска
          {selectedYear !== 'По умолчанию' && <span className={styles.filter__counter}>1</span>}
        </div>
        {activeFilter === 'year' && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {uniqueYears.map((year, index) => (
                <FilterItem
                  key={index}
                  value={year}
                  isActive={selectedYear === year}
                  onSelect={() => dispatch(setYearFilter(year))} // Для одиночного выбора просто перезаписываем строку
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ФИЛЬТР ЖАНРОВ */}
      <div className={styles.filter__wrapper}>
        <div
          className={cn(styles.filter__button, { [styles.active]: activeFilter === 'genre' })}
          onClick={() => handleToggleFilter('genre')}
        >
          жанру
          {selectedGenres.length > 0 && (
            <span className={styles.filter__counter}>{selectedGenres.length}</span>
          )}
        </div>
        {activeFilter === 'genre' && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {uniqueGenres.map((genre, index) => (
                <FilterItem
                  key={index}
                  value={genre}
                  isActive={selectedGenres.includes(genre)}
                  onSelect={() => dispatch(toggleGenreFilter(genre))}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}