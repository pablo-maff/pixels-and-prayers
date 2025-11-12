import { TodoItem } from "../TodoItem/TodoItem";
import type { TodoItemProps } from "../TodoItem/TodoItem";
import style from "./TodoList.module.scss"

export function TodoList({ todos }: { todos: TodoItemProps[] }) {
  return (
    <>
      {todos && todos.length > 0 ? (
        <ul className={style.list_element}>
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
