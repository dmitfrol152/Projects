import { ButtonUi } from "@shared/ui/ButtonUi";
import clsx from "clsx";
import type { SettingButtonPaginationButtonsProps } from "./types";
import IconMouseButtons from "@shared/assets/svg/icon-mouse-click.svg?react";

export function SettingButtonPaginationButtons({
  pagination,
  setPagination,
}: SettingButtonPaginationButtonsProps) {
  return (
    <ButtonUi
      className={clsx(
        "rounded",
        pagination === "buttons"
          ? "bg-[var(--color-primary)] text-[var(--color-white)]"
          : "bg-bg-[var(--color-gray-400-02)] text-(var(--color-primary)) hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-white)]"
      )}
      type="button"
      size="icon"
      variant="icon"
      handleClickButton={setPagination}
    >
      <IconMouseButtons className="w-7 h-7" />
    </ButtonUi>
  );
}
