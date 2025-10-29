import { useState } from "react";
import { TodosFilter, TodosInput, TodosList } from "./components";
import type { ITodosList, TodosFilterType } from "./types";
import "/src/styles/styles.scss";
import styles from "./App.module.scss";

export function App() {
  const [todosList, setTodosList] = useState<ITodosList[]>([]);
  const [todosFilterValue, setTodosFilterValue] =
    useState<TodosFilterType>("all");

  const addTask = (todoText: string) => {
    setTodosList([
      ...todosList,
      { id: Date.now(), text: todoText, completed: false },
    ]);
  };

  const todosFilter = todosList.filter((todo) => {
    if (todosFilterValue === "all") {
      return todo;
    }
    if (todosFilterValue === "active") {
      return !todo.completed;
    }
    if (todosFilterValue === "completed") {
      return todo.completed;
    }
  });

  const todosToggle = (id: number) => {
    setTodosList(
      todosList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodosList(todosList.filter((todo) => !todo.completed));
  };

  const itemsLeft = todosList.filter((todo) => !todo.completed).length;

  return (
    <section className={styles.app}>
      <div className="container">
        <div className={styles.app__wrapper}>
          <h1 className={styles.app__title}>todos</h1>
          <TodosInput addTask={addTask} />
          <TodosList todos={todosFilter} onToggle={todosToggle} />
          <div className={styles.app__btns}>
            <span className={styles.app__btnsInfo}>{itemsLeft} items left</span>
            <TodosFilter
              filter={todosFilterValue}
              setFilter={setTodosFilterValue}
            />
            <button onClick={clearCompleted} className={styles.app__btnsBtn}>
              Clear completed
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
