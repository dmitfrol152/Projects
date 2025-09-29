import { Navigation } from "@components/Navigation";
import { Logo } from "../Logo";
import { useSearch } from "@/hooks/useContext";
import { SearchUi } from "@/ui/SearchUi/SearchUi";

export function Header() {
  const { isOpenSearch, setIsOpenSearch, query, setQuery } = useSearch();

  function handleClickSearch() {
    setIsOpenSearch((prev: boolean) => {
      if (prev === true) {
        setQuery("");
        return !prev;
      } else {
        return !prev;
      }
    });
  }

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Logo />
      <div className="flex items-center gap-1">
        {isOpenSearch && (
          <SearchUi
            placeholder="Search by position or company..."
            value={query}
            setQuery={setQuery}
          />
        )}
        <Navigation
          className="flex gap-1 items-center"
          isVisibleSearchButton
          isVisibleExitButton
          handleClickSearch={handleClickSearch}
        />
      </div>
    </header>
  );
}
