const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api";

export interface StockData {
  metadata: {
    [key: string]: string;
  };
  timeSeries: {
    timestamp: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[];
}

export interface MarketStatus {
  markets: {
    market_type: string;
    region: string;
    primary_exchanges: string;
    local_open: string;
    local_close: string;
    current_status: string;
    notes: string;
  }[];
}

// Fetch intraday stock data
export async function fetchStockData(
  symbol: string,
  interval: string = "5min"
): Promise<StockData> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/stock/${symbol}?interval=${interval}&format=processed`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch stock data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
}

// Fetch daily stock data
export async function fetchDailyStockData(symbol: string): Promise<StockData> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/daily/${symbol}?format=processed`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch daily stock data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching daily stock data:", error);
    throw error;
  }
}

// Fetch weekly stock data
export async function fetchWeeklyStockData(symbol: string): Promise<StockData> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weekly/${symbol}?format=processed`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weekly stock data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weekly stock data:", error);
    throw error;
  }
}

// Fetch monthly stock data
export async function fetchMonthlyStockData(
  symbol: string
): Promise<StockData> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/monthly/${symbol}?format=processed`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch monthly stock data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching monthly stock data:", error);
    throw error;
  }
}

// Fetch market status
export async function fetchMarketStatus(): Promise<MarketStatus> {
  try {
    const response = await fetch(`${API_BASE_URL}/market-status`);
    if (!response.ok) {
      throw new Error("Failed to fetch market status");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching market status:", error);
    throw error;
  }
}
