import styles from "./ProductSearchItem.module.scss";
import NoPicture from "@assets/images/png/no-pictures.png";
import { useState } from "react";
import { LoaderUi } from "@/ui/LoaderUi";
import { getLocaleRuPrices } from "@/utils/getLocaleRuPrices";
import { useScalePricesCalculate } from "@/hooks/useScalePricesCalculate";
import type { ProductSearchItemProps } from "./types";
import { LinkUi } from "@/ui/LinkUi";

export function ProductSearchItem({ product }: ProductSearchItemProps) {
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);
  const [isVisibleButton, setIsVisibleButton] = useState<boolean>(false);
  const { getScale } = useScalePricesCalculate(
    product.price,
    product.old_price
  );

  const imageSrc =
    product.images.find((image) => image.MainImage)?.Image_URL || NoPicture;

  return (
    <article
      onMouseOver={() => {
        setIsVisibleButton(true);
      }}
      onMouseOut={() => setIsVisibleButton(false)}
      className={styles.productSearchItem}
    >
      <div className={styles.productSearchItem__image}>
        {isLoadingImage && (
          <div className={styles.productSearchItem__imageLoader}>
            <LoaderUi />
          </div>
        )}
        {imageSrc && (
          <img
            src={imageSrc}
            alt={product.name}
            onLoad={() => setIsLoadingImage(false)}
          />
        )}
      </div>

      <div className={styles.productSearchItem__info}>
        <div className={styles.productSearchItem__infoPrices}>
          <span className={styles.productSearchItem__infoPricesCurrent}>
            {getLocaleRuPrices(product.price)}
          </span>
          {product.old_price && getScale && (
            <>
              <span className={styles.productSearchItem__infoPricesOld}>
                {getLocaleRuPrices(product.old_price)}
              </span>
              <span className={styles.productSearchItem__infoPricesScale}>
                {`-${getScale}%`}
              </span>
            </>
          )}
        </div>
        <h3 className={styles.productSearchItem__infoTitle}>{product.name}</h3>
      </div>
      {isVisibleButton && (
        <div className={styles.productSearchItem__button}>
          <LinkUi variant="search" to="#" target="_blank">
            <span>Перейти</span>
          </LinkUi>
        </div>
      )}
    </article>
  );
}
