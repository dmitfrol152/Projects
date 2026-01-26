import styles from "./WhatIsDevOptima.module.scss";
import ImageAbout from "../../shared/assets/images/image/png-about.png";
import { WhatIsDevOptimaList } from "./WhatIsDevOptimaList/WhatIsDevOptimaList";

const WhatIsDevOptima = () => {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.about__wrapper}>
          <div className={styles.about__image}>
            <img src={ImageAbout} alt="image" />
          </div>
          <div className={styles.about__info}>
            <div className={styles.about__text}>
              <h2 className={styles.about__title}>What is DevOptima?</h2>
              <p className={styles.about__description}>
                At DevOptima, we are a team of passionate DevOps experts
                committed to transforming the way businesses approach software
                development and operations.
              </p>
            </div>
            <WhatIsDevOptimaList />
          </div>
          <div className={styles.about__circle}></div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsDevOptima;
