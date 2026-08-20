import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterItem from './FilterItem';

describe('Тестирование компонента FilterItem', () => {
  test('должен корректно отображать переданное значение текста', () => {
    render(
      <FilterItem 
        value="Поп" 
        isActive={false} 
        onSelect={() => {}} 
      />
    );

    // Проверяем, что переданный жанр отобразился в элементе
    expect(screen.getByText('Поп')).toBeInTheDocument();
  });

  test('должен вызывать функцию onSelect при клике пользователя', () => {
    // Создаем функцию-шпион Jest
    const mockOnSelect = jest.fn();

    render(
      <FilterItem 
        value="Рок" 
        isActive={false} 
        onSelect={mockOnSelect} 
      />
    );

    const filterElement = screen.getByText('Рок');
    
    // Имитируем клик по элементу
    fireEvent.click(filterElement);

    // Проверяем, что колбэк-функция сработала ровно 1 раз
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});