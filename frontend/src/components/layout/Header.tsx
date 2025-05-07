import { useState, useEffect } from "react";
import { fetchMarketStatus } from "@/lib/api";

export function Header() {
  const [marketStatus, setMarketStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMarketStatus = async () => {
      try {
        const data = await fetchMarketStatus();
        setMarketStatus(data);
      } catch (error) {
        console.error("Error fetching market status:", error);
      } finally {
        setLoading(false);
      }
    };

    getMarketStatus();
  }, []);

  return (
    <header className="border-b bg-background p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">StockPilot</h1>
        <div className="flex items-center space-x-4">
          {loading ? (
            <p>Loading market status...</p>
          ) : marketStatus?.markets ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <span className="mr-2">US Market:</span>
                {marketStatus.markets.find(
                  (m: any) => m.region === "United States"
                )?.current_status === "open" ? (
                  <span className="flex items-center">
                    <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                    Open
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="mr-1 h-2 w-2 rounded-full bg-red-500"></span>
                    Closed
                  </span>
                )}
              </div>
            </div>
          ) : (
            <p>Market status unavailable</p>
          )}
        </div>
      </div>
    </header>
  );
}
