package handler

import (
	"encoding/json"
	"net/http"
	"stockcenter/service"
)

type QuoteHandler struct {
	Service *service.QuoteService
}

func NewQuoteHandler(s *service.QuoteService) *QuoteHandler {
	return &QuoteHandler{Service: s}
}

func (h *QuoteHandler) GetQuote(w http.ResponseWriter, r *http.Request) {
	symbol := r.URL.Query().Get("symbol")
	if symbol == "" {
		http.Error(w, "Missing symbol", http.StatusBadRequest)
		return
	}
	data, err := h.Service.GetQuote(symbol)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
