import { useState, useEffect, useCallback } from "react";
import { SystemMetrics } from "@/types/metrics";

// Define initial metrics state with all required properties
const initialMetrics: SystemMetrics = {
  // System Info
  hostname: "Loading...",
  os: "Windows",
  uptime: 0,
  bootTime: new Date().toISOString(),
  loggedInUsers: 0,

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
};

// Function to fetch metrics from the API
const fetchMetrics = async (): Promise<SystemMetrics> => {
  try {
    console.log("Fetching metrics...");
    // For testing, generate some random data if the API isn't working
    // Remove this in production and use only the API call
    const mockData: SystemMetrics = {
      ...initialMetrics,
      hostname: "PC-" + Math.floor(Math.random() * 1000),
      os: "Windows 11",
      uptime: Math.floor(Math.random() * 100000),
      bootTime: new Date().toISOString(),
      loggedInUsers: Math.floor(Math.random() * 3) + 1,
      cpu: Math.random() * 100,
      cpuCores: Array(4)
        .fill(0)
        .map((_, i) => ({
          id: i,
          usage: Math.random() * 100,
        })),
      cpuLoadAverage: {
        oneMin: Math.random() * 2,
        fiveMin: Math.random() * 1.5,
        fifteenMin: Math.random() * 1,
      },
      cpuTemperature: 40 + Math.random() * 30,
      cpuFrequency: 2000 + Math.random() * 1000,
      memory: {
        total: 16 * 1024 * 1024 * 1024,
        used: Math.random() * 8 * 1024 * 1024 * 1024,
        free: Math.random() * 8 * 1024 * 1024 * 1024,
        usagePercentage: Math.random() * 100,
      },
      swap: {
        total: 4 * 1024 * 1024 * 1024,
        used: Math.random() * 2 * 1024 * 1024 * 1024,
        free: Math.random() * 2 * 1024 * 1024 * 1024,
      },
      disk: {
        total: 500 * 1024 * 1024 * 1024,
        used: Math.random() * 300 * 1024 * 1024 * 1024,
        free: Math.random() * 200 * 1024 * 1024 * 1024,
        usagePercentage: Math.random() * 100,
        readSpeed: Math.random() * 100 * 1024 * 1024,
        writeSpeed: Math.random() * 50 * 1024 * 1024,
      },
      mountPoints: [
        {
          path: "C:",
          total: 500 * 1024 * 1024 * 1024,
          used: Math.random() * 300 * 1024 * 1024 * 1024,
          free: Math.random() * 200 * 1024 * 1024 * 1024,
        },
      ],
      network: {
        downloadSpeed: Math.random() * 10 * 1024 * 1024,
        uploadSpeed: Math.random() * 2 * 1024 * 1024,
        totalReceived: Math.random() * 50 * 1024 * 1024 * 1024,
        totalSent: Math.random() * 10 * 1024 * 1024 * 1024,
        errors: Math.floor(Math.random() * 10),
        droppedPackets: Math.floor(Math.random() * 20),
      },
      networkInterfaces: [
        {
          name: "Ethernet",
          ipAddress: "192.168.1." + Math.floor(Math.random() * 255),
          status: "Connected",
        },
      ],
      processes: {
        total: 100 + Math.floor(Math.random() * 100),
        running: 50 + Math.floor(Math.random() * 50),
        sleeping: 30 + Math.floor(Math.random() * 30),
        stopped: Math.floor(Math.random() * 5),
        zombie: Math.floor(Math.random() * 2),
        topCpu: Array(5)
          .fill(0)
          .map((_, i) => ({
            pid: 1000 + i,
            name: [
              "chrome.exe",
              "explorer.exe",
              "vscode.exe",
              "node.exe",
              "spotify.exe",
            ][i],
            cpu: Math.random() * 20,
            memory: Math.random() * 500 * 1024 * 1024,
          })),
        topMemory: Array(5)
          .fill(0)
          .map((_, i) => ({
            pid: 1000 + i,
            name: [
              "chrome.exe",
              "explorer.exe",
              "vscode.exe",
              "node.exe",
              "spotify.exe",
            ][i],
            cpu: Math.random() * 20,
            memory: Math.random() * 500 * 1024 * 1024,
          })),
      },
      timestamp: Date.now(),
    };

    // Try to fetch from API first
    try {
      const response = await fetch("/api/metrics");
      if (response.ok) {
        return await response.json();
      }
      console.warn("API request failed, using mock data");
      return mockData;
    } catch (error) {
      console.warn("API request failed, using mock data:", error);
      return mockData;
    }
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return initialMetrics;
  }
};

// Add a refresh function to the hook
export function usePrometheusMetrics() {
  const [metrics, setMetrics] = useState<SystemMetrics[]>([]);
  const [currentMetrics, setCurrentMetrics] =
    useState<SystemMetrics>(initialMetrics);

  const fetchMetricsNow = useCallback(() => {
    console.log("Fetching metrics now...");
    fetchMetrics().then((data: SystemMetrics) => {
      setMetrics((prev) => [...prev.slice(-19), data]);
      setCurrentMetrics(data);
    });
  }, []);

  useEffect(() => {
    console.log("Setting up metrics polling...");
    fetchMetricsNow();
    const interval = setInterval(fetchMetricsNow, 5000);
    return () => clearInterval(interval);
  }, [fetchMetricsNow]);

  return { metrics, currentMetrics, fetchMetricsNow };
}
