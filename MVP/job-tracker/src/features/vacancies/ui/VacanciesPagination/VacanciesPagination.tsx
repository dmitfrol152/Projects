import { ButtonUi } from "@shared/ui/ButtonUi";
import type { VacanciesPaginationProps } from "./types";

export function VacanciesPagination({
  paginationModel,
  page,
  pages,
  handleBackPage,
  handleNextPage,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  handleToStartPage,
  handleToEndPage,
}: VacanciesPaginationProps) {
  if (paginationModel === "buttons") {
    return (
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
        <div className="flex items-center gap-3">
          <ButtonUi
            type="button"
            variant="primary"
            size="md"
            disabled={page === 0}
            handleClickButton={handleToStartPage}
          >
            1
          </ButtonUi>
          <span className="text-[var(--color-gray-600)]">{page + 1}</span>
          <ButtonUi
            type="button"
            variant="primary"
            size="md"
            disabled={page + 1 === pages}
            handleClickButton={handleToEndPage}
          >
            {pages}
          </ButtonUi>
        </div>
        <ButtonUi
          type="button"
          variant="primary"
          size="md"
          disabled={page + 1 === pages}
          handleClickButton={handleNextPage}
        >
          Next
        </ButtonUi>
      </div>
    );
  }

  if (paginationModel === "scroll") {
    return (
      <div className="flex justify-center min-h-9">
        {isFetchingNextPage ? (
          <p className="text-center text-[var(--color-gray-700)]">Loading...</p>
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
    );
  }

  return null;
}
