import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <Link className={styles.logo} to="/">
      <img
        className={styles.logo__img}
        src="/src/assets/images/logo/img-logo.png"
        srcSet="/src/assets/images/logo/img-logo@2x.png 2x"
        alt="Логотип"
        aria-label="Перейти на главную"
      />
    </Link>
  );
};
