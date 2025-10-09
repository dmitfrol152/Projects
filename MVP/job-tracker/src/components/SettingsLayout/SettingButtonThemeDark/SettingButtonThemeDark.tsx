import { ButtonUi } from "@/ui/ButtonUi";
import clsx from "clsx";
import IconDark from "@assets/svg/icon-dark.svg?react";
import type { SettingButtonThemeDarkProps } from "./types";

export function SettingButtonThemeDark({
  theme,
  setTheme,
}: SettingButtonThemeDarkProps) {
  return (
    <ButtonUi
      className={clsx(
        "rounded",
        theme === "dark"
          ? "bg-[var(--color-primary)] text-white"
          : "bg-gray-400/20 text-(var(--color-primary)) hover:bg-[var(--color-primary-hover)] hover:text-white"
      )}
      type="button"
      size="icon"
      variant="icon"
      handleClickButton={setTheme}
    >
      <IconDark className="w-7 h-7" />
    </ButtonUi>
  );
}
