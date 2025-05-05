import { Link } from "react-router-dom";
import IconGitHub from "../../../../assets/images/icon-git.svg?react";
import IconInstagram from "../../../../assets/images/icon-instagram.svg?react";
import IconTelegram from "../../../../assets/images/icon-telegram.svg?react";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <ul className={styles.footer__list}>
          <li>
            <Link
              target="_blank"
              className={styles.footer__link}
              to="https://github.com/dmitfrol152"
            >
              <IconGitHub className={styles.footer__icon} />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              className={styles.footer__link}
              to="https://t.me/dimon_frolkov"
            >
              <IconTelegram className={styles.footer__icon} />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              className={styles.footer__link}
              to="https://www.instagram.com/dimon_frolkov"
            >
              <IconInstagram className={styles.footer__icon} />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
