import type { Size, Variant } from '../../../shared/type-defs/index.ts';
import clsx from 'clsx';
import styles from './Button.module.scss';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

export function Button({
  children,
  isLoading,
  variant = 'primary',
  size = 'md',
  disabled,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        { [styles.disabled]: disabled },
        className,
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? <span>...Loading</span> : children}
    </button>
  );
}
