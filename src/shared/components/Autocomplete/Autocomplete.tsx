import { useState } from 'react';
import styles from './Autocomplete.module.scss';
import { Input } from '@components/Input/Input';

interface AutocompleteProps {
  items: string[];
  onSearch: (searchValue: string) => string[];
  onSelect: (selectedItem: string) => void;
}

// TODO: Debouncing should be controlled in the parent component, not in the children
export function Autocomplete({ items, onSelect }: AutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState(-1);

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      if (highlightedOption === items.length - 1) {
        setHighlightedOption(-1);
        return;
      }

      setHighlightedOption((prev) => prev + 1);
    }
    if (e.key === 'ArrowUp') {
      if (highlightedOption === -1) {
        setHighlightedOption(items.length - 1);
        return;
      }

      setHighlightedOption((prev) => prev - 1);
    }

    if (e.key === 'Enter' && highlightedOption >= 0) {
      onSelect(items[highlightedOption]);
      setIsInputFocused(false);
    }
  }

  return (
    <div className={styles.container} role="combobox" aria-haspopup="listbox">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        onKeyDown={handleOnKeyDown}
        aria-label="search"
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
        aria-activedescendant={highlightedOption >= 0 ? items[highlightedOption] : undefined}
      />
      {isInputFocused && items.length > 0 ? (
        <ul className={styles.dropdown} role="listbox" id="autocomplete-list">
          {items.map((item, i) => (
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
