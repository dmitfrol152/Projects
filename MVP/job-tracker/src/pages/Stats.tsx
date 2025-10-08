import { StatsLayout } from "@/components/StatsLayout";
import { StatsChart } from "@/components/StatsLayout/StatsChart";
import { StatsInfoList } from "@/components/StatsLayout/StatsInfoList";
import { StatsParagraph } from "@/components/StatsLayout/StatsParagraph";
import { StatsTitle } from "@/components/StatsLayout/StatsTitle";
import { useStatsManager } from "@/hooks/useStatsManager/useStatsManager";

export default function Stats() {
  const { chartData, statsList } = useStatsManager();

  return (
    <StatsLayout
      statsTitle={<StatsTitle />}
      statsParagraph={<StatsParagraph />}
      statsInfo={<StatsInfoList statsInfoList={statsList} />}
      statsChart={<StatsChart data={chartData} />}
    />
  );
}
