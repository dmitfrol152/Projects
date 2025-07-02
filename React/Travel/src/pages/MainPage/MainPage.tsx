import AuthForm from "../../components/AuthForm/AuthForm";
import { Button } from "../../components/Button";
import { Hero } from "../../components/Hero";
import { usePosts } from "../../hooks/usePosts";
import styles from "./MainPage.module.scss";
import { HeroSecond } from "../../components/HeroSecond";
import { useSearchParams } from "react-router";

export const MainPage = () => {
  const { getPosts } = usePosts();
  const [searchParams] = useSearchParams();
  const authType = searchParams.get("auth");

  // isLoading
  if (getPosts.isLoading) {
    return (
      <>
        {authType === "login" || authType === "resgistration" ? (
          <>
            <HeroSecond />
            <AuthForm loading={getPosts.isLoading} />
          </>
        ) : (
          <>
            <Hero />
            <AuthForm loading={getPosts.isLoading} />
          </>
        )}
      </>
    );
  }

  // isSuccess
  if (getPosts.isSuccess) {
    return (
      <>
        {authType === "login" ||
        authType === "registration" ||
        searchParams.get("add") === "post" ? (
          <>
            <HeroSecond />
            <AuthForm data={getPosts.data} />
          </>
        ) : (
          <>
            <Hero />
            <AuthForm data={getPosts.data} />
          </>
        )}
      </>
    );
  }

  // isError
  if (getPosts.isError) {
    return (
      <>
        <Hero />
        <div className={styles.mainPage__error}>
          <p className={styles.mainPage__errorText}>
            Ошибка загрузки постов: {getPosts.error?.message}
          </p>
          <Button
            title="Повторить запрос"
            type="button"
            variant="primary"
            size="main"
            onClick={() => getPosts.refetch()}
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
