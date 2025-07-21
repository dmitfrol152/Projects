import ManImage from "../../assets/images/man.png";
import styles from "./ProfileComponent.module.scss";

export const ProfileComponent = () => {
  const username = localStorage.getItem("username");
  return (
    <div className={styles.profileComponent}>
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
