'use client'

import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { signupUser } from '@/services/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {

  const router = useRouter();

  // 1. Создаем стейты для формы регистрации
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Валидация перед отправкой на сервер
    if (password !== repeatPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setIsLoading(true);

    try {
      // 2. Вызываем функцию регистрации. 
      // В качестве username передаем почту (или имя до знака @)
      await signupUser({ 
        email, 
        password, 
        username: email.split('@')[0] 
      });

      // 3. После успешного создания аккаунта перенаправляем на логин
      router.push("/auth/signin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ошибка при регистрации");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <form onSubmit={handleSignup} style={{ display: 'contents' }}>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <Image src="/img/logo_modal.png" alt="logo" width={140} height={21} />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        required
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        required
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
        onChange={(e) => setRepeatPassword(e.target.value)}
        disabled={isLoading}
        required
      />

      {/* Вывод ошибок */}
      {error && <div className={styles.errorContainer}>{error}</div>}
      
      <div className={styles.errorContainer}></div>
      <button className={styles.modal__btnSignupEnt}>Зарегистрироваться</button>
      </form>
    </>
  );
}
