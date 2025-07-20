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
// - Can't exceed upper limit
// - Can't exceed lower limit
// - + button is disabled if trying to exceed upper limit
// - + button is disabled if upper limit is 0
// - - button is disabled if trying to exceed lower limit
// - Reset button to go back to the first count state
// - Reset button is disabled if value is equal to initial value
// - Increment counter just before hitting the upper limit
// - Decrement counter just before hitting the lower limit

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

    await user.click(screen.getByRole('button', { name: 'decrement' }));

    const counterStatus = await screen.findByRole('status', { name: 'counter' });

    expect(counterStatus).toHaveTextContent('-1');
  });

  it('Can not exceed upper limit', async () => {
    render(<Counter initialValue={10} upperLimit={10} />);

    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'increment' }));

    const counterStatus = await screen.findByRole('status', { name: 'counter' });

    expect(counterStatus).toHaveTextContent('10');
  });

  it('+ button is disabled if upper limit is 0 and value is 0', () => {
    render(<Counter upperLimit={0} />);

    expect(screen.getByRole('button', { name: 'increment' })).toHaveAttribute('disabled');
  });

  it('Can not exceed lower limit', async () => {
    render(<Counter initialValue={-10} lowerLimit={-10} />);

    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'decrement' }));

    const counterStatus = await screen.findByRole('status', { name: 'counter' });

    expect(counterStatus).toHaveTextContent('0');
  });

  it('- button is disabled if lower limit is 0 and value is 0', () => {
    render(<Counter lowerLimit={0} />);

    expect(screen.getByRole('button', { name: 'decrement' })).toHaveAttribute('disabled');
  });

  it('reset button resets the state to its original value when pressed', async () => {
    render(<Counter />);

    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'increment' }));
    await user.click(screen.getByRole('button', { name: 'reset' }));

    const counterStatus = await screen.findByRole('status', { name: 'counter' });

    expect(counterStatus).toHaveTextContent('0');
  });

  it('Reset button is disabled if value is equal to initial value', () => {
    render(<Counter />);

    expect(screen.getByRole('button', { name: 'reset' })).toHaveAttribute('disabled');
  });

  it('Increment counter just before hitting the upper limit', async () => {
    render(<Counter initialValue={9} upperLimit={10} />);

    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'increment' }));

    const counterStatus = await screen.findByRole('status', { name: 'counter' });

    expect(counterStatus).toHaveTextContent('10');
  });
});
