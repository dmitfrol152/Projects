import { Link } from "react-router";
import LogoImg from "../../assets/images/logo/logo.png";
import LogoImg2x from "../../assets/images/logo/logo@2x.png";
import styles from "./Logo.module.scss";
import { AuthTypeObjectProps } from "../../store/types";
import { useDispatch, useSelector } from "react-redux";
import { setPostsType } from "../../store/authTypeSlice";

export const Logo = () => {
  const authTypeValue = useSelector(
    (state: AuthTypeObjectProps) => state.authTypeName.authTypeValue
  );
  const dispatch = useDispatch();

  const handleTypeValue = () => {
    if (authTypeValue !== "posts") {
      dispatch(setPostsType());
    }
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
