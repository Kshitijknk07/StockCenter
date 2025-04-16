import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Activity, BarChart3, Cpu, Shield } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SystemMonitor</span>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl font-bold tracking-tight mb-6">
            Monitor Your System Performance
            <span className="text-primary">in Real Time</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Get instant insights into your system's performance with our
            powerful monitoring dashboard. Track CPU, memory, disk usage, and
            network activity all in one place.
          </p>
          <Button size="lg" onClick={() => navigate("/dashboard")}>
            Get Started
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Resource Monitoring</h3>
            <p className="text-muted-foreground">
              Track CPU, memory, and disk usage in real-time with detailed
              metrics and historical data.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground">
              Visualize performance trends with interactive charts and
              customizable dashboards.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Monitoring</h3>
            <p className="text-muted-foreground">
              Your data is encrypted and securely transmitted, ensuring privacy
              and security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
