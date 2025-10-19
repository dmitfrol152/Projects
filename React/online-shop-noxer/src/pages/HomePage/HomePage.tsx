import { LoadingContainer } from "@/components/LoadingContainer";
import { useProducts } from "@/hooks/useProducts";
import styles from "./HomePage.module.scss";
import { HomeComponent } from "@/components/HomeComponent";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function HomePage() {
  const [valueSearch, setValueSeacrh] = useState<string>("");
  const debounceValue = useDebounce(valueSearch.trim().toLowerCase(), 500);

  const [isFocusedSearch, setIsFocusedSearch] = useState<boolean>(false);

  const { getProductsQuery } = useProducts();
  const { data, isError, isSuccess, isLoading, error } = getProductsQuery;

  const { postProductsQuery } = useProducts(debounceValue);
  const {
    data: searchPages,
    isPending: dataPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = postProductsQuery;

  const dataSearch = searchPages
    ? {
        products: searchPages.pages.flatMap((page) => page.products || []),
      }
    : undefined;

  const handleFocus = () => {
    setIsFocusedSearch(true);
  };

  const handleBlur = () => {
    if (!valueSearch) {
      setIsFocusedSearch(false);
    } else {
      setTimeout(() => setIsFocusedSearch(false), 600);
    }
  };

  function handleClickPhrase(phrase: string) {
    setValueSeacrh(phrase);
    setTimeout(() => setIsFocusedSearch(false), 600);
  }

  if (isLoading) return <LoadingContainer />;
  if (isError)
    return <div className={styles.homePage__error}>Error {error?.message}</div>;
  if (isSuccess && data) {
    return (
      <div className="container">
        <HomeComponent
          data={data}
          dataSearch={dataSearch}
          dataPending={dataPending}
          valueSearch={valueSearch}
          setValueSeacrh={setValueSeacrh}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          handleClickPhrase={handleClickPhrase}
          debounceValue={debounceValue}
          isFocusedSearch={isFocusedSearch}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
    );
  }

  return <div className={styles.homePage__error}>Any other error</div>;
}
