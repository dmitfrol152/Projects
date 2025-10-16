import clsx from "clsx";
import type { FormProps } from "./types";

export function Form({
  children,
  onSubmit,
  className,
  buttons,
  buttonsSecondary,
  error,
}: FormProps) {
  const formClasses = clsx("relative gap-3 flex flex-col grow justify-between");
  const buttonsClasses = "flex items-center gap-3";
  const buttonsOAuthClasses = "flex items-end justify-between min-h-10";
  const errorClasses =
    "absolute -top-6 left-[50%] translate-x-[-50%] text-[var(--color-danger)]";

  return (
    <form onSubmit={onSubmit} className={formClasses}>
      <div className={className ? className : "gap-3 flex flex-col"}>
        {error && <div className={errorClasses}>{error}</div>}
        {children}
      </div>
      <div className={buttonsOAuthClasses}>
        <div className={buttonsClasses}>{buttons}</div>
        <div className={buttonsClasses}>{buttonsSecondary}</div>
      </div>
    </form>
  );
}
