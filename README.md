# StockCenter API

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Overview

StockCenter is a powerful, flexible backend service for retrieving and managing stock market data. Built with Go, it provides a comprehensive REST API that delivers real-time and historical stock information from Alpha Vantage.

## Features

- **Real-time Market Data**: Access up-to-the-minute stock quotes and intraday data
- **Historical Analysis**: Retrieve daily, weekly, and monthly historical stock data
- **Symbol Search**: Find stock symbols and company information
- **Market Status**: Check current status of global markets
- **Options Data**: Access historical options pricing information
- **RESTful Architecture**: Clean, well-documented API endpoints
- **Scalable Design**: Built with performance and reliability in mind
- **Security**: Rate limiting, CORS support, and input validation
- **Monitoring**: Health checks and system metrics
- **Containerized**: Ready for Docker deployment

## Installation

### Prerequisites

- Go 1.16 or higher
- Alpha Vantage API key ([Get one here](https://www.alphavantage.co/support/#api-key))

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/stockcenter.git
   cd stockcenter
   ```

2. Install dependencies
   ```bash
   go mod download
   ```

3. Create a `.env` file in the project root with your API key
   ```
   STOCK_API_KEY=your_alpha_vantage_api_key
   PORT=9090  # Optional, defaults to 9090
   ```

4. Build and run the application
   ```bash
   go build
   ./stockcenter
   ```

## API Endpoints

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/health` | GET | System health and metrics | None |
| `/api/intraday` | GET | Get intraday time series data | `symbol` (required), `interval` (optional) |
| `/api/daily` | GET | Get daily time series data | `symbol` (required), `outputsize` (optional) |
| `/api/weekly` | GET | Get weekly time series data | `symbol` (required) |
| `/api/monthly` | GET | Get monthly time series data | `symbol` (required) |
| `/api/quote` | GET | Get current stock quote | `symbol` (required) |
| `/api/search` | GET | Search for stock symbols | `keywords` (required) |
| `/api/market-status` | GET | Get current market status | None |
| `/api/historical-options` | GET | Get historical options data | `symbol` (required), `date` (optional) |

## Security Features

- **Rate Limiting**: 100 requests per minute per IP address
- **CORS Support**: Cross-Origin Resource Sharing enabled
- **Input Validation**: All required parameters are validated
- **Error Handling**: Standardized error responses

## Monitoring

The `/health` endpoint provides:
- System status
- Uptime
- Memory usage statistics
- Timestamp

## Docker Deployment

```bash
# Build the Docker image
docker build -t stockcenter .

# Run the container
docker run -p 9090:9090 -e STOCK_API_KEY=your_api_key stockcenter
```

## Testing

Run the test suite:
```bash
go test ./...
```

## Frontend Integration

### React Example

```javascript
import { useState, useEffect } from 'react';

function StockQuote({ symbol }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://your-stockcenter-url/api/quote?symbol=${symbol}`)
      .then(response => response.json())
      .then(data => {
        setQuote(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching quote:', error));
  }, [symbol]);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="stock-quote">
      <h2>{quote.GlobalQuote['01. symbol']}</h2>
      <p>Price: ${quote.GlobalQuote['05. price']}</p>
      <p>Change: {quote.GlobalQuote['09. change']} ({quote.GlobalQuote['10. change percent']})</p>
    </div>
  );
}
```

### Vue.js Example

```javascript
<template>
  <div class="stock-data" v-if="!loading">
    <h3>{{ symbol }} Historical Data</h3>
    <line-chart :data="chartData" />
  </div>
  <div v-else>Loading data...</div>
</template>

<script>
export default {
  props: ['symbol'],
  data() {
    return {
      historicalData: null,
      chartData: [],
      loading: true
    };
  },
  mounted() {
    this.fetchHistoricalData();
  },
  methods: {
    fetchHistoricalData() {
      fetch(`http://your-stockcenter-url/api/daily?symbol=${this.symbol}`)
        .then(response => response.json())
        .then(data => {
          this.historicalData = data;
          this.prepareChartData();
          this.loading = false;
        });
    },
    prepareChartData() {
      // Transform API data for your charting library
    }
  }
};
</script>
```

## Error Responses

All error responses follow this format:
```json
{
  "status": 400,
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Rate Limiting

The API implements rate limiting:
- 100 requests per minute per IP address
- Rate limit exceeded responses include a 429 status code

