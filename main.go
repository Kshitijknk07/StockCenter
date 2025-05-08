package main

import (
	"log"
	"stockcenter/service"
)

func main() {
	service := service.NewStockService()

	data, err := service.GetIntradayData("IBM", "1min")
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Data retrieved successfully: %+v", data)
}
