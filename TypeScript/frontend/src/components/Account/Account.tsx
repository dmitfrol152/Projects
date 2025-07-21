import { Link, useNavigate } from "react-router";
import { useFavorites } from "../../hooks/useFavorites";
import { Button } from "../Button";
import IconProfile from "../../assets/images/svg/icon-profile.svg?react";
import styles from "./Account.module.scss";
import { useDispatch } from "react-redux";
import { audioGroupChoiceAction } from "../../store/audioGroupChoiceSlice";

export const Account = () => {
  const { getFavoritesTracks } = useFavorites();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogin() {
    navigate("/login");
  }

  function handleGroupChoice() {
    dispatch(audioGroupChoiceAction({ audioGroupChoiceValue: null }));
  }

  if (getFavoritesTracks.isSuccess) {
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

  if (getFavoritesTracks.isError) {
    return (
      <Button
        title="Войти"
        type="button"
        variant="link"
        size="none"
        onClick={handleLogin}
        isLoading={getFavoritesTracks.isLoading}
      />
    );
  }
};

export default Account;
