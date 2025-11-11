import { TodoForm } from './TodoForm/TodoForm';
import { TodoList } from './TodoList/TodoList';
import { useState } from 'react';

export function TodoComponent() {
  const data = [
    { title: 'Some task', id: self.crypto.randomUUID(), completed: false },
    {
      title: 'Some other task',
      id: self.crypto.randomUUID(),
      completed: true,
    },
    { title: 'last task', id: self.crypto.randomUUID(), completed: false },
  ];
  const [todos, setTodos] = useState(data);
  return (
    <>
      <TodoForm/>
      <TodoList todos={todos} />
    </>
  );
}
