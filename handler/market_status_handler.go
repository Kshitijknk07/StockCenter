package handler

import (
	"encoding/json"
	"net/http"
	"stockcenter/service"
)

type MarketStatusHandler struct {
	Service *service.MarketStatusService
}

func NewMarketStatusHandler(s *service.MarketStatusService) *MarketStatusHandler {
	return &MarketStatusHandler{Service: s}
}

func (h *MarketStatusHandler) GetMarketStatus(w http.ResponseWriter, r *http.Request) {
	data, err := h.Service.GetMarketStatus()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
