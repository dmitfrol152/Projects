import { useQuery } from "@tanstack/react-query";
import { fetchMovieGenresList } from "../api/Movie/Movie";

export const useGenresMovie = () => {
  const { data, isError, isLoading, isSuccess, refetch, error } = useQuery({
    queryFn: () => fetchMovieGenresList(),
    queryKey: ["genresMovie"],
  });

  return { data, isError, isLoading, isSuccess, refetch, error };
};

export default useGenresMovie;
