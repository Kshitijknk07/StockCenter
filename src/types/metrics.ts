import React, { ReactNode } from "react";

export interface SystemMetrics {
  diskPartitions: unknown;
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
    iops: unknown;
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
    threads: ReactNode;
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

// Define MetricCategory type
export type MetricCategory = "cpu" | "memory" | "disk" | "network" | "process";

// Fix the line with 'any' on line 39 by using a more specific type
// For example, if it's an object with unknown properties:
export interface UnknownObject {
  [key: string]: unknown;
}

// Then use this type instead of 'any'

// Fix the ReactNode error by ensuring React is imported
export interface MetricNavItem {
  id: MetricCategory;
  label: string;
  icon: React.ReactNode; // Use React.ReactNode instead of just ReactNode
}
