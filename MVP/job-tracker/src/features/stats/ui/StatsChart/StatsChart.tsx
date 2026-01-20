import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { StatsChartDatsProps } from "./types";
import { useTranslation } from "react-i18next";

export function StatsChart({ data }: StatsChartDatsProps) {
  const { t } = useTranslation("statistics");

  return (
    <div className="w-full min-h-[292px] bg-[var(--color-white-card)] rounded shadow pl pt pr-2 pb-10 sm:pl-4 sm:pt-4 sm:pr-4 sm:h-full">
      <h2 className="flex justify-center text-lg font-semibold">
        {t("statisticsChartTitle")}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="week" stroke="var(--color-black)" />
          <YAxis stroke="var(--color-black)" />
          <Tooltip
            wrapperStyle={{ color: "var(--color-bg-pernamently)" }}
            formatter={(value) => [value, t("statisticsChartCount")]}
          />
          <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
