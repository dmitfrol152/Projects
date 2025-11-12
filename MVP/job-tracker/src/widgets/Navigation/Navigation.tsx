import { LINKS } from "@shared/lib/constants/links";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import type { NavigationProps } from "./types";
import { ButtonUi } from "@shared/ui/ButtonUi";
import IconSearch from "@shared/assets/svg/icon-search.svg?react";

export function Navigation({
  className,
  isVisibleSearchButton = false,
  isVisibleExitButton = false,
  isVisibleSettingsLink = false,
  handleClickSearch,
  user,
  signOut,
}: NavigationProps) {
  const location = useLocation();

  return (
    <nav className={className}>
      {LINKS.map((link) => {
        if (link.title === "Login" && user) return;
        if (!user && link.title !== "Login") return;
        if (user && link.title === "Settings" && !isVisibleSettingsLink) return;
        return (
          <Link
            className={clsx(
              "px-4 py-2 hover:bg-[var(--color-gray-700)] rounded transition",
              link.title === "Settings" && "mt-auto",
              location.pathname === link.path
                ? "bg-[var(--color-gray-700)]"
                : ""
            )}
            key={link.path}
            to={link.path}
          >
            {link.title}
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
          Logout
        </ButtonUi>
      )}
    </nav>
  );
}
