import { SearchInput } from '@components/SearchInput/SearchInput';
import { useState } from 'react';

interface AutocompleteProps {
  items: string[];
  onSearch: (searchValue: string) => string;
}

export function Autocomplete({ items, onSearch }: AutocompleteProps) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState(-1);

  return (
    <div role="combobox" aria-haspopup="listbox">
      <SearchInput
        debounce
        onSearch={onSearch}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            setHighlightedOption((prev) => prev + 1);
          }
        }}
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
        aria-activedescendant={highlightedOption.toString() || undefined}
      />
      {isInputFocused ? (
        <ul role="listbox" id="autocomplete-list">
          {items.map((item, i) => (
            <li
              role="option"
              aria-selected={i === highlightedOption}
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
