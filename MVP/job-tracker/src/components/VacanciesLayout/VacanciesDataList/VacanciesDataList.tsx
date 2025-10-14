import { ButtonUi } from "@/ui/ButtonUi";
import type { VacanciesDataListProps } from "./types";
import { VacanciesDataItem } from "../VacanciesDataItem";
import type { DataProps } from "../VacanciesDataItem/types";

export function VacanciesDataList({
  dataList,
  pages,
  page,
  handleBackPage,
  handleNextPage,
}: VacanciesDataListProps) {
  return (
    <div className="flex flex-col gap-3 grow justify-between">
      <ul className="flex flex-col gap-3">
        {dataList.map((vacancy: DataProps) => {
          return <VacanciesDataItem key={vacancy.id} vacancy={vacancy} />;
        })}
      </ul>

      <div className="flex justify-between">
        <ButtonUi
          type="button"
          variant="primary"
          size="md"
          disabled={page === 0}
          handleClickButton={handleBackPage}
        >
          Back
        </ButtonUi>
        <ButtonUi
          type="button"
          variant="primary"
          size="md"
          disabled={page === pages}
          handleClickButton={handleNextPage}
        >
          Next
        </ButtonUi>
      </div>
    </div>
  );
}
