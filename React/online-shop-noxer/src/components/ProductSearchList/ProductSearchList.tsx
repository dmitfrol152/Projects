import type { ProductProps } from "@/types/productType";
import styles from "./ProductSearchList.module.scss";
import type { ProductSearchListProps } from "./types";
import { LoadingContainer } from "../LoadingContainer";
import { ProductSearchItem } from "./ProductSearchItem";
import { Pagination } from "../Pagination";

export function ProductSearchList({
  productSearchList,
  loading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: ProductSearchListProps) {
  if (loading) return <LoadingContainer />;
  if (!productSearchList.length)
    return <div className={styles.productSearchList__error}>Empty list</div>;

  return (
    <div className={styles.productSearchList}>
      <ul className={styles.productSearchList__list}>
        {productSearchList?.map((product: ProductProps) => (
          <li key={product.id}>
            <ProductSearchItem product={product} />
          </li>
        ))}
      </ul>
      <Pagination
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}
