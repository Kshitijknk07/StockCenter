import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "../../charts/PieChart";
import { PieChart as PieChartIcon } from "lucide-react";

export function CpuDistributionCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <PieChartIcon className="h-4 w-4 text-primary" />
          </div>
          CPU Usage Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PieChart
          data={[65, 15, 10, 10]}
          labels={["User", "System", "Nice", "Idle"]}
          colors={[
            "hsl(var(--primary))",
            "hsl(var(--destructive))",
            "hsl(var(--warning))",
            "hsl(var(--muted))",
          ]}
        />
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
              User
            </span>
            <span>65%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-destructive rounded-full mr-2"></span>
              System
            </span>
            <span>15%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
              Nice
            </span>
            <span>10%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-muted rounded-full mr-2"></span>
              Idle
            </span>
            <span>10%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
