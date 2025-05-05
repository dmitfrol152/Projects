import { useQuery } from "@tanstack/react-query";
import { fetchMovieRandomList } from "../api/Movie/Movie";

export const useRandomMovie = () => {
  const { data, isError, isLoading, isSuccess, refetch, error } = useQuery({
    queryFn: () => fetchMovieRandomList(),
    queryKey: ["randomMovie"],
    staleTime: 1000 * 60 * 5,
  });

  return { data, isError, isLoading, isSuccess, refetch, error };
};

export default useRandomMovie;
