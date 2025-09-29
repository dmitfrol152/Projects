import { useMemo, useState } from "react";
import { SearchContext } from "@/hooks/useContext";
import { useDebounce } from "@/hooks/useDebounce";
import type { SearchProviderProps } from "./types";

export function SearchProvider({ children }: SearchProviderProps) {
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const debounceValue = useDebounce(query, 300);

  const result = useMemo(
    () => ({
      isOpenSearch,
      setIsOpenSearch,
      debounceValue,
      query,
      setQuery,
    }),
    [isOpenSearch, debounceValue, query]
  );

  return (
    <SearchContext.Provider value={result}>{children}</SearchContext.Provider>
  );
}
