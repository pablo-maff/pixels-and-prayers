import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export function Input({ value, onChange, ...props }: InputProps) {
  return <input value={value} onChange={onChange} {...props} />;
}
