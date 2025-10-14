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

      {paginationModel === "buttons" && (
        <div className="flex justify-between min-h-9">
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
      )}

      {paginationModel === "scroll" && (
        <div className="flex justify-center min-h-9">
          {isFetchingNextPage ? (
            <p className="text-center text-[var(--color-gray-700)]">
              Loading...
            </p>
          ) : (
            <ButtonUi
              type="button"
              variant="primary"
              size="md"
              disabled={!hasNextPage}
              handleClickButton={fetchNextPage}
            >
              Load more
            </ButtonUi>
          )}
        </div>
      )}
    </div>
  );
}
