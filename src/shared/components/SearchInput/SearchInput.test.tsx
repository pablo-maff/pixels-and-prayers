// ## 🔁 2. Debounced Input Component

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SearchInput } from './SearchInput';

// **Build:** A `<SearchInput />`
// **Requirements:**
// 1. The search input should allow a user to input text
// 2. If the entered value exactly matches an item in the list, that item is made available externally
// 3. Matching is case-insensitive and ignores surrounding whitespace
// 4. If no match is found, no result is returned
// 5. If the entered value is a substring of one or more items in the list, all matching items should be returned

describe('SearchInput', () => {
  let user: ReturnType<typeof userEvent.setup>;

  const userInput = 'Tadej Pogačar is the ultimate pedaling sardine';

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should allow a user to input text', async () => {
    render(<SearchInput items={[]} onMatch={() => {}} />);

    const input = screen.getByRole('textbox', { name: 'search' });

    await user.type(input, userInput);

    expect(input).toHaveValue(userInput);
  });

  it('should return an item that matches the user input', async () => {
    const items = [userInput, 'not what the user wants'];
    const handleMatch = vi.fn();

    render(<SearchInput items={items} onMatch={handleMatch} />);

    const input = screen.getByRole('textbox', { name: 'search' });

    await user.type(input, userInput);

    await user.click(screen.getByRole('button'));

    expect(handleMatch).toHaveBeenCalledWith([userInput]);
  });

  it('should return an item that matches the user input even if casing is different and there is surrounding whitespace', async () => {
    const items = [userInput, 'not what the user wants'];

    const handleMatch = vi.fn();

    render(<SearchInput items={items} onMatch={handleMatch} />);

    const input = screen.getByRole('textbox', { name: 'search' });

    await user.type(input, ' tadej pogačar is the ultimAte pEdaling sardine ');

    await user.click(screen.getByRole('button'));

    expect(handleMatch).toHaveBeenCalledWith([userInput]);
  });

  it('should not return a result if no match is found', async () => {
    const items = [userInput];

    const handleMatch = vi.fn();

    render(<SearchInput items={items} onMatch={handleMatch} />);

    const input = screen.getByRole('textbox', { name: 'search' });

    await user.type(input, 'not an item');

    await user.click(screen.getByRole('button'));

    expect(handleMatch).toHaveBeenCalledWith([]);
  });

  // If the entered value is a substring of one or more items in the list, all matching items should be returned
  it('should return all matching items for a given substring', async () => {
    const items = ['Pogačar', 'Roglič', 'Evenepoel'];

    const handleMatch = vi.fn();

    render(<SearchInput items={items} onMatch={handleMatch} />);

    const input = screen.getByRole('textbox', { name: 'search' });

    await user.type(input, 'g');

    await user.click(screen.getByRole('button'));

    expect(handleMatch).toHaveBeenCalledWith([items[0], items[1]]);
  });
});
