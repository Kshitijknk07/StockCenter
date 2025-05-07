const express = require("express");
const stockRoutes = require("./stockRoutes");

const router = express.Router();

router.use("/stocks", stockRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
