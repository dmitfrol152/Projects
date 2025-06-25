import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../api/queryClient";
import { fetchUser, logoutUser } from "../api/User/User";

export const useUser = () => {
  const getUser = useQuery({
    queryFn: () => fetchUser(),
    queryKey: ["user", "me"],
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const exitUser = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  // const editPasswordUser = useMutation({
  //   mutationFn: ({ password }) => changePasswordUser({ password }),
  // });

  return { getUser, exitUser };
};
