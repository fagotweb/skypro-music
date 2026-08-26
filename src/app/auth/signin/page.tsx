'use client';

import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { fetchTokens, loginUser } from '@/services/auth';
import { useDispatch } from 'react-redux';
import { setUsername, setTokens } from '@/store/features/authSlice';
import { toast } from 'react-toastify';

export default function Signin() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Создаем стейты для полей ввода и обработки ошибок
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. Делаем первый POST-запрос через Axios для авторизации пользователя
      const userData = await loginUser({ email, password });

      // 2. Делаем второй POST-запрос через Axios для получения access и refresh токенов
      const tokenData = await fetchTokens({ email, password });

      // 3. Отправляем данные в наш Redux Store через dispatch
      dispatch(setUsername(userData.username));
      dispatch(
        setTokens({ access: tokenData.access, refresh: tokenData.refresh }),
      );

      // 3. Сохраняем токены и юзернейм в localStorage
      localStorage.setItem('access_token', tokenData.access);
      localStorage.setItem('refresh_token', tokenData.refresh);
      localStorage.setItem('username', userData.username);

      toast.success(`Добро пожаловать, ${userData.username}!`);

      // 4. Перенаправляем на главную страницу приложения
      router.push('/music/main');
    } catch (err: unknown) {
      // Проверяем, есть ли у ошибки свойство message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Что-то пошло не так');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} style={{ display: 'contents' }}>
        <Link href="/music/main">
          <div className={styles.modal__logo}>
            <Image
              src="/img/logo_modal.png"
              alt="logo"
              width={140}
              height={21}
            />
          </div>
        </Link>

        {/* Поле Почты */}
        <input
          className={classNames(styles.modal__input, styles.login)}
          type="text"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />

        {/* Поле Пароля */}
        <input
          className={styles.modal__input}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />

        {/* Блок вывода ошибок */}
        {error && <div className={styles.errorContainer}>{error}</div>}

        <button
          className={styles.modal__btnEnter}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </button>

        <button className={styles.modal__btnSignup} type="button">
          <Link href="/auth/signup">Зарегистрироваться</Link>
        </button>
      </form>
    </>
  );
}
