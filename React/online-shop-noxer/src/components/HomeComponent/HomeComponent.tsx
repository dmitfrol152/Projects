import type { DataHomePageProps } from "./types";
import { InputUi } from "@/ui/InputUi";
import styles from "./HomeComponent.module.scss";
import { ProductListHalperRender } from "@components/ProductListHalperRender";

export function HomeComponent({
  data,
  dataSearch,
  dataPending,
  valueSearch,
  setValueSeacrh,
  handleFocus,
  handleBlur,
  handleClickPhrase,
  debounceValue,
  isFocusedSearch,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: DataHomePageProps) {
  return (
    <div className={styles.homeComponent}>
      <div className={styles.homeComponent__input}>
        <InputUi
          type="text"
          placeholder="Найти товары"
          value={valueSearch}
          setValue={setValueSeacrh}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <ProductListHalperRender
        dataProducts={data}
        dataSearch={dataSearch}
        dataPending={dataPending}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFocusedSearch={isFocusedSearch}
        debounceValue={debounceValue}
        handleClickPhrase={handleClickPhrase}
      />
    </div>
  );
}
