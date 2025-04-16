// Only showing the changes to add tooltips to key sections
import { SystemMetrics } from "@/types/metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cpu,
  MemoryStick,
  PieChart as PieChartIcon,
  Clock,
} from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";

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
              <InfoTooltip
                className="ml-2"
                content="Shows the total number of processes currently running on your system."
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.processes.total}</div>
          </CardContent>
        </Card>

        {/* Other cards remain the same */}
        {/* ... */}
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
        <CardContent>{/* Table content remains the same */}</CardContent>
      </Card>

      {/* Top Memory Processes */}
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
        <CardContent>{/* Table content remains the same */}</CardContent>
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
        <CardContent>{/* Content remains the same */}</CardContent>
      </Card>
    </div>
  );
}
