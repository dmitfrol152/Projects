import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchMe, loginUserCancel } from "../api/User";
import { Loader } from "../components/Loader";
import { AuthForm } from "../components/AuthForm";
import { NoteForm } from "../components/NoteForm";
import { FetchNotesListView } from "../components/NotesListView/FetchNoteListView";
import "./Account.css";
import { LogoutButton } from "../components/LogoutButton";
import { queryClient } from "../api/queryClient";
import { UserView } from "../components/UserView";

export const Account = () => {

  // ** Button exit

  const handleExit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    exitLogout.mutate();
  };

  // ** Mutation exit

  const exitLogout = useMutation({
    mutationFn: () => loginUserCancel(),
    onSuccess() {
      queryClient.invalidateQueries();
    },
  });

  // ** Query ME

  const meQuery = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: 0
  });

  switch (meQuery.status) {
    case "pending":
      return <Loader />;

    case "error":
      return <AuthForm />;

    case "success":
      return (
        <>
          <UserView username={meQuery.data?.username} />
          <div className="account">
            <NoteForm />
            <div className="account__notes">
              <FetchNotesListView />
            </div>
          </div>
          <LogoutButton
            type="button"
            kind="secondary"
            isLoading={exitLogout.isPending}
            onClick={handleExit}
          />
        </>
      );
  }
};
