import IconOpenLink from "@shared/assets/svg/icon-open-link.svg?react";
import IconSave from "@shared/assets/svg/icon-save.svg?react";
import { Link } from "react-router-dom";
import { ButtonUi } from "@shared/ui/ButtonUi";
import type { DataItemProps } from "../types";

export function VacanciesDataItemButtons({
  vacancy,
  handleSubmitNewFormDashboard,
}: DataItemProps) {
  return (
    <div className="flex flex-col gap">
      <Link
        className="flex items-center gap-1 w-max transition-colors text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        to={vacancy.alternate_url}
        target="_blank"
      >
        <span className="font-light">Open vacancy</span>
        <IconOpenLink className="w-5 h-5" />
      </Link>
      <ButtonUi
        type="button"
        variant="none"
        size="icon"
        className="flex items-center gap-1 p-0 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        handleClickButton={() =>
          handleSubmitNewFormDashboard({
            position: vacancy.name,
            company: vacancy.employer.name,
            status: "washlist",
            notes: "",
            id: vacancy.id,
            url: vacancy.alternate_url,
          })
        }
      >
        <span className="font-light">Save vacancy</span>
        <IconSave className="w-5 h-5" />
      </ButtonUi>
    </div>
  );
}
