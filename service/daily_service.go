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

type DailyService struct {
	client *http.Client
}

func NewDailyService() *DailyService {
	return &DailyService{
		client: &http.Client{Timeout: 10 * time.Second},
	}
}

func (s *DailyService) GetDailyData(symbol, outputsize string) (*models.DailyResponse, error) {
	apiKey := os.Getenv("STOCK_API_KEY_2")
	if apiKey == "" {
		return nil, errors.New("API key not configured")
	}
	if outputsize == "" {
		outputsize = "compact"
	}
	url := fmt.Sprintf(
		"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=%s&outputsize=%s&apikey=%s",
		symbol, outputsize, apiKey,
	)
	resp, err := s.client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch data: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var result models.DailyResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &result, nil
}
