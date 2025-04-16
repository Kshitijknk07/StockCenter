import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MetricCategory, MetricNavItem } from "@/types/metrics";
import {
  MonitorDot,
  Cpu,
  MemoryStick as Memory,
  HardDrive,
  Network,
  ListChecks,
  Gauge,
} from "lucide-react";

interface DashboardSidebarProps {
  selectedCategory: MetricCategory;
  onSelectCategory: (category: MetricCategory) => void;
}

const metricCategories: MetricNavItem[] = [
  { id: "system", label: "System Info", icon: "MonitorDot" },
  { id: "cpu", label: "CPU Metrics", icon: "Cpu" },
  { id: "memory", label: "Memory", icon: "Memory" },
  { id: "disk", label: "Storage", icon: "HardDrive" },
  { id: "network", label: "Network", icon: "Network" },
  { id: "processes", label: "Processes", icon: "ListChecks" },
  { id: "advanced", label: "Advanced", icon: "Gauge" },
];

const iconMap = {
  MonitorDot,
  Cpu,
  Memory,
  HardDrive,
  Network,
  ListChecks,
  Gauge,
};

export function DashboardSidebar({
  selectedCategory,
  onSelectCategory,
}: DashboardSidebarProps) {
  return (
    <div className="flex h-full flex-col border-r bg-muted/10">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-4 px-4 text-lg font-semibold tracking-tight">
              Metrics
            </h2>
            {metricCategories.map((category) => {
              const Icon = iconMap[category.icon as keyof typeof iconMap];
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "secondary" : "ghost"
                  }
                  className={cn(
                    "w-full justify-start",
                    selectedCategory === category.id && "bg-accent"
                  )}
                  onClick={() => onSelectCategory(category.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
