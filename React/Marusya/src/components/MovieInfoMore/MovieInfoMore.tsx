import { FC } from "react";
import { IMovieProps } from "./types";
import styles from "./movieInfoMore.module.scss";
import Skeleton from "react-loading-skeleton";
import { AnimatePresence, motion } from "framer-motion";

export const MovieInfoMore: FC<IMovieProps> = ({ data, loading }) => {
  // Skeleton
  if (loading || !data) {
    return (
      <section className={styles.movieInfoMore}>
        <div className="container">
          <div className={styles.movieInfoMore__wrapper}>
            <div className={styles.movieInfoMore__info}>
              <div className={styles.movieInfoMore__information}>
                <div className={styles.movieInfoMore__informationSecondaery}>
                  <Skeleton
                    height={28}
                    highlightColor="#1b2a40"
                    baseColor="#29364a"
                  />
                </div>
                <h2 className={styles.movieInfoMore__informationTitle}>
                  <Skeleton
                    height={56}
                    highlightColor="#1b2a40"
                    baseColor="#29364a"
                  />
                </h2>
                <p className={styles.movieInfoMore__informationDescription}>
                  <Skeleton
                    count={3}
                    height={32}
                    highlightColor="#1b2a40"
                    baseColor="#29364a"
                  />
                </p>
              </div>
            </div>
            <div className={styles.movieInfoMore__image}>
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
    <section className={styles.movieInfoMore}>
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
            <div className={styles.movieInfoMore__wrapper}>
              <h2 className={styles.movieInfoMore__title}>О фильме</h2>
              <ul className={styles.movieInfoMore__list}>
                <li className={styles.movieInfoMore__item}>
                  <span className={styles.movieInfoMore__inner}>
                    <span className={styles.movieInfoMore__text}>
                      Язык оригинала
                    </span>
                    <span className={styles.movieInfoMore__dots}></span>
                  </span>
                  <span className={styles.movieInfoMore__textMore}>
                    {data.language}
                  </span>
                </li>
                <li className={styles.movieInfoMore__item}>
                  <span className={styles.movieInfoMore__inner}>
                    <span className={styles.movieInfoMore__text}>Бюджет</span>
                    <span className={styles.movieInfoMore__dots}></span>
                  </span>
                  <span className={styles.movieInfoMore__textMore}>
                    {data.budget === null
                      ? "Нет информации"
                      : `${Number(data.budget).toLocaleString("ru-RU")} руб.`}
                  </span>
                </li>
                <li className={styles.movieInfoMore__item}>
                  <span className={styles.movieInfoMore__inner}>
                    <span className={styles.movieInfoMore__text}>Выручка</span>
                    <span className={styles.movieInfoMore__dots}></span>
                  </span>
                  <span className={styles.movieInfoMore__textMore}>
                    {data.revenue === null
                      ? "Нет информации"
                      : `${Number(data.revenue).toLocaleString("ru-RU")} руб.`}
                  </span>
                </li>
                <li className={styles.movieInfoMore__item}>
                  <span className={styles.movieInfoMore__inner}>
                    <span className={styles.movieInfoMore__text}>Режиссёр</span>
                    <span className={styles.movieInfoMore__dots}></span>
                  </span>
                  <span className={styles.movieInfoMore__textMore}>
                    {data.director === null ? "Нет информации" : data.director}
                  </span>
                </li>
                <li className={styles.movieInfoMore__item}>
                  <span className={styles.movieInfoMore__inner}>
                    <span className={styles.movieInfoMore__text}>
                      Продакшен
                    </span>
                    <span className={styles.movieInfoMore__dots}></span>
                  </span>
                  <span className={styles.movieInfoMore__textMore}>
                    {data.production === null
                      ? "Нет информации"
                      : data.production}
                  </span>
                </li>
                <li className={styles.movieInfoMore__item}>
                  <span className={styles.movieInfoMore__inner}>
                    <span className={styles.movieInfoMore__text}>Награды</span>
                    <span className={styles.movieInfoMore__dots}></span>
                  </span>
                  <span className={styles.movieInfoMore__textMore}>
                    {data.awardsSummary === null
                      ? "Нет информации"
                      : data.awardsSummary}
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MovieInfoMore;
