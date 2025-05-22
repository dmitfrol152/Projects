import type { FC } from "react";
import type { TodosType } from "./types";
import styles from "./TodosList.module.scss";

export const TodosList: FC<TodosType> = ({ todos, onToggle }) => {
  return (
    <ul className={styles.todosList}>
      {todos.map((todo) => (
        <li key={todo.id} className={styles.todosList__item}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span
            className={
              todo.completed
                ? `${styles.todosList__text} ${styles.todosList__textDone}`
                : `${styles.todosList__text}`
            }
          >
            {todo.text}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodosList;
