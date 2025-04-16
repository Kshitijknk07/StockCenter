import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Cpu,
  MemoryStick as MemoryIcon,
  HardDrive,
  Activity,
  Thermometer,
  Download,
  Upload,
  AlertCircle,
  List,
} from "lucide-react";
import { SystemMetrics, MetricCategory } from "@/types/metrics";
import { formatBytes, formatNumber } from "@/lib/format";

interface MetricsGridProps {
  metrics: SystemMetrics;
  selectedCategory: MetricCategory;
}

export function MetricsGrid({ metrics, selectedCategory }: MetricsGridProps) {
  const renderCpuMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="text-3xl font-bold">{metrics.cpu.toFixed(1)}%</div>
          <Progress value={metrics.cpu} className="h-2 mt-2" />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            Load Average
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">1 min</span>
              <span className="font-medium">
                {metrics.cpuLoadAverage.oneMin.toFixed(2)}
              </span>
            </div>
            <Progress
              value={metrics.cpuLoadAverage.oneMin * 33}
              className="h-1.5"
            />

            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">5 min</span>
              <span className="font-medium">
                {metrics.cpuLoadAverage.fiveMin.toFixed(2)}
              </span>
            </div>
            <Progress
              value={metrics.cpuLoadAverage.fiveMin * 33}
              className="h-1.5"
            />

            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">15 min</span>
              <span className="font-medium">
                {metrics.cpuLoadAverage.fifteenMin.toFixed(2)}
              </span>
            </div>
            <Progress
              value={metrics.cpuLoadAverage.fifteenMin * 33}
              className="h-1.5"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <Thermometer className="h-4 w-4 text-primary" />
            </div>
            Temperature
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{metrics.cpuTemperature}°C</div>
          <Progress
            value={Math.min((metrics.cpuTemperature / 100) * 100, 100)}
            className="h-2 mt-2"
          />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            Frequency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {(metrics.cpuFrequency / 1000).toFixed(2)} GHz
          </div>
          <Progress
            value={(metrics.cpuFrequency / 5000) * 100}
            className="h-2 mt-2"
          />
        </CardContent>
      </Card>
    </div>
  );

  const renderMemoryMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <MemoryIcon className="h-4 w-4 text-primary" />
            </div>
            Memory Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {metrics.memory.usagePercentage.toFixed(1)}%
          </div>
          <Progress
            value={metrics.memory.usagePercentage}
            className="h-2 mt-2"
          />
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-muted/50 p-2 rounded-md">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="font-medium">{formatBytes(metrics.memory.total)}</p>
            </div>
            <div className="bg-muted/50 p-2 rounded-md">
              <p className="text-xs text-muted-foreground">Used</p>
              <p className="font-medium">{formatBytes(metrics.memory.used)}</p>
            </div>
            <div className="bg-muted/50 p-2 rounded-md">
              <p className="text-xs text-muted-foreground">Free</p>
              <p className="font-medium">{formatBytes(metrics.memory.free)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
          <div className="text-3xl font-bold">
            {(
              (metrics.swap.used / Math.max(metrics.swap.total, 1)) *
              100
            ).toFixed(1)}
            %
          </div>
          <Progress
            value={(metrics.swap.used / Math.max(metrics.swap.total, 1)) * 100}
            className="h-2 mt-2"
          />
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-muted/50 p-2 rounded-md">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="font-medium">{formatBytes(metrics.swap.total)}</p>
            </div>
            <div className="bg-muted/50 p-2 rounded-md">
              <p className="text-xs text-muted-foreground">Used</p>
              <p className="font-medium">{formatBytes(metrics.swap.used)}</p>
            </div>
            <div className="bg-muted/50 p-2 rounded-md">
              <p className="text-xs text-muted-foreground">Free</p>
              <p className="font-medium">{formatBytes(metrics.swap.free)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNetworkMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <Download className="h-4 w-4 text-primary" />
            </div>
            Download
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {formatBytes(metrics.network.downloadSpeed)}
            <span className="text-sm text-muted-foreground ml-1">/s</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <Upload className="h-4 w-4 text-primary" />
            </div>
            Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {formatBytes(metrics.network.uploadSpeed)}
            <span className="text-sm text-muted-foreground ml-1">/s</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <AlertCircle className="h-4 w-4 text-primary" />
            </div>
            Errors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {formatNumber(metrics.network.errors)}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <List className="h-4 w-4 text-primary" />
            </div>
            Interfaces
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {metrics.networkInterfaces.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProcessMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="space-y-2">
            {metrics.processes.topCpu.slice(0, 5).map((process, index) => (
              <div
                key={process.pid}
                className="flex justify-between items-center p-2 rounded-md bg-muted/50"
              >
                <div className="flex items-center">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium mr-2">
                    {index + 1}
                  </span>
                  <span className="font-medium text-sm">{process.name}</span>
                </div>
                <span className="font-bold text-sm">
                  {process.cpu.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <MemoryIcon className="h-4 w-4 text-primary" />
            </div>
            Top Memory Processes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {metrics.processes.topMemory.slice(0, 5).map((process, index) => (
              <div
                key={process.pid}
                className="flex justify-between items-center p-2 rounded-md bg-muted/50"
              >
                <div className="flex items-center">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium mr-2">
                    {index + 1}
                  </span>
                  <span className="font-medium text-sm">{process.name}</span>
                </div>
                <span className="font-bold text-sm">
                  {formatBytes(process.memory)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Only render the component for the selected category
  switch (selectedCategory) {
    case "cpu":
      return renderCpuMetrics();
    case "memory":
      return renderMemoryMetrics();
    case "network":
      return renderNetworkMetrics();
    case "processes":
      return renderProcessMetrics();
    default:
      return null;
  }
}
