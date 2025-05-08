package service

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"stockcenter/config"
	"stockcenter/models"
	"time"
)

type StockService struct {
	client *http.Client
}

func NewStockService() *StockService {
	return &StockService{
		client: &http.Client{Timeout: 10 * time.Second},
	}
}

func (s *StockService) GetIntradayData(symbol, interval string) (*models.IntradayResponse, error) {
	apiKey := config.GetAPIKey()
	if apiKey == "" {
		return nil, errors.New("API key not configured")
	}

	url := fmt.Sprintf("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=%s&interval=%s&apikey=%s", symbol, interval, apiKey)
	resp, err := s.client.Get(url)
	if err != nil {
		log.Printf("Error fetching intraday data: %v", err)
		return nil, fmt.Errorf("failed to fetch data: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Printf("Unexpected status code: %d", resp.StatusCode)
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var result models.IntradayResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		log.Printf("Error decoding response: %v", err)
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &result, nil
}
