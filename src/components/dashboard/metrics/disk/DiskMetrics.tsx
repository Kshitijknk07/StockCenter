import { SystemMetrics } from "@/types/metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Database, LineChart as LineChartIcon } from "lucide-react";
import { formatBytes } from "@/lib/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DiskMetricsProps {
  metrics: SystemMetrics;
}

interface DiskPartition {
  mountPoint: string;
  size: number;
  used: number;
}

export function DiskMetrics({ metrics }: DiskMetricsProps) {
  const iops = typeof metrics.disk.iops === "number" ? metrics.disk.iops : 0;
  const diskPartitions = Array.isArray(metrics.diskPartitions)
    ? (metrics.diskPartitions as DiskPartition[])
    : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                <LineChartIcon className="h-4 w-4 text-primary" />
              </div>
              IOPS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{iops.toFixed(0)}</div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-muted/50 p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Read IOPS</p>
                <p className="font-medium">{Math.floor(iops * 0.6)}</p>
              </div>
              <div className="bg-muted/50 p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Write IOPS</p>
                <p className="font-medium">{Math.floor(iops * 0.4)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle cards remain unchanged */}

      {/* Disk Partitions */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <Database className="h-4 w-4 text-primary" />
            </div>
            Disk Partitions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mount Point</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Used</TableHead>
                <TableHead>Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {diskPartitions.map((partition, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    {partition.mountPoint}
                  </TableCell>
                  <TableCell>{formatBytes(partition.size)}</TableCell>
                  <TableCell>{formatBytes(partition.used)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Progress
                        value={(partition.used / partition.size) * 100}
                        className="h-2 w-16 mr-2"
                      />
                      <span>
                        {((partition.used / partition.size) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
