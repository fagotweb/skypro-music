"use client";

import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import styles from './navigation.module.css';

export default function Navigation() {
    // Создаем состояние: true — меню открыто, false — скрыто
  const [isOpen, setIsOpen] = useState(true);

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
          <li className={styles.menu__item}>
            <Link href="#" className={styles.menu__link}>
              Мой плейлист
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link href="/signin" className={styles.menu__link}>
              Войти
            </Link>
          </li>
        </ul>
      </div>
      )}
    </nav>
  );
}
