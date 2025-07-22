import { SearchInput } from '@components/SearchInput/SearchInput';

interface AutocompleteProps {
  items: string[];
  onSearch: (searchValue: string) => string;
}

export function Autocomplete({ items, onSearch }: AutocompleteProps) {
  return (
    <div role="combobox" aria-haspopup="listbox">
      <SearchInput
        onSearch={onSearch}
        debounce
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
      />
      <ul role="listbox" id="autocomplete-list">
        {items.map((item) => (
          <li role="option" id={item} key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
