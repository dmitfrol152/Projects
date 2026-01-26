import styles from "./TextInput.module.scss";
import clsx from "clsx";
import type { TextInputProps } from "./types";

const TextInput = ({
  type = "button",
  placeholder,
  value,
  onChange,
}: TextInputProps) => {
  return (
    <div className={styles.textInput}>
      <div className={styles.textInput__inner}>
        <input
          type={type}
          placeholder={placeholder}
          className={clsx(styles.textInput__input)}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TextInput;
