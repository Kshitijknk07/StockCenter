import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="ml-4">
          <h1 className="text-2xl font-semibold">System Monitor</h1>
          <p className="text-sm text-muted-foreground">
            Real-time performance metrics for your system
          </p>
        </div>
      </div>
    </div>
  );
}
