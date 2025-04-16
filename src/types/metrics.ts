export interface SystemMetrics {
  // System Info
  hostname: string;
  os: string;
  uptime: number;
  bootTime: string;
  loggedInUsers: number;

  // CPU Metrics
  cpu: number;
  cpuCores: {
    id: number;
    usage: number;
  }[];
  cpuLoadAverage: {
    oneMin: number;
    fiveMin: number;
    fifteenMin: number;
  };
  cpuTemperature: number;
  cpuFrequency: number;

  // Memory Metrics
  memory: {
    total: number;
    used: number;
    free: number;
    usagePercentage: number;
  };
  swap: {
    total: number;
    used: number;
    free: number;
  };

  // Disk Metrics
  disk: {
    total: number;
    used: number;
    free: number;
    usagePercentage: number;
    readSpeed: number;
    writeSpeed: number;
  };
  mountPoints: {
    path: string;
    total: number;
    used: number;
    free: number;
  }[];

  // Network Metrics
  network: {
    downloadSpeed: number;
    uploadSpeed: number;
    totalReceived: number;
    totalSent: number;
    errors: number;
    droppedPackets: number;
  };
  networkInterfaces: {
    name: string;
    ipAddress: string;
    status: string;
  }[];

  // Process Metrics
  processes: {
    total: number;
    running: number;
    sleeping: number;
    stopped: number;
    zombie: number;
    topCpu: {
      pid: number;
      name: string;
      cpu: number;
      memory: number;
    }[];
    topMemory: {
      pid: number;
      name: string;
      cpu: number;
      memory: number;
    }[];
  };

  // Optional Metrics
  battery?: {
    percentage: number;
    isCharging: boolean;
    timeRemaining: number;
  };
  gpu?: {
    name: string;
    usage: number;
    temperature: number;
    memoryUsed: number;
    memoryTotal: number;
  };

  timestamp: number;
}

export type MetricCategory =
  | "system"
  | "cpu"
  | "memory"
  | "disk"
  | "network"
  | "processes"
  | "advanced";

export interface MetricNavItem {
  id: MetricCategory;
  label: string;
  icon: string;
}
