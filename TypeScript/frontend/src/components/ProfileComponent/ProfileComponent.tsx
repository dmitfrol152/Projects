import { useNavigate } from "react-router";
import ManImage from "../../assets/images/man.png";
import { Button } from "../Button";
import styles from "./ProfileComponent.module.scss";
import { queryClient } from "../../api/queryClient";
import { useDispatch } from "react-redux";
import { authUserAction } from "../../store/authUserSlice";
import { audioGroupChoiceAction } from "../../store/audioGroupChoiceSlice";

export const ProfileComponent = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    queryClient.invalidateQueries({ queryKey: ["favorites"] });
    dispatch(authUserAction({ authUserValue: false }));
    dispatch(audioGroupChoiceAction({ audioGroupChoiceValue: false }));
    navigate("/");
  };

  return (
    <div className={styles.profileComponent}>
      <div className={styles.profileComponent__btn}>
        <Button
          title="Выйти"
          type="button"
          variant="secondary"
          size="secondary"
          onClick={handleExit}
        />
      </div>
      <div className="container">
        <h2 className={styles.profileComponent__title}>
          Добро пожаловать, {username}
        </h2>
        <p className={styles.profileComponent__description}>
          Эта страница находится на этапе разработки. Пока вы можете послушать
          треки на главной и воспроизвести свои любимые треки из избранного.
        </p>
        <img
          className={styles.profileComponent__image}
          src={ManImage}
          alt="Человек в наушниках"
        />
      </div>
    </div>
  );
};

export default ProfileComponent;
