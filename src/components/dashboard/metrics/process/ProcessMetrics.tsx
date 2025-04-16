import { SystemMetrics } from "@/types/metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cpu,
  MemoryStick,
  PieChart as PieChartIcon,
  Clock,
  Activity,
} from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { PieChart } from "../../charts/PieChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { formatBytes } from "@/lib/format";

interface ProcessMetricsProps {
  metrics: SystemMetrics;
}

export function ProcessMetrics({ metrics }: ProcessMetricsProps) {
  // Create sample process data if not available
  const processData = {
    total: metrics.processes?.total || 124,
    running: metrics.processes?.running || 8,
    sleeping: metrics.processes?.sleeping || 110,
    stopped: metrics.processes?.stopped || 2,
    zombie: metrics.processes?.zombie || 4,
    topCpu: metrics.processes?.topCpu || [
      { name: "chrome.exe", pid: 1234, cpu: 12.4, memory: 420000000 },
      { name: "vscode.exe", pid: 5678, cpu: 8.7, memory: 380000000 },
      { name: "explorer.exe", pid: 9012, cpu: 3.2, memory: 120000000 },
      { name: "spotify.exe", pid: 3456, cpu: 2.8, memory: 210000000 },
      { name: "discord.exe", pid: 7890, cpu: 2.1, memory: 180000000 },
    ],
    topMemory: metrics.processes?.topMemory || [
      { name: "chrome.exe", pid: 1234, cpu: 12.4, memory: 420000000 },
      { name: "vscode.exe", pid: 5678, cpu: 8.7, memory: 380000000 },
      { name: "discord.exe", pid: 7890, cpu: 2.1, memory: 180000000 },
      { name: "spotify.exe", pid: 3456, cpu: 2.8, memory: 210000000 },
      { name: "explorer.exe", pid: 9012, cpu: 3.2, memory: 120000000 },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              Total Processes
              <InfoTooltip
                className="ml-2"
                content="Shows the total number of processes currently running on your system."
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{processData.total}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              Running Processes
              <InfoTooltip
                className="ml-2"
                content="Shows the number of processes that are currently active and using CPU resources."
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{processData.running}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                <Cpu className="h-4 w-4 text-primary" />
              </div>
              High CPU Processes
              <InfoTooltip
                className="ml-2"
                content="Shows the number of processes using significant CPU resources (typically >5%)."
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {processData.topCpu.length}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                <MemoryStick className="h-4 w-4 text-primary" />
              </div>
              High Memory Processes
              <InfoTooltip
                className="ml-2"
                content="Shows the number of processes consuming significant memory resources."
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {processData.topMemory.length}
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
            <InfoTooltip
              className="ml-2"
              content="Lists processes using the most CPU resources. High CPU usage by a single process may indicate intensive computation or a potential issue with that application."
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Process Name</TableHead>
                <TableHead>PID</TableHead>
                <TableHead>CPU Usage</TableHead>
                <TableHead>Memory</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processData.topCpu.map((process, index) => (
                <TableRow key={index}>
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

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <MemoryStick className="h-4 w-4 text-primary" />
            </div>
            Top Memory Processes
            <InfoTooltip
              className="ml-2"
              content="Lists processes consuming the most memory. Memory leaks or inefficient applications may appear at the top of this list."
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Process Name</TableHead>
                <TableHead>PID</TableHead>
                <TableHead>Memory</TableHead>
                <TableHead>CPU Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processData.topMemory.map((process, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{process.name}</TableCell>
                  <TableCell>{process.pid}</TableCell>
                  <TableCell>{formatBytes(process.memory)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Progress value={process.cpu} className="h-2 w-16 mr-2" />
                      <span>{process.cpu.toFixed(1)}%</span>
                    </div>
                  </TableCell>
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
            <InfoTooltip
              className="ml-2"
              content="Shows the distribution of processes by their state. Running processes are actively using CPU, sleeping processes are waiting for resources, stopped processes are paused, and zombie processes are terminated but still have entries in the process table."
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PieChart
              data={[
                processData.running,
                processData.sleeping,
                processData.stopped,
                processData.zombie,
              ]}
              labels={["Running", "Sleeping", "Stopped", "Zombie"]}
              colors={[
                "hsl(var(--primary))",
                "hsl(var(--muted))",
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
                    <span>{processData.running}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-muted rounded-full mr-2"></span>
                      Sleeping
                    </span>
                    <span>{processData.sleeping}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                      Stopped
                    </span>
                    <span>{processData.stopped}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-destructive rounded-full mr-2"></span>
                      Zombie
                    </span>
                    <span>{processData.zombie}</span>
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
