import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, AlertCircle, List } from "lucide-react";
import { formatBytes, formatNumber } from "@/lib/format";

interface NetworkSpeedCardsProps {
  network: {
    downloadSpeed: number;
    uploadSpeed: number;
    errors: number;
  };
}

export function NetworkSpeedCards({ network }: NetworkSpeedCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <Download className="h-4 w-4 text-primary" />
            </div>
            Download
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {formatBytes(network.downloadSpeed)}
            <span className="text-sm text-muted-foreground ml-1">/s</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <Upload className="h-4 w-4 text-primary" />
            </div>
            Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {formatBytes(network.uploadSpeed)}
            <span className="text-sm text-muted-foreground ml-1">/s</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <AlertCircle className="h-4 w-4 text-primary" />
            </div>
            Errors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {formatNumber(network.errors)}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <List className="h-4 w-4 text-primary" />
            </div>
            Interfaces
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">-</div>
        </CardContent>
      </Card>
    </div>
  );
}
