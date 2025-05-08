package config

import "os"

func GetAPIKey() string {
	return os.Getenv("STOCK_API_KEY")
}
