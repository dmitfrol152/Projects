import { FC, useState } from "react";
import styles from "./MovieTop.module.scss";
import { IMovieTopProps } from "./types";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import emptyPoster from "../../assets/images/emptyPoster/empty-poster.png";
import { ClipLoader } from "react-spinners";

export const MovieTop: FC<IMovieTopProps> = ({ data, loading }) => {
  const [imageLoading, setImageLoading] = useState(true);

  // Skeleton
  if (loading || !data) {
    return (
      <section className={styles.movieTop}>
        <div className="container">
          <ul className={styles.movieTop__wrapper}>
            {Array(10)
              .fill(10)
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
      </section>
    );
  }

  // Component
  return (
    <section className={styles.movieTop}>
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
            <div className={styles.movieTop__inner}>
              <h2 className={styles.movieTop__title}>Топ 10 фильмов</h2>
              <ul className={styles.movieTop__wrapper}>
                {data.map((movie, index) => {
                  return (
                    <li key={movie.id}>
                      <Link
                        to={`/movie/${movie.id}`}
                        className={
                          movie.posterUrl !== null
                            ? `${styles.movieTop__card}`
                            : `${styles.movieTop__card} ${styles.movieTop__cardShadowNone}`
                        }
                      >
                        {imageLoading && (
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              zIndex: 1,
                            }}
                          >
                            <ClipLoader color="#dc5dfc" size={100} />
                          </div>
                        )}
                        <img
                          className={
                            movie.posterUrl !== null
                              ? `${styles.movieTop__cardPoster}`
                              : `${styles.movieTop__cardPosterHeight}`
                          }
                          src={
                            movie.posterUrl !== null
                              ? movie.posterUrl
                              : emptyPoster
                          }
                          alt={`Постер к фильму: ${movie.title}`}
                          onLoad={() => setImageLoading(false)}
                        />
                        {movie.posterUrl === null && (
                          <span className={styles.movieTop__cardEmptyPoster}>
                            {movie.title}
                          </span>
                        )}
                        <span className={styles.movieTop__cardNumber}>
                          {index + 1}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MovieTop;
