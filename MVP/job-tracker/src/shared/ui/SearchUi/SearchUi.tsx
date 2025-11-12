import type { SearchUiProps } from "./types";

export function SearchUi({ placeholder, value, setQuery }: SearchUiProps) {
  return (
    <div className="flex flex-col gap-3">
      <input
        name="search"
        className="w-75 transition-colors border rounded px-4 py-2 focus:outline-none border-[var(--color-black)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
        type="search"
        value={value}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
