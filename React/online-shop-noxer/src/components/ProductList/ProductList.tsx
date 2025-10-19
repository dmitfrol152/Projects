import type { ProductProps } from "@/types/productType";
import type { ProductListProps } from "./types";
import { ProductItem } from "@/components/ProductList/ProductItem";
import styles from "./ProductList.module.scss";
import { memo } from "react";

export const ProductList = memo(function ProductList({ productList }: ProductListProps) {
  return (
    <ul className={styles.productList}>
      {productList?.map((product: ProductProps) => (
        <li key={product.id}>
          <ProductItem product={product} />
        </li>
      ))}
    </ul>
  );
});
