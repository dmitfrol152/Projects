import type { SelectProps } from "./types";

export function SelectUi({
  label,
  options,
  error,
  value,
  setValue,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-3">
      {label && <label htmlFor={label}>{label}</label>}
      <select
        className="border p-2 rounded text-[var(--color-black)] border-[var(--color-black)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)] min-h-10.5"
        value={value}
        onChange={(event) => {
          if (setValue) {
            setValue(event.target.value);
          }
        }}
        {...props}
      >
        {options.map((option, index) => {
          return (
            <option
              className="text-[var(--color-bg-pernamently)]"
              key={index}
              value={option.optionValue}
              disabled={index === 0}
            >
              {option.optionName}
            </option>
          );
        })}
      </select>
      {error && <span className="text-[var(--color-danger)]">{error}</span>}
    </div>
  );
}
