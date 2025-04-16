import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Cpu,
  MemoryStick as MemoryIcon,
  HardDrive,
  Activity,
  Monitor,
  Clock,
  Users,
  Thermometer,
  Download,
  Upload,
  AlertCircle,
  List,
} from "lucide-react";
import { SystemMetrics, MetricCategory } from "@/types/metrics";
import { formatBytes, formatDuration, formatNumber } from "@/lib/format";

interface MetricsGridProps {
  metrics: SystemMetrics;
  selectedCategory: MetricCategory;
}

export function MetricsGrid({ metrics, selectedCategory }: MetricsGridProps) {
  const renderSystemInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Monitor className="h-4 w-4" />
          <h3 className="font-medium">System Info</h3>
        </div>
        <div className="space-y-1">
          <p>Hostname: {metrics.hostname}</p>
          <p>OS: {metrics.os}</p>
        </div>
      </Card>

      <Card className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <h3 className="font-medium">Uptime</h3>
        </div>
        <p className="text-2xl font-bold">{formatDuration(metrics.uptime)}</p>
      </Card>

      <Card className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4" />
          <h3 className="font-medium">Users</h3>
        </div>
        <p className="text-2xl font-bold">{metrics.loggedInUsers}</p>
      </Card>
    </div>
  );

  const renderCpuMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Cpu className="h-4 w-4" />
          <h3 className="font-medium">CPU Usage</h3>
        </div>
        <Progress value={metrics.cpu} className="h-2" />
        <p className="text-2xl font-bold">{metrics.cpu.toFixed(1)}%</p>
      </Card>

      <Card className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4" />
          <h3 className="font-medium">Load Average</h3>
        </div>
        <div className="space-y-1">
          <p>1m: {metrics.cpuLoadAverage.oneMin.toFixed(2)}</p>
          <p>5m: {metrics.cpuLoadAverage.fiveMin.toFixed(2)}</p>
          <p>15m: {metrics.cpuLoadAverage.fifteenMin.toFixed(2)}</p>
        </div>
      </Card>

      <Card className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Thermometer className="h-4 w-4" />
          <h3 className="font-medium">Temperature</h3>
        </div>
        <p className="text-2xl font-bold">{metrics.cpuTemperature}°C</p>
      </Card>

      <Card className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4" />
          <h3 className="font-medium">Frequency</h3>
        </div>
        <p className="text-2xl font-bold">
          {(metrics.cpuFrequency / 1000).toFixed(2)} GHz
        </p>
      </Card>
    </div>
  );

  const renderMemoryMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <MemoryIcon className="h-4 w-4" />
          <h3 className="font-medium">Memory Usage</h3>
        </div>
        <Progress value={metrics.memory.usagePercentage} className="h-2" />
        <div className="space-y-1">
          <p>Total: {formatBytes(metrics.memory.total)}</p>
          <p>Used: {formatBytes(metrics.memory.used)}</p>
          <p>Free: {formatBytes(metrics.memory.free)}</p>
        </div>
      </Card>

      <Card className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <HardDrive className="h-4 w-4" />
          <h3 className="font-medium">Swap Memory</h3>
        </div>
        <div className="space-y-1">
          <p>Total: {formatBytes(metrics.swap.total)}</p>
          <p>Used: {formatBytes(metrics.swap.used)}</p>
          <p>Free: {formatBytes(metrics.swap.free)}</p>
        </div>
      </Card>
    </div>
  );

  const renderNetworkMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <h3 className="font-medium">Download</h3>
        </div>
        <p className="text-2xl font-bold">
          {formatBytes(metrics.network.downloadSpeed)}/s
        </p>
      </Card>

      <Card className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <h3 className="font-medium">Upload</h3>
        </div>
        <p className="text-2xl font-bold">
          {formatBytes(metrics.network.uploadSpeed)}/s
        </p>
      </Card>

      <Card className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-4 w-4" />
          <h3 className="font-medium">Errors</h3>
        </div>
        <p className="text-2xl font-bold">
          {formatNumber(metrics.network.errors)}
        </p>
      </Card>

      <Card className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <List className="h-4 w-4" />
          <h3 className="font-medium">Interfaces</h3>
        </div>
        <p className="text-2xl font-bold">{metrics.networkInterfaces.length}</p>
      </Card>
    </div>
  );

  const renderProcessMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Top CPU Processes</h3>
        <div className="space-y-2">
          {metrics.processes.topCpu.slice(0, 5).map((process) => (
            <div
              key={process.pid}
              className="flex justify-between items-center"
            >
              <span>{process.name}</span>
              <span>{process.cpu.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Top Memory Processes</h3>
        <div className="space-y-2">
          {metrics.processes.topMemory.slice(0, 5).map((process) => (
            <div
              key={process.pid}
              className="flex justify-between items-center"
            >
              <span>{process.name}</span>
              <span>{formatBytes(process.memory)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const categoryComponents = {
    system: renderSystemInfo,
    cpu: renderCpuMetrics,
    memory: renderMemoryMetrics,
    network: renderNetworkMetrics,
    processes: renderProcessMetrics,
  };

  const render =
    categoryComponents[selectedCategory as keyof typeof categoryComponents];
  return render ? render() : null;
}
