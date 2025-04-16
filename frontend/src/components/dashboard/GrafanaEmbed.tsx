import { Card } from "@/components/ui/card";
import { useState } from "react";
import { usePrometheusMetrics } from "@/hooks/usePrometheusMetrics";

export function GrafanaEmbed() {
  const [showGrafana, setShowGrafana] = useState(false);
  const { currentMetrics } = usePrometheusMetrics();
  const grafanaUrl =
    "http://localhost:3000/d/CPU-USAGE/cpu-usage?orgId=1&refresh=5s";

  // If user wants to try Grafana
  if (showGrafana) {
    return (
      <Card className="p-4">
        <div className="mb-4">
          <button
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md"
            onClick={() => setShowGrafana(false)}
          >
            Show Built-in Metrics
          </button>
        </div>
        <iframe
          src={grafanaUrl}
          width="100%"
          height="800"
          frameBorder="0"
          title="System Metrics Dashboard"
          onError={() => setShowGrafana(false)}
        />
      </Card>
    );
  }

  // Show our custom metrics dashboard
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">System Metrics Dashboard</h2>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          onClick={() => setShowGrafana(true)}
        >
          Try Grafana Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CPU Usage */}
        <Card className="p-4 shadow-sm">
          <h3 className="text-lg font-medium mb-2">CPU Usage</h3>
          <div className="relative h-8 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-chart-1 rounded-full"
              style={{ width: `${currentMetrics.cpu}%` }}
            ></div>
          </div>
          <p className="mt-2 text-right font-medium">
            {currentMetrics.cpu.toFixed(1)}%
          </p>
        </Card>

        {/* Memory Usage */}
        <Card className="p-4 shadow-sm">
          <h3 className="text-lg font-medium mb-2">Memory Usage</h3>
          <div className="relative h-8 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-chart-2 rounded-full"
              style={{ width: `${currentMetrics.memory.usagePercentage}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span>
              Used: {(currentMetrics.memory.used / 1073741824).toFixed(2)} GB
            </span>
            <span>
              Total: {(currentMetrics.memory.total / 1073741824).toFixed(2)} GB
            </span>
          </div>
          <p className="mt-1 text-right font-medium">
            {currentMetrics.memory.usagePercentage.toFixed(1)}%
          </p>
        </Card>

        {/* Disk Usage */}
        <Card className="p-4 shadow-sm">
          <h3 className="text-lg font-medium mb-2">Disk Usage (C:)</h3>
          <div className="relative h-8 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-chart-3 rounded-full"
              style={{ width: `${currentMetrics.disk.usagePercentage}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span>
              Used: {(currentMetrics.disk.used / 1073741824).toFixed(2)} GB
            </span>
            <span>
              Total: {(currentMetrics.disk.total / 1073741824).toFixed(2)} GB
            </span>
          </div>
          <p className="mt-1 text-right font-medium">
            {currentMetrics.disk.usagePercentage.toFixed(1)}%
          </p>
        </Card>

        {/* Network */}
        <Card className="p-4 shadow-sm">
          <h3 className="text-lg font-medium mb-2">Network Traffic</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Download</p>
              <p className="text-lg font-medium">
                {(currentMetrics.network.downloadSpeed / 1024).toFixed(2)} KB/s
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upload</p>
              <p className="text-lg font-medium">
                {(currentMetrics.network.uploadSpeed / 1024).toFixed(2)} KB/s
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
}
