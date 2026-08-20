import { getTimePanel, formatTime } from './helpers';
import { getUniqueValuesByKey } from './helpers';
import { TrackType } from '@/sharedTypes/sharedTypes'

describe('Тестирование чистой функции formatTime', () => {
  test('должна правильно форматировать двузначные секунды', () => {
    expect(formatTime(65)).toBe('1:05'); // или '01:05' в зависимости от вашей реализации
  });

  test('должна правильно обрабатывать ровное количество минут', () => {
    expect(formatTime(120)).toBe('2:00');
  });

  test('должна корректно выводить значения меньше минуты', () => {
    expect(formatTime(9)).toBe('0:09');
  });

  test('должна возвращать 0:00 при передаче нуля или отрицательного числа', () => {
    expect(formatTime(0)).toBe('0:00');
  });
});

describe('Тестирование чистой функции getTimePanel', () => {
  test('должна возвращать отформатированную строку, если общее время передано', () => {    
    expect(getTimePanel(65, 125)).toBe(`${formatTime(65)} / ${formatTime(125)}`);
  });

  test('должна возвращать undefined, если общее время не передано (undefined)', () => {
    expect(getTimePanel(65, undefined)).toBeUndefined();
  });

  test('должна возвращать undefined, если общее время равно 0', () => {
    expect(getTimePanel(10, 0)).toBe('0:10 / 0:00');
  });
});

const mockTracks = [
  {
    _id: '1',
    name: 'Трек 1',
    author: 'Кино',
    genre: ['Рок', 'Поп'],
    release_date: '1990-01-01',
  },
  {
    _id: '2',
    name: 'Трек 2',
    author: 'Кино',
    genre: ['Рок', 'Инди'],
    release_date: '1992-05-10',
  },
  {
    _id: '3',
    name: 'Трек 3',
    author: 'Сплин',
    genre: ['Рок'],
    release_date: '1990-01-01',
  },
] as unknown as TrackType[];

describe('Тестирование чистой функции getUniqueValuesByKey', () => {
  test('должна собирать уникальных авторов (обычные строки) без дубликатов', () => {
    const result = getUniqueValuesByKey(mockTracks, 'author');
    
    // Ожидаем массив без повторений
    expect(result).toEqual(['Кино', 'Сплин']);
    expect(result).toHaveLength(2);
  });

  test('должна правильно раскрывать массивы строк (для жанров) и убирать дубликаты', () => {
    const result = getUniqueValuesByKey(mockTracks, 'genre');
    
    expect(result).toEqual(['Рок', 'Поп', 'Инди']);
    expect(result).toHaveLength(3);
  });

  test('должна собирать уникальные даты релиза без дубликатов', () => {
    const result = getUniqueValuesByKey(mockTracks, 'release_date');
    
    expect(result).toEqual(['1990-01-01', '1992-05-10']);
    expect(result).toHaveLength(2);
  });

  test('должна возвращать пустой массив, если передан пустой список треков', () => {
    const result = getUniqueValuesByKey([], 'author');
    expect(result).toEqual([]);
  });
});
