import { FC } from "react";
import LoginComponent from "../LoginComponent/LoginComponent";
import { PostsListComponent } from "../PostsListComponent";
import { RegistrationComponent } from "../RegistrationComponent";
import { PostsListProps } from "./types";
import { useSearchParams } from "react-router";
import { AddPostFormComponent } from "../AddPostFormComponent";
import { StatusModal } from "../StatusModal";

export const AuthForm: FC<PostsListProps> = ({ data, loading }) => {
  const [searchParams] = useSearchParams();
  const authType = searchParams.get("auth");

  if (authType === "login") {
    return <LoginComponent />;
  }
  if (authType === "registration") {
    return <RegistrationComponent />;
  }
  return (
    <>
      {searchParams.get("add") === "post" ? (
        <>
          <AddPostFormComponent />
          {searchParams.get("send") === "successful" ? (
            <StatusModal title="Ваша история успешно добавлена" />
          ) : null}
        </>
      ) : (
        <PostsListComponent data={data} loading={loading} />
      )}
    </>
  );
};

export default AuthForm;
