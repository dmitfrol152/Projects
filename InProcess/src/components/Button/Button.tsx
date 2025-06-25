import { FC } from "react";
import { ButtonProps } from "./types";
import styles from "./Button.module.scss";
import { PulseLoader } from "react-spinners";

export const Button: FC<ButtonProps> = ({
  title,
  type,
  variant,
  size,
  onClick,
  isLoading,
  isDisable,
}) => {
  return (
    <div className={styles.button}>
      <button
        className={styles.button__element}
        type={type}
        data-variant={variant}
        data-size={size}
        onClick={onClick}
        disabled={isDisable || isLoading}
      >
        {isLoading ? <PulseLoader size={9} color="#ffa902" /> : title}
      </button>
    </div>
  );
};

export default Button;
