import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Counter } from './Counter';
import userEvent from '@testing-library/user-event';

// **Build:** A `<Counter />` component
// **Requirements:**
// - Default value is 0
// - Can set a custom initial value
// - Can increase its value by 1 when + button is pressed
// - Can decrease its value by 1 when - button is pressed
// - Can set upper limit
// - Can set lower limit
// - Display message if trying to exceed limits
// - Reset button to go back to the first count state

describe('Counter', () => {
  it('has a default value of 0', () => {
    render(<Counter />);
    expect(screen.getByRole('status', { name: 'counter' })).toHaveTextContent('0');
  });

  it('can set a custom initial value', () => {
    render(<Counter initialValue={10} />);
    expect(screen.getByRole('status', { name: 'counter' })).toHaveTextContent('10');
  });

  it('increases its value by 1 when "+" button is pressed', async () => {
    render(<Counter />);

    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'increment' }));

    const counterStatus = await screen.findByRole('status', { name: 'counter' });

    expect(counterStatus).toHaveTextContent('1');
  });

  it('decreases its value by 1 when "-" button is pressed', async () => {
    render(<Counter />);

    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'decrease' }));

    const counterStatus = await screen.findByRole('status', { name: 'counter' });

    expect(counterStatus).toHaveTextContent('-1');
  });
});
