import styles from "./ProfileUser.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AnimatePresence, motion } from "framer-motion";
import FavoriteIcon from "../../assets/images/icon-favorite.svg?react";
import UserIcon from "../../assets/images/icon-user.svg?react";
import { Button } from "../Button/Button";
import { FC, useEffect, useState } from "react";
import { DataProfileProps } from "./types";
import { Link } from "react-router-dom";
import IconMail from "../../assets/images/icon-mail.svg?react";
import IconClose from "../../assets/images/icon-close.svg?react";
import useFavoriteMovie from "../../hooks/useFavoriteMovie";

export const ProfileUser: FC<DataProfileProps> = ({
  dataProfile,
  dataFavoritesMovie,
  loading,
  exitMutation,
}) => {
  const [activeLink, setActiveLink] = useState("favorites");
  const [widthScreen, setWidthScreen] = useState(innerWidth);
  const { deleteFavoriteMovie } = useFavoriteMovie();

  function handleExit() {
    exitMutation.mutate();
  }

  useEffect(() => {
    const handleResize = () => setWidthScreen(innerWidth);
    addEventListener("resize", handleResize);
  }, []);

  function handleFavoriteMovies(id: number) {
    const favoritesProfileArray = dataProfile?.favorites || [];
    const favoriteMovie = favoritesProfileArray?.find(
      (favoriteMovieId) => favoriteMovieId === String(id)
    );

    if (favoriteMovie) {
      deleteFavoriteMovie.mutate(id);
    }
  }

  // Skeleton
  if (loading || !dataFavoritesMovie) {
    return (
      <section className={styles.profileUser}>
        <div className="container">
          <div className={styles.profileUser__wrapper}>
            <div style={{ width: "299px", height: "56px" }}>
              <Skeleton
                height={56}
                highlightColor="#1b2a40"
                baseColor="#29364a"
              />
            </div>
            <div style={{ width: "575px", height: "56px" }}>
              <Skeleton
                height={56}
                highlightColor="#1b2a40"
                baseColor="#29364a"
              />
            </div>

            <ul className={styles.profileUser__favorites}>
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

  // Component
  return (
    <section className={styles.profileUser}>
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
            <div className={styles.profileUser__wrapper}>
              <h2 className={styles.profileUser__title}>Мой аккаунт</h2>
              <div className={styles.profileUser__links}>
                <Button
                  title={
                    <span className={styles.profileUser__linksBlock}>
                      <FavoriteIcon
                        className={styles.profileUser__linksBlockIcon}
                      />
                      <span className={styles.profileUser__linksBlockText}>
                        {widthScreen <= 768 ? "Избранное" : "Избранные фильмы"}
                      </span>
                    </span>
                  }
                  type="button"
                  variant="profile"
                  active={activeLink === "favorites"}
                  onClick={() => setActiveLink("favorites")}
                />
                <Button
                  title={
                    <span className={styles.profileUser__linksBlock}>
                      <UserIcon
                        className={styles.profileUser__linksBlockIcon}
                      />
                      <span className={styles.profileUser__linksBlockText}>
                        {widthScreen <= 768
                          ? "Настройки"
                          : "Настройка аккаунта"}
                      </span>
                    </span>
                  }
                  type="button"
                  variant="profile"
                  active={activeLink === "settings"}
                  onClick={() => setActiveLink("settings")}
                />
              </div>
              {activeLink === "favorites" && (
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
                    <div style={{ display: "flex" }}>
                      <ul className={styles.profileUser__favorites}>
                        {dataFavoritesMovie?.map((movie) => (
                          <li
                            className={styles.profileUser__favoritesItem}
                            key={movie.id}
                          >
                            <Link
                              to={`/movie/${movie.id}`}
                              className={
                                movie.posterUrl !== null
                                  ? `${styles.profileUser__card}`
                                  : `${styles.profileUser__card} ${styles.profileUser__cardEmpty}`
                              }
                            >
                              <img
                                className={styles.profileUser__cardPoster}
                                src={
                                  movie.posterUrl !== null
                                    ? movie.posterUrl
                                    : "/src/assets/images/emptyPoster/empty-poster.png"
                                }
                                alt={`Постер к фильму: ${movie.title}`}
                              />
                            </Link>
                            <Button
                              title={
                                <IconClose
                                  className={styles.profileUser__close}
                                />
                              }
                              type="button"
                              variant="closeFavotites"
                              onClick={() => handleFavoriteMovies(movie.id)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
              {activeLink === "settings" && (
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
                    <ul className={styles.profileUser__list}>
                      <li className={styles.profileUser__item}>
                        <span className={styles.profileUser__circle}>
                          {`${dataProfile?.name
                            .slice(0, 1)
                            .toUpperCase()}${dataProfile?.surname
                            .slice(0, 1)
                            .toUpperCase()}`}
                        </span>
                        <div className={styles.profileUser__info}>
                          <span className={styles.profileUser__infoTitle}>
                            Имя Фамилия
                          </span>
                          <span
                            className={styles.profileUser__infoProfile}
                          >{`${dataProfile?.name
                            .slice(0, 1)
                            .toUpperCase()}${dataProfile?.name.slice(
                            1
                          )} ${dataProfile?.surname
                            .slice(0, 1)
                            .toUpperCase()}${dataProfile?.surname.slice(
                            1
                          )}`}</span>
                        </div>
                      </li>
                      <li className={styles.profileUser__item}>
                        <span className={styles.profileUser__circle}>
                          <IconMail className={styles.profileUser__icon} />
                        </span>
                        <div className={styles.profileUser__info}>
                          <span className={styles.profileUser__infoTitle}>
                            Электронная почта
                          </span>
                          <span className={styles.profileUser__infoProfile}>
                            {`${dataProfile?.email
                              .slice(0, 1)
                              .toUpperCase()}${dataProfile?.email.slice(1)}`}
                          </span>
                        </div>
                      </li>
                    </ul>
                    <Button
                      title="Выйти из аккаунта"
                      type="button"
                      variant="primary"
                      size="self"
                      onClick={handleExit}
                      isDisabled={loading}
                    />
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProfileUser;
