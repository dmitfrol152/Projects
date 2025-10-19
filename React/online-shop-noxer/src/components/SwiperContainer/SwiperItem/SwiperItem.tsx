import type { SlideProps } from "./types";
import styles from "./SwiperItem.module.scss";
import NoPicture from "@assets/images/png/no-pictures.png";
import { ButtonUi } from "@/ui/ButtonUi";
import { useState } from "react";
import { LoaderUi } from "@/ui/LoaderUi";

export function SwiperItem({ slide }: SlideProps) {
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);

  function hanldeClickAction() {
    alert("Click action");
  }

  const imageSrc = slide.image_url || NoPicture;

  return (
    <div className={styles.swiperItem}>
      <div className={styles.swiperItem__image}>
        {isLoadingImage && (
          <div className={styles.swiperItem__imageLoader}>
            <LoaderUi />
          </div>
        )}
        <img
          src={imageSrc}
          alt="Scale image"
          onLoad={() => setIsLoadingImage(false)}
        />
      </div>
      <div className={styles.swiperItem__title}>
        <h2 className={styles.swiperItem__titleText}>{slide.description}</h2>
      </div>
      <div className={styles.swiperItem__button}>
        <ButtonUi
          type="button"
          variant="primaryBig"
          size="primaryBig"
          onClick={hanldeClickAction}
        >
          Подробнее
        </ButtonUi>
      </div>
    </div>
  );
}
