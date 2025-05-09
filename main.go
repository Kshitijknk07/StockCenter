package main

import (
	"log"
	"net/http"
	"os"
	"stockcenter/handler"
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
	r.HandleFunc("/api/intraday", intradayHandler.GetIntraday).Methods("GET")
	r.HandleFunc("/api/daily", dailyHandler.GetDaily).Methods("GET")
	r.HandleFunc("/api/weekly", weeklyHandler.GetWeekly).Methods("GET")
	r.HandleFunc("/api/monthly", monthlyHandler.GetMonthly).Methods("GET")
	r.HandleFunc("/api/quote", quoteHandler.GetQuote).Methods("GET")
	r.HandleFunc("/api/search", searchHandler.Search).Methods("GET")
	r.HandleFunc("/api/market-status", marketStatusHandler.GetMarketStatus).Methods("GET")
	r.HandleFunc("/api/historical-options", historicalOptionsHandler.GetHistoricalOptions).Methods("GET")

	srv := &http.Server{
		Handler:      r,
		Addr:         ":" + port,
		WriteTimeout: 15 * 1e9,
		ReadTimeout:  15 * 1e9,
	}

	log.Printf("Server running on port %s", port)
	log.Fatal(srv.ListenAndServe())
}
