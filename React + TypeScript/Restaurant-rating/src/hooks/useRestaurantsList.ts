import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { getRestaurants, Restaurant } from "../api/restaurants";

// ** Typies

export interface ResponseRestaurants {
  data: Restaurant[] | undefined;
  isError: boolean;
  isLoading: boolean;
  refetch: () => Promise<QueryObserverResult<Restaurant[], Error>>;
}

// ** Query

export const useRestaurantsList = (): ResponseRestaurants => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => getRestaurants(),
  });

  return { data, isError, isLoading, refetch };
};
