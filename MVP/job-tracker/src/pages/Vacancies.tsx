import { VacanciesLayout } from "@/components/VacanciesLayout";
import { VacanciesDataList } from "@/components/VacanciesLayout/VacanciesDataList";
import { VacanciesEmpty } from "@/components/VacanciesLayout/VacanciesEmpty";
import { VacanciesFetchError } from "@/components/VacanciesLayout/VacanciesFetchError";
import { VacanciesInput } from "@/components/VacanciesLayout/VacanciesInput";
import { VacanciesParagraph } from "@/components/VacanciesLayout/VacanciesParagraph";
import { VacanciesTitle } from "@/components/VacanciesLayout/VacanciesTitle";
import { useApiGetHeadHunterVacancies } from "@/hooks/useApi/useApiGetHeadHunterVacancies";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export default function Vacancies() {
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const debounceQuery = useDebounce(query, 1000);
  const { data, isLoading, refetch, isError, isSuccess } =
    useApiGetHeadHunterVacancies(debounceQuery, page);

  useEffect(() => {
    if (data) {
      setPages(data.pages);
    }
  }, [data]);

  function handleRefetch() {
    refetch();
  }

  function handleClearSearchField() {
    setQuery("");
  }

  function handleBackPage() {
    setPage((prev) => Math.max(prev - 1, 0));
  }

  function handleNextPage() {
    setPage((prev) => prev + 1);
  }

  return (
    <VacanciesLayout
      title={<VacanciesTitle />}
      paragraph={<VacanciesParagraph />}
      input={
        <VacanciesInput
          query={query}
          setQuery={setQuery}
          handleClearSearchField={handleClearSearchField}
        />
      }
      loadingVacancies={isLoading}
      isError={!!isError}
      errorFecthVacancies={
        <VacanciesFetchError handleRefetch={handleRefetch} />
      }
      isSuccess={!!isSuccess}
      data={
        <VacanciesDataList
          dataList={data?.items || []}
          page={page}
          pages={pages}
          handleBackPage={handleBackPage}
          handleNextPage={handleNextPage}
        />
      }
      isEmpty={!query}
      emptyVacancies={<VacanciesEmpty />}
    />
  );
}
