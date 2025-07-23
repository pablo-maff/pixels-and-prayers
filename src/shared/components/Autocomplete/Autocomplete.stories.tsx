import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Autocomplete } from './Autocomplete';
import { searchString } from 'shared/utils/searchString';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Autocomplete>;

const sampleItems = ['apple', 'banana', 'grape', 'orange', 'pineapple'];

export const Basic: Story = {
  render: () => {
    const [items, setItems] = useState<string[]>([]);
    return (
      <Autocomplete
        items={items}
        onSearch={(query) => {
          const results = searchString(sampleItems, query);
          setItems(results);
          return query;
        }}
      />
    );
  },
};

export const WithPreloadedItems: Story = {
  render: () => <Autocomplete items={sampleItems} onSearch={(value) => value} />,
};
