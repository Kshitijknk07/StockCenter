import { useState } from "react";

interface StockSearchProps {
  onSelectSymbol: (symbol: string) => void;
}

const popularStocks = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
];

export function StockSearch({ onSelectSymbol }: StockSearchProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSelectSymbol(searchInput.trim().toUpperCase());
      setSearchInput("");
    }
  };

  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="text-lg font-semibold mb-4">Search Stocks</h2>
      <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="flex-1 px-3 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Search
        </button>
      </form>
      <div>
        <h3 className="text-sm font-medium mb-2">Popular Stocks</h3>
        <div className="grid grid-cols-2 gap-2">
          {popularStocks.map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => onSelectSymbol(stock.symbol)}
              className="text-left px-3 py-2 text-sm rounded-md hover:bg-accent"
            >
              <div className="font-medium">{stock.symbol}</div>
              <div className="text-xs text-muted-foreground">{stock.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
