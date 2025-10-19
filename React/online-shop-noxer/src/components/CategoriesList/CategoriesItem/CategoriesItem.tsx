import type { CategoriesItemProps } from "./types";
import styles from "./CategoriesItem.module.scss";
import { LinkUi } from "@/ui/LinkUi";
import { useState, memo } from "react";
import NoPicture from "@assets/images/png/no-pictures.png";
import { LoaderUi } from "@/ui/LoaderUi";

export const CategoriesItem = memo(function CategoriesItem({ category }: CategoriesItemProps) {
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);

  const imageSrc = category.Category_Image || NoPicture;

  return (
    <li className={styles.categoriesItem}>
      <LinkUi to="#" target="_blank" variant="card">
        <div className={styles.categoriesItem__wrapper}>
          <div className={styles.categoriesItem__image}>
            {isLoadingImage && (
              <div className={styles.categoriesItem__imageLoader}>
                <LoaderUi />
              </div>
            )}
            <img
              src={imageSrc}
              alt={category.Category_Name}
              loading="lazy"
              onLoad={() => setIsLoadingImage(false)}
            />
          </div>
          <span className={styles.categoriesItem__text}>
            {category.Category_Name}
          </span>
        </div>
      </LinkUi>
    </li>
  );
});
