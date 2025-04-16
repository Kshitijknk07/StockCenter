import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Thermometer } from "lucide-react";

interface CpuTemperatureCardProps {
  temperature: number;
}

export function CpuTemperatureCard({ temperature }: CpuTemperatureCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <Thermometer className="h-4 w-4 text-primary" />
          </div>
          Temperature
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{temperature}°C</div>
        <Progress
          value={Math.min((temperature / 100) * 100, 100)}
          className="h-2 mt-2"
        />
      </CardContent>
    </Card>
  );
}
