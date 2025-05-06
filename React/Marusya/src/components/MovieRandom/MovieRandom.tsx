import { FC, useEffect, useState } from "react";
import { IMovieRandomProps } from "./types";
import styles from "./MovieRandom.module.scss";
import StarIcon from "../../assets/images/icon-star.svg?react";
import FavoriteIcon from "../../assets/images/icon-favorite.svg?react";
import FavoriteFillIcon from "../../assets/images/icon-favorite-fill.svg?react";
import ReloadIcon from "../../assets/images/icon-reload.svg?react";
import emptyPoster from "../../assets/images/emptyPoster/empty-poster.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import useFavoriteMovie from "../../hooks/useFavoriteMovie";
import { authFormVisible } from "../../store/authFormVisibleSlice";
import { useDispatch } from "react-redux";
import { Trailer } from "../Trailer";

export const MovieRandom: FC<IMovieRandomProps> = ({
  data,
  loading,
  refetch,
}) => {
  const {
    data: dataProfile,
    isError: isErrorProfile,
    isSuccess: isSuccessProfile,
    refetch: refetchProfile,
  } = useProfile();
  const { deleteFavoriteMovie, postFavoriteMovie } = useFavoriteMovie();
  const dispatch = useDispatch();
  const [isVisibleTrailer, setIsVisibleTrailer] = useState(false);

  useEffect(() => {
    if (isVisibleTrailer === true) {
      document.body.classList.add("no-scroll");
    } else {
      if (document.body.classList.contains("no-scroll")) {
        document.body.classList.remove("no-scroll");
      }
    }
  }, [isVisibleTrailer]);

  function handleVisibleTrailer() {
    setIsVisibleTrailer(true);
  }

  function handleNotVisibleTrailer() {
    setIsVisibleTrailer(false);
  }

  const favoritesProfileArray = dataProfile?.favorites || [];
  const favoriteMovie = favoritesProfileArray?.find(
    (favoriteMovieId) => favoriteMovieId === String(data?.id)
  );

  function handleFavoriteMovies(id: number) {
    if (isErrorProfile) {
      dispatch(authFormVisible({ authFormVisible: true }));
      return;
    }

    if (isSuccessProfile) {
      if (favoriteMovie) {
        deleteFavoriteMovie.mutate(id, {
          onSuccess: () => {
            refetchProfile();
          },
        });
      } else {
        postFavoriteMovie.mutate(id, {
          onSuccess: () => {
            refetchProfile();
          },
        });
      }
    }
  }

  // Skeleton
  if (loading || !data) {
    return (
      <section className={styles.movieRandom}>
        <div className="container">
          <div className={styles.movieRandom__wrapper}>
            <div className={styles.movieRandom__info}>
              <div className={styles.movieRandom__information}>
                <div className={styles.movieRandom__informationSecondaery}>
                  <div style={{ width: "100%", height: "28px" }}>
                    <Skeleton
                      height={28}
                      highlightColor="#1b2a40"
                      baseColor="#29364a"
                    />
                  </div>
                </div>
                <h2 className={styles.movieRandom__informationTitle}>
                  <Skeleton
                    height={56}
                    highlightColor="#1b2a40"
                    baseColor="#29364a"
                  />
                </h2>
                <p className={styles.movieRandom__informationDescription}>
                  <Skeleton
                    count={3}
                    height={32}
                    highlightColor="#1b2a40"
                    baseColor="#29364a"
                  />
                </p>
                <div className={styles.movieRandom__links}>
                  <div style={{ width: "100%", height: "56px" }}>
                    <Skeleton
                      height={56}
                      highlightColor="#1b2a40"
                      baseColor="#29364a"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.movieRandom__image}>
              <Skeleton
                height={552}
                highlightColor="#1b2a40"
                baseColor="#29364a"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Component
  return (
    <section className={styles.movieRandom}>
      <div className="container">
        <AnimatePresence mode="wait">
          <motion.div
            key={data.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <h1 className="visually-hidden">
              Главная страница стримингового сервиса "Маруся"
            </h1>
            <div className={styles.movieRandom__wrapper}>
              <div className={styles.movieRandom__info}>
                <div className={styles.movieRandom__information}>
                  <div className={styles.movieRandom__informationSecondaery}>
                    <span
                      className={
                        Number(data.tmdbRating.toFixed(1)) >= 8.6
                          ? `${styles.movieRandom__informationRating} ${styles.movieRandom__informationRatingGold}`
                          : Number(data.tmdbRating.toFixed(1)) >= 7.5
                          ? `${styles.movieRandom__informationRating} ${styles.movieRandom__informationRatingGreen}`
                          : Number(data.tmdbRating.toFixed(1)) >= 6.3
                          ? `${styles.movieRandom__informationRating} ${styles.movieRandom__informationRatingGray}`
                          : Number(data.tmdbRating.toFixed(1)) > 0.0
                          ? `${styles.movieRandom__informationRating} ${styles.movieRandom__informationRatingRed}`
                          : `${styles.movieRandom__informationRating} ${styles.movieRandom__informationRatingWhite}`
                      }
                    >
                      <StarIcon
                        className={styles.movieRandom__informationIcon}
                      />
                      <span className={styles.movieRandom__informationText}>
                        {data.tmdbRating.toFixed(1)}
                      </span>
                    </span>
                    <span className={styles.movieRandom__informationYear}>
                      {data.releaseDate?.split("-")[0]}
                    </span>
                    {data.genres.length > 0 && (
                      <span className={styles.movieRandom__informationGenres}>
                        {data.genres.join(", ")}
                      </span>
                    )}
                    <span className={styles.movieRandom__informationTime}>
                      {`${Math.floor(data.runtime / 60)} ч ${
                        data.runtime % 60
                      } мин`}
                    </span>
                  </div>
                  <h2 className={styles.movieRandom__informationTitle}>
                    {data.title}
                  </h2>
                  <p className={styles.movieRandom__informationDescription}>
                    {data.plot}
                  </p>
                </div>
                <div className={styles.movieRandom__links}>
                  <div className={styles.movieRandom__btn}>
                    <Button
                      title="Трейлер"
                      type="button"
                      variant="primary"
                      size="medium"
                      onClick={handleVisibleTrailer}
                    />
                  </div>
                  <Link
                    className={styles.movieRandom__link}
                    to={`/movie/${data.id}`}
                  >
                    О фильме
                  </Link>
                  <Button
                    title={
                      !favoriteMovie ? (
                        <FavoriteIcon
                          className={styles.movieRandom__linksFavorite}
                        />
                      ) : (
                        <FavoriteFillIcon
                          className={styles.movieRandom__linksFavorite}
                        />
                      )
                    }
                    type="button"
                    variant="secondary"
                    size="circle"
                    onClick={() => handleFavoriteMovies(data?.id)}
                  />
                  <Button
                    title={
                      <ReloadIcon className={styles.movieRandom__linksReload} />
                    }
                    type="button"
                    variant="secondary"
                    size="circle"
                    onClick={refetch}
                  />
                </div>
              </div>
              <div className={styles.movieRandom__image}>
                <img
                  className={
                    data.posterUrl !== null
                      ? styles.movieRandom__imagePoster
                      : styles.movieRandom__imagePosterEmpty
                  }
                  src={
                    data.posterUrl !== null
                      ? data.posterUrl
                      : emptyPoster
                  }
                  alt={`Постер к фильму: ${data.title}`}
                />
              </div>
            </div>
            <Trailer
              trailerId={data.trailerUrl.split("=")[1]}
              backdropUrl={
                data.backdropUrl === null ? data.posterUrl : data.backdropUrl
              }
              visible={isVisibleTrailer}
              onClose={handleNotVisibleTrailer}
              title={data.title}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MovieRandom;
