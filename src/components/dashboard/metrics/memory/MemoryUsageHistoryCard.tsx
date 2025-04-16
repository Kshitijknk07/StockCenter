import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "../../charts/LineChart";
import { LineChart as LineChartIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { usePrometheusMetrics } from "@/hooks/usePrometheusMetrics";

export function MemoryUsageHistoryCard() {
  const [memoryHistory, setMemoryHistory] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const { currentMetrics } = usePrometheusMetrics();

  // Update history data
  useEffect(() => {
    const now = new Date();
    const timeLabel = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    setMemoryHistory((prev) => {
      const newHistory = [...prev, currentMetrics.memory.usagePercentage];
      return newHistory.length > 20 ? newHistory.slice(-20) : newHistory;
    });

    setTimeLabels((prev) => {
      const newLabels = [...prev, timeLabel];
      return newLabels.length > 20 ? newLabels.slice(-20) : newLabels;
    });
  }, [currentMetrics]);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <LineChartIcon className="h-4 w-4 text-primary" />
          </div>
          Memory Usage History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart
          data={memoryHistory}
          labels={timeLabels}
          color="hsl(var(--primary))"
        />
      </CardContent>
    </Card>
  );
}
