package handler

import (
	"encoding/json"
	"net/http"
	"stockcenter/service"
)

type HistoricalOptionsHandler struct {
	Service *service.HistoricalOptionsService
}

func NewHistoricalOptionsHandler(s *service.HistoricalOptionsService) *HistoricalOptionsHandler {
	return &HistoricalOptionsHandler{Service: s}
}

func (h *HistoricalOptionsHandler) GetHistoricalOptions(w http.ResponseWriter, r *http.Request) {
	symbol := r.URL.Query().Get("symbol")
	date := r.URL.Query().Get("date")
	if symbol == "" {
		http.Error(w, "Missing symbol", http.StatusBadRequest)
		return
	}
	data, err := h.Service.GetHistoricalOptions(symbol, date)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
