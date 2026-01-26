import { SOLUTION_INFO } from "../../../shared/lib/constants/solution";
import { SolutionsItem } from "../SolutionsItem/SolutionsItem";
import styles from "./SolutionsList.module.scss";

export function SolutionsList() {
  return (
    <ul className={styles.solutionsList}>
      {SOLUTION_INFO.map((item) => {
        return (
          <li key={item.id}>
            <SolutionsItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}
