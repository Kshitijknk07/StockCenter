package handler

import (
	"encoding/json"
	"net/http"
	"runtime"
	"time"
)

type HealthResponse struct {
	Status    string    `json:"status"`
	Timestamp time.Time `json:"timestamp"`
	Uptime    string    `json:"uptime"`
	Memory    struct {
		Alloc      uint64 `json:"alloc"`
		TotalAlloc uint64 `json:"totalAlloc"`
		Sys        uint64 `json:"sys"`
		NumGC      uint32 `json:"numGC"`
	} `json:"memory"`
}

var startTime = time.Now()

func GetHealth(w http.ResponseWriter, r *http.Request) {
	var m runtime.MemStats
	runtime.ReadMemStats(&m)

	response := HealthResponse{
		Status:    "healthy",
		Timestamp: time.Now(),
		Uptime:    time.Since(startTime).String(),
	}

	response.Memory.Alloc = m.Alloc
	response.Memory.TotalAlloc = m.TotalAlloc
	response.Memory.Sys = m.Sys
	response.Memory.NumGC = m.NumGC

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
