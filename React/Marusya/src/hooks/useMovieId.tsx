import { useQuery } from "@tanstack/react-query";
import { fetchMovie } from "../api/Movie/Movie";
import { MovieIdProp } from "./types";

export const useMovieId = (movieId: MovieIdProp) => {
  const { data, isError, isLoading, isSuccess, refetch, error } = useQuery({
    queryFn: () => fetchMovie(Number(movieId)),
    queryKey: ["movie", movieId],
  });

  return { data, isError, isLoading, isSuccess, refetch, error };
};

export default useMovieId;
