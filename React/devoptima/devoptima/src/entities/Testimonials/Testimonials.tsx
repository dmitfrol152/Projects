import styles from "./Testimonials.module.scss";
import { TestimonialsList } from "./TestimonialsList/TestimonialsList";
import PngBg from "../../shared/assets/images/image/png-testi-bg.png";

const Testimonials = () => {
  return (
    <section className={styles.testimonials}>
      <div className="container">
        <div className={styles.testimonials__wrapper}>
          <TestimonialsList />
        </div>
      </div>
      <div className={styles.testimonials__bg}>
        <img src={PngBg} alt="image" />
      </div>
    </section>
  );
};

export default Testimonials;
