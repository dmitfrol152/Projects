import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";
import IconGenres from "../../assets/images/icon-genres.svg?react";

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      {/* Laptop */}

      <NavLink
        className={({ isActive }) =>
          `${styles.nav__links} ${isActive ? styles.nav__linksActive : ""}`
        }
        to="/"
      >
        Главная
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${styles.nav__links} ${isActive ? styles.nav__linksActive : ""}`
        }
        to="/movie/genres"
      >
        Жанры
      </NavLink>

      {/* Mobile */}
      <NavLink className={styles.nav__linksMobile} to="/movie/genres">
        <IconGenres className={styles.nav__linksMobileGenres} />
      </NavLink>
    </nav>
  );
};
