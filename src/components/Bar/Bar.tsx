import Link from 'next/link';
import styles from './bar.module.css';
import Image from 'next/image';

export default function Bar() {
  return (
    <div className={styles.bar}>
      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}></div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev}>
                <Image
                  src="/img/icon/prev.svg"
                  alt="prev"
                  width={15}
                  height={14}
                  className={styles.player__btnPrevSvg}
                />
              </div>
              <div className={`${styles.player__btnPlay} ${styles.btn}`}>
                <Image
                  src="/img/icon/play.svg"
                  alt="play"
                  width={22}
                  height={20}
                  className={styles.player__btnPlaySvg}
                />
              </div>
              <div className={styles.player__btnNext}>
                <Image
                  src="/img/icon/next.svg"
                  alt="next"
                  width={15}
                  height={14}
                  className={styles.player__btnNextSvg}
                />
              </div>
              <div className={`${styles.player__btnRepeat} ${styles.btnIcon}`}>
                <Image
                  src="/img/icon/repeat.svg"
                  alt="repeat"
                  width={18}
                  height={12}
                  className={styles.player__btnRepeatSvg}
                />
              </div>
              <div className={`${styles.player__btnShuffle} ${styles.btnIcon}`}>
                <Image
                  src="/img/icon/shuffle.svg"
                  alt="shuffle"
                  width={19}
                  height={12}
                  className={styles.player__btnShuffleSvg}
                />
              </div>
            </div>

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
                    Ты та...
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="#">
                    Баста
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__likeDis}>
                <div
                  className={`${styles.player__btnShuffle} ${styles.btnIcon}`}
                >
                  <Image
                    src="/img/icon/like.svg"
                    alt="like"
                    width={14}
                    height={12}
                    className={styles.trackPlay__likeSvg}
                    priority
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
                <div
                  className={`${styles.trackPlay__dislike} ${styles.btnIcon}`}
                >
                  <Image
                    src="/img/icon/dislike.svg"
                    alt="dislike"
                    width={14}
                    height={12}
                    className={styles.trackPlay__dislikeSvg}
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
