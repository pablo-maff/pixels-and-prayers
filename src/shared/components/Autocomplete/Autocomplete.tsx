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
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
      />
      {isInputFocused ? (
        <ul role="listbox" id="autocomplete-list">
          {items.map((item) => (
            <li role="option" id={item} key={item}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
