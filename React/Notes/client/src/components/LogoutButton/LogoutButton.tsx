import { Button } from "../Button";
import "./LogoutButton.css";

export interface IButtonExit {
  type?: "submit" | "reset" | "button";
  kind?: "primary" | "secondary";
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LogoutButton = ({ type, kind, isLoading, onClick }: IButtonExit) => {
  return (
    <div className="logout-button">
      <Button
        type={type}
        kind={kind}
        isLoading={isLoading}
        onClick={onClick}
      >
        Выйти
      </Button>
    </div>
  );
};
