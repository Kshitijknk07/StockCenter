import { SystemMetrics } from "@/types/metrics";
import { MemoryUsageCard } from "./MemoryUsageCard";
import { SwapMemoryCard } from "./SwapMemoryCard";
import { MemoryUsageHistoryCard } from "./MemoryUsageHistoryCard";
import { MemoryDistributionCard } from "./MemoryDistributionCard";

interface MemoryMetricsProps {
  metrics: SystemMetrics;
}

export function MemoryMetrics({ metrics }: MemoryMetricsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MemoryUsageCard memory={metrics.memory} />
        <SwapMemoryCard swap={metrics.swap} />
      </div>

      <MemoryUsageHistoryCard />
      <MemoryDistributionCard memory={metrics.memory} />
    </div>
  );
}
