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
		port = "8080"
	}

	stockService := service.NewStockService()
	intradayHandler := handler.NewIntradayHandler(stockService)

	r := mux.NewRouter()
	r.HandleFunc("/api/intraday", intradayHandler.GetIntraday).Methods("GET")

	srv := &http.Server{
		Handler:      r,
		Addr:         ":" + port,
		WriteTimeout: 15 * 1e9,
		ReadTimeout:  15 * 1e9,
	}

	log.Printf("Server running on port %s", port)
	log.Fatal(srv.ListenAndServe())
}
