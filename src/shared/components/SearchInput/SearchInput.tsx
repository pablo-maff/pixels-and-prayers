import { Button } from '@components/Button/Button';
import { useState } from 'react';

interface SearchInputProps {
  items: string[];
  onMatch: (results: string[]) => void;
}

export function SearchInput({ items, onMatch }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState('');

  function handleOnMatch() {
    const sanitizedSearchValue = searchValue.trim().toLowerCase();

    if (!sanitizedSearchValue) {
      onMatch([]);
      return;
    }

    const match = items.filter((item) => item.toLowerCase().includes(sanitizedSearchValue));

    onMatch(match);
  }

  return (
    <div>
      <input
        type="text"
        aria-label="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      ;
      <Button disabled={!searchValue} onClick={handleOnMatch}>
        <span>Search</span>
      </Button>
    </div>
  );
}
