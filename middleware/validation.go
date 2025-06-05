package middleware

import (
	"encoding/json"
	"net/http"
	"stockcenter/models"
)

func ValidateSymbol(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		symbol := r.URL.Query().Get("symbol")
		if symbol == "" {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(models.NewErrorResponse(http.StatusBadRequest, "symbol parameter is required", nil))
			return
		}
		next.ServeHTTP(w, r)
	})
}
