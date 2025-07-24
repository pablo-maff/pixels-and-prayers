import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, beforeEach, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders with the initial value', () => {
    const { getByRole } = render(<Input value={'Hello'} />);

    const input = getByRole('textbox');

    expect(input).toHaveValue('Hello');
  });

  it.skip('reflects user typing', () => {
    // test implementation
  });

  it.skip('passes through any additional props to the input', () => {
    // test implementation
  });

  it.skip('notifies changes on every input update', () => {
    // test implementation
  });

  it.skip('can be disabled', () => {
    // test implementation
  });
});
