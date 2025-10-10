import { Navigation } from "@components/Navigation";
import { Logo } from "@components/Logo";
import { useAuth, useSearch } from "@/hooks/useContext";
import { SearchUi } from "@/ui/SearchUi/SearchUi";

export function Header() {
  const { isOpenSearch, setIsOpenSearch, query, setQuery } = useSearch();
  const { user, signOut, profile } = useAuth();

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
    <header className="bg-[var(--color-bg-pernamently)] text-[var(--color-white-pernamently)] p-4 flex justify-between items-center max-h-18">
      <Logo profileSrc={profile?.avatar_url} />
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
          user={user}
          signOut={signOut}
        />
      </div>
    </header>
  );
}
