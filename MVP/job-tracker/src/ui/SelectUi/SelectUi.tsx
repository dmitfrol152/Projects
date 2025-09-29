import type { SelectProps } from "./types";

export function SelectUi({
  label,
  options,
  error,
  value,
  setValue,
  ...props
}: SelectProps) {
  const classInputName = "border p-2 rounded";

  return (
    <div className="flex flex-col gap-3">
      {label && <label htmlFor={label}>{label}</label>}
      <select
        className={classInputName}
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
