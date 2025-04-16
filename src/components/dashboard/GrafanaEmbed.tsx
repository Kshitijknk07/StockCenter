import { Card } from "@/components/ui/card";

export function GrafanaEmbed() {
  return (
    <Card className="p-4">
      <iframe
        src="http://localhost:3000/d/system-metrics/system-metrics?orgId=1&refresh=5s"
        width="100%"
        height="800"
        frameBorder="0"
      />
    </Card>
  );
}
