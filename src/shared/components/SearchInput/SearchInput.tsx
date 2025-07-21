import { Button } from '@components/Button/Button';
import { useEffect, useState } from 'react';
import { useDebounce } from 'shared/hooks/useDebounce/useDebounce';

interface SearchInputProps {
  items: string[];
  onMatch: (results: string[]) => void;
  debounce?: boolean;
}

function filterItems(items: string[], searchValue: string) {
  const sanitizedSearchValue = searchValue.trim().toLowerCase();

  if (!sanitizedSearchValue) {
    return [];
  }

  const match = items.filter((item) => item.toLowerCase().includes(sanitizedSearchValue));

  return match;
}

export function SearchInput({ items, onMatch, debounce }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce(searchValue);

  useEffect(() => {
    if (debounce && debouncedValue) {
      onMatch(filterItems(items, searchValue));
    }
  }, [searchValue, debouncedValue, debounce, items, onMatch]);

  function handleOnMatch() {
    onMatch(filterItems(items, searchValue));
  }

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
