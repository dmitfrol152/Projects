import type { VacanciesLayoutProps } from "./types.ts";

export function VacanciesLayout({
  title,
  paragraph,
  input,
  loadingVacancies,
  isError,
  errorFecthVacancies,
  isSuccess,
  data,
  pagination,
  isEmpty,
  emptyVacancies,
  buttonTop,
  isVisibleButtonTop,
}: VacanciesLayoutProps) {
  const loadingContainer = (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-2 bg-[var(--color-black-05)]">
      Loading...
    </div>
  );

  return (
    <div className="flex flex-col gap-3 grow">
      {title}
      {paragraph}
      {input}
      {loadingVacancies && loadingContainer}
      {isError && errorFecthVacancies}
      {isSuccess && (
        <div className="flex flex-col gap-3 grow justify-between">
          {data}
          {pagination}
        </div>
      )}
      {isEmpty && emptyVacancies}
      {isVisibleButtonTop && buttonTop}
    </div>
  );
}
