package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"stockcenter/models"
	"testing"
)

func TestMain(m *testing.M) {
	os.Setenv("STOCK_API_KEY", "test_key")
	os.Exit(m.Run())
}

func setupTestServer() *httptest.Server {
	router := setupRouter()
	return httptest.NewServer(router)
}

func TestIntradayEndpoint(t *testing.T) {
	server := setupTestServer()
	defer server.Close()

	resp, err := http.Get(server.URL + "/api/intraday?symbol=IBM&interval=5min")
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status %v, got %v", http.StatusOK, resp.StatusCode)
	}

	var response models.IntradayResponse
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		t.Fatal(err)
	}

	if response.MetaData.Symbol != "IBM" {
		t.Errorf("Expected symbol IBM, got %s", response.MetaData.Symbol)
	}
}

func TestIntradayEndpointMissingSymbol(t *testing.T) {
	server := setupTestServer()
	defer server.Close()

	resp, err := http.Get(server.URL + "/api/intraday")
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("Expected status %v, got %v", http.StatusBadRequest, resp.StatusCode)
	}

	var response models.ErrorResponse
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		t.Fatal(err)
	}

	if response.Status != http.StatusBadRequest {
		t.Errorf("Expected status %v, got %v", http.StatusBadRequest, response.Status)
	}
}

func TestMarketStatusEndpoint(t *testing.T) {
	server := setupTestServer()
	defer server.Close()

	resp, err := http.Get(server.URL + "/api/market-status")
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status %v, got %v", http.StatusOK, resp.StatusCode)
	}
}
