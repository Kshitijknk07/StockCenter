package service

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"stockcenter/models"
	"time"
)

type MarketStatusService struct {
	client *http.Client
}

func NewMarketStatusService() *MarketStatusService {
	return &MarketStatusService{
		client: &http.Client{Timeout: 10 * time.Second},
	}
}

func (s *MarketStatusService) GetMarketStatus() (*models.MarketStatusResponse, error) {
	apiKey := os.Getenv("STOCK_API_KEY_MARKET_7")
	if apiKey == "" {
		return nil, errors.New("API key not configured")
	}
	url := fmt.Sprintf(
		"https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=%s",
		apiKey,
	)
	resp, err := s.client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch data: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var result models.MarketStatusResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &result, nil
}
