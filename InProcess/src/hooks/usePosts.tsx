import { useQuery } from "@tanstack/react-query";
import { fetchPostList } from "../api/Posts/Posts";

export const usePosts = () => {
  const { data, isSuccess, isError, isLoading, error, refetch } = useQuery({
    queryFn: () => fetchPostList(),
    queryKey: ["posts"],
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return { data, isSuccess, isError, isLoading, error, refetch };
};
