import { FC, useEffect, useState } from "react";
import { IMovieProps } from "./types";
import styles from "./MovieInfoHero.module.scss";
import Skeleton from "react-loading-skeleton";
import StarIcon from "../../assets/images/icon-star.svg?react";
import FavoriteIcon from "../../assets/images/icon-favorite.svg?react";
import FavoriteFillIcon from "../../assets/images/icon-favorite-fill.svg?react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../Button/Button";
import { useDispatch } from "react-redux";
import useProfile from "../../hooks/useProfile";
import useFavoriteMovie from "../../hooks/useFavoriteMovie";
import { authFormVisible } from "../../store/authFormVisibleSlice";
import { Trailer } from "../Trailer";
import emptyPoster from "../../assets/images/emptyPoster/empty-poster.png";
import { ClipLoader } from "react-spinners";

export const MovieInfoHero: FC<IMovieProps> = ({ data, loading }) => {
  const {
    data: dataProfile,
    isError: isErrorProfile,
    isSuccess: isSuccessProfile,
    refetch: refetchProfile,
  } = useProfile();
  const { deleteFavoriteMovie, postFavoriteMovie } = useFavoriteMovie();
  const dispatch = useDispatch();
  const [isVisibleTrailer, setIsVisibleTrailer] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

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
      <section className={styles.movieInfoHero}>
        <div className="container">
          <div className={styles.movieInfoHero__wrapper}>
            <div className={styles.movieInfoHero__info}>
              <div className={styles.movieInfoHero__information}>
                <div className={styles.movieInfoHero__informationSecondaery}>
                  <Skeleton
                    height={28}
                    highlightColor="#1b2a40"
                    baseColor="#29364a"
                  />
                </div>
                <h2 className={styles.movieInfoHero__informationTitle}>
                  <Skeleton
                    height={56}
                    highlightColor="#1b2a40"
                    baseColor="#29364a"
                  />
                </h2>
                <p className={styles.movieInfoHero__informationDescription}>
                  <Skeleton
                    count={3}
                    height={32}
                    highlightColor="#1b2a40"
                    baseColor="#29364a"
                  />
                </p>
              </div>
            </div>
            <div className={styles.movieInfoHero__image}>
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
    <section className={styles.movieInfoHero}>
      <div className="container">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <div className={styles.movieInfoHero__wrapper}>
              <div className={styles.movieInfoHero__info}>
                <div className={styles.movieInfoHero__information}>
                  <div className={styles.movieInfoHero__informationSecondaery}>
                    <span
                      className={
                        Number(data.tmdbRating.toFixed(1)) >= 8.6
                          ? `${styles.movieInfoHero__informationRating} ${styles.movieInfoHero__informationRatingGold}`
                          : Number(data.tmdbRating.toFixed(1)) >= 7.5
                          ? `${styles.movieInfoHero__informationRating} ${styles.movieInfoHero__informationRatingGreen}`
                          : Number(data.tmdbRating.toFixed(1)) >= 6.3
                          ? `${styles.movieInfoHero__informationRating} ${styles.movieInfoHero__informationRatingGray}`
                          : Number(data.tmdbRating.toFixed(1)) > 0.0
                          ? `${styles.movieInfoHero__informationRating} ${styles.movieInfoHero__informationRatingRed}`
                          : `${styles.movieInfoHero__informationRating} ${styles.movieInfoHero__informationRatingWhite}`
                      }
                    >
                      <StarIcon
                        className={styles.movieInfoHero__informationIcon}
                      />
                      <span className={styles.movieInfoHero__informationText}>
                        {data.tmdbRating.toFixed(1)}
                      </span>
                    </span>
                    <span className={styles.movieInfoHero__informationYear}>
                      {data.releaseDate?.split("-")[0]}
                    </span>
                    {data.genres.length > 0 && (
                      <span className={styles.movieInfoHero__informationGenres}>
                        {data.genres.join(", ")}
                      </span>
                    )}
                    <span className={styles.movieInfoHero__informationTime}>
                      {`${Math.floor(data.runtime / 60)} ч ${
                        data.runtime % 60
                      } мин`}
                    </span>
                  </div>
                  <h2 className={styles.movieInfoHero__informationTitle}>
                    {data.title}
                  </h2>
                  <p className={styles.movieInfoHero__informationDescription}>
                    {data.plot}
                  </p>
                </div>
                <div className={styles.movieInfoHero__links}>
                  <Button
                    title="Трейлер"
                    type="button"
                    variant="primary"
                    size="medium"
                    onClick={handleVisibleTrailer}
                  />
                  <Button
                    title={
                      !favoriteMovie ? (
                        <FavoriteIcon
                          className={styles.movieInfoHero__linksFavorite}
                        />
                      ) : (
                        <FavoriteFillIcon
                          className={styles.movieInfoHero__linksFavorite}
                        />
                      )
                    }
                    type="button"
                    variant="secondary"
                    size="circle"
                    onClick={() => handleFavoriteMovies(data?.id)}
                  />
                </div>
              </div>
              <div className={styles.movieInfoHero__image}>
                {imageLoading && <ClipLoader color="#dc5dfc" size={100} />}
                <img
                  className={
                    data.posterUrl !== null
                      ? styles.movieInfoHero__imagePoster
                      : styles.movieInfoHero__imagePosterEmpty
                  }
                  src={data.posterUrl !== null ? data.posterUrl : emptyPoster}
                  alt={`Постер к фильму: ${data.title}`}
                  onLoad={() => setImageLoading(false)}
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

export default MovieInfoHero;
