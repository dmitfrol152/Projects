import { Link, useSearchParams } from "react-router";
import LogoImg from "../../assets/images/logo/logo.png";
import LogoImg2x from "../../assets/images/logo/logo@2x.png";
import styles from "./Logo.module.scss";
import { useDispatch } from "react-redux";
import { setEditFormValue } from "../../store/editFormSlice";

export const Logo = () => {
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();

  const handleTypeValue = () => {
    dispatch(setEditFormValue({ editFormValue: false }));
    setSearchParams({});
  };

  return (
    <Link className={styles.logo} to="/" onClick={handleTypeValue}>
      <img
        className={styles.logo__image}
        src={LogoImg}
        srcSet={`${LogoImg2x} 2x`}
        alt="Логотип"
        aria-label="Перейти на главную"
      />
    </Link>
  );
};

export default Logo;
