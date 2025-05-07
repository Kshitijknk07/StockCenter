"use strict";

const express = require("express");
require("dotenv").config();
const stockRoutes = require("./routes/stockRoutes");
const dailyStockRoutes = require("./routes/dailyStockRoutes");
const weeklyStockRoutes = require("./routes/weeklyStockRoutes");
const monthlyStockRoutes = require("./routes/monthlyStockRoutes");
const marketStatusRoutes = require("./routes/marketStatusRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/stock", stockRoutes);
app.use("/api/daily", dailyStockRoutes);
app.use("/api/weekly", weeklyStockRoutes);
app.use("/api/monthly", monthlyStockRoutes);
app.use("/api/market-status", marketStatusRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
