package models

type IntradayResponse struct {
	MetaData   MetaData                  `json:"Meta Data"`
	TimeSeries map[string]TimeSeriesData `json:"Time Series (1min)"`
}

type MetaData struct {
	Information   string `json:"1. Information"`
	Symbol        string `json:"2. Symbol"`
	LastRefreshed string `json:"3. Last Refreshed"`
	Interval      string `json:"4. Interval"`
	OutputSize    string `json:"5. Output Size"`
	TimeZone      string `json:"6. Time Zone"`
}

type TimeSeriesData struct {
	Open   string `json:"1. open"`
	High   string `json:"2. high"`
	Low    string `json:"3. low"`
	Close  string `json:"4. close"`
	Volume string `json:"5. volume"`
}

type DailyResponse struct {
	MetaData   MetaData                  `json:"Meta Data"`
	TimeSeries map[string]TimeSeriesData `json:"Time Series (Daily)"`
}

type WeeklyResponse struct {
	MetaData   MetaData                  `json:"Meta Data"`
	TimeSeries map[string]TimeSeriesData `json:"Weekly Time Series"`
}

type MonthlyResponse struct {
	MetaData   MetaData                  `json:"Meta Data"`
	TimeSeries map[string]TimeSeriesData `json:"Monthly Time Series"`
}

type QuoteResponse struct {
	GlobalQuote QuoteData `json:"Global Quote"`
}

type QuoteData struct {
	Symbol           string `json:"01. symbol"`
	Open             string `json:"02. open"`
	High             string `json:"03. high"`
	Low              string `json:"04. low"`
	Price            string `json:"05. price"`
	Volume           string `json:"06. volume"`
	LatestTradingDay string `json:"07. latest trading day"`
	PreviousClose    string `json:"08. previous close"`
	Change           string `json:"09. change"`
	ChangePercent    string `json:"10. change percent"`
}
