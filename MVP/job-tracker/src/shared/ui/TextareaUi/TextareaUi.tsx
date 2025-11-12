import clsx from "clsx";
import type { TextareaProps } from "./types";

export function TextareaUi({
  label,
  error,
  rows,
  placeholder,
  ...props
}: TextareaProps) {
  const classTextareaName = clsx(
    "transition-colors border rounded-lg px-4 py-2 focus:outline-none",
    error
      ? "border-[var(--color-danger)] focus:border-[var(--color-danger)] hover:border-[var(--color-danger)]"
      : "border-[var(--color-black)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
  );

  return (
    <div className="flex flex-col gap-3">
      {label && <label htmlFor={label}>{label}</label>}
      <textarea
        className={classTextareaName}
        rows={rows}
        placeholder={placeholder}
        {...props}
      />
      {error && <span className="text-[var(--color-danger)]">{error}</span>}
    </div>
  );
}
