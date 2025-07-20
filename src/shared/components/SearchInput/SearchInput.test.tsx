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
// 4. If no match is found, no result is returned or displayed

describe('SearchInput', () => {
  let user: ReturnType<typeof userEvent.setup>;

  const userInput = 'Tadej Pogačar is the ultimate pedaling sardine';

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should allow a user to input text', async () => {
    render(<SearchInput />);

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

    expect(handleMatch).toHaveBeenCalledWith(userInput);
  });
});
