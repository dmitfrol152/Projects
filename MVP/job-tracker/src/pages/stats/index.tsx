import { StatsLayout } from "@pages/stats/ui";
import { StatsChart } from "@features/stats/ui/StatsChart";
import { StatsInfoList } from "@features/stats/ui/StatsInfoList";
import { StatsParagraph } from "@features/stats/ui/StatsParagraph";
import { StatsTitle } from "@features/stats/ui/StatsTitle";
import { useStatsManager } from "@features/statsManager/model/useStatsManager";

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
