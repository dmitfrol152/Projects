import { ButtonUi } from "@/ui/ButtonUi";
import clsx from "clsx";
import type { SettingButtonThemeLightProps } from "./types";
import IconLight from "@assets/svg/icon-light.svg?react";

export function SettingButtonThemeLight({
  theme,
  setTheme,
}: SettingButtonThemeLightProps) {
  return (
    <ButtonUi
      className={clsx(
        "rounded",
        theme === "light"
          ? "bg-[var(--color-primary)] text-[var(--color-white)]"
          : "bg-bg-[var(--color-gray-400-02)] text-(var(--color-primary)) hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-white)]"
      )}
      type="button"
      size="icon"
      variant="icon"
      handleClickButton={setTheme}
    >
      <IconLight className="w-7 h-7" />
    </ButtonUi>
  );
}
