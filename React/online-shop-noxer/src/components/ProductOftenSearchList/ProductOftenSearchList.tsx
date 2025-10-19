import styles from "./ProductOftenSearchList.module.scss";
import type { ProductOftenSearchListProps } from "./types";
import { ProductOftenSearchItem } from "./ProductOftenSearchItem";

export function ProductOftenSearchList({
  oftenSearchList,
  handleClickPhrase,
}: ProductOftenSearchListProps) {
  if (!oftenSearchList.length)
    return <div className={styles.productOftenSearch__error}>Empty list</div>;

  return (
    <div className={styles.productOftenSearch}>
      <p className={styles.productOftenSearch__title}>Часто ищут</p>
      <ul className={styles.productOftenSearch__list}>
        {oftenSearchList.map((phrase, index) => (
          <ProductOftenSearchItem
            key={index}
            phrase={phrase}
            handleClickPhrase={handleClickPhrase}
          />
        ))}
      </ul>
    </div>
  );
}
