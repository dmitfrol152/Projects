import { FC, useState } from "react";
import { IGenresProps } from "./types";
import styles from "./MoviesByGenre.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { GENRES_MOVIE } from "../../constants/genres";
import IconBack from "../../assets/images/icon-back.svg?react";
import { Button } from "../Button/Button";
import emptyPoster from "../../assets/images/emptyPoster/empty-poster.png";
import { ClipLoader } from "react-spinners";

export const MoviesByGenre: FC<IGenresProps> = ({
  data,
  loading,
  genre,
  nextPage,
  isLoadingMore,
  disabledBtn,
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  // Skeleton
  if (loading || !data) {
    return (
      <section className={styles.moviesByGenre}>
        <div className="container">
          <div className={styles.moviesByGenre__wrapper}>
            <h2 style={{ width: "394px", height: "56px" }}>
              <Skeleton
                height={56}
                highlightColor="#1b2a40"
                baseColor="#29364a"
              />
            </h2>
            <ul className={styles.moviesByGenre__list}>
              {Array(15)
                .fill(15)
                .map((_, i) => (
                  <li key={i}>
                    <Skeleton
                      height={336}
                      highlightColor="#1b2a40"
                      baseColor="#29364a"
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  const genres = Object.entries(GENRES_MOVIE);
  const finedGenres = genres.find(([key]) => key === genre);

  // Component
  return (
    <section className={styles.moviesByGenre}>
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
            <div className={styles.moviesByGenre__wrapper}>
              <Link to={"/movie/genres"} className={styles.moviesByGenre__link}>
                <span className={styles.moviesByGenre__title}>
                  <IconBack className={styles.moviesByGenre__icon} />
                  <span className={styles.moviesByGenre__text}>
                    {finedGenres
                      ? finedGenres[1].title
                      : "Страница с выбранным жанром"}
                  </span>
                </span>
              </Link>
              <ul className={styles.moviesByGenre__list}>
                {data?.map((movie) => (
                  <li key={movie.id}>
                    <Link
                      to={`/movie/${movie.id}`}
                      className={
                        movie.posterUrl !== null
                          ? `${styles.moviesByGenre__card}`
                          : `${styles.moviesByGenre__card} ${styles.moviesByGenre__cardEmpty}`
                      }
                    >
                      {imageLoading && (
                        <ClipLoader color="#dc5dfc" size={100} />
                      )}
                      <img
                        className={styles.moviesByGenre__cardPoster}
                        src={
                          movie.posterUrl !== null
                            ? movie.posterUrl
                            : emptyPoster
                        }
                        alt={`Постер к фильму: ${movie.title}`}
                        onLoad={() => setImageLoading(false)}
                      />
                    </Link>
                  </li>
                ))}
                {isLoadingMore && (
                  <>
                    {Array(15)
                      .fill(15)
                      .map((_, i) => (
                        <li key={`${i}`}>
                          <Skeleton
                            height={336}
                            highlightColor="#1b2a40"
                            baseColor="#29364a"
                          />
                        </li>
                      ))}
                  </>
                )}
              </ul>
              <div className={styles.moviesByGenre__btn}>
                {disabledBtn == false && (
                  <Button
                    title="Показать еще"
                    type="button"
                    variant="primary"
                    size="self"
                    onClick={nextPage}
                    isDisabled={isLoadingMore}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MoviesByGenre;
