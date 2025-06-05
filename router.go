package main

import (
	"net/http"
	"stockcenter/handler"
	"stockcenter/middleware"
	"stockcenter/service"
	"time"

	"github.com/gorilla/mux"
)

func setupRouter() http.Handler {
	stockService := service.NewStockService()
	intradayHandler := handler.NewIntradayHandler(stockService)
	dailyService := service.NewDailyService()
	dailyHandler := handler.NewDailyHandler(dailyService)
	weeklyService := service.NewWeeklyService()
	weeklyHandler := handler.NewWeeklyHandler(weeklyService)
	monthlyService := service.NewMonthlyService()
	monthlyHandler := handler.NewMonthlyHandler(monthlyService)
	quoteService := service.NewQuoteService()
	quoteHandler := handler.NewQuoteHandler(quoteService)
	searchService := service.NewSearchService()
	searchHandler := handler.NewSearchHandler(searchService)
	marketStatusService := service.NewMarketStatusService()
	marketStatusHandler := handler.NewMarketStatusHandler(marketStatusService)
	historicalOptionsService := service.NewHistoricalOptionsService()
	historicalOptionsHandler := handler.NewHistoricalOptionsHandler(historicalOptionsService)

	rateLimiter := middleware.NewRateLimiter(100, time.Minute)

	r := mux.NewRouter()
	r.Use(middleware.LoggingMiddleware)
	r.Use(middleware.CORS)
	r.Use(rateLimiter.RateLimit)

	r.HandleFunc("/health", handler.GetHealth).Methods("GET")

	api := r.PathPrefix("/api").Subrouter()
	api.Use(middleware.ValidateSymbol)

	api.HandleFunc("/intraday", intradayHandler.GetIntraday).Methods("GET")
	api.HandleFunc("/daily", dailyHandler.GetDaily).Methods("GET")
	api.HandleFunc("/weekly", weeklyHandler.GetWeekly).Methods("GET")
	api.HandleFunc("/monthly", monthlyHandler.GetMonthly).Methods("GET")
	api.HandleFunc("/quote", quoteHandler.GetQuote).Methods("GET")
	api.HandleFunc("/search", searchHandler.Search).Methods("GET")
	api.HandleFunc("/market-status", marketStatusHandler.GetMarketStatus).Methods("GET")
	api.HandleFunc("/historical-options", historicalOptionsHandler.GetHistoricalOptions).Methods("GET")

	return r
}
