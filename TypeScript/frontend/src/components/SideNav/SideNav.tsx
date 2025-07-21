import type { FC } from "react";
import { Button } from "../Button";
import styles from "./SideNav.module.scss";
import IconMusic from "/src/assets/images/svg/icon-music.svg?react";
import type { audioGroupChoiceProps, SideNavProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { audioGroupChoiceAction } from "../../store/audioGroupChoiceSlice";
import { useNavigate } from "react-router";

export const SideNav: FC<SideNavProps> = ({ userIsAuth }) => {
  const audioGroupChoice = useSelector(
    (state: audioGroupChoiceProps) =>
      state.audioGroupChoiceName.audioGroupChoiceValue
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChangeFavorites() {
    dispatch(audioGroupChoiceAction({ audioGroupChoiceValue: true }));
    navigate({
      pathname: "/",
      search: "?music=favorites",
    });
  }

  function handleChangeAll() {
    dispatch(audioGroupChoiceAction({ audioGroupChoiceValue: false }));
    navigate("/");
  }

  return (
    <ul className={styles.sideNav}>
      {userIsAuth && (
        <li>
          <Button
            title={
              <div className={styles.sideNav__button}>
                <IconMusic className={styles.sideNav__buttonSvg} />
                <span className={styles.sideNav__buttonText}>Избранное</span>
              </div>
            }
            type="button"
            variant="main"
            size="main"
            onClick={handleChangeFavorites}
            isActive={audioGroupChoice === true}
          />
        </li>
      )}
      <li>
        <Button
          title={
            <div className={styles.sideNav__button}>
              <IconMusic className={styles.sideNav__buttonSvg} />
              <span className={styles.sideNav__buttonText}>
                Аудиокомпозиции
              </span>
            </div>
          }
          type="button"
          variant="main"
          size="main"
          onClick={handleChangeAll}
          isActive={audioGroupChoice === false}
        />
      </li>
    </ul>
  );
};

export default SideNav;
