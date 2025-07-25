import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

export function Input({ value, onChange, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={styles.input} value={value} onChange={onChange} {...props} />;
}
