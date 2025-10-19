import styles from "./Footer.module.scss";
import { Social } from "../Social";
import { useLocation } from "react-router";
import { LinkUi } from "@/ui/LinkUi";
import IconTgSmall from "@assets/images/svg/icon-tg-small.svg?react";

export function Footer() {
  const location = useLocation();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__wrapper}>
          <div className={styles.footer__developer}>
            <span className={styles.footer__developerText}>
              Разработано на платформе Noxer
            </span>
            <LinkUi variant="small" to="#" target="_blank">
              <IconTgSmall className={styles.footer__developerIcon} />
              <span>noxerai_bot</span>
            </LinkUi>
          </div>
          <Social location={location.pathname} />
        </div>
      </div>
    </footer>
  );
}
