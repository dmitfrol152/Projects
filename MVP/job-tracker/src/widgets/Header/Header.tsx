import { Navigation } from "@widgets/Navigation";
import { Logo } from "@shared/ui/LogoUi";
import { useAuth, useSearch } from "@shared/lib/context/contexts";
import { SearchUi } from "@shared/ui/SearchUi/SearchUi";
import { useWindowResize } from "@/shared/lib/hooks/useWindowResize";
import IconMenu from "@shared/assets/svg/icon-menu.svg?react";
import IconClose from "@shared/assets/svg/icon-close.svg?react";
import { ButtonUi } from "@/shared/ui/ButtonUi";
import { Modal } from "@/shared/ui/Modal";
import { useModal } from "@/shared/lib/hooks/useModal";
import clsx from "clsx";

export function Header() {
  const { isOpenSearch, setIsOpenSearch, query, setQuery } = useSearch();
  const { user, signOut, profile } = useAuth();
  const { width } = useWindowResize();
  const { isOpen, modalRef, openModal, closeModal } = useModal();

  const isVisibleSettingsLink = width < 1024;

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

  function handleOpenMenu() {
    openModal();
  }

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 w-full bg-[var(--color-bg-pernamently)] text-[var(--color-white-pernamently)] p-4 z-10",
          width > 1024 && " max-h-18"
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Logo profileSrc={profile?.avatar_url} user={user} />
            <div className="flex items-center gap-1">
              {isOpenSearch && width > 1024 && (
                <SearchUi
                  placeholder="Search by position or company..."
                  value={query}
                  setQuery={setQuery}
                />
              )}
              {width < 1024 && (
                <ButtonUi
                  type="button"
                  size="icon"
                  variant="icon"
                  className="transition-colors text-[var(--color-white-pernamently)] hover:text-[var(--color-gray-500)]"
                  handleClickButton={handleOpenMenu}
                >
                  <IconMenu className="w-6 h-6" />
                </ButtonUi>
              )}
              {width > 1024 && (
                <Navigation
                  className="flex gap-1 items-center"
                  isVisibleSearchButton
                  isVisibleExitButton
                  isVisibleSettingsLink={isVisibleSettingsLink}
                  handleClickSearch={handleClickSearch}
                  user={user}
                  signOut={signOut}
                />
              )}
            </div>
          </div>
          {width < 1024 && (
            <SearchUi
              placeholder="Search by position or company..."
              value={query}
              setQuery={setQuery}
              className="w-full"
            />
          )}
        </div>
      </header>
      {width < 1024 && (
        <Modal isOpen={isOpen} modalRef={modalRef}>
          <Navigation
            className="flex flex-col gap-1 items-center"
            isVisibleExitButton
            isVisibleSettingsLink={isVisibleSettingsLink}
            handleClickSearch={handleClickSearch}
            user={user}
            signOut={signOut}
            closeModal={closeModal}
          />
          <ButtonUi
            size="icon"
            variant="icon"
            type="button"
            className="absolute top-1 right-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
            handleClickButton={() => {
              closeModal();
            }}
          >
            <IconClose className="w-5 h-5" />
          </ButtonUi>
        </Modal>
      )}
    </>
  );
}
