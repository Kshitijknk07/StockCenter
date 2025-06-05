package handler

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"stockcenter/models"
	"stockcenter/service"
	"testing"
)

func TestGetIntraday(t *testing.T) {
	stockService := service.NewStockService()
	handler := NewIntradayHandler(stockService)

	req, err := http.NewRequest("GET", "/api/intraday?symbol=IBM&interval=5min", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler.GetIntraday(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Expected status %v, got %v", http.StatusOK, status)
	}

	var response models.IntradayResponse
	if err := json.NewDecoder(rr.Body).Decode(&response); err != nil {
		t.Fatal(err)
	}

	if response.MetaData.Symbol != "IBM" {
		t.Errorf("Expected symbol IBM, got %s", response.MetaData.Symbol)
	}
}

func TestGetIntradayMissingSymbol(t *testing.T) {
	stockService := service.NewStockService()
	handler := NewIntradayHandler(stockService)

	req, err := http.NewRequest("GET", "/api/intraday", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler.GetIntraday(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("Expected status %v, got %v", http.StatusBadRequest, status)
	}

	var response models.ErrorResponse
	if err := json.NewDecoder(rr.Body).Decode(&response); err != nil {
		t.Fatal(err)
	}

	if response.Status != http.StatusBadRequest {
		t.Errorf("Expected status %v, got %v", http.StatusBadRequest, response.Status)
	}
}
