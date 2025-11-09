import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TodoForm } from './TodoForm';
import userEvent from '@testing-library/user-event';

// we need to assert that in this component:
/* 
the form renders and contains a Label
the form renders and contains an Input
the input exist and can focus
the form renders and contains a Button with type submit
Button is clickable / triggers submit.
The form can submit (calls handleSubmit)
Submitting resets the form/input.

 */

describe('TodoForm', () => {
  it('renders and is visible', () => {
    const { container } = render(<TodoForm />);
    const formElement = container.querySelector('form');
    expect(formElement).toBeInTheDocument();
  });

  it('contains a label', () => {
    const { container } = render(<TodoForm />);
    const labelElement = container.querySelector('label');
    expect(labelElement).toBeInTheDocument();
  });

  it('contains an input', () => {
    const { container } = render(<TodoForm />);
    const inputElement = container.querySelector('input');
    expect(inputElement).toBeInTheDocument();
  });

  it('input is correctly labeled for accessibility', () => {
    render(<TodoForm />);
    const inputElement = screen.getByLabelText('Enter new task');
    expect(inputElement).toHaveAttribute('id', 'todo-input');
  });

  it('input is focusable', () => {
    render(<TodoForm />);
    const inputElement = screen.getByRole('textbox');
    //simulate the user action of focusing
    inputElement.focus();
    //then check it is focused
    expect(inputElement).toHaveFocus();
  });

  it('contains a button', () => {
    const { container } = render(<TodoForm />);
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders a submit button that can be clicked', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);
    const button = screen.getByRole('button', { name: '+' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
    await user.click(button);
  });

  it('form can submit (calls handleSubmit) and clears input', () => {
    render(<TodoForm />);

    const inputElement = screen.getByRole('textbox', { name: 'Enter new task' });
    const submitButton = screen.getByRole('button', { name: '+' });

    fireEvent.change(inputElement, { target: { value: 'Task to be cleared' } });
    expect(inputElement).toHaveValue('Task to be cleared');

    fireEvent.click(submitButton);
    expect(inputElement).toHaveValue('');
  });
});
