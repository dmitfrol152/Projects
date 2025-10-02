import type { StatsLayoutProps } from "./types";

export function StatsLayout({
  statsTitle,
  statsInfo,
  statsChart,
}: StatsLayoutProps) {
  return (
    <div className="flex flex-col gap-3 grow">
      {statsTitle}
      <div className="grid grid-cols-5 gap-3">{statsInfo}</div>
      {statsChart}
    </div>
  );
}
