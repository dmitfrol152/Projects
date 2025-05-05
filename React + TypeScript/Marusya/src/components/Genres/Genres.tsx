import { FC } from "react";
import { IGenresProps } from "./types";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Genres.module.scss";
import Skeleton from "react-loading-skeleton";
import GENRES_MOVIE from "../../constants/genres";
import { Link } from "react-router-dom";

export const Genres: FC<IGenresProps> = ({ data, loading }) => {
  // Skeleton
  if (loading || !data) {
    return (
      <section className={styles.genres}>
        <div className="container">
          <div className={styles.genres__wrapper}>
            <h2 style={{ width: "394px", height: "56px" }}>
              <Skeleton
                height={56}
                highlightColor="#1b2a40"
                baseColor="#29364a"
              />
            </h2>
            <ul className={styles.genres__list}>
              {Array(12)
                .fill(12)
                .map((_, i) => (
                  <li key={i}>
                    <Skeleton
                      height={304}
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

  // Component
  return (
    <section className={styles.genres}>
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
            <div className={styles.genres__wrapper}>
              <h2 className={styles.genres__title}>Жанры фильмов</h2>
              <ul className={styles.genres__list}>
                {data.map((genre) => {
                  const movieGenre = Object.entries(GENRES_MOVIE);
                  return movieGenre.map(([key, value]) => {
                    if (key === genre) {
                      return (
                        <li key={genre}>
                          <Link
                            to={`/movie?genres=${key}`}
                            className={styles.genres__card}
                          >
                            <img
                              className={styles.genres__cardImage}
                              src={value.image}
                              alt={value.alt}
                            />
                            <span className={styles.genres__cardText}>
                              {value.title}
                            </span>
                          </Link>
                        </li>
                      );
                    }
                  });
                })}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Genres;
