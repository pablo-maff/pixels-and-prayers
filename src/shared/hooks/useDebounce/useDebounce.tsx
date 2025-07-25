import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 500) {
  const [debounced, setDebounced] = useState<T>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debounced;
}
