import { ButtonUi } from "@shared/ui/ButtonUi";
import type { VacanciesInputProps } from "./types";
import { InputUi } from "@shared/ui/InputUi";
import IconClose from "@shared/assets/svg/icon-close-x.svg?react";
import { useTranslation } from "react-i18next";

export function VacanciesInput({
  query,
  setQuery,
  handleClearSearchField,
}: VacanciesInputProps) {
  const { t } = useTranslation("hh");

  return (
    <div className="relative">
      <InputUi
        label={t("hhFormLabelSearch")}
        type="text"
        value={query}
        setValue={setQuery}
        placeholder={t("hhFormPlaceholderSearch")}
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
