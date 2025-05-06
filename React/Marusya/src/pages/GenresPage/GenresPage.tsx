import { Button } from "../../components/Button/Button";
import { Genres } from "../../components/Genres";
import useGenresMovie from "../../hooks/useGenresMovie";
import styles from "./GenresPage.module.scss";

export const GenresPage = () => {
  const { data, isError, isLoading, isSuccess, refetch, error } =
    useGenresMovie();

  // Loading
  if (isLoading) {
    return <>{isLoading && <Genres loading={isLoading} />}</>;
  }

  // Success
  if (isSuccess) {
    return <>{isSuccess && <Genres data={data} />}</>;
  }

  // Error
  if (isError) {
    return (
      <>
        {isError && (
          <div className={styles.genresPage__error}>
            <p className={styles.genresPage__errorText}>
              Ошибка загрузки фильмов: {error?.message}
            </p>
            <Button
              title="Повторить запрос"
              type="button"
              variant="primary"
              size="self"
              onClick={() => refetch()}
            />
          </div>
        )}
      </>
    );
  }

  // Other
  return (
    <div className={styles.genresPage__error}>
      <h1 className={styles.genresPage__errorText}>
        Страница с жанрами фильмов
      </h1>
      <p className={styles.genresPage__errorText}>
        Здесь должно было быть много интерсного. Но что-то пошло не так.
      </p>
    </div>
  );
};

export default GenresPage;
