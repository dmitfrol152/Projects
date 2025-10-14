import type { VacanciesInputProps } from "./types";
import { InputUi } from "@/ui/InputUi";

export function VacanciesInput({ query, setQuery }: VacanciesInputProps) {
  return (
    <InputUi
      label="Search"
      type="text"
      value={query}
      setValue={setQuery}
      placeholder="Enter your query (company or profession)..."
    />
  );
}
