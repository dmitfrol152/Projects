import type { VacanciesDataListProps } from "./types";
import { VacanciesDataItem } from "@features/vacancies/ui/VacanciesDataList/VacanciesDataItem";
import type { DataProps } from "@features/vacancies/ui/VacanciesDataList/VacanciesDataItem/types";

export function VacanciesDataList({
  dataList,
  handleSubmitNewFormDashboard,
}: VacanciesDataListProps) {
  return (
    <div className="flex flex-col gap-3 grow justify-between">
      <ul className="flex flex-col gap-3">
        {dataList.map((vacancy: DataProps) => {
          return (
            <VacanciesDataItem
              key={vacancy.id}
              vacancy={vacancy}
              handleSubmitNewFormDashboard={handleSubmitNewFormDashboard}
            />
          );
        })}
      </ul>
    </div>
  );
}
