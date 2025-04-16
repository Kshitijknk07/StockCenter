import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PieChartProps {
  data: number[];
  labels: string[];
  colors: string[];
  height?: string;
}

export function PieChart({
  data,
  labels,
  colors,
  height = "h-40",
}: PieChartProps) {
  // Convert the data and labels into the format expected by Recharts
  const chartData = labels.map((label, index) => ({
    name: label,
    value: data[index] || 0,
  }));

  return (
    <div className={`w-full ${height}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius="70%"
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
          >
            {chartData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke="hsl(var(--background))"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
              fontSize: "12px",
            }}
            formatter={(value: number) => [`${value}`, ""]}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: "12px" }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
