import { useStockData } from "@/hooks/useStockData";

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
      <div className="rounded-lg border bg-card p-4 h-80 flex items-center justify-center">
        <p>Loading chart data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-card p-4 h-80 flex items-center justify-center">
        <p className="text-destructive">Error loading chart: {error.message}</p>
      </div>
    );
  }

  if (!data || !data.timeSeries || data.timeSeries.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-4 h-80 flex items-center justify-center">
        <p>No data available for {symbol}</p>
      </div>
    );
  }

  // For a real implementation, you would use a charting library like recharts or chart.js
  // This is a simplified representation
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">{symbol}</h2>
          <p className="text-sm text-muted-foreground">
            {data.metadata?.["2. Symbol"] || symbol} - {timeFrame} data
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">
            ${data.timeSeries[0].close.toString()}
          </p>
        </div>
      </div>

      <div className="h-64 w-full relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <p>Chart visualization would go here</p>
          <p>Latest close: ${data.timeSeries[0].close.toString()}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">Open</p>
          <p className="font-medium">${data.timeSeries[0].open.toString()}</p>
        </div>
        <div>
          <p className="text-muted-foreground">High</p>
          <p className="font-medium">${data.timeSeries[0].high.toString()}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Low</p>
          <p className="font-medium">${data.timeSeries[0].low.toString()}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Volume</p>
          <p className="font-medium">
            {data.timeSeries[0].volume.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
