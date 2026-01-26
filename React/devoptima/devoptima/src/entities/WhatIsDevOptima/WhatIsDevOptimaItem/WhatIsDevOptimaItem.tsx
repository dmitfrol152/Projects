import styles from "./WhatIsDevOptimaItem.module.scss";

export function WhatIsDevOptimaItem({
  item,
}: {
  item: { id: number; icon: string; title: string; description: string };
}) {
  return (
    <div className={styles.item}>
      <div className={styles.item__image}>
        <img src={item.icon} alt="image" />
      </div>
      <h3 className={styles.item__title}>{item.title}</h3>
      <p className={styles.item__description}>{item.description}</p>
    </div>
  );
}
