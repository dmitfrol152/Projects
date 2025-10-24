import { ButtonUi } from "@/ui/ButtonUi";
import type { VacanciesInputProps } from "./types";
import { InputUi } from "@/ui/InputUi";
import IconClose from "@assets/svg/icon-close-x.svg?react";

export function VacanciesInput({
  query,
  setQuery,
  handleClearSearchField,
}: VacanciesInputProps) {
  return (
    <div className="relative">
      <InputUi
        label="Search"
        type="text"
        value={query}
        setValue={setQuery}
        placeholder="Enter your query (position or company)..."
      />
      {query && (
        <ButtonUi
          className="absolute bottom-2 right-4 hover:text-[var(--color-primary-hover)]"
          type="button"
          variant="icon"
          size="icon"
          handleClickButton={handleClearSearchField}
        >
          <IconClose className="w-5 h-5" />
        </ButtonUi>
      )}
    </div>
  );
}
