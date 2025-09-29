import clsx from "clsx";
import type { InputProps } from "./types";

export function Input({
  label,
  type,
  placeholder,
  error,
  ...props
}: InputProps) {
  const classInputName = clsx(
    "transition-colors border rounded-lg px-4 py-2 focus:outline-none",
    error
      ? "border-[var(--color-danger)] focus:border-[var(--color-danger)] hover:border-[var(--color-danger)]"
      : "border-[var(--color-black)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
  );

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        className={classInputName}
        {...props}
      />
      {error && <span className="text-[var(--color-danger)]">{error}</span>}
    </div>
  );
}
