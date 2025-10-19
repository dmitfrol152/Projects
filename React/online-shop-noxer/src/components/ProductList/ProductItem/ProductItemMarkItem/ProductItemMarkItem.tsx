import type { MarkItemProps } from "./types";
import styles from "./ProductItemMarkItem.module.scss";
import clsx from "clsx";

export function ProductItemMarkItem({ mark }: MarkItemProps) {
  let markBackgroundColor: string | null = null;

  if (!mark.color_code) {
    markBackgroundColor = null;
  } else {
    markBackgroundColor = getMarkBackgroundColor(mark.color_code);
  }

  return (
    <div className={clsx(styles.productItemMarkItem, markBackgroundColor)}>
      {mark.Mark_Name}
    </div>
  );
}

function getMarkBackgroundColor(color: string) {
  switch (color) {
    case "#ff6723": {
      return styles.orange;
    }
    case "#ffca28": {
      return styles.yellow;
    }
    case "#45b649": {
      return styles.green;
    }
    default:
      return null;
  }
}
