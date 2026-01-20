import { ButtonUi } from "@shared/ui/ButtonUi";
import clsx from "clsx";
import type { SettingButtonPaginationScrollProps } from "./types";
import IconMouseScroll from "@shared/assets/svg/icon-mouse-scroll.svg?react";

export function SettingButtonPaginationScroll({
  pagination,
  setPagination,
}: SettingButtonPaginationScrollProps) {
  return (
    <ButtonUi
      className={clsx(
        "rounded",
        pagination === "scroll"
          ? "bg-[var(--color-primary)] text-[var(--color-white)]"
          : "bg-bg-[var(--color-gray-400-02)] text-(var(--color-primary)) hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-white)]"
      )}
      type="button"
      size="icon"
      variant="icon"
      handleClickButton={setPagination}
    >
      <IconMouseScroll className="w-7 h-7" />
    </ButtonUi>
  );
}
