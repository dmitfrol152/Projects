import { ProfileUser } from "../../components/ProfileUser";
import styles from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import useFavoriteMovie from "../../hooks/useFavoriteMovie";

const Profile = () => {
  const navigate = useNavigate();

  const { data, isError, isLoading, isSuccess, exitMutation } = useProfile();
  const { getFavoriteMovie } = useFavoriteMovie();

  // Loading
  if (isLoading) {
    return <>{isLoading && <ProfileUser loading={isLoading} />}</>;
  }

  // Success
  if (isSuccess) {
    return (
      <ProfileUser
        dataProfile={data}
        dataFavoritesMovie={getFavoriteMovie.data}
        exitMutation={exitMutation}
      />
    );
  }

  // Error
  if (isError) {
    navigate("/");
    return null;
  }

  // Other
  return (
    <div className={styles.profile__error}>
      <h1 className={styles.profile__errorText}>Профиль пользователя</h1>
      <p className={styles.profile__errorText}>
        Здесь должно было быть много интерсного. Но что-то пошло не так.
      </p>
    </div>
  );
};

export default Profile;
