import { LoaderUi } from "@/ui/LoaderUi";
import styles from "./LoadingContainer.module.scss";

export function LoadingContainer() {
  return (
    <div className={styles.loadingContainer}>
      <LoaderUi />
    </div>
  );
}
