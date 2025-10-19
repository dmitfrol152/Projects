import clsx from "clsx";
import styles from "./LinkUi.module.scss";
import { Link } from "react-router";
import { type LinkProps } from "./types";

export function LinkUi({ to, variant, children, target, active }: LinkProps) {
  const linkClasses = clsx(
    styles.link,
    {
      [styles.primary]: variant === "primary",
      [styles.secondary]: variant === "secondary",
      [styles.social]: variant === "social",
      [styles.small]: variant === "small",
      [styles.search]: variant === "search",
      [styles.card]: variant === "card",
    },
    {
      [styles.isActive]: active,
    }
  );

  return (
    <Link className={linkClasses} to={to} target={target}>
      {children}
    </Link>
  );
}
