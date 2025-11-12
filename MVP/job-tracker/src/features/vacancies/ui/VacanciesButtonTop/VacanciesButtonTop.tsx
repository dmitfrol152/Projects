import { ButtonUi } from "@shared/ui/ButtonUi";
import IconArrowTop from "@shared/assets/svg/icon-arrow-top.svg?react";
import type { VacanciesButtonTopProps } from "./types";

export function VacanciesButtonTop({
  handleClickTop,
}: VacanciesButtonTopProps) {
  return (
    <div>
      <ButtonUi
        className="fixed top-20 right-4 px-2 py-2 rounded text-base leading-[1.2] z-10"
        type="button"
        size="icon"
        variant="primary"
        handleClickButton={handleClickTop}
      >
        <IconArrowTop className="w-5 h-5" />
      </ButtonUi>
    </div>
  );
}
