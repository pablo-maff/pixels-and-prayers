import { useEffect, useRef, useState } from 'react';
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
  const inputBeforeAutocompleteRef = useRef('');

  const isItemHighlighted = highlightedOption >= 0;

  useEffect(() => {
    if (isItemHighlighted) {
      setInputValue(items[highlightedOption]);
    }
  }, [highlightedOption, isItemHighlighted, items]);

  function handleOnSelect(item: string) {
    setInputValue(item);
    onSelect(item);
  }

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const handlers: Record<string, () => void> = {
      ArrowDown: handleArrowDown,
      ArrowUp: handleArrowUp,
      ArrowLeft: handleSideArrowKeys,
      ArrowRight: handleSideArrowKeys,
      Enter: handleEnterKey,
      Escape: () => setIsInputFocused(false),
    };

    const handler = handlers[e.key];
    if (handler) {
      handler();
    }
  }

  function handleArrowDown() {
    if (highlightedOption === items.length - 1) {
      setHighlightedOption(-1);
      return;
    }

    setHighlightedOption((prev) => {
      const newHighlightedOption = prev + 1;

      return newHighlightedOption;
    });
  }

  function handleArrowUp() {
    if (highlightedOption === -1) {
      setHighlightedOption(items.length - 1);
      return;
    }

    setHighlightedOption((prev) => {
      const newHighlightedOption = prev - 1;

      return newHighlightedOption;
    });
  }

  function handleSideArrowKeys() {
    if (isItemHighlighted) {
      setInputValue(inputBeforeAutocompleteRef.current);
      setHighlightedOption(-1);
    }
  }

  function handleEnterKey() {
    if (isItemHighlighted) {
      handleOnSelect(items[highlightedOption]);
      setIsInputFocused(false);
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isInputFocused) {
      setIsInputFocused(true);
    }

    inputBeforeAutocompleteRef.current = e.target.value;

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
        aria-activedescendant={isItemHighlighted ? items[highlightedOption] : undefined}
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
