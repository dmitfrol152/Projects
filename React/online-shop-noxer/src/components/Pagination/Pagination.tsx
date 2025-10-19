import { ButtonUi } from "@/ui/ButtonUi";
import type { PaginationProps } from "./tyes";
import styles from "./Pagination.module.scss";

export function Pagination({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: PaginationProps) {
  if (hasNextPage && isFetchingNextPage) {
    return (
      <ButtonUi
        type="button"
        variant="primary"
        size="primary"
        disabled={isFetchingNextPage}
        onClick={fetchNextPage}
      >
        Загрузка...
      </ButtonUi>
    );
  }

  if (hasNextPage && !isFetchingNextPage) {
    return (
      <div className={styles.pagination__button}>
        <ButtonUi
          type="button"
          variant="secondary"
          size="secondary"
          disabled={!hasNextPage}
          onClick={fetchNextPage}
        >
          Загрузить еще
        </ButtonUi>
      </div>
    );
  }

  return null;
}
