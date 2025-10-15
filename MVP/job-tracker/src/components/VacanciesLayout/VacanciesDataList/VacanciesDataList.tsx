import type { VacanciesDataListProps } from "./types";
import { VacanciesDataItem } from "@components/VacanciesLayout/VacanciesDataItem";
import type { DataProps } from "@components/VacanciesLayout/VacanciesDataItem/types";
import { VacanciesPagination } from "@components/VacanciesLayout/VacanciesPagination";

export function VacanciesDataList({
  dataList,
  pages,
  page,
  handleBackPage,
  handleNextPage,
  paginationModel,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: VacanciesDataListProps) {
  return (
    <div className="flex flex-col gap-3 grow justify-between">
      <ul className="flex flex-col gap-3">
        {dataList.map((vacancy: DataProps) => {
          return <VacanciesDataItem key={vacancy.id} vacancy={vacancy} />;
        })}
      </ul>

      <VacanciesPagination
        page={page}
        pages={pages}
        handleBackPage={handleBackPage}
        handleNextPage={handleNextPage}
        paginationModel={paginationModel}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}
