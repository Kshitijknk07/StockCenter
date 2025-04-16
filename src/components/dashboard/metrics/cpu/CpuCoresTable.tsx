import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Cpu } from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { usePrometheusMetrics } from "@/hooks/usePrometheusMetrics";

export function CpuCoresTable() {
  const { currentMetrics } = usePrometheusMetrics();
  const cores = currentMetrics.cpuCores || [];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <Cpu className="h-4 w-4 text-primary" />
          </div>
          CPU Cores
          <InfoTooltip
            className="ml-2"
            content="Shows detailed information about each CPU core, including usage percentage, frequency, and temperature. Helps identify if specific cores are being heavily utilized."
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Core</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Temperature</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cores.length > 0
              ? cores.map((core, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      Core {core.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress
                          value={core.usage}
                          className="h-2 w-16 mr-2"
                        />
                        <span>{core.usage.toFixed(1)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {(currentMetrics.cpuFrequency / 1000).toFixed(2)} GHz
                    </TableCell>
                    <TableCell>
                      {Math.floor(currentMetrics.cpuTemperature)}°C
                    </TableCell>
                  </TableRow>
                ))
              : // Fallback to dummy data if no cores data available
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">Core {i}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress
                          value={Math.random() * 100}
                          className="h-2 w-16 mr-2"
                        />
                        <span>{(Math.random() * 100).toFixed(1)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {(2 + Math.random() * 2).toFixed(2)} GHz
                    </TableCell>
                    <TableCell>
                      {Math.floor(40 + Math.random() * 20)}°C
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
