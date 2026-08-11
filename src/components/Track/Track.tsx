'use client';

import Link from 'next/link';
// import Image from 'next/image';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helpers';
import styles from './track.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack } from '@/store/features/trackSlice';
import classNames from 'classnames';

// Описываем, что компонент Track принимает один трек в качестве props
interface TrackProps {
  track: TrackType;
}

export default function Track({ track }: TrackProps) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);

  // Достаем текущий трек
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  // Проверяем, выбран ли этот трек вообще (активен ли он в плеере)
  const isCurrent = currentTrack?._id === track._id;

  // Проверяем, играет ли он прямо сейчас
  const isCurrentPlaying = isCurrent && isPlay;

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
  };

  return (
    <div className={styles.playlist__track} onClick={onClickTrack}>
      <div className={styles.track__title}>
        <div className={styles.track__titleImage}>
          {isCurrent ? (
            /* Если трек выбран — точка отображается ВСЕГДА. 
               Но класс styles.pulse добавляется ТОЛЬКО если трек играет */
            <svg
              className={classNames(styles.track__titleSvg, {
                [styles.pulse]: isCurrentPlaying,
              })}
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="5" fill="#b672ff" />
            </svg>
          ) : (
            /* Если трек не выбран — показываем обычную ноту */
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          )}
        </div>
        <div className="track__title-text">
          <Link className={styles.track__titleLink} href="">
            {track.name}
            <span className={styles.track__titleSpan}></span>
          </Link>
        </div>
      </div>
      <div className={styles.track__author}>
        <Link className={styles.track__authorLink} href="#">
          {track.author}
        </Link>
      </div>
      <div className={styles.track__album}>
        <Link className={styles.track__albumLink} href="#">
          {track.album}
        </Link>
      </div>
      <div className="track__time">
        <svg className={styles.track__timeSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
        </svg>
        <span className={styles.track__timeText}>
          {formatTime(track.duration_in_seconds)}
        </span>
      </div>
    </div>
  );
}
