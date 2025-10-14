import { fetchHeadHunterVacancies } from "@/api/HeadHunterApi/HeadHunterApi";
import { useQuery } from "@tanstack/react-query";

export function useApiGetHeadHunterVacancies(
  query: string,
  page: number,
  perpage: number = 10
) {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => fetchHeadHunterVacancies(query, page, perpage),
    queryKey: ["hh_vacancies", query, page],
    enabled: !!query,
    staleTime: 1000 * 0 * 5,
  });

  console.log(data, isLoading, isError, isSuccess);

  return { data, isLoading, isError, isSuccess, refetch };
}
