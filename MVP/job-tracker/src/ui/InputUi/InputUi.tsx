import clsx from "clsx";
import type { InputProps } from "./types";

export function InputUi({
  label,
  type,
  placeholder,
  error,
  value,
  setValue,
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
        value={value}
        onChange={
          setValue ? (event) => setValue(event.target.value) : undefined
        }
        {...props}
      />
      {error && <span className="text-[var(--color-danger)]">{error}</span>}
    </div>
  );
}
