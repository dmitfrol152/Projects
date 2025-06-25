import HeroImage from "../../assets/images/hero/Hero.jpg";
import HeroImage2x from "../../assets/images/hero/Hero@2x.jpg";
import styles from "./HeroSecond.module.scss";

export const HeroSecond = () => {
  return (
    <section className={styles.heroSecond}>
      <div className={styles.heroSecond__inner}>
        <img
          className={styles.heroSecond__image}
          src={HeroImage}
          srcSet={`${HeroImage2x} 2x`}
          alt="Главная картинка"
        />
        <h2 className={styles.heroSecond__title}>Истории ваших путешествий</h2>
      </div>
    </section>
  );
};

export default HeroSecond;
