import { ButtonUi } from "@/ui/ButtonUi";
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
}
