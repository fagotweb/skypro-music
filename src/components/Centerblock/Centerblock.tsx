import Link from 'next/link';
import cn from 'classnames';
import styles from './centerblock.module.css';
import Image from 'next/image';

export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
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
        />
      </div>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <div className={styles.filter__button}>исполнителю</div>
        <div className={styles.filter__button}>году выпуска</div>
        <div className={styles.filter__button}>жанру</div>
      </div>
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
          {/* Карточка одного трека (для примера) */}
          <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
              <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                  <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className="track__title-text">
                  <Link className={styles.track__titleLink} href="#">
                    Guilt <span className={styles.track__titleSpan}></span>
                  </Link>
                </div>
              </div>
              <div className={styles.track__author}>
                <Link className={styles.track__authorLink} href="#">
                  Nero
                </Link>
              </div>
              <div className={styles.track__album}>
                <Link className={styles.track__albumLink} href="#">
                  Welcome Reality
                </Link>
              </div>
              <div className="track__time">
                <svg className={styles.track__timeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>4:44</span>
              </div>
            </div>
          </div>
          {/* Сюда можно скопировать остальные треки из инструкции, меняя обычные классы на styles.классимя */}
          <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
              <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                  <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className="track__title-text">
                  <Link className={styles.track__titleLink} href="#">
                    Elektro <span className={styles.track__titleSpan}></span>
                  </Link>
                </div>
              </div>
              <div className={styles.track__author}>
                <Link className={styles.track__authorLink} href="#">
                  Dynoro, Outwork, Mr. Gee
                </Link>
              </div>
              <div className={styles.track__album}>
                <Link className={styles.track__albumLink} href="#">
                  Elektro
                </Link>
              </div>
              <div className="track__time">
                <svg className={styles.track__timeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>2:22</span>
              </div>
            </div>
          </div>

          <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
              <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                  <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className="track__title-text">
                  <Link className={styles.track__titleLink} href="#">
                    I’m Fire <span className={styles.track__titleSpan}></span>
                  </Link>
                </div>
              </div>
              <div className={styles.track__author}>
                <Link className={styles.track__authorLink} href="#">
                  Ali Bakgor
                </Link>
              </div>
              <div className={styles.track__album}>
                <Link className={styles.track__albumLink} href="#">
                  I’m Fire
                </Link>
              </div>
              <div className="track__time">
                <svg className={styles.track__timeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>2:22</span>
              </div>
            </div>
          </div>

          <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
              <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                  <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className="track__title-text">
                  <Link className={styles.track__titleLink} href="#">
                    Non Stop{' '}
                    <span className={styles.track__titleSpan}>(Remix)</span>
                  </Link>
                </div>
              </div>
              <div className={styles.track__author}>
                <Link className={styles.track__authorLink} href="#">
                  Стоункат, Psychopath
                </Link>
              </div>
              <div className={styles.track__album}>
                <Link className={styles.track__albumLink} href="#">
                  Non Stop
                </Link>
              </div>
              <div className="track__time">
                <svg className={styles.track__timeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>4:12</span>
              </div>
            </div>
          </div>

          <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
              <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                  <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className="track__title-text">
                  <Link className={styles.track__titleLink} href="#">
                    Run Run{' '}
                    <span className={styles.track__titleSpan}>
                      (feat. AR/CO)
                    </span>
                  </Link>
                </div>
              </div>
              <div className={styles.track__author}>
                <Link className={styles.track__authorLink} href="#">
                  Jaded, Will Clarke, AR/CO
                </Link>
              </div>
              <div className={styles.track__album}>
                <Link className={styles.track__albumLink} href="#">
                  Run Run
                </Link>
              </div>
              <div className="track__time">
                <svg className={styles.track__timeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>2:54</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
