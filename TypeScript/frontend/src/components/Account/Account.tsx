import { Link, useNavigate } from "react-router";
import { Button } from "../Button";
import IconProfile from "../../assets/images/svg/icon-profile.svg?react";
import styles from "./Account.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { audioGroupChoiceAction } from "../../store/audioGroupChoiceSlice";
import type { AuthUserResultProps } from "./types";

export const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUserResult = useSelector(
    (state: AuthUserResultProps) => state.authUserName.authUserValue
  );

  function handleLogin() {
    navigate("/login");
  }

  function handleGroupChoice() {
    dispatch(audioGroupChoiceAction({ audioGroupChoiceValue: null }));
  }

  if (authUserResult) {
    return (
      <Link to="/profile" onClick={handleGroupChoice}>
        <div className={styles.account}>
          <span className={styles.account__inner}>
            <span className={styles.account__innerAvatar}>
              {localStorage.getItem("username")?.split("")[0].toUpperCase()}
            </span>
            <span className={styles.account__innerText}>
              {localStorage.getItem("username")}
            </span>
          </span>
          <IconProfile className={styles.account__svg} />
        </div>
      </Link>
    );
  }

  if (!authUserResult) {
    return (
      <Button
        title="Войти"
        type="button"
        variant="link"
        size="none"
        onClick={handleLogin}
      />
    );
  }
};

export default Account;
