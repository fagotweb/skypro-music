import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ReduxProvider from '@/store/ReduxProvider'; // Сверьте путь к вашему провайдеру
import Search from './Search';

describe('Тестирование компонента Search', () => {
  test('должен корректно отрисовывать инпут поиска', () => {
    render(
      <ReduxProvider>
        <Search />
      </ReduxProvider>
    );

    // Проверяем, что инпут с плейсхолдером "Поиск" есть на экране
    const searchInput = screen.getByPlaceholderText('Поиск');
    expect(searchInput).toBeInTheDocument();
  });

  test('должен вызывать событие onChange при вводе текста', () => {
    render(
      <ReduxProvider>
        <Search />
      </ReduxProvider>
    );

    const searchInput = screen.getByPlaceholderText('Поиск') as HTMLInputElement;
    
    // Имитируем ввод текста пользователем
    fireEvent.change(searchInput, { target: { value: 'Skypro' } });
    
    // Проверяем, что значение в инпуте изменилось
    expect(searchInput.value).toBe('Skypro');
  });
});