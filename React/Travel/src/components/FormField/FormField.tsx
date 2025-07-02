import { FC } from "react";
import styles from "./FormField.module.scss";
import { FormFieldProps } from "./types";

export const FormField: FC<FormFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  errors,
  require = true,
  ...props
}) => {
  return (
    <div className={styles.customInput}>
      <label className={styles.customInput__label} htmlFor={id}>
        {require && <span className={styles.customInput__require}>*</span>}
        <span className={styles.customInput__text}>{label}</span>
      </label>
      <input
        className={
          error
            ? `${styles.customInput__field} ${styles.customInput__fieldError}`
            : styles.customInput__field
        }
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {errors && <span className={styles.customInput__error}>{errors}</span>}
    </div>
  );
};

export default FormField;
