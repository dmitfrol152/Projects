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
    <div className="w-full h-full bg-white pl-4 pt-4 pr-4 pb-10 rounded shadow">
      <h2 className="flex justify-center text-lg font-semibold">
        Stats by weeks
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
