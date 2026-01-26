import styles from "./Solutions.module.scss";
import { SolutionsList } from "./SolutionsList/SolutionsList";

const Solutions = () => {
  return (
    <section id="services" className={styles.solutions}>
      <div className="container">
        <div className={styles.solutions__wrapper}>
          <div className={styles.solutions__header}>
            <h2 className={styles.solutions__headerTitle}>
              Innovative solutions for operational excellence
            </h2>
            <p className={styles.solutions__headerDescription}>
              Tailored DevOps expertise driving your business momentum.
              Personalized solutions for growth and evolution.
            </p>
          </div>
          <SolutionsList />
          <div className={styles.solutions__circle}></div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
