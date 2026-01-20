import { ButtonUi } from "@shared/ui/ButtonUi";
import clsx from "clsx";
import type { SettingButtonLanguageRuProps } from "./types";

export function SettingButtonLanguageRu({
  currentLanguage,
  toggleLanguage,
}: SettingButtonLanguageRuProps) {
  return (
    <ButtonUi
      className={clsx(
        "rounded",
        currentLanguage === "ru"
          ? "bg-[var(--color-primary)] text-[var(--color-white)]"
          : "bg-bg-[var(--color-gray-400-02)] text-(var(--color-primary)) hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-white)]",
      )}
      type="button"
      size="icon"
      variant="icon"
      handleClickButton={toggleLanguage}
    >
      <span>Ru</span>
    </ButtonUi>
  );
}
