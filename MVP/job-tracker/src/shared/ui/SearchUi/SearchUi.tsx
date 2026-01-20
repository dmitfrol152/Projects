import clsx from "clsx";
import type { SearchUiProps } from "./types";

export function SearchUi({
  placeholder,
  value,
  setQuery,
  className,
}: SearchUiProps) {
  return (
    <div className="flex flex-col gap-3">
      <input
        name="search"
        className={clsx(
          "transition-colors border rounded px-4 py-2 focus:outline-none border-[var(--color-black)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]",
          className ? className : "",
        )}
        type="search"
        value={value}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
