package service

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

func TestGetIntradayData(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{
			"Meta Data": {
				"1. Information": "Intraday (5min) open, high, low, close prices and volume",
				"2. Symbol": "IBM",
				"3. Last Refreshed": "2024-01-01 16:00:00",
				"4. Interval": "5min",
				"5. Output Size": "Compact",
				"6. Time Zone": "US/Eastern"
			},
			"Time Series (5min)": {
				"2024-01-01 16:00:00": {
					"1. open": "150.0000",
					"2. high": "151.0000",
					"3. low": "149.0000",
					"4. close": "150.5000",
					"5. volume": "1000"
				}
			}
		}`))
	}))
	defer server.Close()

	service := &StockService{
		client: &http.Client{Timeout: 5 * time.Second},
	}

	response, err := service.GetIntradayData("IBM", "5min")
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	if response.MetaData.Symbol != "IBM" {
		t.Errorf("Expected symbol IBM, got %s", response.MetaData.Symbol)
	}

	if len(response.TimeSeries) == 0 {
		t.Error("Expected time series data, got empty")
	}
}

func TestGetIntradayDataError(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusInternalServerError)
	}))
	defer server.Close()

	service := &StockService{
		client: &http.Client{Timeout: 5 * time.Second},
	}

	_, err := service.GetIntradayData("IBM", "5min")
	if err == nil {
		t.Error("Expected error, got nil")
	}
}
