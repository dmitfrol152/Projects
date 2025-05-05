import { MovieRandom } from "../../components/MovieRandom";
import { MovieTop } from "../../components/MovieTop";
import { Button } from "../../components/Button/Button";
import styles from "./MainPage.module.scss";
import useRandomMovie from "../../hooks/useRandomMovie";
import useTopMovie from "../../hooks/useTopMovie";

export const MainPage = () => {
  const {
    data: dataRandom,
    isError: isErrorRandom,
    isLoading: isLoadingRandom,
    isSuccess: isSuccessRandom,
    refetch: refetchRandom,
    error: errorRandom,
  } = useRandomMovie();

  const {
    data: dataTop,
    isError: isErrorTop,
    isLoading: isLoadingTop,
    isSuccess: isSuccessTop,
    refetch: refetchTop,
    error: errorTop,
  } = useTopMovie();

  const handleRefetch = () => {
    refetchRandom();
  };

  // Loading
  if (isLoadingRandom || isLoadingTop) {
    return (
      <>
        {isLoadingRandom && <MovieRandom loading={isLoadingRandom} />}
        {isLoadingTop && <MovieTop loading={isLoadingTop} />}
      </>
    );
  }

  // Success
  if (isSuccessRandom || isSuccessTop) {
    return (
      <>
        {isSuccessRandom && (
          <MovieRandom data={dataRandom} refetch={handleRefetch} />
        )}
        {isSuccessTop && <MovieTop data={dataTop} />}
      </>
    );
  }

  // Error
  if (isErrorRandom || isErrorTop) {
    return (
      <>
        {isErrorRandom && (
          <div className={styles.mainPage__error}>
            <p className={styles.mainPage__errorText}>
              Ошибка загрузки фильмов: {errorRandom?.message}
            </p>
            <Button
              title="Повторить запрос"
              type="button"
              variant="primary"
              size="self"
              onClick={() => refetchRandom()}
            />
          </div>
        )}
        {isErrorTop && (
          <div className={styles.mainPage__error}>
            <p className={styles.mainPage__errorText}>
              Ошибка загрузки фильмов: {errorTop?.message}
            </p>
            <Button
              title="Повторить запрос"
              type="button"
              variant="primary"
              size="self"
              onClick={() => refetchTop()}
            />
          </div>
        )}
      </>
    );
  }

  // Other
  return (
    <div className={styles.mainPage__error}>
      <h1 className={styles.mainPage__errorText}>Главная страница сайта</h1>
      <p className={styles.mainPage__errorText}>
        Здесь должно было быть много интерсного. Но что-то пошло не так.
      </p>
    </div>
  );
};

export default MainPage;
