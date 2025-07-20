import { Button } from '@components/Button/Button';
import { useState } from 'react';

interface SearchInputProps {
  items: string[];
  onMatch: (results: string[]) => void;
}

export function SearchInput({ items, onMatch }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState('');

  function handleOnMatch() {
    if (!searchValue) {
      onMatch([]);
      return;
    }

    const match = items.filter((item) =>
      item.toLowerCase().includes(searchValue.trim().toLowerCase()),
    );

    if (!match.length) {
      onMatch([]);
      return;
    }

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
      <Button onClick={handleOnMatch}>
        <span>Search</span>
      </Button>
    </div>
  );
}
