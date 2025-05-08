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

type MonthlyService struct {
	client *http.Client
}

func NewMonthlyService() *MonthlyService {
	return &MonthlyService{
		client: &http.Client{Timeout: 10 * time.Second},
	}
}

func (s *MonthlyService) GetMonthlyData(symbol string) (*models.MonthlyResponse, error) {
	apiKey := os.Getenv("STOCK_API_KEY_4")
	if apiKey == "" {
		return nil, errors.New("API key not configured")
	}
	url := fmt.Sprintf(
		"https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=%s&apikey=%s",
		symbol, apiKey,
	)
	resp, err := s.client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch data: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var result models.MonthlyResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &result, nil
}
