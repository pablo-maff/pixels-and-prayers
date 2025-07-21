// ## 🔁 2. Debounced Input Component

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { SearchInput } from './SearchInput';

// **Build:** A `<SearchInput />`
// **Requirements:**
// 1. allows a user to enter search text
// 2. returns an exact match when the input matches an item
// 3. ignores case differences and trims surrounding spaces
// 4. returns all items containing the search substring
// 5. returns no results for empty or whitespace-only input
// 6. disables the search button when there is no input
// 7. accepts arbitrary item types and returns them via the search function
// 8. triggers a search callback after typing stops (debounced)
// 9. does not trigger a search callback while typing continuously (debounced)
// 10. does not trigger a search callback if input is cleared before debounce delay (debounced)
// 11. hides the search button when debounce mode is enabled (debounced)

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

  it('should return all matching items for a given substring', async () => {
    const items = ['Pogačar', 'Roglič', 'Evenepoel'];

    const handleMatch = vi.fn();

    render(<SearchInput items={items} onMatch={handleMatch} />);

    const input = screen.getByRole('textbox', { name: 'search' });

    await user.type(input, 'g');

    await user.click(screen.getByRole('button'));

    expect(handleMatch).toHaveBeenCalledWith([items[0], items[1]]);
  });

  it('should not return a result if the input is white space', async () => {
    const items = [userInput];

    const handleMatch = vi.fn();

    render(<SearchInput items={items} onMatch={handleMatch} />);

    const input = screen.getByRole('textbox', { name: 'search' });

    await user.type(input, '   ');

    await user.click(screen.getByRole('button'));

    expect(handleMatch).toHaveBeenCalledWith([]);
  });

  it('should have the search button disabled if there is no input', () => {
    const items = [userInput];

    const handleMatch = vi.fn();

    render(<SearchInput items={items} onMatch={handleMatch} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('accepts arbitrary item types and returns them via the search function when matched', async () => {
    const items = [
      { id: 1, value: userInput },
      { id: 2, value: 'not what the user wants' },
    ];

    const handleMatch = vi.fn();

    const { getByRole } = render(<SearchInput items={items} onMatch={handleMatch} />);

    const input = getByRole('textbox');

    await user.type(input, userInput);

    expect(handleMatch).toHaveBeenCalledWith(items[0]);
    expect(handleMatch).toHaveBeenCalledOnce();
  });

  // * Debounced search tests
  describe('debounced search', () => {
    // ! We need to trick RTL into thinking that jest is running to properly use fakeTimers and user actions https://github.com/testing-library/user-event/issues/1115
    beforeAll(() => {
      // https://vitest.dev/api/vi.html#vi-stubglobal
      vi.stubGlobal('jest', {
        advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
      });
    });

    beforeEach(() => {
      vi.useFakeTimers();

      user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime.bind(vi) });
    });

    afterEach(() => {
      // Ensures all pending timers are flushed before switching to real timers
      // Reference: https://testing-library.com/docs/using-fake-timers/
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    });

    afterAll(() => {
      vi.unstubAllGlobals();
    });

    it('should trigger a match after typing stops', async () => {
      const items = [userInput];

      const handleMatch = vi.fn();

      const { getByRole } = render(<SearchInput items={items} onMatch={handleMatch} debounce />);

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'Tadej');

      act(() => vi.advanceTimersByTime(500));

      expect(handleMatch).toHaveBeenCalledWith([userInput]);
    });

    it('should not trigger a match while typing', async () => {
      const items = [userInput];

      const handleMatch = vi.fn();

      const { getByRole, unmount } = render(
        <SearchInput items={items} onMatch={handleMatch} debounce />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'T');

      act(() => vi.advanceTimersByTime(400));

      await user.type(input, 'a');

      act(() => vi.advanceTimersByTime(400));

      // * By now the default 500ms debounce have already passed

      expect(handleMatch).not.toHaveBeenCalled();

      unmount();
    });

    it('should not trigger a match if input is cleared before debounced delay', async () => {
      const items = [userInput];

      const handleMatch = vi.fn();

      const { getByRole, unmount } = render(
        <SearchInput items={items} onMatch={handleMatch} debounce />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'T');

      act(() => vi.advanceTimersByTime(400));

      await user.clear(input);

      act(() => vi.advanceTimersByTime(400));

      // * By now the default 500ms debounce have already passed

      expect(handleMatch).not.toHaveBeenCalled();

      unmount();
    });

    it('should hide the search button when debounced mode is enabled', () => {
      const items = [userInput];

      const handleMatch = vi.fn();

      const { queryByRole, unmount } = render(
        <SearchInput items={items} onMatch={handleMatch} debounce />,
      );

      const searchButton = queryByRole('button');

      expect(searchButton).toBeNull();

      unmount();
    });

    it('should not return a value if debounced search is not enabled and button is not clicked', async () => {
      const items = [userInput];

      const handleMatch = vi.fn();

      render(<SearchInput items={items} onMatch={handleMatch} />);

      const input = screen.getByRole('textbox', { name: 'search' });

      await user.type(input, userInput);

      act(() => vi.advanceTimersByTime(500));

      expect(handleMatch).not.toHaveBeenCalled();
    });
  });
});
