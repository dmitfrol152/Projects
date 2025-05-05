import { useState } from "react";
import { fetchMovieList } from "../api/Movie/Movie";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchInfinityMovies = () => {
  const [searchParams] = useSearchParams();
  const [count] = useState(15);
  const genre = searchParams.get("genres") || "";

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    fetchNextPage,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam }) => fetchMovieList({ genre, pageParam, count }),
    queryKey: ["movieByGenres", genre],
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    fetchNextPage,
    genre,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useFetchInfinityMovies;
