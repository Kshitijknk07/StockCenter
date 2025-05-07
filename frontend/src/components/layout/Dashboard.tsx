import { StockSearch } from "@/components/stocks/StockSearch";
import { MarketStatus } from "@/components/stocks/MarketStatus";
import { StockChart } from "@/components/stocks/StockChart";
import { useState } from "react";

export function Dashboard() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("AAPL");
  const [timeFrame, setTimeFrame] = useState<
    "intraday" | "daily" | "weekly" | "monthly"
  >("daily");

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        <StockSearch onSelectSymbol={setSelectedSymbol} />
        <StockChart symbol={selectedSymbol} timeFrame={timeFrame} />
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeFrame("intraday")}
            className={`px-4 py-2 rounded ${
              timeFrame === "intraday"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            Intraday
          </button>
          <button
            onClick={() => setTimeFrame("daily")}
            className={`px-4 py-2 rounded ${
              timeFrame === "daily"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeFrame("weekly")}
            className={`px-4 py-2 rounded ${
              timeFrame === "weekly"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeFrame("monthly")}
            className={`px-4 py-2 rounded ${
              timeFrame === "monthly"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>
      <div>
        <MarketStatus />
      </div>
    </div>
  );
}
