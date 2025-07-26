import { Button } from '@components/Button/Button';
import { useEffect, useState, type InputHTMLAttributes } from 'react';
import { useDebounce } from 'shared/hooks/useDebounce/useDebounce';
import styles from './SearchInput.module.scss';
import { Input } from '@components/Input/Input';

// * Only allowed to pass input attributes, and onChange is controlled locally here, so omit that
interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch: (searchValue: string) => void;
  debounce?: boolean;
}

// ! Deprecated, we need controlled components, and coupling different modes should be avoided
export function SearchInput({ onSearch, debounce, ...inputProps }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce(searchValue);

  useEffect(() => {
    if (!debounce || typeof debouncedValue !== 'string') return;

    onSearch(debouncedValue);
  }, [debouncedValue, debounce, onSearch]);

  return (
    <div className={styles.container}>
      <Input
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
        {...inputProps}
      />

      {debounce ? null : (
        <Button disabled={!searchValue} onClick={() => onSearch(searchValue)}>
          <span>Search</span>
        </Button>
      )}
    </div>
  );
}
