import type { Meta, StoryObj } from '@storybook/react-vite';
import { Counter } from './Counter';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  tags: ['autodocs'],
  argTypes: {
    initialValue: {
      control: { type: 'number' },
      defaultValue: 0,
    },
    upperLimit: {
      control: { type: 'number' },
      defaultValue: undefined,
    },
    lowerLimit: {
      control: { type: 'number' },
      defaultValue: undefined,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {
  args: {
    initialValue: 0,
  },
};

export const WithInitialValue: Story = {
  args: {
    initialValue: 5,
  },
};

export const WithUpperLimit: Story = {
  args: {
    initialValue: 8,
    upperLimit: 10,
  },
};

export const WithLowerLimit: Story = {
  args: {
    initialValue: -2,
    lowerLimit: -5,
  },
};

export const WithLimits: Story = {
  args: {
    initialValue: 5,
    upperLimit: 10,
    lowerLimit: 0,
  },
};
