import { TodoItem } from "../TodoItem/TodoItem";
import type { TodoItemProps } from "../TodoItem/TodoItem";

export function TodoList({ todos }: { todos: TodoItemProps[] }) {
  return (
    <>
      {todos && todos.length > 0 ? (
        <ul>
          {todos.map((item) => (
            <TodoItem item={item} key={item.id}/>
          ))}
        </ul>
      ) : (
        <p>What are you up to?</p>
      )}
    </>
  );
}
