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
    "font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-max",
    {
      md: "px-4 py-2 rounded text-base leading-[1.2] min-h-10.5",
      lg: "px-4 py-2 rounded text-lg leading-[1.2] min-h-10.5",
      icon: "px-1 py-1",
    }[size],
    {
      primary:
        "bg-[var(--color-primary)] text-[var(--color-white-pernamently)] hover:bg-[var(--color-primary-hover)]",
      secondary:
        "bg-[var(--color-secondary)] text-[--color-gray-700] hover:bg-[var(--color-secondary-hover)]",
      exit: "bg-[var(--color-danger)] text-[var(--color-white-pernamently)] hover:bg-[var(--color-danger-hover)]",
      icon: "",
    }[variant],
    className
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
