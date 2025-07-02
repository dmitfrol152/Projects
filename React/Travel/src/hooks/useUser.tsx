import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../api/queryClient";
import { editPasswordUser, fetchUser, logoutUser } from "../api/User/User";
import { EditPasswordUserProps } from "../api/User/types";

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

  const changePasswordUser = useMutation({
    mutationFn: (data: EditPasswordUserProps) => editPasswordUser(data),
  });

  return { getUser, exitUser, changePasswordUser };
};
