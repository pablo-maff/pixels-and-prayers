import { Button } from '@components/Button/Button';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'shared/hooks/useDebounce/useDebounce';
import styles from './SearchInput.module.scss';
interface SearchInputProps {
  onSearch: (searchValue: string) => string;
  debounce?: boolean;
}

export function SearchInput({ onSearch, debounce }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce(searchValue);

  const handleOnMatch = useCallback(() => onSearch(searchValue), [onSearch, searchValue]);

  useEffect(() => {
    if (!debounce || !debouncedValue) return;

    handleOnMatch();
  }, [debouncedValue, debounce, handleOnMatch]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        aria-label="search"
        className={styles.input}
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
