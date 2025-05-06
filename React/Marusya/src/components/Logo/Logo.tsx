import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";
import logoImg from "../../assets/images/logo/img-logo.png";
import logoImg2x from "../../assets/images/logo/img-logo@2x.png";

export const Logo = () => {
  return (
    <Link className={styles.logo} to="/">
      <img
        className={styles.logo__img}
        src={logoImg}
        srcSet={`${logoImg2x} 2x`}
        alt="Логотип"
        aria-label="Перейти на главную"
      />
    </Link>
  );
};
