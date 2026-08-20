'use client';

import Link from 'next/link';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helpers';
import styles from './track.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlaylist,
  setCurrentTrack,
} from '@/store/features/trackSlice';
import classNames from 'classnames';
import { useLikeTrack } from '@/hooks/useTrackLike';
import { useEffect } from 'react';

// Описываем, что компонент Track принимает один трек в качестве props
interface TrackProps {
  track: TrackType;
  playlist: TrackType[];
  isLoading?: boolean;
}

export default function Track({ track, playlist, isLoading }: TrackProps) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const {
    isLike,
    toggleLike,
    isLoading: isLikeLoading,
    errorMsg,
  } = useLikeTrack(track);

  useEffect(() => {
    if (errorMsg) {
      alert(`Ошибка лайка: ${errorMsg}`);
    }
  }, [errorMsg]);

  // Достаем текущий трек
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  // Проверяем, выбран ли этот трек вообще (активен ли он в плеере)
  const isCurrent = currentTrack?._id === track._id;

  // Проверяем, играет ли он прямо сейчас
  const isCurrentPlaying = isCurrent && isPlay;

  const onClickTrack = () => {
    if (isLoading) return;
    dispatch(setCurrentTrack(track));
  };

  const onClickCurrentTrack = () => {
    if (isLoading) return;
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentPlaylist(playlist));
  };

  if (isLoading) {
    return (
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div>Загрузка</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.playlist__track} onClick={onClickTrack}>
      <div className={styles.track__title} onClick={onClickCurrentTrack}>
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
        <svg
          className={classNames(styles.track__timeSvg, {
            [styles.track__timeSvgActive]: isLike,
          })}
          onClick={(e) => {
            e.stopPropagation(); // Останавливаем всплытие, чтобы при клике на лайк трек не включался в плеере
            if (!isLikeLoading) toggleLike();
          }}
          style={{ cursor: 'pointer' }}
        >
          <use
            xlinkHref={
              isLike
                ? '/img/icon/sprite.svg#icon-like'
                : '/img/icon/sprite.svg#icon-dislike'
            }
          ></use>
        </svg>
        <span className={styles.track__timeText}>
          {formatTime(track.duration_in_seconds)}
        </span>
      </div>
    </div>
  );
}
