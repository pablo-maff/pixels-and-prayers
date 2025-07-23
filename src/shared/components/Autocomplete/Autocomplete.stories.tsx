import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete } from './Autocomplete';
import { searchString } from 'shared/utils/searchString';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  argTypes: {
    onSearch: { action: 'onSearch' },
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
    onSearch: (query) => searchString(sampleItems, query),
  },
};

export const PreFiltered: Story = {
  args: {
    items: tropicalItems,
    onSearch: (query) => searchString(tropicalItems, query),
  },
};
