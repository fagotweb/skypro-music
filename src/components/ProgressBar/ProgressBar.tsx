import styles from './progressBar.module.css';
import { ChangeEvent } from 'react';

type ProgressBarProps = {
  max: number;
  value: number;
  step?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
};

export default function ProgressBar({
  max,
  value,
  step = 1,
  onChange,
  readOnly = false,
}: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(value, max));

  return (
    <input
      className={styles.styledProgressInput}
      type="range"
      min={0}
      max={max}
      value={safeValue}
      step={step}
      onChange={onChange}
      disabled={readOnly}
    />
  );
}
