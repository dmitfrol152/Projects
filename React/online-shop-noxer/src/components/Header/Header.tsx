import { ButtonUi } from "@/ui/ButtonUi";
import styles from "./Header.module.scss";
import IconClose from "@assets/images/svg/icon-close.svg?react";
import IconArrow from "@assets/images/svg/icon-arrow.svg?react";
import IconMore from "@assets/images/svg/icon-more.svg?react";
import IconTg from "@assets/images/svg/icon-tg.svg?react";
import { LinkUi } from "@/ui/LinkUi";

export function Header() {
  function handleCloseHeader() {
    alert("close");
  }

  function handleMoreInfo() {
    alert("more info");
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__wrapper}>
          <ButtonUi
            type="button"
            variant="secondary"
            size="secondary"
            onClick={handleCloseHeader}
          >
            <span className={styles.header__close}>
              <IconClose className={styles.header__closeIcon} />
              <span>Закрыть</span>
            </span>
          </ButtonUi>
          <LinkUi variant="primary" to="#" target="_blank">
            <IconTg className={styles.header__linkIcon} />
            <span>наш tg-канал</span>
          </LinkUi>
          <ButtonUi
            type="button"
            variant="secondary"
            size="secondary"
            onClick={handleMoreInfo}
          >
            <span className={styles.header__right}>
              <IconArrow className={styles.header__rightArrow} />
              <IconMore className={styles.header__rightMore} />
            </span>
          </ButtonUi>
        </div>
      </div>
    </header>
  );
}
