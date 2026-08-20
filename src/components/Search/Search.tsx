'use client';

import styles from './search.module.css';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSearchQuery } from '@/store/features/trackSlice';

export default function Search() {
  const dispatch = useAppDispatch();

  // Достаем актуальное значение строки поиска из Redux, чтобы инпут был контролируемым
  const searchQuery = useAppSelector((state) => state.tracks.searchQuery || '');

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className={styles.centerblock__search}>
      <Image
        src="/img/icon/search.svg"
        alt="search"
        width={20}
        height={20}
        className={styles.search__svg}
      />
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchQuery}
        onChange={onSearchInput}
      />
    </div>
  );
}
