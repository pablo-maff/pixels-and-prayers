import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDebounce } from './useDebounce';

/*
 * useDebounce requirements:
 * 1. Should return a value after a default delay of 500ms
 * 2. Should return a value after a custom delay
 * 3. Should update the debounced value only after the delay passes without new updates
 * 4. Should cancel pending updates on unmount
 * 5. Should immediately update the value if the delay is set to 0
 * 6. Should update the debounced value when the input changes, even if it’s the same as before
 * 7. Should be generic and work with any type, not just strings
 */

vi.useFakeTimers();

function TestComponent({ value }: { value: string }) {
  const debounced = useDebounce(value);

  return <output>{debounced}</output>;
}

// * helpers
const first = 'first';

describe('useDebounce', () => {
  it('should return a value after a default delay of 500ms', async () => {
    const { getByRole } = render(<TestComponent value={first} />);

    const output = getByRole('status');

    expect(output).toHaveTextContent('');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(output).toHaveTextContent(first);
  });

  it('should return a value after a custom delay of 100ms', async () => {
    const { getByRole } = render(<TestComponent value={first} debounce={100} />);

    const output = getByRole('status');

    expect(output).toHaveTextContent('');

    act(() => vi.advanceTimersByTime(100));

    expect(output).toHaveTextContent(first);
  });
});
