import { SearchInput } from '@components/SearchInput/SearchInput';
import { useState } from 'react';

interface AutocompleteProps {
  items: string[];
  onSearch: (searchValue: string) => string;
}

export function Autocomplete({ items, onSearch }: AutocompleteProps) {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div role="combobox" aria-haspopup="listbox">
      <SearchInput
        debounce
        onSearch={onSearch}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
      />
      {isInputFocused ? (
        <ul role="listbox" id="autocomplete-list">
          {items.map((item) => (
            <li
              role="option"
              aria-selected={true}
              id={item}
              key={item}
              onMouseDown={() => onSearch(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
