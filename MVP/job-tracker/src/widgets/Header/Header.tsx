import { Navigation } from "@widgets/Navigation";
import { Logo } from "@shared/ui/LogoUi";
import { useAuth, useSearch } from "@shared/lib/context/contexts";
import { SearchUi } from "@shared/ui/SearchUi/SearchUi";

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
    <header className="fixed top-0 left-0 w-full bg-[var(--color-bg-pernamently)] text-[var(--color-white-pernamently)] p-4 flex justify-between items-center max-h-18 z-10">
      <Logo profileSrc={profile?.avatar_url} user={user} />
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
