import { Button } from '@components/Button/Button';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'shared/hooks/useDebounce/useDebounce';

interface SearchInputProps<T> {
  items: T[];
  onSearch: (items: T[], searchValue: string) => T[];
  debounce?: boolean;
}

// function defaultSearch<T>(items: T[], searchValue: string) {
//   if (!items.every((item) => typeof item === 'string')) {
//     throw new Error('All items must be a string');
//   }

//   const sanitizedSearchValue = searchValue.trim().toLowerCase();

//   if (!sanitizedSearchValue) {
//     return [];
//   }

//   const match = items.filter((item) => item.toLowerCase().includes(sanitizedSearchValue));

//   return match;
// }

export function SearchInput<T>({ items, onSearch, debounce }: SearchInputProps<T>) {
  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce(searchValue);

  const handleOnMatch = useCallback(
    () => onSearch(items, searchValue),
    [items, onSearch, searchValue],
  );

  useEffect(() => {
    if (!debounce || !debouncedValue) return;

    handleOnMatch();
  }, [debouncedValue, debounce, handleOnMatch]);

  return (
    <div>
      <input
        type="text"
        aria-label="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {debounce ? null : (
        <Button disabled={!searchValue} onClick={handleOnMatch}>
          <span>Search</span>
        </Button>
      )}
    </div>
  );
}
