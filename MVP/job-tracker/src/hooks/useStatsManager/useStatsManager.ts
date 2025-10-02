import { useJobManager } from "@hooks/useJobsManager/useJobsManager";
import { useStatsGroupedByWeek } from "@hooks/useStatsManager/useStatsGroupedByWeek/useStatsGroupedByWeek";
import { useStatsInfoCounts } from "@hooks/useStatsManager/useStatsInfoCounts/useStatsInfoCounts";

export function useStatsManager() {
  const { jobs } = useJobManager();
  const statsList = useStatsInfoCounts(jobs);
  const chartData = useStatsGroupedByWeek(jobs);

  return { chartData, statsList };
}
