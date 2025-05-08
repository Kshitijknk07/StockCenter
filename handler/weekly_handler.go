package handler

import (
	"encoding/json"
	"net/http"
	"stockcenter/service"
)

type WeeklyHandler struct {
	Service *service.WeeklyService
}

func NewWeeklyHandler(s *service.WeeklyService) *WeeklyHandler {
	return &WeeklyHandler{Service: s}
}

func (h *WeeklyHandler) GetWeekly(w http.ResponseWriter, r *http.Request) {
	symbol := r.URL.Query().Get("symbol")
	if symbol == "" {
		http.Error(w, "Missing symbol", http.StatusBadRequest)
		return
	}
	data, err := h.Service.GetWeeklyData(symbol)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
