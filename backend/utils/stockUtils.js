"use strict";

const processStockData = (data) => {
  if (!data || !data["Time Series (5min)"]) {
    return { error: "Invalid data format" };
  }

  const timeSeriesKey = Object.keys(data).find((key) =>
    key.includes("Time Series")
  );
  if (!timeSeriesKey) return { error: "Time series data not found" };

  const timeSeries = data[timeSeriesKey];
  const processedData = [];

  for (const timestamp in timeSeries) {
    const entry = timeSeries[timestamp];
    processedData.push({
      timestamp,
      open: parseFloat(entry["1. open"]),
      high: parseFloat(entry["2. high"]),
      low: parseFloat(entry["3. low"]),
      close: parseFloat(entry["4. close"]),
      volume: parseInt(entry["5. volume"]),
    });
  }

  return {
    metadata: data["Meta Data"],
    timeSeries: processedData.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    ),
  };
};

const processDailyStockData = (data) => {
  if (!data || !data["Time Series (Daily)"]) {
    return { error: "Invalid data format" };
  }

  const timeSeries = data["Time Series (Daily)"];
  const processedData = [];

  for (const date in timeSeries) {
    const entry = timeSeries[date];
    processedData.push({
      date,
      open: parseFloat(entry["1. open"]),
      high: parseFloat(entry["2. high"]),
      low: parseFloat(entry["3. low"]),
      close: parseFloat(entry["4. close"]),
      volume: parseInt(entry["5. volume"]),
    });
  }

  return {
    metadata: data["Meta Data"],
    timeSeries: processedData.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    ),
  };
};

const processWeeklyStockData = (data) => {
  if (!data || !data["Weekly Time Series"]) {
    return { error: "Invalid data format" };
  }

  const timeSeries = data["Weekly Time Series"];
  const processedData = [];

  for (const date in timeSeries) {
    const entry = timeSeries[date];
    processedData.push({
      date,
      open: parseFloat(entry["1. open"]),
      high: parseFloat(entry["2. high"]),
      low: parseFloat(entry["3. low"]),
      close: parseFloat(entry["4. close"]),
      volume: parseInt(entry["5. volume"]),
    });
  }

  return {
    metadata: data["Meta Data"],
    timeSeries: processedData.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    ),
  };
};

const processMonthlyStockData = (data) => {
  if (!data || !data["Monthly Time Series"]) {
    return { error: "Invalid data format" };
  }

  const timeSeries = data["Monthly Time Series"];
  const processedData = [];

  for (const date in timeSeries) {
    const entry = timeSeries[date];
    processedData.push({
      date,
      open: parseFloat(entry["1. open"]),
      high: parseFloat(entry["2. high"]),
      low: parseFloat(entry["3. low"]),
      close: parseFloat(entry["4. close"]),
      volume: parseInt(entry["5. volume"]),
    });
  }

  return {
    metadata: data["Meta Data"],
    timeSeries: processedData.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    ),
  };
};

module.exports = {
  processStockData,
  processDailyStockData,
  processWeeklyStockData,
  processMonthlyStockData,
};
