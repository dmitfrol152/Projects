import { Account } from "../../../Account";
import { Logo } from "../../../Logo";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__wrapper}>
          <Logo />
          <Account />
        </div>
      </div>
    </header>
  );
};

export default Header;
