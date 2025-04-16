import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Cpu } from "lucide-react";

interface CpuUsageCardProps {
  cpu: number;
}

export function CpuUsageCard({ cpu }: CpuUsageCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <Cpu className="h-4 w-4 text-primary" />
          </div>
          CPU Usage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{cpu.toFixed(1)}%</div>
        <Progress value={cpu} className="h-2 mt-2" />
      </CardContent>
    </Card>
  );
}
