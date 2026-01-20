import { ButtonUi } from "@shared/ui/ButtonUi";
import clsx from "clsx";
import type { SettingButtonLanguageEnProps } from "./types";

export function SettingButtonLanguageEn({
  currentLanguage,
  toggleLanguage,
}: SettingButtonLanguageEnProps) {
  return (
    <ButtonUi
      className={clsx(
        "rounded w-9",
        currentLanguage === "en"
          ? "bg-[var(--color-primary)] text-[var(--color-white)]"
          : "bg-bg-[var(--color-gray-400-02)] text-(var(--color-primary)) hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-white)]",
      )}
      type="button"
      size="icon"
      variant="icon"
      handleClickButton={toggleLanguage}
    >
      <span>En</span>
    </ButtonUi>
  );
}
