import { useState } from "react";
import type { DataItemProps } from "./types";
import clsx from "clsx";
import { getHelperArrayNames } from "./getHelperArrayNames/getHelperArrayNames";
import { VacanciesDataItemButtons } from "./VacanciesDataItemButtons";

export function VacanciesDataItem({
  vacancy,
  handleSubmitNewFormDashboard,
}: DataItemProps) {
  const [hover, setHover] = useState<boolean | null>(null);
  const vacancyInfo = getHelperArrayNames(vacancy);

  return (
    <li
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      className={clsx(
        "p-4 border rounded shadow-sm flex items-center justify-between",
        hover && "border-[var(--color-primary)]"
      )}
    >
      <div className="flex flex-col gap">
        <h2 className="font-semibold">{vacancy.name}</h2>
        {vacancyInfo.map((info, index) => (
          <span key={index} className="flex gap-3">
            <span className="text-[var(--color-gray-800)]">{info.name}</span>
            <span className="text-[var(--color-gray-500)]">{info.value}</span>
          </span>
        ))}
      </div>
      {hover && (
        <VacanciesDataItemButtons
          handleSubmitNewFormDashboard={handleSubmitNewFormDashboard}
          vacancy={vacancy}
        />
      )}
    </li>
  );
}
