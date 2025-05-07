import { useState, useEffect } from "react";
import { fetchMarketStatus } from "@/lib/api";

export function MarketStatus() {
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

  if (loading) {
    return (
      <div className="rounded-lg border bg-card p-4">
        <h2 className="text-lg font-semibold mb-4">Market Status</h2>
        <p>Loading market status...</p>
      </div>
    );
  }

  if (!marketStatus || !marketStatus.markets) {
    return (
      <div className="rounded-lg border bg-card p-4">
        <h2 className="text-lg font-semibold mb-4">Market Status</h2>
        <p>Market status information unavailable</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="text-lg font-semibold mb-4">Market Status</h2>
      <div className="space-y-4">
        {marketStatus.markets.map((market: any, index: number) => (
          <div key={index} className="border-b pb-2 last:border-0">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{market.region}</p>
                <p className="text-xs text-muted-foreground">
                  {market.market_type}
                </p>
              </div>
              <div className="flex items-center">
                {market.current_status === "open" ? (
                  <span className="flex items-center text-green-500">
                    <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                    Open
                  </span>
                ) : (
                  <span className="flex items-center text-red-500">
                    <span className="mr-1 h-2 w-2 rounded-full bg-red-500"></span>
                    Closed
                  </span>
                )}
              </div>
            </div>
            <div className="mt-1 text-xs">
              <p>
                Hours: {market.local_open} - {market.local_close}
              </p>
              {market.notes && (
                <p className="text-muted-foreground">{market.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
