import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { MetricsCharts } from "@/components/dashboard/MetricsCharts";
import { GrafanaEmbed } from "@/components/dashboard/GrafanaEmbed";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemMetrics, MetricCategory } from "@/types/metrics";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export function Dashboard() {
  const [metrics] = useState<SystemMetrics[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<MetricCategory>("system");
  const [currentMetrics] = useState<SystemMetrics>({
    // System Info
    hostname: "System",
    os: "Unknown",
    uptime: 0,
    bootTime: new Date().toISOString(),
    loggedInUsers: 1,

    // CPU Metrics
    cpu: 0,
    cpuCores: [],
    cpuLoadAverage: {
      oneMin: 0,
      fiveMin: 0,
      fifteenMin: 0,
    },
    cpuTemperature: 0,
    cpuFrequency: 0,

    // Memory Metrics
    memory: {
      total: 0,
      used: 0,
      free: 0,
      usagePercentage: 0,
    },
    swap: {
      total: 0,
      used: 0,
      free: 0,
    },

    // Disk Metrics
    disk: {
      total: 0,
      used: 0,
      free: 0,
      usagePercentage: 0,
      readSpeed: 0,
      writeSpeed: 0,
    },
    mountPoints: [],

    // Network Metrics
    network: {
      downloadSpeed: 0,
      uploadSpeed: 0,
      totalReceived: 0,
      totalSent: 0,
      errors: 0,
      droppedPackets: 0,
    },
    networkInterfaces: [],

    // Process Metrics
    processes: {
      total: 0,
      running: 0,
      sleeping: 0,
      stopped: 0,
      zombie: 0,
      topCpu: [],
      topMemory: [],
    },

    timestamp: Date.now(),
  });

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <DashboardSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            <div className="h-full p-8 space-y-8">
              <MetricsGrid
                metrics={currentMetrics}
                selectedCategory={selectedCategory}
              />

              <Tabs defaultValue="metrics" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                  <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
                  <TabsTrigger value="grafana">Grafana Dashboard</TabsTrigger>
                </TabsList>

                <TabsContent value="metrics" className="space-y-4">
                  <MetricsCharts metrics={metrics} />
                </TabsContent>

                <TabsContent value="grafana">
                  <GrafanaEmbed />
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
