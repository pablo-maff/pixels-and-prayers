import type { Meta, StoryObj } from '@storybook/react-vite';
import Slider from './Slider';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: { type: 'number' },
      defaultValue: 0,
    },
    max: {
      control: { type: 'number' },
      defaultValue: 100,
    },
    step: {
      control: { type: 'number', step: 1 },
      defaultValue: 1,
    },
    value: { control: 'number', defaultValue: 0 },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState(10);
    return (
      <>
        <Slider min={0} max={100} step={1} value={val} onChange={setVal} />
      </>
    );
  },
};

export const DifferentStepNumber: Story = {
  render: () => {
    const [val, setVal] = useState(10);
    return (
      <>
        <Slider min={0} max={100} step={10} value={val} onChange={setVal} />
      </>
    );
  },
};

export const AtMin: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
  },
};

export const AtMax: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 100,
  },
};
