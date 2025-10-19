import type { ProductOftenSearchItemProps } from "./types";
import IconSearch from "@assets/images/svg/icon-search.svg?react";
import styles from "./ProductOftenSearchItem.module.scss";

export function ProductOftenSearchItem({
  phrase,
  handleClickPhrase,
}: ProductOftenSearchItemProps) {
  return (
    <li
      onMouseDown={() => handleClickPhrase(phrase)}
      className={styles.oftenSearchItem}
    >
      <IconSearch className={styles.oftenSearchItem__icon} />
      <div className={styles.oftenSearchItem__block}>
        <span className={styles.oftenSearchItem__text}>{phrase}</span>
      </div>
    </li>
  );
}
