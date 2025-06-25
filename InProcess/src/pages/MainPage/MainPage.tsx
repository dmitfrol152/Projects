// import { Button } from "../../components/Button";
// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Button } from "../../components/Button";
import { Hero } from "../../components/Hero";
import { usePosts } from "../../hooks/usePosts";
import styles from "./MainPage.module.scss";
import { AuthTypeObjectProps } from "../../store/types";
import { HeroSecond } from "../../components/HeroSecond";
// import { AuthFormVisibleObjectProps } from "../../store/types";
// import { HeroSecond } from "../../components/HeroSecond";

export const MainPage = () => {
  const { data, isSuccess, isError, isLoading, error, refetch } = usePosts();
  const authTypeValue = useSelector(
    (state: AuthTypeObjectProps) => state.authTypeName.authTypeValue
  );

  // isLoading
  if (isLoading) {
    return (
      <>
        <Hero />
        <AuthForm loading={isLoading} />
      </>
    );
  }

  // isSuccess
  if (isSuccess) {
    if (authTypeValue === "posts") {
      return (
        <>
          <Hero />
          <AuthForm data={data} />
        </>
      );
    }

    return (
      <>
        <HeroSecond />
        <AuthForm />
      </>
    );
  }

  // isError
  if (isError) {
    return (
      <>
        <Hero />
        <div className={styles.mainPage__error}>
          <p className={styles.mainPage__errorText}>
            Ошибка загрузки постов: {error?.message}
          </p>
          <Button
            title="Повторить запрос"
            type="button"
            variant="primary"
            size="main"
            onClick={() => refetch()}
          />
        </div>
      </>
    );
  }

  // Other
  return (
    <>
      <Hero />;
      <div className={styles.mainPage__error}>
        <h1 className={styles.mainPage__errorText}>Главная страница сайта</h1>
        <p className={styles.mainPage__errorText}>
          Здесь должно было быть много интерсного. Но что-то пошло не так.
        </p>
      </div>
    </>
  );
};

export default MainPage;
