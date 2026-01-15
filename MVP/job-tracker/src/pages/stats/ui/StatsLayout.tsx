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
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-5">{statsInfo}</div>
      {statsChart}
    </div>
  );
}
