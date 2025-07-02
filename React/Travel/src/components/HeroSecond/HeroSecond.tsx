import { useState } from "react";
import HeroImage from "../../assets/images/hero/hero.jpg";
import HeroImage2x from "../../assets/images/hero/hero@2x.jpg";
import styles from "./HeroSecond.module.scss";
import { FadeLoader } from "react-spinners";

export const HeroSecond = () => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  return (
    <section className={styles.heroSecond}>
      <div className={styles.heroSecond__inner}>
        {isImageLoading && (
          <FadeLoader
            cssOverride={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(0, 0)",
            }}
            color="#ffa902"
          />
        )}
        <img
          className={styles.heroSecond__image}
          src={HeroImage}
          srcSet={`${HeroImage2x} 2x`}
          alt="Главная картинка"
          onLoad={() => setIsImageLoading(false)}
          onError={(e) => {
            e.currentTarget.src = "";
            e.currentTarget.style.backgroundColor = "#00000050";
            setIsImageLoading(false);
          }}
          style={{
            opacity: isImageLoading ? "0" : "1",
          }}
        />
        <h2 className={styles.heroSecond__title}>Истории ваших путешествий</h2>
      </div>
    </section>
  );
};

export default HeroSecond;
