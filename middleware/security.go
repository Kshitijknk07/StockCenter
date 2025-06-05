package middleware

import (
	"net/http"
	"sync"
	"time"
)

type RateLimiter struct {
	requests map[string][]time.Time
	mu       sync.Mutex
	limit    int
	window   time.Duration
}

func NewRateLimiter(limit int, window time.Duration) *RateLimiter {
	return &RateLimiter{
		requests: make(map[string][]time.Time),
		limit:    limit,
		window:   window,
	}
}

func (rl *RateLimiter) RateLimit(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip := r.RemoteAddr
		rl.mu.Lock()
		now := time.Now()
		windowStart := now.Add(-rl.window)

		requests := rl.requests[ip]
		validRequests := make([]time.Time, 0)
		for _, t := range requests {
			if t.After(windowStart) {
				validRequests = append(validRequests, t)
			}
		}

		if len(validRequests) >= rl.limit {
			rl.mu.Unlock()
			http.Error(w, "Rate limit exceeded", http.StatusTooManyRequests)
			return
		}

		validRequests = append(validRequests, now)
		rl.requests[ip] = validRequests
		rl.mu.Unlock()

		next.ServeHTTP(w, r)
	})
}

func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
