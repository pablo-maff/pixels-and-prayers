import { TodoForm } from './TodoForm/TodoForm';
import { TodoList } from './TodoList/TodoList';
import { useState } from 'react';
import type { TodoItemProps } from './TodoItem/TodoItem';
import style from './TodoComponent.module.scss';

export function TodoComponent() {
  const [todos, setTodos] = useState<TodoItemProps[]>([]);
  return (
    <div className={style.todo_component}>
      <TodoForm setTodos={setTodos} />
      <TodoList todos={todos} />
    </div>
  );
}
