import styles from "./NavUi.module.scss";

export function NavUi() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__item}>
          <a className={styles.nav__link} href="#about">
            About us
          </a>
        </li>
        <li>
          <a className={styles.nav__link} href="#services">
            Services
          </a>
        </li>
        <li>
          <a className={styles.nav__link} href="#why">
            Why DevOptima
          </a>
        </li>
      </ul>
    </nav>
  );
}
