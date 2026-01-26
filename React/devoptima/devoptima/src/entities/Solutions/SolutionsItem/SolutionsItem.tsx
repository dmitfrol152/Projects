import styles from "./SolutionsItem.module.scss";

export function SolutionsItem({
  item,
}: {
  item: { id: number; png: string; title: string; description: string };
}) {
  return (
    <div className={styles.solutionsItem}>
      <div className={styles.solutionsItem__image}>
        <img src={item.png} alt="image" />
      </div>
      <h3 className={styles.solutionsItem__title}>{item.title}</h3>
      <p className={styles.solutionsItem__description}>{item.description}</p>
    </div>
  );
}
