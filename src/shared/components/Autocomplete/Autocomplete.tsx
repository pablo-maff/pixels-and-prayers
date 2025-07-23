import { SearchInput } from '@components/SearchInput/SearchInput';
import { useState } from 'react';
import styles from './Autocomplete.module.scss';

interface AutocompleteProps {
  items: string[];
  onSearch: (searchValue: string) => string[];
  onSelect: (selectedItem: string) => void;
}

export function Autocomplete({ items, onSearch, onSelect }: AutocompleteProps) {
  const [filteredItems, setFilteredItems] = useState(items);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState(-1);

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      if (highlightedOption === filteredItems.length - 1) {
        setHighlightedOption(-1);
        return;
      }

      setHighlightedOption((prev) => prev + 1);
    }
    if (e.key === 'ArrowUp') {
      if (highlightedOption === -1) {
        setHighlightedOption(filteredItems.length - 1);
        return;
      }

      setHighlightedOption((prev) => prev - 1);
    }
  }

  return (
    <div className={styles.container} role="combobox" aria-haspopup="listbox">
      <SearchInput
        debounce
        onSearch={(searchValue) => setFilteredItems(onSearch(searchValue))}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        onKeyDown={handleOnKeyDown}
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
        aria-activedescendant={
          highlightedOption >= 0 ? filteredItems[highlightedOption] : undefined
        }
      />
      {isInputFocused && filteredItems.length > 0 ? (
        <ul className={styles.dropdown} role="listbox" id="autocomplete-list">
          {filteredItems.map((item, i) => (
            <li
              className={styles.option}
              role="option"
              aria-selected={i === highlightedOption}
              id={item}
              key={item}
              onMouseDown={() => onSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
