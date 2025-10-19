import { fetchProducts, postProducts } from "@/api/products/products";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useProducts(searchQuery?: string, perPage = 10) {
  const getProductsQuery = useQuery({
    queryFn: () => fetchProducts(),
    queryKey: ["products"],
    retry: 0,
    staleTime: 5 * 1000 * 60,
  });

  const postProductsQuery = useInfiniteQuery({
    queryKey: ["products", "search", searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      postProducts(pageParam, { searchQuery: searchQuery || "" }, perPage),
    initialPageParam: 1,
    enabled: !!searchQuery,
    staleTime: 0,
    getPreviousPageParam: (firstPage) => {
      const currentPage = firstPage?.pagination?.current_page ?? 1;
      return currentPage > 1 ? currentPage - 1 : undefined;
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.pagination?.current_page ?? 1;
      const totalPages = lastPage?.pagination?.total_pages ?? 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  return {
    getProductsQuery,
    postProductsQuery,
  };
}
