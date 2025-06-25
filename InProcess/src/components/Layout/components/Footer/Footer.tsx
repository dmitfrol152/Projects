import { Link } from "react-router";
import IconGitHub from "../../../../assets/images/svg/icon-git.svg?react";
import IconInstagram from "../../../../assets/images/svg/icon-instagram.svg?react";
import IconTelegram from "../../../../assets/images/svg/icon-telegram.svg?react";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <ul className={styles.footer__list}>
          <li>
            <Link
              className={styles.footer__link}
              target="_blank"
              to="https://github.com/dmitfrol152"
            >
              <IconGitHub />
            </Link>
          </li>
          <li>
            <Link
              className={styles.footer__link}
              target="_blank"
              to="https://t.me/dimon_frolkov"
            >
              <IconTelegram />
            </Link>
          </li>
          <li>
            <Link
              className={styles.footer__link}
              target="_blank"
              to="https://www.instagram.com/dimon_frolkov"
            >
              <IconInstagram />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
