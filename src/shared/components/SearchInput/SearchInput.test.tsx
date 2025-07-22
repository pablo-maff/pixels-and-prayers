// ## 🔁 2. Debounced Input Component

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { SearchInput } from './SearchInput';

// **Build:** A `<SearchInput />`
// **Requirements:**
// 1. allows a user to enter search text
// 2. returns the search value on button click
// 3. disables the search button when there is no input
//
// Debounced behavior (when debounce enabled):
// 4. triggers search callback after typing stops and delay time has passed
// 5. does not trigger search callback while typing continuously
// 6. does not trigger search callback if input is cleared before debounced delay
// 7. hides the search button when debounced mode is enabled
// 8. does not trigger search callback if debounce not enabled and no click

describe('SearchInput', () => {
  let user: ReturnType<typeof userEvent.setup>;

  const userInput = 'Tadej Pogačar is the ultimate pedaling sardine';

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should allow a user to input text', async () => {
    const handleSearch = vi.fn();

    render(<SearchInput onSearch={handleSearch} />);

    const input = screen.getByRole('textbox', { name: 'search' });

    await user.type(input, userInput);

    expect(input).toHaveValue(userInput);
  });

  it('should return the searchValue', async () => {
    const handleSearch = vi.fn();

    render(<SearchInput onSearch={handleSearch} />);

    const input = screen.getByRole('textbox', { name: 'search' });

    await user.type(input, userInput);

    await user.click(screen.getByRole('button'));

    expect(handleSearch).toHaveBeenCalledWith(userInput);
    expect(handleSearch).toHaveBeenCalledOnce();
  });

  it('should have the search button disabled if there is no input', () => {
    const handleSearch = vi.fn();

    render(<SearchInput onSearch={handleSearch} />);

    expect(screen.getByRole('button')).toBeDisabled();
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

    it('should return input after typing stops and delay time has passed', async () => {
      const handleSearch = vi.fn();

      const { getByRole } = render(<SearchInput onSearch={handleSearch} debounce />);

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'Tadej');

      act(() => vi.advanceTimersByTime(500));

      expect(handleSearch).toHaveBeenCalledWith('Tadej');
      expect(handleSearch).toHaveBeenCalledOnce();
    });

    it('should not return input while typing', async () => {
      const handleSearch = vi.fn();

      const { getByRole, unmount } = render(<SearchInput onSearch={handleSearch} debounce />);

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'T');

      act(() => vi.advanceTimersByTime(400));

      await user.type(input, 'a');

      act(() => vi.advanceTimersByTime(400));

      // * By now the default 500ms debounce have already passed

      expect(handleSearch).not.toHaveBeenCalled();

      unmount();
    });

    it('should not return input if input is cleared before debounced delay', async () => {
      const handleSearch = vi.fn();

      const { getByRole, unmount } = render(<SearchInput onSearch={handleSearch} debounce />);

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'T');

      act(() => vi.advanceTimersByTime(400));

      await user.clear(input);

      act(() => vi.advanceTimersByTime(400));

      // * By now the default 500ms debounce have already passed

      expect(handleSearch).not.toHaveBeenCalled();

      unmount();
    });

    it('should hide the search button when debounced mode is enabled', () => {
      const handleSearch = vi.fn();

      const { queryByRole, unmount } = render(<SearchInput onSearch={handleSearch} debounce />);

      const searchButton = queryByRole('button');

      expect(searchButton).toBeNull();

      unmount();
    });

    it('should not return input if debounced search is not enabled and button is not clicked', async () => {
      const handleSearch = vi.fn();

      render(<SearchInput onSearch={handleSearch} />);

      const input = screen.getByRole('textbox', { name: 'search' });

      await user.type(input, userInput);

      act(() => vi.advanceTimersByTime(500));

      expect(handleSearch).not.toHaveBeenCalled();
    });
  });
});
