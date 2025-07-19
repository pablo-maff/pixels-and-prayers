import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: <span>Click me</span>,
    variant: 'primary',
    size: 'md',
  },
  argTypes: {
    onClick: { action: 'clicked' }, // logs click events
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button size="sm">
        <span>Small</span>
      </Button>
      <Button size="md">
        <span>Medium</span>
      </Button>
      <Button size="lg">
        <span>Large</span>
      </Button>
    </div>
  ),
};
