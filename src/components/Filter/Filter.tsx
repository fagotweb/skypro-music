"use client";

import { useState } from 'react';
import cn from 'classnames';
import FilterItem from '../FilterItem/FilterItem';
import { getUniqueValuesByKey } from '@/utils/helpers';
import { data } from '@/data';
import styles from './filter.module.css';

export default function Filter() {
  // 1. Стейт для открытия окон ('author' | 'year' | 'genre' | null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // 2. Стейты для хранения выбранных настроек
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('По умолчанию');

  // Данные для списков
  const uniqueAuthors = getUniqueValuesByKey(data, 'author');
  const uniqueGenres = getUniqueValuesByKey(data, 'genre');
  const uniqueYears = ['По умолчанию', 'Сначала новые', 'Сначала старые'];

  // Логика открытия/закрытия окон (взаимоисключающая)
  const handleToggleFilter = (filterName: string) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  // Выбор автора (множественный)
  const handleAuthorSelect = (author: string) => {
    if (selectedAuthors.includes(author)) {
      setSelectedAuthors(selectedAuthors.filter((item) => item !== author));
    } else {
      setSelectedAuthors([...selectedAuthors, author]);
    }
  };

  // Выбор жанра (множественный)
  const handleGenreSelect = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
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
                  onSelect={handleAuthorSelect}
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
                  onSelect={setSelectedYear} // Для одиночного выбора просто перезаписываем строку
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
                  onSelect={handleGenreSelect}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}