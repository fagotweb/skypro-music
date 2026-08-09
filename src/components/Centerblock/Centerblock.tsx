// import Link from 'next/link';
import cn from 'classnames';
import styles from './centerblock.module.css';
import Image from 'next/image';
import Search from '../Search/Search';
import { data } from '@/data';
import Track from '../Track/Track';
import Filter from '../Filter/Filter';

export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter />
      {/* <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <div className={styles.filter__button}>исполнителю</div>
        <div className={styles.filter__button}>году выпуска</div>
        <div className={styles.filter__button}>жанру</div>
      </div> */}
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
          {data.map((track) => (
            <div key={track._id} className={styles.playlist__item}>
              <Track track={track} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
