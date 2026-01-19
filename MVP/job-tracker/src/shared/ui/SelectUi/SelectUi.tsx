import clsx from "clsx";
import type { SelectProps } from "./types";
import { useTranslation } from "react-i18next";

export function SelectUi({
  label,
  options,
  error,
  value,
  setValue,
  translation,
  ...props
}: SelectProps) {
  const { t: tDashboard } = useTranslation("dashboard");
  const { t: tHh } = useTranslation("hh");

  return (
    <div className="flex flex-col gap-3">
      {label && <label htmlFor={label}>{label}</label>}
      <select
        className={clsx(
          "border p-2 rounded text-[var(--color-black)] min-h-10.5",
          error
            ? "border-[var(--color-danger)] focus:border-[var(--color-danger)] hover:border-[var(--color-danger)]"
            : "border-[var(--color-black)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
        )}
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
              {translation === "dashboard"
                ? tDashboard(option.optionName)
                : translation === "hh"
                ? tHh(option.optionName)
                : option.optionName}
            </option>
          );
        })}
      </select>
      {error && <span className="text-[var(--color-danger)]">{error}</span>}
    </div>
  );
}
