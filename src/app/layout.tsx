import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/store/ReduxProvider';
import { ToastContainer } from 'react-toastify';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'Skypro Music',
  description: 'Музыкальный сервис Skypro',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${montserrat.variable}`}>        
        <ReduxProvider>
          {children}
        </ReduxProvider>

        {/* Добавляем контейнер тостов, чтобы уведомления всплывали поверх всего интерфейса */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false} 
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
      </html>    
  );
}
