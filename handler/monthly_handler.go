package handler

import (
	"encoding/json"
	"net/http"
	"stockcenter/service"
)

type MonthlyHandler struct {
	Service *service.MonthlyService
}

func NewMonthlyHandler(s *service.MonthlyService) *MonthlyHandler {
	return &MonthlyHandler{Service: s}
}

func (h *MonthlyHandler) GetMonthly(w http.ResponseWriter, r *http.Request) {
	symbol := r.URL.Query().Get("symbol")
	if symbol == "" {
		http.Error(w, "Missing symbol", http.StatusBadRequest)
		return
	}
	data, err := h.Service.GetMonthlyData(symbol)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
