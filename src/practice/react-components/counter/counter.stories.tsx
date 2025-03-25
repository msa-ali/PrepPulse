import { Counter } from './counter';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  tags: ['autodocs'],
  argTypes: {
    initialCount: { control: 'number', description: 'Initial count value' },
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {
  args: {
    initialCount: 0,
  },
};

export const StartAtTen: Story = {
  args: {
    initialCount: 10,
  },
};
