import type { FC } from "react";
import type { IFilter } from "./types";
import styles from "./TodosFilter.module.scss";

export const TodosFilter: FC<IFilter> = ({ filter, setFilter }) => {
  return (
    <div className={styles.todosFilter}>
      <button
        onClick={() => setFilter("all")}
        className={
          filter === "all"
            ? `${styles.todosFilter__btn} ${styles.todosFilter__btnActive}`
            : `${styles.todosFilter__btn}`
        }
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        className={
          filter === "active"
            ? `${styles.todosFilter__btn} ${styles.todosFilter__btnActive}`
            : `${styles.todosFilter__btn}`
        }
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={
          filter === "completed"
            ? `${styles.todosFilter__btn} ${styles.todosFilter__btnActive}`
            : `${styles.todosFilter__btn}`
        }
      >
        Completed
      </button>
    </div>
  );
};

export default TodosFilter;
