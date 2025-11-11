import { Input } from '@components/Input/Input';
import { type FormEvent, type Dispatch, type SetStateAction } from 'react';
import { Button } from '@components/Button/Button';
import style from './TodoForm.module.scss';
import type { TodoItemProps } from '../TodoItem/TodoItem';

interface TodoFormProps {
  setTodos: Dispatch<SetStateAction<TodoItemProps[]>>;
}

export function TodoForm({ setTodos }: TodoFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as typeof event.target & {
      'todo-input': { value: string };
    };

    const value = form['todo-input'].value;

    setTodos((prevTodos) => [
      {
        title: value,
        id: self.crypto.randomUUID(),
        completed: false,
      },
      ...prevTodos,
    ]);
    (event.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} className={style.formSubmit}>
      <label htmlFor="todo-input">
        <Input
          type="text"
          name="todo-input"
          id="todo-input"
          aria-label="Enter new task"
          placeholder="Write your next task"
        />
      </label>
      <Button type="submit">+</Button>
    </form>
  );
}
