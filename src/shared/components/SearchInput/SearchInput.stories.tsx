import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    onSearch: { action: 'onSearch' },
    debounce: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Manual: Story = {
  args: {
    debounce: false,
  },
  parameters: {
    docs: {
      storyDescription: 'Manual search mode: click the button to trigger a search.',
    },
  },
};

export const Debounced: Story = {
  args: {
    debounce: true,
  },
  parameters: {
    docs: {
      storyDescription: 'Debounced mode: search fires automatically after typing stops.',
    },
  },
};
