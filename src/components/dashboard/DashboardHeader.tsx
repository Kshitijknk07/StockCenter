import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Activity, Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/use-theme";

export function DashboardHeader() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <div className="border-b bg-background sticky top-0 z-50">
      <div className="container flex h-14 items-center px-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Activity className="h-5 w-5 text-primary" />
          <span className="font-semibold text-base">TrackMyPC</span>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
