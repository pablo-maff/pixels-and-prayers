import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TodoList from './TodoList';

describe('TodoList', () => {
  it('renders', () => {
    render(<TodoList items={true} isLoading={false} />);
  });

  it('shows a list if items are available', () => {
    render(<TodoList items={true} isLoading={false} />);
    const list = screen.getByRole('list');
    const message = screen.queryByText('no items avaible');

    expect(message).toBeFalsy();
    expect(list).toBeVisible();
  });

  it('shows a message if no list is avaible', () => {
    render(<TodoList items={false} isLoading={false} />);
    const message = screen.getByText('no items avaible');
    const list = screen.queryByRole('list');

    expect(list).toBeFalsy();
    expect(message).toBeVisible();
  });

  it('shows a loading indicator if the list is loading', () => {
    render(<TodoList items={true} isLoading={true} />);
    const loadingIndicator = screen.getByText('Loading...');
    expect(loadingIndicator).toBeVisible();
  });
});
