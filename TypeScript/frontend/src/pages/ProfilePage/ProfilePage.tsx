import { useNavigate } from "react-router";
import { useFavorites } from "../../hooks/useFavorites";
import styles from "./ProfilePage.module.scss";
import { SideNav } from "../../components/SideNav";
import { ProfileComponent } from "../../components/ProfileComponent";
import { useDispatch, useSelector } from "react-redux";
import type { AuthUserResultProps } from "./types";
import { authUserAction } from "../../store/authUserSlice";
import { useEffect } from "react";

export const ProfilePage = () => {
  const { getFavoritesTracks } = useFavorites();
  const navigate = useNavigate();
  const authUserResult = useSelector(
    (state: AuthUserResultProps) => state.authUserName.authUserValue
  );
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (getFavoritesTracks.isError) {
    navigate("/login");
    return;
  }

  if (getFavoritesTracks.isSuccess) {
    dispatch(authUserAction({ authUserValue: true }));
    return (
      <div className={styles.profilePage}>
        <div className="container">
          <div className={styles.profilePage__wrapper}>
            <SideNav userIsAuth={authUserResult ? true : false} />
            <ProfileComponent />
          </div>
        </div>
      </div>
    );
  }

  if (getFavoritesTracks.isLoading) {
    return 123;
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
