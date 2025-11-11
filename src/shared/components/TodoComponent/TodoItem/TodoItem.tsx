import style from './TodoItem.module.scss';
import { Button } from '@components/Button/Button';

export interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

export function TodoItem({ item }: { item: TodoItemProps }) {
  return (
    <li id={item?.id} className={style.todo_item}>
      <button className={style.todo_items_left}>
        <svg>
          <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
        </svg>
        <p>{item?.title}</p>
      </button>

      <div className={style.todo_items_right}>
        <Button size="sm">Modify</Button>
        <Button size="sm">Delete</Button>
      </div>
    </li>
  );
}
