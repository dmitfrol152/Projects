import clsx from "clsx";
import type { ButtonProps } from "./types";
import { memo } from "react";

export const ButtonUi = memo(function Button({
  className,
  type,
  handleClickButton,
  children,
  size,
  variant,
  disabled = false,
}: ButtonProps) {
  const classButton = clsx(
    "font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
    {
      md: "px-4 py-2 rounded text-base leading-[1.2] min-h-10.5 w-max",
      lg: "px-4 py-2 rounded text-lg leading-[1.2] min-h-10.5 w-max",
      icon: "w-9 h-9 flex items-center justify-center rounded",
      tg: "",
    }[size],
    {
      primary:
        "bg-[var(--color-primary)] text-[var(--color-white-pernamently)] hover:bg-[var(--color-primary-hover)]",
      secondary:
        "bg-[var(--color-secondary)] text-[--color-gray-700] hover:bg-[var(--color-secondary-hover)]",
      exit: "bg-[var(--color-danger)] text-[var(--color-white-pernamently)] hover:bg-[var(--color-danger-hover)]",
      icon: "",
      tg: "text-[var(--color-gray-600)] hover:text-[var(--color-primary-hover)]",
    }[variant],
    className,
  );

  return (
    <button
      className={classButton}
      type={type}
      onClick={handleClickButton}
      disabled={disabled}
    >
      {children}
    </button>
  );
});
