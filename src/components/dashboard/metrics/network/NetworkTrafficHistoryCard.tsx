import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "../../charts/LineChart";
import { LineChart as LineChartIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { usePrometheusMetrics } from "@/hooks/usePrometheusMetrics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function NetworkTrafficHistoryCard() {
  const [networkHistory, setNetworkHistory] = useState<{
    download: number[];
    upload: number[];
  }>({
    download: [],
    upload: [],
  });
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const { currentMetrics } = usePrometheusMetrics();

  // Update history data
  useEffect(() => {
    const now = new Date();
    const timeLabel = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    setNetworkHistory((prev) => {
      const newDownload = [
        ...prev.download,
        currentMetrics.network.downloadSpeed,
      ];
      const newUpload = [...prev.upload, currentMetrics.network.uploadSpeed];
      return {
        download:
          newDownload.length > 20 ? newDownload.slice(-20) : newDownload,
        upload: newUpload.length > 20 ? newUpload.slice(-20) : newUpload,
      };
    });

    setTimeLabels((prev) => {
      const newLabels = [...prev, timeLabel];
      return newLabels.length > 20 ? newLabels.slice(-20) : newLabels;
    });
  }, [currentMetrics]);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <LineChartIcon className="h-4 w-4 text-primary" />
          </div>
          Network Traffic History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="combined">
          <TabsList className="mb-4">
            <TabsTrigger value="combined">Combined</TabsTrigger>
            <TabsTrigger value="download">Download</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="combined">
            <LineChart
              data={[
                ...networkHistory.download.map(
                  (d, i) => d + networkHistory.upload[i]
                ),
              ]}
              labels={timeLabels}
              color="hsl(var(--primary))"
            />
          </TabsContent>
          <TabsContent value="download">
            <LineChart
              data={networkHistory.download}
              labels={timeLabels}
              color="hsl(var(--info))"
            />
          </TabsContent>
          <TabsContent value="upload">
            <LineChart
              data={networkHistory.upload}
              labels={timeLabels}
              color="hsl(var(--success))"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
