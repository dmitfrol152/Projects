import type { ProductItemProps } from "./types";
import styles from "./ProductItem.module.scss";
import NoPicture from "@assets/images/png/no-pictures.png";
import { useState, memo } from "react";
import { ProductItemMarkList } from "./ProductItemMarkList";
import { LoaderUi } from "@/ui/LoaderUi";
import { getLocaleRuPrices } from "@/utils/getLocaleRuPrices";
import { useScalePricesCalculate } from "@/hooks/useScalePricesCalculate";
import { ButtonUi } from "@/ui/ButtonUi";

export const ProductItem = memo(function ProductItem({ product }: ProductItemProps) {
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);
  const { getScale } = useScalePricesCalculate(
    product.price,
    product.old_price
  );

  const imageSrc =
    product.images.find((image) => image.MainImage)?.Image_URL || NoPicture;

  function hanldeClickCard() {
    alert("Click card");
  }

  return (
    <article className={styles.productItem}>
      <div className={styles.productItem__image}>
        {isLoadingImage && (
          <div className={styles.productItem__imageLoader}>
            <LoaderUi />
          </div>
        )}
        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          onLoad={() => setIsLoadingImage(false)}
        />
        <ProductItemMarkList marks={product.marks} />
      </div>

      <div className={styles.productItem__info}>
        <div className={styles.productItem__infoText}>
          <div className={styles.productItem__infoTextPrices}>
            <span className={styles.productItem__infoTextPricesCurrent}>
              {getLocaleRuPrices(product.price)}
            </span>
            {product.old_price && getScale && (
              <>
                <span className={styles.productItem__infoTextPricesOld}>
                  {getLocaleRuPrices(product.old_price)}
                </span>
                <span className={styles.productItem__infoTextPricesScale}>
                  {`-${getScale}%`}
                </span>
              </>
            )}
          </div>
          <h3 className={styles.productItem__infoTextTitle}>{product.name}</h3>
        </div>
        <ButtonUi
          type="button"
          variant="primary"
          size="primary"
          onClick={hanldeClickCard}
        >
          Выбрать
        </ButtonUi>
      </div>
    </article>
  );
})
