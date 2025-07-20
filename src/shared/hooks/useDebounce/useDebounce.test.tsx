import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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

describe('useDebounce', () => {
  it('should return a value after a default delay of 500ms', async () => {
    render(<TestComponent value="first" />);

    const output = screen.getByTestId('output');

    expect(output).toHaveTextContent('');

    vi.advanceTimersByTime(500);

    expect(output).toHaveTextContent('first');
  });
});
