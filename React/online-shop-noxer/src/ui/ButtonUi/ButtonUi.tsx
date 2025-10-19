import styles from "./ButtonsUi.module.scss";
import type { ButtonProps } from "./types";

export function ButtonUi({
  type,
  variant,
  size,
  onClick,
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </button>
  );
}
