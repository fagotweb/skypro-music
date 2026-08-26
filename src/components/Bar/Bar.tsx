'use client';

import Link from 'next/link';
import styles from './bar.module.css';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from '@/store/features/trackSlice';
import { getTimePanel } from '@/utils/helpers';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useLikeTrack } from '@/hooks/useTrackLike';
import { toast } from 'react-toastify';

export default function Bar() {
  // Получаем и трек, и статус проигрывания из Redux
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);
  const {
    isLike,
    toggleLike,
    isLoading: isLikeLoading,
    errorMsg,
  } = useLikeTrack(currentTrack);

  const [isLoop, setIsLoop] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.55);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);

  // Вывод ошибок лайков в плеере
  useEffect(() => {
    if (errorMsg) {
      toast.error(`Ошибка лайка в плеере: ${errorMsg}`);
    }
  }, [errorMsg]);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlay) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {})
          .catch((error) => {
            console.info('Загрузка аудио была скорректирована:', error.message);
          });
      }
    } else {
      audioRef.current.pause();
    }
  }, [currentTrack, isPlay]);

  if (!currentTrack) return <></>;

  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setIsPlay(false));
    }
  };

  const onToggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current && currentTrack) {
      setDuration(audioRef.current.duration);

      setIsLoadedTrack(true);
    }
  };

  const handleVolumeChange = (value: string) => {
    const normalizedVolume = Number(value) / 100;
    setVolume(normalizedVolume);

    if (audioRef.current) {
      audioRef.current.volume = normalizedVolume;
    }
  };

  const onChangeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);
      audioRef.current.currentTime = inputTime;
    }
  };

  const onTrackEnded = () => {
    if (!isLoop) {
      dispatch(setNextTrack());
    }
  };

  return (
    <div className={styles.bar}>
      <div className={styles.bar__content}>
        <audio
          className={styles.audio}
          autoPlay
          ref={audioRef}
          src={currentTrack.track_file}
          loop={isLoop} /* <-- Зацикливание зависит от состояния кнопки */
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onTrackEnded}
        />
        <div className={styles.player__loadingStatus}>
          {!isLoadedTrack && <span>Идет загрузка...</span>}
        </div>
        <ProgressBar
          max={duration || 0}
          step={0.1}
          readOnly={!isLoadedTrack}
          value={currentTime}
          onChange={onChangeProgress}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div
                className={styles.player__btnPrev}
                onClick={() => dispatch(setPrevTrack())}
              >
                {/* Кнопка назад */}
                <Image
                  src="/img/icon/prev.svg"
                  alt="prev"
                  width={15}
                  height={14}
                  className={styles.player__btnPrevSvg}
                />
              </div>

              {/* Кнопка Play/Pause */}
              {isPlay ? (
                <div
                  className={`${styles.player__btnPlay} ${styles.btn}`}
                  onClick={pauseTrack}
                >
                  <Image
                    src="/img/icon/pause.svg"
                    alt="pause"
                    width={22}
                    height={20}
                    className={styles.player__btnPlaySvg}
                  />
                </div>
              ) : (
                <div
                  className={`${styles.player__btnPlay} ${styles.btn}`}
                  onClick={playTrack}
                >
                  <Image
                    src="/img/icon/play.svg"
                    alt="play"
                    width={22}
                    height={20}
                    className={styles.player__btnPlaySvg}
                  />
                </div>
              )}

              {/* Кнопка вперед */}
              <div
                className={styles.player__btnNext}
                onClick={() => dispatch(setNextTrack())}
              >
                <Image
                  src="/img/icon/next.svg"
                  alt="next"
                  width={15}
                  height={14}
                  className={styles.player__btnNextSvg}
                />
              </div>
              {/* Кнопка Повтор (Зацикливание) */}
              <div
                className={`${styles.player__btnRepeat} ${styles.btnIcon}`}
                onClick={onToggleLoop}
              >
                <Image
                  src={
                    isLoop
                      ? '/img/icon/repeat_active.svg'
                      : '/img/icon/repeat.svg'
                  } // <-- Меняем путь к файлу динамически!
                  alt="repeat"
                  width={18}
                  height={12}
                  className={styles.player__btnRepeatSvg}
                />
              </div>
              <div
                className={`${styles.player__btnShuffle} ${styles.btnIcon}`}
                onClick={() => dispatch(toggleShuffle())}
              >
                <Image
                  src={
                    isShuffle
                      ? '/img/icon/shuffle_active.svg'
                      : '/img/icon/shuffle.svg'
                  }
                  alt="shuffle"
                  width={19}
                  height={12}
                  className={styles.player__btnShuffleSvg}
                />
              </div>
            </div>
            {/* Блок с названием трека в плеере */}
            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <Image
                    src="/img/icon/note.svg"
                    alt="note"
                    width={18}
                    height={17}
                    className={styles.trackPlay__svg}
                  />
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="#">
                    {/* Выводим название текущего трека */}
                    {currentTrack.name || 'Без названия'}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="#">
                    {/* Выводим имя исполнителя */}
                    {currentTrack.author || 'Неизвестный исполнитель'}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__likeDis}>
                <div
                  className={`${styles.trackPlay__like} ${styles.btnIcon}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (!isLikeLoading) toggleLike();
                  }}
                >
                  <Image
                    src={
                      isLike ? '/img/icon/like.svg' : '/img/icon/dislike.svg'
                    }
                    alt="like"
                    width={14}
                    height={12}
                    className={styles.trackPlay__likeSvg}
                    priority
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>                
              </div>
            </div>
          </div>

          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <Image
                  src="/img/icon/volume.svg"
                  alt="volume"
                  width={13}
                  height={18}
                  className={styles.volume__svg}
                />
              </div>
              <div className={`${styles.volume__progress} ${styles.btn}`}>
                <input
                  className={`${styles.volume__progressLine} ${styles.btn}`}
                  type="range"
                  name="range"
                  value={volume * 100}
                  onChange={(e) => handleVolumeChange(e.target.value)}
                />
              </div>

              {/* Выводим панель времени */}
              <div className={styles.player__timePanel}>
                {getTimePanel(currentTime, duration)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
