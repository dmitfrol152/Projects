import { fetchMovieList } from "../api/Movie/Movie";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const useSearchMovie = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("title") || "";
  const genre = searchParams.get("genres") || "";

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryFn: () =>
      fetchMovieList({
        search: search,
        genre: genre,
        count: 5,
      }),
    queryKey: ["searchMovie", search, genre],
    enabled: search !== "",
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export default useSearchMovie;
