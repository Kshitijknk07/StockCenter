import { SystemMetrics, MetricCategory } from "@/types/metrics";
import { CpuMetrics } from "./metrics/cpu/CpuMetrics";
import { MemoryMetrics } from "./metrics/memory/MemoryMetrics";
import { NetworkMetrics } from "./metrics/network/NetworkMetrics";
import { DiskMetrics } from "./metrics/disk/DiskMetrics";
import { ProcessMetrics } from "./metrics/process/ProcessMetrics";

interface MetricsGridProps {
  metrics: SystemMetrics;
  selectedCategory: MetricCategory;
}

export function MetricsGrid({ metrics, selectedCategory }: MetricsGridProps) {
  switch (selectedCategory) {
    case "cpu":
      return <CpuMetrics metrics={metrics} />;
    case "memory":
      return <MemoryMetrics metrics={metrics} />;
    case "disk":
      return <DiskMetrics metrics={metrics} />;
    case "network":
      return <NetworkMetrics metrics={metrics} />;
    case "process":
      return <ProcessMetrics metrics={metrics} />;
    default:
      return <CpuMetrics metrics={metrics} />;
  }
}
