import { useQuery } from "@tanstack/react-query";
import { fetchMovieTopList } from "../api/Movie/Movie";

export const useTopMovie = () => {
  const { data, isError, isLoading, isSuccess, refetch, error } = useQuery({
    queryFn: () => fetchMovieTopList(),
    queryKey: ["topMovie"],
    staleTime: 1000 * 60 * 5,
  });

  return { data, isError, isLoading, isSuccess, refetch, error };
};

export default useTopMovie;
