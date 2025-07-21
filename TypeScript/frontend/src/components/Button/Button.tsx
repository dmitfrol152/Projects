import type { FC } from "react";
import styles from "./Button.module.scss";
import type { ButtonProps } from "./types";
import { ScaleLoader } from "react-spinners";

export const Button: FC<ButtonProps> = ({
  title,
  type,
  variant,
  size,
  onClick,
  isLoading = false,
  isDisable = false,
  isActive = false,
}) => {
  return (
    <div className={styles.button}>
      <button
        className={
          !isActive
            ? styles.button__element
            : `${styles.button__element} ${styles.active}`
        }
        type={type}
        data-variant={variant}
        data-size={size}
        onClick={onClick}
        disabled={isDisable || isLoading}
      >
        {isLoading ? <ScaleLoader color="#FC6D3E" /> : title}
      </button>
    </div>
  );
};

export default Button;
