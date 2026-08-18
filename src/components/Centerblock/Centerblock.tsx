// import Link from 'next/link';
import cn from 'classnames';
import styles from './centerblock.module.css';
import Image from 'next/image';
import Search from '../Search/Search';
// import { data } from '@/data';
import Track from '../Track/Track';
import Filter from '../Filter/Filter';
import { TrackType } from '@/sharedTypes/sharedTypes';

interface CenterblockProps {
  data: TrackType[];
  title: string;
  isLoading?: boolean;
  errorRes?: string | null;
}

export default function Centerblock({ data, title, isLoading, errorRes }: CenterblockProps) {
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



          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className={styles.playlist__item}>
                {/* Вместо реального трека передаем флаг isLoading в компонент Track */}
                <Track isLoading={true} track={{} as TrackType} playlist={[]} />
              </div>
            ))
          ) : (
            // 4. Если загрузка завершена — выводим реальные треки
            data?.map((track) => (
              <div key={track._id} className={styles.playlist__item}>
                <Track track={track} playlist={data} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
