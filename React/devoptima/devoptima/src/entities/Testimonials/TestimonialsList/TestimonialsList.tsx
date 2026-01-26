import { TESTIMONIALS_INFO } from "../../../shared/lib/constants/testimonials";
import { TestimonialsItem } from "../TestimonialsItem/TestimonialsItem";
import styles from "./TestimonialsList.module.scss";

export function TestimonialsList() {
  return (
    <ul className={styles.testimonialsList}>
      {TESTIMONIALS_INFO.map((item) => {
        return (
          <li key={item.id}>
            <TestimonialsItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}
