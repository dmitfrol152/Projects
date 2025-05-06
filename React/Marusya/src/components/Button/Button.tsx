import { FC } from "react";
import { IButtonProps } from "./types";
import styles from "./Button.module.scss";
import { ClipLoader } from "react-spinners";

export const Button: FC<IButtonProps> = ({
  type,
  title,
  onClick,
  isLoading,
  isDisabled,
  variant,
  size,
  visible,
  active,
}) => {
  return (
    <button
      className={`${styles.button} ${visible ? styles.visibles : ""} ${
        active ? styles.active : ""
      }`}
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      data-variant={variant}
      data-size={size}
    >
      {isLoading ? <ClipLoader color="#dc5dfc" size={24} /> : title}
    </button>
  );
};
