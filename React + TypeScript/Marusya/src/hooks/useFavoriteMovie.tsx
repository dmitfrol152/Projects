import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMovieFvoritesList,
  addMovieToFavorites,
  deleteMovieFromFavorites,
} from "../api/Movie/Movie";

export function useFavoriteMovie() {
  const queryClient = useQueryClient();

  const getFavoriteMovie = useQuery({
    queryFn: () => fetchMovieFvoritesList(),
    queryKey: ["favorites"],
    retry: 0,
  });

  const postFavoriteMovie = useMutation({
    mutationFn: (id: number) => addMovieToFavorites(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const deleteFavoriteMovie = useMutation({
    mutationFn: (id: number) => deleteMovieFromFavorites(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return {
    getFavoriteMovie,
    postFavoriteMovie,
    deleteFavoriteMovie,
  };
}

export default useFavoriteMovie;
