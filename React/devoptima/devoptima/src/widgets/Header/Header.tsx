import Button from "../../shared/ui/ButtonUi/Button";
import styles from "./Header.module.scss";
import IconLogo from "../../shared/assets/images/svg/icon-logo.svg?react";
import { NavUi } from "../../shared/ui/NavUi/NavUi";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__inner}>
          <div className={styles.header__logo}>
            <IconLogo className={styles.header__logoSvg} />
            <span className={styles.header__logoText}>DevOptima</span>
          </div>
          <NavUi />
          <div className={styles.header__button}>
            <Button type="button" variant="primary" size="small">
              Get started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
