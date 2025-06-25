import HeroImage from "../../assets/images/hero/Hero.jpg";
import HeroImage2x from "../../assets/images/hero/Hero@2x.jpg";
import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__inner}>
        <img
          className={styles.hero__image}
          src={HeroImage}
          srcSet={`${HeroImage2x} 2x`}
          alt="Главная картинка"
        />
        <h1 className={styles.hero__title}>
          Там, где мир начинается с путешествий
        </h1>
      </div>
    </section>
  );
};

export default Hero;
