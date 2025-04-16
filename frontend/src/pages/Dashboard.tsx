import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { usePrometheusMetrics } from "@/hooks/usePrometheusMetrics";
import {
  Cpu,
  MemoryStick as Memory,
  HardDrive,
  Network,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { MetricCategory } from "@/types/metrics";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Dashboard() {
  const { currentMetrics, fetchMetricsNow } = usePrometheusMetrics();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedCategory, setSelectedCategory] =
    useState<MetricCategory>("cpu");
  const { toast } = useToast();

  useEffect(() => {
    console.log("Dashboard component mounted");

    fetchMetricsNow();
    setLastUpdated(new Date());

    const interval = setInterval(() => {
      console.log("Auto-refreshing metrics...");
      fetchMetricsNow();
      setLastUpdated(new Date());
    }, 5000);

    toast({
      title: "Dashboard Active",
      description: "Real-time metrics are now being fetched every 5 seconds",
    });

    return () => clearInterval(interval);
  }, [fetchMetricsNow, toast]);

  const handleRefresh = () => {
    console.log("Manual refresh triggered");
    fetchMetricsNow();
    setLastUpdated(new Date());

    toast({
      title: "Refreshed",
      description: "Metrics have been manually refreshed",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-6 relative">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">System Metrics</h2>
              <p className="text-muted-foreground mt-1">
                Monitor your system performance in real-time
              </p>
            </div>
            <div className="flex items-center gap-3 bg-background border rounded-lg p-2 shadow-sm">
              <span className="text-sm text-muted-foreground flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors text-sm"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <Separator />

          {/* Metrics Tabs */}
          <Tabs
            defaultValue="cpu"
            value={selectedCategory}
            onValueChange={(value) =>
              setSelectedCategory(value as MetricCategory)
            }
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger
                      value="cpu"
                      className={`flex items-center gap-2 ${
                        selectedCategory === "cpu"
                          ? "bg-primary/20 text-primary font-medium"
                          : ""
                      }`}
                    >
                      <Cpu className="h-4 w-4" />
                      <span>CPU</span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      CPU metrics show processor usage, temperature, and
                      performance data
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger
                      value="memory"
                      className={`flex items-center gap-2 ${
                        selectedCategory === "memory"
                          ? "bg-primary/20 text-primary font-medium"
                          : ""
                      }`}
                    >
                      <Memory className="h-4 w-4" />
                      <span>Memory</span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Memory metrics show RAM and swap usage information
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger
                      value="network"
                      className={`flex items-center gap-2 ${
                        selectedCategory === "network"
                          ? "bg-primary/20 text-primary font-medium"
                          : ""
                      }`}
                    >
                      <Network className="h-4 w-4" />
                      <span>Network</span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Network metrics show data transfer rates, connections, and
                      interface information
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger
                      value="process"
                      className={`flex items-center gap-2 ${
                        selectedCategory === "process"
                          ? "bg-primary/20 text-primary font-medium"
                          : ""
                      }`}
                    >
                      <HardDrive className="h-4 w-4" />
                      <span>Processes</span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Process metrics show running applications, resource usage,
                      and system tasks
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TabsList>

            <TabsContent value="cpu" className="mt-0">
              <MetricsGrid metrics={currentMetrics} selectedCategory="cpu" />
            </TabsContent>

            <TabsContent value="memory" className="mt-0">
              <MetricsGrid metrics={currentMetrics} selectedCategory="memory" />
            </TabsContent>

            <TabsContent value="network" className="mt-0">
              <MetricsGrid
                metrics={currentMetrics}
                selectedCategory="network"
              />
            </TabsContent>

            <TabsContent value="process" className="mt-0">
              {" "}
              <MetricsGrid
                metrics={currentMetrics}
                selectedCategory="process"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
