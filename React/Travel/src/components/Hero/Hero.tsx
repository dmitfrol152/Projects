import { useState } from "react";
import HeroImage from "../../assets/images/hero/hero.jpg";
import HeroImage2x from "../../assets/images/hero/hero@2x.jpg";
import styles from "./Hero.module.scss";
import { FadeLoader } from "react-spinners";

export const Hero = () => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  return (
    <section className={styles.hero}>
      <div className={styles.hero__inner}>
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
          className={styles.hero__image}
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
        <h1 className={styles.hero__title}>
          Там, где мир начинается с путешествий
        </h1>
      </div>
    </section>
  );
};

export default Hero;
