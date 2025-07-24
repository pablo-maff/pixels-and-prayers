import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export function Input({ value, onChange, ...props }: InputProps) {
  return <input className={styles.input} value={value} onChange={onChange} {...props} />;
}
