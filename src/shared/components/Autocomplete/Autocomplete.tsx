import { useState } from 'react';
import styles from './Autocomplete.module.scss';
import { Input } from '@components/Input/Input';

interface AutocompleteProps {
  items: string[];
  onSelect: (selectedItem: string) => void;
}

export function Autocomplete({ items, onSelect }: AutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState(-1);

  function handleOnSelect(item: string) {
    setInputValue(item);
    onSelect(item);
  }

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case 'ArrowDown':
        if (highlightedOption === items.length - 1) {
          setHighlightedOption(-1);
          return;
        }

        setHighlightedOption((prev) => {
          const newHighlightedOption = prev + 1;

          setInputValue(items[newHighlightedOption]);

          return newHighlightedOption;
        });

        break;

      case 'ArrowUp':
        if (highlightedOption === -1) {
          setHighlightedOption(items.length - 1);
          setInputValue(items[items.length - 1]);
          return;
        }

        setHighlightedOption((prev) => prev - 1);
        break;

      case 'ArrowLeft':
        if (highlightedOption >= 0) {
          setInputValue(items[highlightedOption]);
        }
        break;

      case 'ArrowRight':
        if (highlightedOption >= 0) {
          setInputValue(items[highlightedOption]);
        }
        break;

      case 'Enter':
        if (highlightedOption >= 0) {
          handleOnSelect(items[highlightedOption]);
          setIsInputFocused(false);
        }
        break;

      case 'Escape':
        setIsInputFocused(false);
        break;
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isInputFocused) {
      setIsInputFocused(true);
    }

    setInputValue(e.target.value);
  }

  return (
    <div className={styles.container} role="combobox" aria-haspopup="listbox">
      <Input
        value={inputValue}
        onChange={handleOnChange}
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
              onMouseDown={() => handleOnSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
