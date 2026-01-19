import { LINKS } from "@shared/lib/constants/links";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import type { NavigationProps } from "./types";
import { ButtonUi } from "@shared/ui/ButtonUi";
import IconSearch from "@shared/assets/svg/icon-search.svg?react";
import { useWindowResize } from "@/shared/lib/hooks/useWindowResize";
import { useTranslation } from "react-i18next";

export function Navigation({
  className,
  isVisibleSearchButton = false,
  isVisibleExitButton = false,
  isVisibleSettingsLink = false,
  handleClickSearch,
  user,
  signOut,
  closeModal,
}: NavigationProps) {
  const location = useLocation();
  const { width } = useWindowResize();
  const { t: tNavigation } = useTranslation("navigation");
  const { t: tHeader } = useTranslation("header");

  return (
    <nav className={className}>
      {LINKS.map((link) => {
        if (link.title === "login" && user) return;
        if (!user && link.title !== "login") return;
        if (
          user &&
          link.title === "navigationSettings" &&
          !isVisibleSettingsLink
        )
          return;
        return (
          <Link
            className={clsx(
              "px-4 py-2 hover:bg-[var(--color-gray-700)] rounded transition",
              width < 1024
                ? "text-[var(--color-black-05)]"
                : "text-[var(--color-white-pernamently)]",
              link.title === "navigationSettings" && "mt-auto",
              location.pathname === link.path
                ? "bg-[var(--color-gray-700)] text-[var(--color-white-pernamently)]"
                : ""
            )}
            key={link.path}
            to={link.path}
            onClick={() => {
              if (closeModal) {
                closeModal();
              }
            }}
          >
            {user ? tNavigation(link.title) : tHeader(link.title)}
          </Link>
        );
      })}
      {user && isVisibleSearchButton && (
        <ButtonUi
          className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] mr-2"
          type="button"
          size="icon"
          variant="icon"
          handleClickButton={handleClickSearch}
        >
          <IconSearch className="w-5 h-5" />
        </ButtonUi>
      )}
      {user && isVisibleExitButton && (
        <ButtonUi
          type="button"
          size="md"
          variant="exit"
          handleClickButton={signOut}
        >
          {tNavigation("navigationLogout")}
        </ButtonUi>
      )}
    </nav>
  );
}
