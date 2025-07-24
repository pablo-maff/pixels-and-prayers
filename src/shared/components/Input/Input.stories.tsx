import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
  },
  render: (args) => {
    const { value: initialValue = '', onChange, ...rest } = args;
    const [value, setValue] = useState(initialValue);
    return (
      <Input
        {...rest}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e);
        }}
      />
    );
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Hello World',
  },
};

export const Disabled: Story = {
  args: {
    value: 'Cannot edit',
    disabled: true,
  },
};

export const EmailType: Story = {
  args: {
    type: 'email',
    placeholder: 'you@example.com',
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const { value: initialValue = '', onChange, ...rest } = args;
    const [value, setValue] = useState(initialValue);
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="email-input">Email:</label>
        <Input
          id="email-input"
          aria-label="email-input"
          {...rest}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e);
          }}
        />
      </div>
    );
  },
  args: {
    placeholder: 'user@example.com',
    type: 'email',
    value: '',
  },
};
