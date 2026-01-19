import { ButtonUi } from "@shared/ui/ButtonUi";
import type { VacanciesFetchErrorProps } from "./types";
import { useTranslation } from "react-i18next";

export function VacanciesFetchError({
  handleRefetch,
}: VacanciesFetchErrorProps) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col gap-3 items-center">
      <p>{t("errorFetchVacanciesHh")}</p>
      <ButtonUi
        type="button"
        variant="primary"
        size="md"
        handleClickButton={handleRefetch}
      >
        {t("refetch")}
      </ButtonUi>
    </div>
  );
}
