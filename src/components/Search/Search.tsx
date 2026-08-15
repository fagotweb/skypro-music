'use client';

import { useState } from 'react';
import styles from './search.module.css';
import Image from 'next/image';

export default function Search() {
  const [searchInput, setSearchInput] = useState('');

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
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
        value={searchInput}
        onChange={onSearchInput}
      />
    </div>
  );
}
