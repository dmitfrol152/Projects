import { Button } from "../../components/Button/Button";
import { MoviesByGenre } from "../../components/MoviesByGenre";
import useFetchInfinityMovies from "../../hooks/useFetchInfinityMovies";
import styles from "./MovieByGenrePage.module.scss";

export const MovieByGenrePage = () => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    fetchNextPage,
    genre,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchInfinityMovies();

  // Loading
  if (isLoading) {
    return <>{isLoading && <MoviesByGenre loading={isLoading} />}</>;
  }

  // Success
  if (isSuccess) {
    return (
      <>
        {isSuccess && data && (
          <MoviesByGenre
            data={data.pages.flat()}
            genre={genre}
            nextPage={() => fetchNextPage()}
            isLoadingMore={isFetchingNextPage}
            disabledBtn={!hasNextPage}
          />
        )}
      </>
    );
  }

  // Error
  if (isError) {
    return (
      <>
        {isError && (
          <div className={styles.movieByGenrePage__error}>
            <p className={styles.movieByGenrePage__errorText}>
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

  // Other;
  return (
    <div className={styles.movieByGenrePage__error}>
      <h1 className={styles.movieByGenrePage__errorText}>
        Страница, отфильтрованная по жанру
      </h1>
      <p className={styles.movieByGenrePage__errorText}>
        Здесь должно было быть много интерсного. Но что-то пошло не так.
      </p>
    </div>
  );
};

export default MovieByGenrePage;
