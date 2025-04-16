import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HardDrive } from "lucide-react";
import { formatBytes } from "@/lib/format";

interface SwapMemoryCardProps {
  swap: {
    total: number;
    used: number;
    free: number;
  };
}

export function SwapMemoryCard({ swap }: SwapMemoryCardProps) {
  const swapPercentage = (swap.used / Math.max(swap.total, 1)) * 100;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <HardDrive className="h-4 w-4 text-primary" />
          </div>
          Swap Memory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{swapPercentage.toFixed(1)}%</div>
        <Progress value={swapPercentage} className="h-2 mt-2" />
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-muted/50 p-2 rounded-md">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-medium">{formatBytes(swap.total)}</p>
          </div>
          <div className="bg-muted/50 p-2 rounded-md">
            <p className="text-xs text-muted-foreground">Used</p>
            <p className="font-medium">{formatBytes(swap.used)}</p>
          </div>
          <div className="bg-muted/50 p-2 rounded-md">
            <p className="text-xs text-muted-foreground">Free</p>
            <p className="font-medium">{formatBytes(swap.free)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
