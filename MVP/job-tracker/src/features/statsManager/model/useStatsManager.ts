import { useJobManager } from "@features/jobs/model/useJobsManager";
import { useStatsGroupedByWeek } from "@features/statsManager/model/hooks/useStatsGroupedByWeek/useStatsGroupedByWeek";
import { useStatsInfoCounts } from "@features/statsManager/model/hooks/useStatsInfoCounts/useStatsInfoCounts";

export function useStatsManager() {
  const { jobs } = useJobManager();
  const statsList = useStatsInfoCounts(jobs);
  const chartData = useStatsGroupedByWeek(jobs);

  return { chartData, statsList };
}
