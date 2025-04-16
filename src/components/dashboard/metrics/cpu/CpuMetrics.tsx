import { SystemMetrics } from "@/types/metrics";
import { CpuUsageCard } from "./CpuUsageCard";
import { CpuLoadAverageCard } from "./CpuLoadAverageCard";
import { CpuTemperatureCard } from "./CpuTemperatureCard";
import { CpuUsageHistoryCard } from "./CpuUsageHistoryCard";
import { CpuCoresTable } from "./CpuCoresTable";
import { CpuDistributionCard } from "./CpuDistributionCard";
import { CpuFrequencyHistoryCard } from "./CpuFrequencyHistoryCard";

interface CpuMetricsProps {
  metrics: SystemMetrics;
}

export function CpuMetrics({ metrics }: CpuMetricsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CpuUsageCard cpu={metrics.cpu} />
        <CpuLoadAverageCard loadAverage={metrics.cpuLoadAverage} />
        <CpuTemperatureCard temperature={metrics.cpuTemperature} />
      </div>

      <CpuUsageHistoryCard />
      <CpuCoresTable />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CpuDistributionCard />
        <CpuFrequencyHistoryCard />
      </div>
    </div>
  );
}
