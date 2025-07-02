import { useQuery } from "@tanstack/react-query";
import { fetchInfoPost, fetchPostList } from "../api/Posts/Posts";

export const usePosts = (postId?: string) => {
  const getPosts = useQuery({
    queryFn: () => fetchPostList(),
    queryKey: ["posts"],
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const getCurrentPost = useQuery({
    queryFn: () => (postId ? fetchInfoPost(postId) : null),
    queryKey: postId ? ["post", postId] : ["post", "none"],
    retry: false,
    enabled: !!postId,
  });

  return { getPosts, getCurrentPost };
};
