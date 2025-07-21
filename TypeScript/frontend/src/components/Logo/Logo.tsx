import { Link } from "react-router";
import LogoImg from "../../assets/images/logo/logo.png";
import LogoImg2x from "../../assets/images/logo/logo@2x.png";
import styles from "./Logo.module.scss";
import { useDispatch } from "react-redux";
import { searchAction } from "../../store/searchSlice";
import { audioGroupChoiceAction } from "../../store/audioGroupChoiceSlice";

export const Logo = () => {
  const dispatch = useDispatch();

  function handleEmptySearchValue() {
    dispatch(searchAction({ searchValue: "" }));
    dispatch(audioGroupChoiceAction({ audioGroupChoiceValue: false }));
  }

  return (
    <Link className={styles.logo} to={"/"} onClick={handleEmptySearchValue}>
      <img
        className={styles.logo__img}
        src={LogoImg}
        srcSet={`${LogoImg2x} 2x`}
        alt="Логотип"
        aria-label="Перейти на главную"
      />
    </Link>
  );
};

export default Logo;
