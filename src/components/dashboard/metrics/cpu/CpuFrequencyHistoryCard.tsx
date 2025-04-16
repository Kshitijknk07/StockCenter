import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "../../charts/LineChart";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

export function CpuFrequencyHistoryCard() {
  const [frequencyHistory, setFrequencyHistory] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  // Simulate frequency history data
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeLabel = `${now.getHours()}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

      setFrequencyHistory((prev) => {
        const newFrequency = 2 + Math.random() * 2;
        const newHistory = [...prev, newFrequency];
        return newHistory.length > 20 ? newHistory.slice(-20) : newHistory;
      });

      setTimeLabels((prev) => {
        const newLabels = [...prev, timeLabel];
        return newLabels.length > 20 ? newLabels.slice(-20) : newLabels;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          CPU Frequency History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart
          data={frequencyHistory}
          labels={timeLabels}
          color="hsl(var(--primary))"
        />
      </CardContent>
    </Card>
  );
}
