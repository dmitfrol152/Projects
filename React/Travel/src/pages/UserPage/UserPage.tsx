import { Button } from "../../components/Button";
import { HeroSecond } from "../../components/HeroSecond";
import { UserComponent } from "../../components/UserComponent";
import { useUser } from "../../hooks/useUser";
import styles from "./UserPage.module.scss";

export const UserPage = () => {
  const { getUser } = useUser();

  // isLoading
  if (getUser.isLoading) {
    return (
      <>
        <HeroSecond />
        <UserComponent loading={getUser.isLoading} />
      </>
    );
  }

  // isSuccess
  if (getUser.isSuccess) {
    return (
      <>
        <HeroSecond />
        <UserComponent data={getUser.data} />
      </>
    );
  }

  // isError
  if (getUser.isError) {
    return (
      <>
        <HeroSecond />
        <div className={styles.userPage__error}>
          <p className={styles.userPage__errorText}>
            Ошибка загрузки профиля пользоваетеля: {getUser.error?.message}
          </p>
          <Button
            title="Повторить запрос"
            type="button"
            variant="primary"
            size="main"
            onClick={() => getUser.refetch()}
          />
        </div>
      </>
    );
  }

  // Other
  return (
    <>
      <HeroSecond />;
      <div className={styles.userPage__error}>
        <h1 className={styles.userPage__errorText}>Главная страница сайта</h1>
        <p className={styles.userPage__errorText}>
          Здесь должно было быть много интерсного. Но что-то пошло не так.
        </p>
      </div>
    </>
  );
};

export default UserPage;
