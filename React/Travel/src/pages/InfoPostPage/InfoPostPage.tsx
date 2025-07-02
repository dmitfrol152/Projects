import { useParams, useSearchParams } from "react-router";
import { usePosts } from "../../hooks/usePosts";
import { HeroSecond } from "../../components/HeroSecond";
import { Button } from "../../components/Button";
import styles from "./InfoPostPage.module.scss";
import { InfoPostComponent } from "../../components/InfoPostComponent";
import AuthForm from "../../components/AuthForm/AuthForm";
import { InfoPostFormComponent } from "../../components/InfoPostFormComponent";
import { StatusModal } from "../../components/StatusModal";

export const InfoPostPage = () => {
  const { postId } = useParams();
  const { getCurrentPost } = usePosts(postId ?? "");
  const [searchParams] = useSearchParams();

  // Loading
  if (getCurrentPost.isLoading) {
    return (
      <>
        <HeroSecond />
        <InfoPostComponent loading={getCurrentPost.isLoading} />
      </>
    );
  }

  // Success
  if (getCurrentPost.isSuccess) {
    if (
      searchParams.get("auth") === "login" ||
      searchParams.get("auth") === "registration"
    ) {
      return (
        <>
          <HeroSecond />
          <AuthForm />
        </>
      );
    }

    if (searchParams.get("add") === "review") {
      return (
        <>
          <HeroSecond />
          <InfoPostFormComponent postId={postId} />
          {searchParams.get("send") === "successful" ? (
            <StatusModal title="Ваш отзыв успешно добавлен" />
          ) : null}
        </>
      );
    }

    if (getCurrentPost.data) {
      return (
        <>
          <HeroSecond />
          <InfoPostComponent data={getCurrentPost.data} />
        </>
      );
    }
  }

  // Error
  if (getCurrentPost.isError) {
    return (
      <>
        <HeroSecond />
        <div className={styles.infoPost__error}>
          <p className={styles.infoPost__errorText}>
            Ошибка загрузки поста: {getCurrentPost.error?.message}
          </p>
          <Button
            title="Повторить запрос"
            type="button"
            variant="primary"
            size="main"
            onClick={() => getCurrentPost.refetch()}
          />
        </div>
      </>
    );
  }

  // Other
  return (
    <div className={styles.infoPost}>
      <h1 className={styles.infoPost__errorText}>Страница фильма</h1>
      <p className={styles.infoPost__errorText}>
        Здесь должно было быть много интерсного. Но что-то пошло не так.
      </p>
    </div>
  );
};

export default InfoPostPage;
