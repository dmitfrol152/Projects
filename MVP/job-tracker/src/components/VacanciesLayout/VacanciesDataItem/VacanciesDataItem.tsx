import { useState } from "react";
import { Link } from "react-router-dom";
import type { DataItemProps } from "./types";
import IconOpenLink from "@assets/svg/icon-open-link.svg?react";
import clsx from "clsx";

export function VacanciesDataItem({ vacancy }: DataItemProps) {
  const [hover, setHover] = useState<boolean | null>(null);

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
        <span className="flex gap-3">
          <span className="text-[var(--color-gray-800)]">City:</span>
          <span className="text-[var(--color-gray-500)]">
            {vacancy.area.name}
          </span>
        </span>
        <span className="flex gap-3">
          <span className="text-[var(--color-gray-800)]">Employer:</span>
          <span className="text-[var(--color-gray-500)]">
            {vacancy.employer.name}
          </span>
        </span>
        <span className="flex gap-3">
          <span className="text-[var(--color-gray-800)]">Published:</span>
          <span className="text-[var(--color-gray-500)]">
            {new Date(vacancy.published_at).toLocaleString()}
          </span>
        </span>
      </div>
      {hover && (
        <Link
          className="flex items-center gap-1 w-max transition-colors text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
          to={vacancy.alternate_url}
          target="_blank"
        >
          <span>Open vacancy</span>
          <IconOpenLink className="w-5 h-5" />
        </Link>
      )}
    </li>
  );
}
