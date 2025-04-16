import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { Toaster } from "@/components/ui/toaster";
import { useTheme } from "./hooks/use-theme";

function App() {
  // Initialize theme hook to ensure theme is applied at app startup
  useTheme();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
