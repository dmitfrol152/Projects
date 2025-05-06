import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../api/Profile/Profile";
import { logoutUser } from "../api/User/User";
import { queryClient } from "../api/queryClient";

export const useProfile = () => {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryFn: () => fetchProfile(),
    queryKey: ["profile", "me"],
    retry: 0,
    staleTime: 1000 * 60 * 5,
  });

  const exitMutation = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { data, isError, isLoading, isSuccess, refetch, exitMutation };
};

export default useProfile;
