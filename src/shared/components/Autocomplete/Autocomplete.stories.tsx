import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete } from './Autocomplete';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
};
export default meta;

type Story = StoryObj<typeof Autocomplete>;

const sampleItems = ['apple', 'banana', 'grape', 'orange', 'pineapple'];
const tropicalItems = ['mango', 'melon', 'mandarin'];

export const Basic: Story = {
  args: {
    items: sampleItems,
  },
};

export const PreFiltered: Story = {
  args: {
    items: tropicalItems,
  },
};
