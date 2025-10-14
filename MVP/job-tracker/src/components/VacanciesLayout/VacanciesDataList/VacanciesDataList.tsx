import { ButtonUi } from "@/ui/ButtonUi";
import type { DataProps, VacanciesDataListProps } from "./types";

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
          return (
            <li key={vacancy.id} className="p-4 border rounded shadow-sm">
              <h2 className="font-semibold">{vacancy.name}</h2>
              <div className="flex flex-col gap">
                <span>City: {vacancy.area.name}</span>
                <span>Employer: {vacancy.employer.name}</span>
                <span>Published: {vacancy.published_at}</span>
              </div>
              <a href={vacancy.alternate_url} target="_blank">
                Open vacancy
              </a>
            </li>
          );
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
