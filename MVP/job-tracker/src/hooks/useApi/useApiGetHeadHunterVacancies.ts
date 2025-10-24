import { fetchHeadHunterVacancies } from "@/api/HeadHunterApi/HeadHunterApi";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { usePaginationSetting } from "../useProfileManager/usePaginationSetting/usePaginationSetting";
import { useEffect, useState } from "react";

export function useApiGetHeadHunterVacancies(
  query: string,
  page: number,
  perpage: number,
  salary?: number | null,
  experience?: string,
  orderBy?: string,
  city?: string
) {
  const { paginationModel } = usePaginationSetting();
  const [paginationModelLocal, setPaginationModelLocal] =
    useState<string>(paginationModel);

  useEffect(() => {
    setPaginationModelLocal(paginationModel);
  }, [paginationModel]);

  const getVacanciesButtons = useQuery({
    queryFn: () =>
      fetchHeadHunterVacancies(
        query,
        page,
        perpage,
        salary,
        experience,
        orderBy,
        city
      ),
    queryKey: ["hh_vacancies", query, page, salary, experience, orderBy, city],
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });

  const getVacanciesScroll = useInfiniteQuery({
    queryKey: [
      "hh_vacancies_infinity",
      query,
      salary,
      experience,
      orderBy,
      city,
    ],
    queryFn: ({ pageParam = 1 }) =>
      fetchHeadHunterVacancies(
        query,
        pageParam,
        perpage,
        salary,
        experience,
        orderBy,
        city
      ),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => {
      const currentPage = firstPage?.page ?? 0;
      return currentPage > 0 ? currentPage - 1 : undefined;
    },
    getNextPageParam: (lastPage) => {
      const lastPageNumber = lastPage?.page ?? 0;
      const totalPages = lastPage?.pages ?? 0;
      return lastPageNumber < totalPages - 1 ? lastPageNumber + 1 : undefined;
    },
  });

  const data =
    paginationModelLocal === "buttons"
      ? getVacanciesButtons.data
      : getVacanciesScroll.data;

  return {
    data,
    isLoading: getVacanciesButtons.isLoading || getVacanciesScroll.isLoading,
    isError: getVacanciesButtons.isError || getVacanciesScroll.isError,
    isSuccess: getVacanciesButtons.isSuccess || getVacanciesScroll.isSuccess,
    refetch: getVacanciesButtons.refetch || getVacanciesScroll.refetch,
    fetchNextPage: getVacanciesScroll.fetchNextPage,
    fetchPreviousPage: getVacanciesScroll.fetchPreviousPage,
    hasNextPage: getVacanciesScroll.hasNextPage,
    hasPreviousPage: getVacanciesScroll.hasPreviousPage,
    isFetchingNextPage: getVacanciesScroll.isFetchingNextPage,
    paginationModel,
  };
}
