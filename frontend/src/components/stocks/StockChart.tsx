import { useStockData } from "@/hooks/useStockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StockChartProps {
  symbol: string;
  timeFrame: "intraday" | "daily" | "weekly" | "monthly";
  interval?: "1min" | "5min" | "15min" | "30min" | "60min";
}

export function StockChart({
  symbol,
  timeFrame,
  interval = "5min",
}: StockChartProps) {
  const { data, loading, error } = useStockData({
    symbol,
    timeFrame,
    interval,
  });

  if (loading) {
    return (
      <div className="rounded-lg border border-white bg-black p-4 h-80 flex items-center justify-center">
        <p>Loading chart data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-white bg-black p-4 h-80 flex items-center justify-center">
        <p className="text-red-500">Error loading chart: {error.message}</p>
      </div>
    );
  }

  if (!data || !data.timeSeries || data.timeSeries.length === 0) {
    return (
      <div className="rounded-lg border border-white bg-black p-4 h-80 flex items-center justify-center">
        <p>No data available for {symbol}</p>
      </div>
    );
  }

  // Prepare data for chart - limit to 30 data points for better visualization
  const chartData = [...data.timeSeries]
    .reverse()
    .slice(0, 30)
    .map((item) => ({
      time: item.timestamp ? item.timestamp.split(" ")[1] : "",
      price: item.close,
    }));

  return (
    <div className="rounded-lg border border-white bg-black p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">{symbol}</h2>
          <p className="text-sm text-gray-400">
            {data.metadata?.["2. Symbol"] || symbol} - {timeFrame} data
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">
            ${data.timeSeries[0].close.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#000", borderColor: "#fff" }}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#fff"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-sm">
        <div>
          <p className="text-gray-400">Open</p>
          <p className="font-medium">${data.timeSeries[0].open.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400">High</p>
          <p className="font-medium">${data.timeSeries[0].high.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400">Low</p>
          <p className="font-medium">${data.timeSeries[0].low.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400">Volume</p>
          <p className="font-medium">
            {data.timeSeries[0].volume.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
