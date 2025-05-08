package handler

import (
	"encoding/json"
	"net/http"
	"stockcenter/service"
)

type IntradayHandler struct {
	Service *service.StockService
}

func NewIntradayHandler(s *service.StockService) *IntradayHandler {
	return &IntradayHandler{Service: s}
}

func (h *IntradayHandler) GetIntraday(w http.ResponseWriter, r *http.Request) {
	symbol := r.URL.Query().Get("symbol")
	interval := r.URL.Query().Get("interval")
	if symbol == "" || interval == "" {
		http.Error(w, "Missing symbol or interval", http.StatusBadRequest)
		return
	}
	data, err := h.Service.GetIntradayData(symbol, interval)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
