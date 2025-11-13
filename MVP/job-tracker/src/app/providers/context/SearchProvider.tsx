import { useMemo, useState } from "react";
import { SearchContext } from "@/shared/lib/context/contexts";
import { useDebounce } from "@shared/lib/hooks/useDebounce";
import type { SearchProviderProps } from "@shared/lib/context/types";

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
