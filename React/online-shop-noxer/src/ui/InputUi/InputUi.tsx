import type { InputProps } from "./types";
import styles from "./InputUi.module.scss";
import IconSearch from "@assets/images/svg/icon-search.svg?react";

export function InputUi({
  label,
  type,
  placeholder,
  value,
  setValue,
  onFocus,
  onBlur,
}: InputProps) {
  return (
    <div className={styles.input}>
      {label && <label htmlFor={label}>{label}</label>}{" "}
      <div>
        <input
          className={styles.input__field}
          id={label}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <IconSearch className={styles.input__icon} />
      </div>
    </div>
  );
}
