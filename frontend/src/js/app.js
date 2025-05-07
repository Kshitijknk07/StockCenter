document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const stockSymbolInput = document.getElementById("stockSymbol");
  const searchBtn = document.getElementById("searchBtn");
  const quoteContent = document.getElementById("quoteContent");
  const profileContent = document.getElementById("profileContent");
  const tradesContent = document.getElementById("tradesContent");
  const tradesList = document.getElementById("tradesList");
  const quoteLoader = document.getElementById("quoteLoader");
  const profileLoader = document.getElementById("profileLoader");
  const tradesLoader = document.getElementById("tradesLoader");

  const API_BASE_URL = "http://localhost:3000/api";

  const socket = io("http://localhost:3000");

  let currentSymbol = "";

  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
  });

  socket.on("trade", (trade) => {
    addTradeToList(trade);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
    showError(tradesContent, "Unable to connect to real-time data server");
  });

  searchBtn.addEventListener("click", searchStock);
  stockSymbolInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchStock();
    }
  });

  async function searchStock() {
    const symbol = stockSymbolInput.value.trim().toUpperCase();

    if (!symbol) {
      alert("Please enter a stock symbol");
      return;
    }

    if (currentSymbol) {
      socket.emit("unsubscribe", currentSymbol);
    }

    currentSymbol = symbol;

    clearData();

    showLoaders();

    try {
      await Promise.all([fetchQuote(symbol), fetchCompanyProfile(symbol)]);

      socket.emit("subscribe", symbol);
      tradesContent.innerHTML = `<p>Listening for real-time trades of ${symbol}...</p>`;
      tradesList.innerHTML = "";
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      hideLoaders();
    }
  }

  async function fetchQuote(symbol) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/stocks/quote?symbol=${symbol}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Quote response received:", responseData);

      // Check if the response has a success property and data property
      const data =
        responseData.success && responseData.data
          ? responseData.data
          : responseData;

      console.log("Quote data to display:", data);

      if (!data || Object.keys(data).length === 0 || !data.c) {
        showError(quoteContent, "Received empty or invalid quote data");
        return;
      }

      displayQuote(data);
    } catch (error) {
      console.error("Error fetching quote:", error);
      showError(quoteContent, "Error fetching quote data");
    }
  }

  async function fetchCompanyProfile(symbol) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/stocks/company-profile?symbol=${symbol}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Company profile response received:", responseData);

      // Check if the response has a success property and data property
      const data =
        responseData.success && responseData.data
          ? responseData.data
          : responseData;

      console.log("Company profile data to display:", data);

      if (!data || Object.keys(data).length === 0) {
        showError(
          profileContent,
          "Received empty or invalid company profile data"
        );
        return;
      }

      displayCompanyProfile(data);
    } catch (error) {
      console.error("Error fetching company profile:", error);
      showError(profileContent, "Error fetching company profile");
    }
  }

  function displayQuote(data) {
    if (!data || Object.keys(data).length === 0) {
      quoteContent.innerHTML =
        '<p class="error-message">No quote data available</p>';
      return;
    }

    const changeClass = data.d >= 0 ? "price-up" : "price-down";
    const changeIcon = data.d >= 0 ? "▲" : "▼";

    quoteContent.innerHTML = `
            <p><span class="label">Current Price:</span> $${data.c.toFixed(
              2
            )}</p>
            <p><span class="label">Change:</span> <span class="${changeClass}">${changeIcon} $${Math.abs(
      data.d
    ).toFixed(2)} (${data.dp.toFixed(2)}%)</span></p>
            <p><span class="label">High:</span> $${data.h.toFixed(2)}</p>
            <p><span class="label">Low:</span> $${data.l.toFixed(2)}</p>
            <p><span class="label">Open:</span> $${data.o.toFixed(2)}</p>
            <p><span class="label">Previous Close:</span> $${data.pc.toFixed(
              2
            )}</p>
        `;
  }

  function displayCompanyProfile(data) {
    if (!data || Object.keys(data).length === 0) {
      profileContent.innerHTML =
        '<p class="error-message">No company profile available</p>';
      return;
    }

    const logoHtml = data.logo
      ? `<img src="${data.logo}" alt="${data.name} logo" class="company-logo">`
      : "";

    profileContent.innerHTML = `
            ${logoHtml}
            <p><span class="label">Name:</span> ${data.name}</p>
            <p><span class="label">Ticker:</span> ${data.ticker}</p>
            <p><span class="label">Exchange:</span> ${data.exchange}</p>
            <p><span class="label">Industry:</span> ${data.finnhubIndustry}</p>
            <p><span class="label">Market Cap:</span> $${formatMarketCap(
              data.marketCapitalization
            )}</p>
            <p><span class="label">Country:</span> ${data.country}</p>
            <p><span class="label">Website:</span> <a href="${
              data.weburl
            }" target="_blank">${data.weburl}</a></p>
        `;
  }

  function addTradeToList(trade) {
    // Create trade item element
    const tradeItem = document.createElement("div");
    tradeItem.className = "trade-item";

    // Format timestamp
    const date = new Date(trade.t);
    const formattedTime = date.toLocaleTimeString();

    // Add trade data
    tradeItem.innerHTML = `
            <div>
                <strong>${trade.s}</strong> - ${formattedTime}
            </div>
            <div>
                <strong>$${trade.p.toFixed(2)}</strong> - Volume: ${trade.v}
            </div>
        `;

    tradesList.prepend(tradeItem);

    if (tradesList.children.length > 50) {
      tradesList.removeChild(tradesList.lastChild);
    }
  }

  function showLoaders() {
    quoteLoader.style.display = "block";
    profileLoader.style.display = "block";
    tradesLoader.style.display = "block";
  }

  function hideLoaders() {
    quoteLoader.style.display = "none";
    profileLoader.style.display = "none";
    tradesLoader.style.display = "none";
  }

  function clearData() {
    quoteContent.innerHTML = "<p>Loading quote data...</p>";
    profileContent.innerHTML = "<p>Loading company profile...</p>";
    tradesContent.innerHTML = "<p>Loading real-time trades...</p>";
    tradesList.innerHTML = "";
  }

  function showError(element, message) {
    element.innerHTML = `<p class="error-message">${message}</p>`;
  }

  function formatMarketCap(marketCap) {
    if (marketCap >= 1000) {
      return `${(marketCap / 1000).toFixed(2)} Trillion`;
    } else {
      return `${marketCap.toFixed(2)} Billion`;
    }
  }
});
