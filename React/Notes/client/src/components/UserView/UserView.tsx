import "./UserView.css";

export interface UserNameProps {
  username: string;
}

export const UserView = ({username}: UserNameProps) => {

  return (
    <div className="user-view">
      <div className="user-view__logo">
        {username.slice(0, 1).toUpperCase()}
      </div>
      <span className="user-view__name">{username}</span>
    </div>
  );
};
