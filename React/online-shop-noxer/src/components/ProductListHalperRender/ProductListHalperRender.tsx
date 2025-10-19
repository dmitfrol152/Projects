import { CategoriesList } from "../CategoriesList";
import { ProductList } from "../ProductList/ProductList";
import { ProductOftenSearchList } from "../ProductOftenSearchList";
import { ProductSearchList } from "../ProductSearchList";
import { SwiperContainer } from "../SwiperContainer";
import type { ProductListHalperRenderProps } from "./types";

export function ProductListHalperRender({
  dataProducts,
  dataSearch,
  dataPending,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  isFocusedSearch,
  debounceValue,
  handleClickPhrase,
}: ProductListHalperRenderProps) {
  if (!debounceValue && !isFocusedSearch) {
    return (
      <>
        <SwiperContainer
          banners={dataProducts.special_project_parameters_actions || []}
        />
        <CategoriesList categories={dataProducts.categories || []} />
        <ProductList productList={dataProducts.products || []} />
      </>
    );
  }

  if (debounceValue) {
    return (
      <ProductSearchList
        productSearchList={dataSearch?.products || []}
        loading={dataPending}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    );
  }

  if (isFocusedSearch && !debounceValue) {
    return (
      <ProductOftenSearchList
        oftenSearchList={
          dataProducts.special_project_parameters_json.fast_search_strings
            .parameters_list || []
        }
        handleClickPhrase={handleClickPhrase}
      />
    );
  }

  return null;
}
