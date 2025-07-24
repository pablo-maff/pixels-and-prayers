import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { Input } from './Input';
import { useState } from 'react';

describe('Input', () => {
  let user: ReturnType<typeof userEvent.setup>;
  let handleChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    user = userEvent.setup();
    handleChange = vi.fn();
  });

  function TestInputWrapper() {
    const [value, setValue] = useState('');

    return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
  }

  it('renders with the initial value', () => {
    const { getByRole } = render(<Input value={'Hello'} />);

    const input = getByRole('textbox');

    expect(input).toHaveValue('Hello');
  });

  it('reflects user typing', async () => {
    const { getByRole } = render(<TestInputWrapper />);

    const input = getByRole('textbox');

    await user.type(input, 'Hello');

    expect(input).toHaveValue('Hello');
  });

  it('passes through any additional props to the input', () => {
    const { getByRole } = render(
      <Input value={''} onChange={handleChange} type="email" disabled aria-label="peanuts" />,
    );

    const input = getByRole('textbox');

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-label', 'peanuts');
    expect(input).toHaveAttribute('type', 'email');
  });

  it.skip('notifies changes on every input update', () => {
    // test implementation
  });
});
