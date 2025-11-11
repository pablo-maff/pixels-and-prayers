/* 
- Renders Item with 3 buttons
- The buttons are clickable
*/

import { screen, render } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import { TodoItem } from './TodoItem';
import userEvent from '@testing-library/user-event';

describe('TodoItem', () => {
  it('renders and has 3 buttons', () => {
    const testItem = { id: '1', title: 'drink water', completed: false };
    render(<TodoItem item={testItem} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('the buttons are clickable', async () => {
    const user = userEvent.setup();
    const item = { id: '1', title: 'drink water', completed: false };
    render(<TodoItem item={item} />);
    
    const updateTaskBtn = screen.getByRole('button', { name: /drink water/i });
    const modifyBtn = screen.getByRole('button', { name: 'Modify' });
    const deleteBtn = screen.getByRole('button', { name: 'Delete' });

    await user.click(updateTaskBtn);
    await user.click(modifyBtn);
    await user.click(deleteBtn);
  });
});
