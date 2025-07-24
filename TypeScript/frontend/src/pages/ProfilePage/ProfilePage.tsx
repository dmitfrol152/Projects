import { useNavigate } from "react-router";
import styles from "./ProfilePage.module.scss";
import { SideNav } from "../../components/SideNav";
import { ProfileComponent } from "../../components/ProfileComponent";
import { useDispatch, useSelector } from "react-redux";
import type { AuthUserResultProps } from "./types";
import { authUserAction } from "../../store/authUserSlice";
import { useEffect, useState } from "react";
import type { AudioPlayerNameProps } from "../../store/types";
import { queryClient } from "../../api/queryClient";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const authUserResult = useSelector(
    (state: AuthUserResultProps) => state.authUserName.authUserValue
  );
  const dispatch = useDispatch();
  const isTrackPlaying = useSelector(
    (state: AudioPlayerNameProps) => state.audioPlayerName.audioPlayerValue
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(
    isTrackPlaying && isTrackPlaying !== null ? true : false
  );

  useEffect(() => {
    setIsPlaying(isTrackPlaying && isTrackPlaying !== null ? true : false);
  }, [isTrackPlaying]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!authUserResult) {
    queryClient.invalidateQueries({ queryKey: ["favorites"] });
    dispatch(authUserAction({ authUserValue: false }));
    navigate("/");
    navigate("/");
    return;
  }

  if (authUserResult) {
    dispatch(authUserAction({ authUserValue: true }));
    return (
      <div
        className={
          isPlaying
            ? styles.profilePage
            : `${styles.profilePage} ${styles.footerNull}`
        }
      >
        <div className="container">
          <div className={styles.profilePage__wrapper}>
            <SideNav userIsAuth={authUserResult ? true : false} />
            <ProfileComponent />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profilePage__error}>
      <h1 className={styles.profilePage__errorText}>
        Страница пользователя сайта
      </h1>
      <p className={styles.profilePage__errorText}>
        Здесь должно было быть много интерсного. Но что-то пошло не так.
      </p>
    </div>
  );
};

export default ProfilePage;
