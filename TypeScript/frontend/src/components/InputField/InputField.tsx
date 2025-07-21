import type { FC } from "react";
import type { FormFieldProps } from "./types";
import styles from "./InputField.module.scss";

export const InputField: FC<FormFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  errors,
  ...props
}) => {
  return (
    <div className={styles.inputField}>
      <label className="visually-hidden" htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.inputField__field}
        id={id}
        type={type}
        placeholder={placeholder}
        {...props}
      />
      {errors ? (
        <span className={styles.inputField__error}>{errors}</span>
      ) : null}
    </div>
  );
};

export default InputField;
