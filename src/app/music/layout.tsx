'use client'

import Sidebar from '@/components/Sidebar/Sidebar';
import Navigation from '@/components/Navigation/Navigation';
import Bar from '@/components/Bar/Bar';
import styles from './musicLayout.module.css';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import { useInitAuth } from '@/hooks/useInitAuth';

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useInitAuth();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <FetchingTracks />
          <Navigation />

          {/* Здесь будут рендериться либо главная страница, либо подборки */}
          <div className={styles.centerblockContainer}>{children}</div>

          <Sidebar />
        </main>

        {/* Плеер всегда снизу и не прерывает игру при переходах */}
        <Bar />
      </div>
    </div>
  );
}
