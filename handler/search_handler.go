package handler

import (
	"encoding/json"
	"net/http"
	"stockcenter/service"
)

type SearchHandler struct {
	Service *service.SearchService
}

func NewSearchHandler(s *service.SearchService) *SearchHandler {
	return &SearchHandler{Service: s}
}

func (h *SearchHandler) Search(w http.ResponseWriter, r *http.Request) {
	keywords := r.URL.Query().Get("keywords")
	if keywords == "" {
		http.Error(w, "Missing keywords", http.StatusBadRequest)
		return
	}
	data, err := h.Service.SearchSymbol(keywords)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
