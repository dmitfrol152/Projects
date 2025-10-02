import { StatsInfoItem } from "@components/StatsLayout/StatsInfoItem";
import type { StatsInfoListProps } from "./types";

export function StatsInfoList({ statsInfoList }: StatsInfoListProps) {
  return statsInfoList.map((stat, index) => {
    return (
      <StatsInfoItem
        key={index}
        title={stat.title}
        value={stat.value}
        color={stat.color}
      />
    );
  });
}
