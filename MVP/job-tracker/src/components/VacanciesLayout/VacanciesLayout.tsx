import type { VacanciesLayoutProps } from "./types.ts";

export function VacanciesLayout({
  title,
  paragraph,
  input,
  formFilters,
  loadingVacancies,
  isError,
  errorFecthVacancies,
  isSuccess,
  dataFound,
  data,
  pagination,
  isEmpty,
  emptyVacancies,
  buttonTop,
  isVisibleButtonTop,
  loadingAddJob,
  modal,
}: VacanciesLayoutProps) {
  const loadingContainer = (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-100 bg-[var(--color-black-05)]">
      Loading...
    </div>
  );

  return (
    <div className="flex flex-col gap-3 grow">
      {title}
      {paragraph}
      {input}
      <div className="flex flex-col gap-3 bg-[var(--color-white-modify)] p-8 rounded-lg shadow-md w-full">
        {formFilters}
      </div>
      {(loadingVacancies || loadingAddJob) && loadingContainer}
      {isError && errorFecthVacancies}
      {isSuccess && (
        <div className="flex flex-col gap-3 grow justify-between">
          <span className="flex justify-center gap-1">
            <span className="font-semibold">Founded:</span>
            <span className="text-[var(--color-gray-800)]">{dataFound}</span>
          </span>
          {data}
          {pagination}
        </div>
      )}
      {isEmpty && emptyVacancies}
      {isVisibleButtonTop && buttonTop}
      {modal}
    </div>
  );
}
