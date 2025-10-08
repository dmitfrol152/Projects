import type { StatsLayoutProps } from "./types";

export function StatsLayout({
  statsTitle,
  statsInfo,
  statsChart,
  statsParagraph,
}: StatsLayoutProps) {
  return (
    <div className="flex flex-col gap-3 grow">
      {statsTitle}
      {statsParagraph}
      <div className="grid grid-cols-5 gap-3">{statsInfo}</div>
      {statsChart}
    </div>
  );
}
