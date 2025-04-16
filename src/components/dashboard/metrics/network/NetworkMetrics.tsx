import { SystemMetrics } from "@/types/metrics";
import { NetworkSpeedCards } from "./NetworkSpeedCards";
import { NetworkTrafficHistoryCard } from "./NetworkTrafficHistoryCard";
import { NetworkInterfacesTable } from "./NetworkInterfacesTable";

interface NetworkMetricsProps {
  metrics: SystemMetrics;
}

export function NetworkMetrics({ metrics }: NetworkMetricsProps) {
  return (
    <div className="space-y-6">
      <NetworkSpeedCards network={metrics.network} />
      <NetworkTrafficHistoryCard />
      <NetworkInterfacesTable
        interfaces={metrics.networkInterfaces.map((iface) => ({
          ...iface,
          isUp: iface.status === "up",
        }))}
      />
    </div>
  );
}
