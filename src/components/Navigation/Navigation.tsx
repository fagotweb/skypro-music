'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navigation.module.css';
import { RootState } from '@/store/store';
import { useLogout } from '@/hooks/useLogout';
import { useSelector } from 'react-redux';

export default function Navigation() {
  // Создаем состояние: true — меню открыто, false — скрыто
  const [isOpen, setIsOpen] = useState(true);
  const logout = useLogout();

  // Проверяем, авторизован ли пользователь (есть ли токен в Redux)
  const isAuth = useSelector((state: RootState) => !!state.auth?.access);

  // Функция для переключения состояния меню
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          src="/img/logo.png"
          alt="logo"
          fill
          sizes="250px"
          className={styles.logo__image}
          priority
        />
      </div>

      {/* Вешаем событие клика на кнопку-бургер */}
      <div className={styles.nav__burger} onClick={toggleMenu}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>

      {/* Меню отображается только если isOpen === true */}
      {isOpen && (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="#" className={styles.menu__link}>
                Главное
              </Link>
            </li>

            {isAuth && (
            <li className={styles.menu__item}>
              <Link href="/music/favorites" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
             )}

            <li className={styles.menu__item}>
              {/* Условный рендеринг: если авторизован — кнопка Выйти, если нет — ссылка Войти */}
              {isAuth ? (
                <span
                  onClick={logout}
                  className={styles.menu__link}
                  style={{ cursor: 'pointer' }}
                >
                  Выйти
                </span>
              ) : (
                <Link href="/auth/signin" className={styles.menu__link}>
                  Войти
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
