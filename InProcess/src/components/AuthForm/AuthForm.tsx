// import { useSelector } from "react-redux";
// import { AuthFormVisibleProps, AuthTypeProps } from "./types";
import { FC } from "react";
import LoginComponent from "../LoginComponent/LoginComponent";
import { PostsListComponent } from "../PostsListComponent";
import { RegistrationComponent } from "../RegistrationComponent";
import { PostsListProps } from "./types";
import { useSelector } from "react-redux";
import { AuthTypeObjectProps } from "../../store/types";
import { UserFormComponent } from "../UserFormComponent";

export const AuthForm: FC<PostsListProps> = ({ data, loading }) => {
  const authTypeValue = useSelector(
    (state: AuthTypeObjectProps) => state.authTypeName.authTypeValue
  );

  return (
    <>
      {authTypeValue === "login" ? (
        <LoginComponent />
      ) : authTypeValue === "registration" ? (
        <RegistrationComponent />
      ) : authTypeValue === "user" ? (
        <UserFormComponent />
      ) : (
        <PostsListComponent data={data} loading={loading} />
      )}
    </>
  );
};

export default AuthForm;
