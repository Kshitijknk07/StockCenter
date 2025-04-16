import { SystemMetrics } from "@/types/metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Cpu,
  MemoryStick,
  PieChart as PieChartIcon,
  Clock,
} from "lucide-react";
import { formatBytes } from "@/lib/format";
import { PieChart } from "../../charts/PieChart";

interface ProcessMetricsProps {
  metrics: SystemMetrics;
}

export function ProcessMetrics({ metrics }: ProcessMetricsProps) {
  return (
    <div className="space-y-6">
      {/* Process Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              Total Processes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.processes.total}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              Running
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {metrics.processes.running}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              Sleeping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {metrics.processes.sleeping}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              Threads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {metrics.processes.threads}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top CPU Processes */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <Cpu className="h-4 w-4 text-primary" />
            </div>
            Top CPU Processes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Process</TableHead>
                <TableHead>PID</TableHead>
                <TableHead>CPU %</TableHead>
                <TableHead>Memory</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.processes.topCpu.slice(0, 10).map((process) => (
                <TableRow key={process.pid}>
                  <TableCell className="font-medium">{process.name}</TableCell>
                  <TableCell>{process.pid}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Progress value={process.cpu} className="h-2 w-16 mr-2" />
                      <span>{process.cpu.toFixed(1)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatBytes(process.memory)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Memory Processes */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <MemoryStick className="h-4 w-4 text-primary" />
            </div>
            Top Memory Processes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Process</TableHead>
                <TableHead>PID</TableHead>
                <TableHead>Memory</TableHead>
                <TableHead>CPU %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.processes.topMemory.slice(0, 10).map((process) => (
                <TableRow key={process.pid}>
                  <TableCell className="font-medium">{process.name}</TableCell>
                  <TableCell>{process.pid}</TableCell>
                  <TableCell>{formatBytes(process.memory)}</TableCell>
                  <TableCell>{process.cpu.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Process Distribution */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <PieChartIcon className="h-4 w-4 text-primary" />
            </div>
            Process State Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PieChart
              data={[
                metrics.processes.running,
                metrics.processes.sleeping,
                metrics.processes.stopped || 0,
                metrics.processes.zombie || 0,
              ]}
              labels={["Running", "Sleeping", "Stopped", "Zombie"]}
              colors={[
                "hsl(var(--primary))",
                "hsl(var(--success))",
                "hsl(var(--warning))",
                "hsl(var(--destructive))",
              ]}
            />
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Process States</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                      Running
                    </span>
                    <span>{metrics.processes.running}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      Sleeping
                    </span>
                    <span>{metrics.processes.sleeping}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                      Stopped
                    </span>
                    <span>{metrics.processes.stopped || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      Zombie
                    </span>
                    <span>{metrics.processes.zombie || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
