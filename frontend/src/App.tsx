import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./components/layout/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <h1 style={{ color: "red", textAlign: "center", padding: "20px" }}>
        STOCKPILOT TEST
      </h1>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
