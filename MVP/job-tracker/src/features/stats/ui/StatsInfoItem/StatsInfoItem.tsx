import clsx from "clsx";
import type { StatsInfoItemProps } from "./types";

export function StatsInfoItem({ title, value, color }: StatsInfoItemProps) {
  return (
    <div className="flex flex-col items-start gap-3 p-4 rounded shadow bg-[var(--color-white-card)]">
      <span className="text-[var(--color-gray-500)] text-sm">{title}</span>
      <span
        className={clsx("text-2xl font-bold text-[var(--color-black)]", color)}
      >
        {value}
      </span>
    </div>
  );
}
