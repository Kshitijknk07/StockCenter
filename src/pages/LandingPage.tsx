import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Cpu,
  Server,
  Network,
  MemoryStick,
  HardDrive,
  Gauge,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function LandingPage() {
  const navigate = useNavigate();
  useTheme();

  return (
    <div className="h-screen overflow-hidden bg-background flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-6 border-b">
        <div className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TrackMyPC</span>
        </div>
      </nav>

      {/* Main content - fills available space */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-6">
        <div className="max-w-xl md:mr-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Real-Time <span className="text-primary">System Monitoring</span>{" "}
            Dashboard
          </h1>
          <p className="text-base text-muted-foreground mb-6">
            Track your PC's performance metrics with precision. Monitor CPU,
            memory, network activity, and processes in real-time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="px-8"
            >
              Launch Dashboard
            </Button>

            {/* Feature highlights */}
            <div className="flex items-center space-x-6 mt-6">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <Cpu className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">CPU Monitoring</span>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <MemoryStick className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Memory Analysis</span>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <Network className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Network Insights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard preview - more compact */}
        <div className="w-full max-w-md mt-8 md:mt-0">
          <div className="bg-card border rounded-lg shadow-md overflow-hidden">
            {/* Window header with controls */}
            <div className="bg-muted p-2 border-b flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="text-xs text-muted-foreground ml-2 flex items-center">
                <Activity className="h-3 w-3 mr-1 text-primary" />
                TrackMyPC Dashboard
              </div>
            </div>

            {/* Dashboard header */}
            <div className="p-2 border-b flex justify-between items-center">
              <div className="text-xs font-medium">System Overview</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                Live • Updated just now
              </div>
            </div>

            {/* Main metrics grid - more compact */}
            <div className="grid grid-cols-2 gap-2 p-3">
              {/* CPU Usage */}
              <div className="bg-background rounded p-2 border relative overflow-hidden">
                <div className="flex items-center text-xs font-medium mb-1">
                  <Cpu className="h-3 w-3 mr-1 text-primary" />
                  CPU Usage
                </div>
                <div className="text-xl font-bold">45.2%</div>
                <div className="w-full h-1.5 bg-primary/20 rounded-full mt-1">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
                <div className="absolute bottom-1 right-2 text-xs text-muted-foreground">
                  8 cores
                </div>
              </div>

              {/* Memory */}
              <div className="bg-background rounded p-2 border relative overflow-hidden">
                <div className="flex items-center text-xs font-medium mb-1">
                  <MemoryStick className="h-3 w-3 mr-1 text-primary" />
                  Memory
                </div>
                <div className="text-xl font-bold">3.8 GB</div>
                <div className="w-full h-1.5 bg-primary/20 rounded-full mt-1">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <div className="absolute bottom-1 right-2 text-xs text-muted-foreground">
                  of 8 GB
                </div>
              </div>

              {/* Network */}
              <div className="bg-background rounded p-2 border relative overflow-hidden">
                <div className="flex items-center text-xs font-medium mb-1">
                  <Network className="h-3 w-3 mr-1 text-primary" />
                  Network
                </div>
                <div className="text-xl font-bold">2.4 MB/s</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 flex items-center">
                    <svg
                      className="h-3 w-3 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 15l7-7 7 7" />
                    </svg>
                    0.4 MB/s
                  </span>
                  <span className="mx-1">|</span>
                  <span className="text-blue-500 flex items-center">
                    <svg
                      className="h-3 w-3 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                    2.0 MB/s
                  </span>
                </div>
              </div>

              {/* Processes - Enhanced with more realistic data */}
              <div className="bg-background rounded p-2 border relative overflow-hidden">
                <div className="flex items-center text-xs font-medium mb-1">
                  <Server className="h-3 w-3 mr-1 text-primary" />
                  Processes
                </div>
                <div className="text-xl font-bold">124</div>
                <div className="flex flex-col text-xs text-muted-foreground mt-1">
                  <div className="flex items-center">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mr-1"></span>
                    <span>8 high CPU</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-1"></span>
                    <span>3 high memory</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Process list preview */}
            <div className="border-t p-2">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-medium flex items-center">
                  <Server className="h-3 w-3 mr-1 text-primary" />
                  Top Processes
                </div>
                <div className="text-xs text-muted-foreground">CPU Usage</div>
              </div>
              <div className="space-y-1.5 mt-1">
                {[
                  { name: "chrome.exe", pid: 1234, cpu: 12.4, memory: 420 },
                  { name: "vscode.exe", pid: 5678, cpu: 8.7, memory: 380 },
                  { name: "explorer.exe", pid: 9012, cpu: 3.2, memory: 120 },
                ].map((process, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5"></div>
                      <span className="font-medium">{process.name}</span>
                      <span className="text-muted-foreground ml-1.5">
                        PID: {process.pid}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">{process.cpu}%</span>
                      <div className="w-12 h-1.5 bg-primary/20 rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${process.cpu * 3}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status bar */}
            <div className="border-t p-1.5 bg-muted/50 flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center">
                <Gauge className="h-3 w-3 mr-1" />
                System Status: Healthy
              </div>
              <div className="flex items-center">
                <HardDrive className="h-3 w-3 mr-1" />
                Disk: 120 GB free
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
