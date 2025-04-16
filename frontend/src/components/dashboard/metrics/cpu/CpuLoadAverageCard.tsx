import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity } from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface CpuLoadAverageCardProps {
  loadAverage: {
    oneMin: number;
    fiveMin: number;
    fifteenMin: number;
  };
}

export function CpuLoadAverageCard({ loadAverage }: CpuLoadAverageCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          Load Average
          <InfoTooltip
            className="ml-2"
            content="Load average represents the average system load over time. Values below 1.0 indicate the system is not fully utilized, while values above 1.0 per CPU core may indicate overloading."
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">1 min</span>
            <span className="font-medium">{loadAverage.oneMin.toFixed(2)}</span>
          </div>
          <Progress value={loadAverage.oneMin * 33} className="h-1.5" />

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">5 min</span>
            <span className="font-medium">
              {loadAverage.fiveMin.toFixed(2)}
            </span>
          </div>
          <Progress value={loadAverage.fiveMin * 33} className="h-1.5" />

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">15 min</span>
            <span className="font-medium">
              {loadAverage.fifteenMin.toFixed(2)}
            </span>
          </div>
          <Progress value={loadAverage.fifteenMin * 33} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  );
}
