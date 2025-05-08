package handler

import (
	"encoding/json"
	"net/http"
	"stockcenter/service"
)

type DailyHandler struct {
	Service *service.DailyService
}

func NewDailyHandler(s *service.DailyService) *DailyHandler {
	return &DailyHandler{Service: s}
}

func (h *DailyHandler) GetDaily(w http.ResponseWriter, r *http.Request) {
	symbol := r.URL.Query().Get("symbol")
	outputsize := r.URL.Query().Get("outputsize")
	if symbol == "" {
		http.Error(w, "Missing symbol", http.StatusBadRequest)
		return
	}
	data, err := h.Service.GetDailyData(symbol, outputsize)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
