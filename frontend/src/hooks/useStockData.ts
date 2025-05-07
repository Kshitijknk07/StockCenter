import { useState, useEffect } from "react";
import {
  fetchStockData,
  fetchDailyStockData,
  fetchWeeklyStockData,
  fetchMonthlyStockData,
  type StockData,
} from "@/lib/api";

type TimeFrame = "intraday" | "daily" | "weekly" | "monthly";
type IntradayInterval = "1min" | "5min" | "15min" | "30min" | "60min";

interface UseStockDataProps {
  symbol: string;
  timeFrame: TimeFrame;
  interval?: IntradayInterval;
}

export function useStockData({
  symbol,
  timeFrame,
  interval = "5min",
}: UseStockDataProps) {
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let result;
      switch (timeFrame) {
        case "intraday":
          result = await fetchStockData(symbol, interval);
          break;
        case "daily":
          result = await fetchDailyStockData(symbol);
          break;
        case "weekly":
          result = await fetchWeeklyStockData(symbol);
          break;
        case "monthly":
          result = await fetchMonthlyStockData(symbol);
          break;
        default:
          result = await fetchStockData(symbol, interval);
      }

      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!symbol) {
      setLoading(false);
      return;
    }

    fetchData();

    let intervalId: number | undefined;
    if (timeFrame === "intraday") {
      intervalId = window.setInterval(fetchData, 60000);
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [symbol, timeFrame, interval]);

  return { data, loading, error, refetch: fetchData };
}
