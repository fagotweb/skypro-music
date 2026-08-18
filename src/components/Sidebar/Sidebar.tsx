'use client'

import Link from 'next/link';
import Image from 'next/image';
import styles from './sidebar.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useLogout } from '@/hooks/useLogout';

export default function Sidebar() {
    const username = useSelector((state: RootState) => state.auth?.username || 'Гость');
const logout = useLogout();

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{username}</p>
        <div className={styles.sidebar__icon} onClick={logout} style={{ cursor: 'pointer' }}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                fill
                sizes="(max-width: 768px) 100vw, 250px"
                priority
              />
            </Link>
          </div>

          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                fill
                sizes="(max-width: 768px) 100vw, 250px"
              />
            </Link>
          </div>

          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/4">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                fill
                sizes="(max-width: 768px) 100vw, 250px"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
