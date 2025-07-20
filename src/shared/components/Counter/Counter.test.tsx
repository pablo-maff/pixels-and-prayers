import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Counter } from './Counter';
import userEvent from '@testing-library/user-event';

// **Build:** A `<Counter />` component
// **Requirements:**
// - Increment and decrement buttons
// - Cannot go below 0 or above 10
// - Reset button to set value to 5
// - Display message if trying to exceed limits

describe('Counter', () => {
  it('has a default value of 0', () => {
    render(<Counter />);
    expect(screen.getByRole('status', { name: 'counter' })).toHaveTextContent('0');
  });

  it('increases its value by 1 when "+" button is pressed', async () => {
    render(<Counter />);

    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'increment' }));

    const counterStatus = await screen.findByRole('status', { name: 'counter' });

    expect(counterStatus).toHaveTextContent('1');
  });
});
