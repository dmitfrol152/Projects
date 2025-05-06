import { useMutation } from "@tanstack/react-query";
import { patchRestaurantsRating } from "../api/restaurants";

// ** Mutation

export const useUpdateRating = () => {
  return useMutation({
    mutationFn: patchRestaurantsRating,
  });
};
