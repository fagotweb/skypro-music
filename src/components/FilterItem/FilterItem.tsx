import cn from 'classnames';
import styles from '../Filter/filter.module.css'; // Будем использовать общие стили фильтра

interface FilterItemProps {
  value: string;
  isActive: boolean;
  onSelect: (value: string) => void;
}

export default function FilterItem({ value, isActive, onSelect }: FilterItemProps) {
  return (
    <li
      className={cn(styles.filter__item, { [styles.item_active]: isActive })}
      onClick={() => onSelect(value)}
    >
      {value}
    </li>
  );
}
