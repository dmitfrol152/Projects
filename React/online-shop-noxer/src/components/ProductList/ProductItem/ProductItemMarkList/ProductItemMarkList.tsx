import type { MarksProps } from "./types";
import styles from "./ProductItemMarkList.module.scss";
import { ProductItemMarkItem } from "../ProductItemMarkItem";

export function ProductItemMarkList({ marks }: MarksProps) {
  if (!marks.length) return null;

  return (
    <ul className={styles.productItemMarkList}>
      {marks.map((mark, index) => (
        <li key={index}>
          <ProductItemMarkItem mark={mark} />
        </li>
      ))}
    </ul>
  );
}
