import styles from "./Header.module.scss";
import { Search } from "../../../Search";
import { Navigation } from "../../../Navigation";
import { Logo } from "../../../Logo";
import Account from "../../../Account/Account";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__wrapper}>
          <Logo />
          <div className={styles.header__inner}>
            <Navigation />
            <Search type="text" label="Поиск фильма" placeholder="Поиск" />
          </div>
          <Account />
        </div>
      </div>
    </header>
  );
};

export default Header;
