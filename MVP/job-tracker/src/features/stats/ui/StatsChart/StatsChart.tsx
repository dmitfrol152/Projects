import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { StatsChartDatsProps } from "./types";

export function StatsChart({ data }: StatsChartDatsProps) {
  return (
    <div className="w-full min-h-[292px] bg-[var(--color-white-card)] rounded shadow pl pt pr-2 pb-10 sm:pl-4 sm:pt-4 sm:pr-4 sm:h-full">
      <h2 className="flex justify-center text-lg font-semibold">
        Stats by weeks
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="week" stroke="var(--color-black)" />
          <YAxis stroke="var(--color-black)" />
          <Tooltip wrapperStyle={{ color: "var(--color-bg-pernamently)" }} />
          <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
