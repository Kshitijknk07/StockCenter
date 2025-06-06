package main

import (
	"log"
	"net/http"
	"os"
	"stockcenter/handler"
	"stockcenter/middleware"
	"stockcenter/service"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()
	port := os.Getenv("PORT")
	if port == "" {
		port = "9090"
	}

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

	r := mux.NewRouter()
	r.Use(middleware.LoggingMiddleware)

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

	srv := &http.Server{
		Handler:      r,
		Addr:         ":" + port,
		WriteTimeout: 15 * 1e9,
		ReadTimeout:  15 * 1e9,
	}

	log.Printf("Server running on port %s", port)
	log.Fatal(srv.ListenAndServe())
}
