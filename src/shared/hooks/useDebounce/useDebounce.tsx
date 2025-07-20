import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T) {
  const [debounced, setDebounced] = useState<T>();

  useEffect(() => {
    setTimeout(() => {
      setDebounced(value);
    }, 500);
  }, []);

  return debounced;
}
