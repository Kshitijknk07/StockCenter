import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "../../charts/PieChart";
import { PieChart as PieChartIcon } from "lucide-react";
import { formatBytes } from "@/lib/format";

interface MemoryDistributionCardProps {
  memory: {
    total: number;
    used: number;
    free: number;
    cached?: number;
    buffers?: number;
  };
}

export function MemoryDistributionCard({
  memory,
}: MemoryDistributionCardProps) {
  const cached = memory.cached || 0;
  const buffers = memory.buffers || 0;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <PieChartIcon className="h-4 w-4 text-primary" />
          </div>
          Memory Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PieChart
            data={[memory.used, memory.free, cached, buffers]}
            labels={["Used", "Free", "Cached", "Buffers"]}
            colors={[
              "hsl(var(--primary))",
              "hsl(var(--success))",
              "hsl(var(--warning))",
              "hsl(var(--info))",
            ]}
          />
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Memory Types</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                    Used
                  </span>
                  <span>{formatBytes(memory.used)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    Free
                  </span>
                  <span>{formatBytes(memory.free)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                    Cached
                  </span>
                  <span>{formatBytes(cached)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    Buffers
                  </span>
                  <span>{formatBytes(buffers)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
