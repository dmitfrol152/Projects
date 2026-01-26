import styles from "./Footer.module.scss";
import IconLogo from "../../shared/assets/images/svg/icon-logo.svg?react";
import IconTwitter from "../../shared/assets/images/svg/icon-twitter.svg?react";
import IconLD from "../../shared/assets/images/svg/icon-linkedin.svg?react";
import IconGH from "../../shared/assets/images/svg/icon-github.svg?react";
import IconDis from "../../shared/assets/images/svg/icon-dis.svg?react";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__top}>
          <div className={styles.footer__logo}>
            <IconLogo className={styles.footer__logoSvg} />
            <span className={styles.footer__logoText}>DevOptima</span>
          </div>
          <div className={styles.footer__right}>
            <div className={styles.footer__column}>
              <h3 className={styles.footer__columnTitle}>Resources</h3>
              <ul className={styles.footer__columnList}>
                <li>
                  <a className={styles.footer__columnLink} href="#">
                    Docs
                  </a>
                </li>
                <li>
                  <a className={styles.footer__columnLink} href="#">
                    Release notes
                  </a>
                </li>
                <li>
                  <a className={styles.footer__columnLink} href="#">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.footer__column}>
              <h3 className={styles.footer__columnTitle}>Community</h3>
              <ul className={styles.footer__columnList}>
                <li>
                  <a className={styles.footer__columnLink} href="#">
                    <IconTwitter className={styles.footer__columnIcon} />
                    Twitter
                  </a>
                </li>
                <li>
                  <a className={styles.footer__columnLink} href="#">
                    <IconLD className={styles.footer__columnIcon} />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a className={styles.footer__columnLink} href="#">
                    <IconGH className={styles.footer__columnIcon} />
                    GitHub
                  </a>
                </li>
                <li>
                  <a className={styles.footer__columnLink} href="#">
                    <IconDis className={styles.footer__columnIcon} />
                    Discourse
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.footer__column}>
              <h3 className={styles.footer__columnTitle}>Legal</h3>
              <ul className={styles.footer__columnList}>
                <li>
                  <a className={styles.footer__columnLink} href="#">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a className={styles.footer__columnLink} href="#">
                    Terms of service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.footer__copyright}>
          <span>Devoptima 2023 © All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
