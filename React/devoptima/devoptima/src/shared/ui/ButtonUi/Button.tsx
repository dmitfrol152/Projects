import styles from "./Button.module.scss";
import clsx from "clsx";
import type { ButtonProps } from "./types";

const Button = ({
  variant = "primary",
  size = "small",
  type = "button",
  children,
  ...rest
}: ButtonProps) => {
  const className = clsx(styles.button, styles[variant], styles[size]);

  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
