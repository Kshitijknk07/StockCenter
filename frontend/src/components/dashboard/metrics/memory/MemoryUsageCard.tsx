import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MemoryStick } from "lucide-react";
import { formatBytes } from "@/lib/format";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface MemoryUsageCardProps {
  memory: {
    total: number;
    used: number;
    free: number;
    usagePercentage: number;
  };
}

export function MemoryUsageCard({ memory }: MemoryUsageCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <MemoryStick className="h-4 w-4 text-primary" />
          </div>
          Memory Usage
          <InfoTooltip
            className="ml-2"
            content="Shows the current RAM usage of your system. High memory usage may slow down your computer when running multiple applications."
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {memory.usagePercentage.toFixed(1)}%
        </div>
        <Progress value={memory.usagePercentage} className="h-2 mt-2" />
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-muted/50 p-2 rounded-md">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-medium">{formatBytes(memory.total)}</p>
          </div>
          <div className="bg-muted/50 p-2 rounded-md">
            <p className="text-xs text-muted-foreground">Used</p>
            <p className="font-medium">{formatBytes(memory.used)}</p>
          </div>
          <div className="bg-muted/50 p-2 rounded-md">
            <p className="text-xs text-muted-foreground">Free</p>
            <p className="font-medium">{formatBytes(memory.free)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
