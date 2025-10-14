import { ButtonUi } from "@/ui/ButtonUi";
import type { VacanciesFetchErrorProps } from "./types";

export function VacanciesFetchError({
  handleRefetch,
}: VacanciesFetchErrorProps) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <p>Error fetch vacancies of hh.ru. Can try again.</p>
      <ButtonUi
        type="button"
        variant="primary"
        size="md"
        handleClickButton={handleRefetch}
      >
        Refetch
      </ButtonUi>
    </div>
  );
}
