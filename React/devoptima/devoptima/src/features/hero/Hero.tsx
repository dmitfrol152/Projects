import { Form } from "../Form/Form";
import styles from "./Hero.module.scss";
import ImageHero from "../../shared/assets/images/image/png-hero.png";
import ImageDottes from "../../shared/assets/images/image/png-dottes.png";
import ImagePatternOne from "../../shared/assets/images/image/png-pattern-one.png";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.hero__inner}>
          <div className={styles.hero__left}>
            <div className={styles.hero__leftText}>
              <h1 id="hero-heading" className={styles.hero__leftTextTitle}>
                Revolutionize your DevOps journey with DevOptima
              </h1>
              <p className={styles.hero__leftTextDescription}>
                Empower teams to innovate faster through streamlined
                development, efficient automated workflows, and reliable
                scaling.
              </p>
            </div>
            <Form />
          </div>
          <div className={styles.hero__image}>
            <div className={styles.hero__imagePosition}>
              <img src={ImageHero} alt="image" />
            </div>
          </div>
          <div className={styles.hero__imageDottes}>
            <img src={ImageDottes} alt="image" />
          </div>
          <div className={styles.hero__imagePatternTwo}>
            <img src={ImagePatternOne} alt="image" />
          </div>
          <div className={styles.hero__imagePatternOne}>
            <img src={ImagePatternOne} alt="image" />
          </div>
          <div className={styles.hero__circleOne}></div>
          <div className={styles.hero__circleTwo}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
