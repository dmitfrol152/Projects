import { useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./MoviePage.module.scss";
import { MovieInfoHero } from "../../components/MovieInfoHero";
import { MovieInfoMore } from "../../components/MovieInfoMore";
import useMovieId from "../../hooks/useMovieId";

export const MoviePage = () => {
  const { movieId } = useParams();

  const { data, isError, isLoading, isSuccess, refetch, error } =
    useMovieId(movieId);

  // Loading
  if (isLoading) {
    return (
      <>
        {isLoading && <MovieInfoHero loading={isLoading} />}
        {isLoading && <MovieInfoMore loading={isLoading} />}
      </>
    );
  }

  // Success
  if (isSuccess) {
    return (
      <>
        {isSuccess && <MovieInfoHero data={data} />}
        {isSuccess && <MovieInfoMore data={data} />}
      </>
    );
  }

  // Error
  if (isError) {
    return (
      <>
        {isError && (
          <div className={styles.moviePage}>
            <p className={styles.moviePage}>
              Ошибка загрузки фильма: {error?.message}
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
    <div className={styles.moviePage}>
      <h1 className={styles.moviePage__errorText}>Страница фильма</h1>
      <p className={styles.moviePage__errorText}>
        Здесь должно было быть много интерсного. Но что-то пошло не так.
      </p>
    </div>
  );
};

export default MoviePage;
