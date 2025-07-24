import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { Input } from './Input';
import { useState } from 'react';

describe('Input', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  function TestInputWrapper({ onChange }: { onChange: (val: string) => void }) {
    const [value, setValue] = useState('');

    return (
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    );
  }

  it('renders with the initial value', () => {
    const { getByRole } = render(<Input value={'Hello'} />);

    const input = getByRole('textbox');

    expect(input).toHaveValue('Hello');
  });

  it('reflects user typing', async () => {
    const { getByRole } = render(<TestInputWrapper onChange={() => {}} />);

    const input = getByRole('textbox');

    await user.type(input, 'Hello');

    expect(input).toHaveValue('Hello');
  });

  it('passes through any additional props to the input', () => {
    const { getByRole } = render(<Input value={''} type="email" disabled aria-label="peanuts" />);

    const input = getByRole('textbox');

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-label', 'peanuts');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('notifies changes on every input update', async () => {
    const handleChange = vi.fn();

    const { getByRole } = render(<TestInputWrapper onChange={handleChange} />);

    const input = getByRole('textbox');

    await user.type(input, 'Hello');

    expect(handleChange).toHaveBeenCalledWith('Hello');
  });
});
