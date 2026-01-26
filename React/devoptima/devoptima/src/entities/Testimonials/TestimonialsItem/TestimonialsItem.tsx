import styles from "./TestimonialsItem.module.scss";
import parse from "html-react-parser";

export function TestimonialsItem({
  item,
}: {
  item: {
    id: number;
    png: string;
    text: string;
    avatar: string;
    name: string;
    grade: string;
  };
}) {
  return (
    <div className={styles.testimonialsItem}>
      <div className={styles.testimonialsItem__image}>
        <img src={item.png} alt="image" />
      </div>
      <p className={styles.testimonialsItem__text}>{parse(item.text)}</p>
      <div className={styles.testimonialsItem__block}>
        <div className={styles.testimonialsItem__blockImage}>
          <img src={item.avatar} alt="image" />
        </div>
        <div className={styles.testimonialsItem__inner}>
          <span className={styles.testimonialsItem__name}>{item.name}</span>
          <span className={styles.testimonialsItem__grade}>{item.grade}</span>
        </div>
      </div>
    </div>
  );
}
