import type { CategoriesListProps } from "./types";
import styles from "./CategoriesList.module.scss";
import { CategoriesItem } from "./CategoriesItem";

export function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <ul className={styles.categoriesList}>
      {categories.map((category) => (
        <CategoriesItem key={category.Category_ID} category={category} />
      ))}
    </ul>
  );
}
