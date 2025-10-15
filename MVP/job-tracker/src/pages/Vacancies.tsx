import { VacanciesLayout } from "@/components/VacanciesLayout";
import { VacanciesButtonTop } from "@/components/VacanciesLayout/VacanciesButtonTop/VacanciesButtonTop";
import type { DataScrollProps } from "@/components/VacanciesLayout/VacanciesDataItem/types";
import { VacanciesDataList } from "@/components/VacanciesLayout/VacanciesDataList";
import { VacanciesEmpty } from "@/components/VacanciesLayout/VacanciesEmpty";
import { VacanciesFetchError } from "@/components/VacanciesLayout/VacanciesFetchError";
import { VacanciesInput } from "@/components/VacanciesLayout/VacanciesInput";
import { VacanciesPagination } from "@/components/VacanciesLayout/VacanciesPagination";
import { VacanciesParagraph } from "@/components/VacanciesLayout/VacanciesParagraph";
import { VacanciesTitle } from "@/components/VacanciesLayout/VacanciesTitle";
import { useApiGetHeadHunterVacancies } from "@/hooks/useApi/useApiGetHeadHunterVacancies";
import { useDebounce } from "@/hooks/useDebounce";
import { getWindowScrollTo } from "@/utils/getWindowScrollTo";
import { useEffect, useState } from "react";

export default function Vacancies() {
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [isVisibleButtonTop, setIsVisibleButtonTop] = useState<boolean>(false);
  const debounceQuery = useDebounce(query, 1000);
  const {
    data,
    isLoading,
    refetch,
    isError,
    isSuccess,
    paginationModel,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useApiGetHeadHunterVacancies(debounceQuery, page);

  useEffect(() => {
    if (data) {
      setPages(data.pages);
    }
  }, [data]);

  useEffect(() => {
    getWindowScrollTo();
  }, [debounceQuery]);

  useEffect(() => {
    if (paginationModel === "buttons" || !hasNextPage) return;

    function onScroll() {
      const heightWindow = window.innerHeight;
      const scrollYwindow = window.scrollY > heightWindow;

      setIsVisibleButtonTop(scrollYwindow);
    }

    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [hasNextPage, paginationModel]);

  function handleRefetch() {
    refetch();
  }

  function handleClearSearchField() {
    setQuery("");
  }

  function handleBackPage() {
    getWindowScrollTo();
    setPage((prev) => Math.max(prev - 1, 0));
  }

  function handleNextPage() {
    getWindowScrollTo();
    setPage((prev) => prev + 1);
  }

  function handleClickTop() {
    getWindowScrollTo();
  }

  function handleToStartPage() {
    getWindowScrollTo();
    setPage(0);
  }

  function handleToEndPage() {
    getWindowScrollTo();
    setPage(pages - 1);
  }

  function getCurrentData() {
    return (
      (paginationModel === "buttons"
        ? data?.items
        : (data?.pages || []).flatMap(
            (p: DataScrollProps) => p?.items || []
          )) || []
    );
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
      data={<VacanciesDataList dataList={getCurrentData()} />}
      pagination={
        <VacanciesPagination
          page={page}
          pages={pages}
          handleBackPage={handleBackPage}
          handleNextPage={handleNextPage}
          paginationModel={paginationModel}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          handleToStartPage={handleToStartPage}
          handleToEndPage={handleToEndPage}
        />
      }
      isEmpty={!query}
      emptyVacancies={<VacanciesEmpty />}
      buttonTop={<VacanciesButtonTop handleClickTop={handleClickTop} />}
      isVisibleButtonTop={isVisibleButtonTop}
    />
  );
}
