import { useState, type FC } from "react";
import type { IAddTask } from "./types";
import styles from "./TodosInput.module.scss";

export const TodosInput: FC<IAddTask> = ({ addTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      addTask(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="What needs to be done?"
        className={styles.todosInput}
        data-testid="test-id"
      />
    </form>
  );
};

export default TodosInput;
