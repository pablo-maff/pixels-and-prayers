import { Button } from '@components/Button/Button';
import { useState } from 'react';

interface SearchInputProps {
  items: string[];
  onMatch: (results: string[]) => void;
}

export function SearchInput({ items, onMatch }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState('');

  function handleOnMatch() {
    const match = items.filter((i) => i === searchValue);

    if (!match.length) {
      onMatch(['No results found']);
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
