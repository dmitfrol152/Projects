import { FC } from "react";
import styles from "./FormTextarea.module.scss";
import { FormTextareaProps } from "./types";

export const FormTextarea: FC<FormTextareaProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  errors,
  require = true,
  rows,
  cols,
  ...props
}) => {
  return (
    <div className={styles.customTextarea}>
      <label className={styles.customTextarea__label} htmlFor={id}>
        {require && <span className={styles.customTextarea__require}>*</span>}
        <span className={styles.customTextarea__text}>{label}</span>
      </label>
      <textarea
        className={
          error
            ? `${styles.customTextarea__field} ${styles.customTextarea__fieldError}`
            : styles.customTextarea__field
        }
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
        {...props}
      />
      {errors && <span className={styles.customTextarea__error}>{errors}</span>}
    </div>
  );
};

export default FormTextarea;
