import { act, render } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDebounce } from './useDebounce';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';

/*
 * useDebounce requirements:
 * 1. Should return a value after a default delay of 500ms
 * 2. Should return a value after a custom delay
 * 3. Should delay emitting the value until it stays unchanged for the full duration
 * 4. Should cancel pending updates on unmount
 * 5. Should immediately update the value if the delay is set to 0
 * 6. Should update the debounced value when the input changes, even if it’s the same as before
 * 7. Should be generic and work with any type, not just strings
 */

function TestComponent({ initialValue = '', delay }: { initialValue: string; delay?: number }) {
  const [value, setValue] = useState(initialValue);
  const debounced = useDebounce(value, delay);

  return (
    <div>
      <input
        type="text"
        aria-label="test-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <output>{debounced}</output>
    </div>
  );
}

// * helpers
const first = 'first';
const second = 'second';

describe('useDebounce', () => {
  let user: ReturnType<typeof userEvent.setup>;

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

  it('should return a value after a default delay of 500ms', () => {
    const { getByRole } = render(<TestComponent initialValue={first} />);

    const output = getByRole('status');

    expect(output).toHaveTextContent('');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(output).toHaveTextContent(first);
  });

  it('should return a value after a custom delay of 100ms', () => {
    const { getByRole } = render(<TestComponent initialValue={first} delay={100} />);

    const output = getByRole('status');

    expect(output).toHaveTextContent('');

    act(() => vi.advanceTimersByTime(100));

    expect(output).toHaveTextContent(first);
  });

  it('should delay emitting the value until it stays unchanged for the full duration', async () => {
    const { getByRole } = render(<TestComponent initialValue={first} />);

    const input = getByRole('textbox');
    const output = getByRole('status');

    expect(output).toHaveTextContent('');

    act(() => vi.advanceTimersByTime(300));

    await user.type(input, second);

    act(() => vi.advanceTimersByTime(300));

    // * 600 ms in total by now, output should still be ''
    expect(output).toHaveTextContent('');

    act(() => vi.advanceTimersByTime(200));

    // * 500 ms since last user interaction
    expect(output).toHaveTextContent(second);
  });

  it('should cancel pending updates on unmount', () => {
    const { unmount, queryByRole } = render(<TestComponent initialValue={first} />);

    act(() => vi.advanceTimersByTime(300));

    unmount();

    act(() => vi.advanceTimersByTime(300));

    // * component is unmounted so there is no DOM
    expect(queryByRole('status')).toBeNull();

    // * Make sure that a possible state update is not leaking to the console
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('should immediately update the value if the delay is set to 0', () => {
    const { getByRole } = render(<TestComponent initialValue={first} delay={0} />);

    act(() => vi.advanceTimersByTime(0));

    const output = getByRole('status');

    expect(output).toHaveTextContent(first);
  });

  it('should update the debounced value when the input changes, even if it is the same as before', async () => {
    const { getByRole } = render(<TestComponent initialValue={first} delay={0} />);

    const input = getByRole('textbox');
    const output = getByRole('status');

    act(() => vi.advanceTimersByTime(400));

    await user.type(input, first);

    act(() => vi.advanceTimersByTime(400));

    expect(output).toHaveTextContent('');

    act(() => vi.advanceTimersByTime(200));

    expect(output).toHaveTextContent(first);
  });
});
