import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "../../charts/LineChart";
import { LineChart as LineChartIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { usePrometheusMetrics } from "@/hooks/usePrometheusMetrics";
import { InfoTooltip } from "@/components/ui/info-tooltip";

export function CpuUsageHistoryCard() {
  const [cpuHistory, setCpuHistory] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const { currentMetrics } = usePrometheusMetrics();

  // Update history data
  useEffect(() => {
    const now = new Date();
    const timeLabel = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    setCpuHistory((prev) => {
      const newHistory = [...prev, currentMetrics.cpu];
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
          CPU Usage History
          <InfoTooltip
            className="ml-2"
            content="Displays CPU usage over time. This helps identify usage patterns and potential performance issues that may occur periodically."
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart
          data={cpuHistory}
          labels={timeLabels}
          color="hsl(var(--primary))"
        />
      </CardContent>
    </Card>
  );
}
