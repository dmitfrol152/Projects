import ButtonUi from "../../shared/ui/ButtonUi/Button";
import styles from "./CallToAction.module.scss";

const CallToAction = () => {
  return (
    <section id="why" className={styles.callToAction}>
      <div className="container">
        <div className={styles.callToAction__wrapper}>
          <h2 className={styles.callToAction__title}>
            Ready to elevate your DevOps strategy?
          </h2>
          <p className={styles.callToAction__text}>
            Join the multitude of companies benefiting from optimized DevOps
            practices. Contact us to discover how DevOptima can help your
            business.
          </p>
          <div className={styles.callToAction__actions}>
            <ButtonUi type="button" size="small" variant="primary">
              Contact us
            </ButtonUi>
            <ButtonUi type="button" size="small" variant="secondary">
              Try for free
            </ButtonUi>
          </div>
        </div>
      </div>
      <div className={styles.callToAction__left}></div>
      <div className={styles.callToAction__right}></div>
    </section>
  );
};

export default CallToAction;
