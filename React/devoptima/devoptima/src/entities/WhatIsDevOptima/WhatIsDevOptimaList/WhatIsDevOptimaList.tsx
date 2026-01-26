import { ABOUT_ITEMS } from "../../../shared/lib/constants/about";
import { WhatIsDevOptimaItem } from "../WhatIsDevOptimaItem/WhatIsDevOptimaItem";
import styles from "./WhatIsDevOptimaList.module.scss";

export function WhatIsDevOptimaList() {
  return (
    <ul className={styles.list}>
      {ABOUT_ITEMS.map((item) => {
        return (
          <li key={item.id}>
            <WhatIsDevOptimaItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}
