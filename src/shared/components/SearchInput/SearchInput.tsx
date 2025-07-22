import { Button } from '@components/Button/Button';
import { useEffect, useState } from 'react';
import { useDebounce } from 'shared/hooks/useDebounce/useDebounce';
import styles from './SearchInput.module.scss';
interface SearchInputProps {
  onSearch: (searchValue: string) => string;
  debounce?: boolean;
}

export function SearchInput({ onSearch, debounce }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce(searchValue);

  useEffect(() => {
    if (!debounce || !debouncedValue) return;

    onSearch(debouncedValue);
  }, [debouncedValue, debounce, onSearch]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        aria-label="search"
        className={styles.input}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (!debounce && e.key === 'Enter') {
            onSearch(searchValue);
          }
        }}
      />
      {debounce ? null : (
        <Button disabled={!searchValue} onClick={() => onSearch(searchValue)}>
          <span>Search</span>
        </Button>
      )}
    </div>
  );
}
