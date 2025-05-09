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

type SearchResponse struct {
	BestMatches []SearchMatch `json:"bestMatches"`
}

type SearchMatch struct {
	Symbol      string `json:"1. symbol"`
	Name        string `json:"2. name"`
	Type        string `json:"3. type"`
	Region      string `json:"4. region"`
	MarketOpen  string `json:"5. marketOpen"`
	MarketClose string `json:"6. marketClose"`
	Timezone    string `json:"7. timezone"`
	Currency    string `json:"8. currency"`
	MatchScore  string `json:"9. matchScore"`
}

type MarketStatusResponse struct {
	Markets []MarketStatus `json:"markets"`
}

type MarketStatus struct {
	MarketType string `json:"market_type"`
	Region     string `json:"region"`
	PrimaryEx  string `json:"primary_ex"`
	LocalOpen  string `json:"local_open"`
	LocalClose string `json:"local_close"`
	Current    string `json:"current_status"`
}

type HistoricalOptionsResponse struct {
	Symbol   string          `json:"symbol"`
	Date     string          `json:"date"`
	Expiries []OptionsExpiry `json:"expiries"`
}

type OptionsExpiry struct {
	ExpirationDate string         `json:"expiration_date"`
	Calls          []OptionDetail `json:"calls"`
	Puts           []OptionDetail `json:"puts"`
}

type OptionDetail struct {
	ContractType string `json:"contract_type"`
	Symbol       string `json:"symbol"`
	Strike       string `json:"strike"`
	LastPrice    string `json:"last_price"`
	Bid          string `json:"bid"`
	Ask          string `json:"ask"`
	Volume       string `json:"volume"`
	OpenInterest string `json:"open_interest"`
	ImpliedVol   string `json:"implied_volatility"`
	Delta        string `json:"delta"`
	Gamma        string `json:"gamma"`
	Theta        string `json:"theta"`
	Vega         string `json:"vega"`
	Rho          string `json:"rho"`
}
