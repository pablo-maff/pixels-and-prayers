import { Input } from '@components/Input/Input';
import { type FormEvent } from 'react';
import { Button } from '@components/Button/Button';
import style from "./TodoForm.module.scss"

export function TodoForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      <Button type='submit'>+</Button>
    </form>
  );
}
