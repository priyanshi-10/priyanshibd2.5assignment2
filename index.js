const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

let stocks = [
  {
    id: 1,
    name: "reliance industries",
    price: 2500,
    growth: 3.5,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 2,
    name: "hdfc bank",
    price: 1800,
    growth: 4.2,
    industry: "finance",
    exchange: "bse",
  },
  {
    id: 3,
    name: "icici bank",
    price: 1600,
    growth: 5.1,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 4,
    name: "tata consultancy services",
    price: 3200,
    growth: 2.9,
    industry: "finance",
    exchange: "bse",
    price: 1900,
  },
  {
    id: 5,
    name: "infosys",
    price: 2900,
    growth: 3.8,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 6,
    name: "dr. reddy's laboratories",
    price: 2100,
    growth: 4.7,
    industry: "pharma",
    exchange: "bse",
  },
  {
    id: 7,
    name: "sun pharmaceutical",
    price: 2300,
    growth: 3.2,
    industry: "pharma",
    exchange: "nse",
  },
  {
    id: 8,
    name: "cipla",
    growth: 2.6,
    price: 2100,
    exchange: "bse",
    industry: "pharma",
  },
  {
    id: 9,
    name: "ntpc",
    price: 1200,
    growth: 4.1,
    industry: "power",
    exchange: "nse",
  },
  {
    id: 10,
    name: "power grid corporation",
    price: 1500,
    growth: 3.4,
    industry: "power",
    exchange: "bse",
  },
  {
    id: 11,
    name: "adani power",
    price: 2200,
    growth: 5.3,
    industry: "power",
    exchange: "nse",
  },
  {
    id: 12,
    name: "lupin",
    price: 2000,
    growth: 4.5,
    industry: "pharma",
    exchange: "bse",
  },
  {
    id: 13,
    name: "axis bank",
    price: 1750,
    growth: 2.8,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 14,
    name: "state bank of india",
    price: 1450,
    growth: 3.6,
    industry: "finance",
    exchange: "bse",
  },
  {
    id: 15,
    name: "bajaj finance",
    price: 2650,
    growth: -2.9,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 16,
    name: "dr. reddy's laboratories",
    price: 1950,
    growth: 4.3,
    industry: "pharma",
    exchange: "bse",
  },
  {
    id: 17,
    name: "biocon",
    price: 1850,
    growth: 3.9,
    industry: "pharma",
    exchange: "nse",
  },
  {
    id: 18,
    name: "torrent power",
    price: 1600,
    growth: 2.4,
    industry: "power",
    exchange: "bse",
  },
  {
    id: 19,
    name: "tata power",
    price: 1750,
    growth: 4.0,
    industry: "power",
    exchange: "nse",
  },
  {
    id: 20,
    name: "jsw energy",
    price: 1450,
    growth: 3.1,
    industry: "power",
    exchange: "bse",
  },
];

// Endpoint 1: Get stocks sorted by pricing
app.get('/stocks/sort/pricing', (req, res) => {
  const { pricing } = req.query; // Query parameter: 'low-to-high' or 'high-to-low'

  // Sorting logic
  const sortedStocks = [...stocks].sort((a, b) => {
    return pricing === 'high-to-low' ? b.price - a.price : a.price - b.price;
  });

  // Return sorted stocks as JSON
  res.json({ stocks: sortedStocks });
});

// Endpoint 2: Get stocks sorted by growth rate
app.get('/stocks/sort/growth', (req, res) => {
  const { growth } = req.query; // Query parameter: 'low-to-high' or 'high-to-low'

  // Sorting logic
  const sortedStocks = [...stocks].sort((a, b) => {
    return growth === 'high-to-low' ? b.growth - a.growth : a.growth - b.growth;
  });

  // Return sorted stocks as JSON
  res.json({ stocks: sortedStocks });
});

// Function to filter stocks by exchange
const filterByExchange = (exchange) => {
  return stocks.filter(stock => stock.exchange.toLowerCase() === exchange.toLowerCase());
};

// Endpoint 3: Filter stocks by exchange
app.get('/stocks/filter/exchange', (req, res) => {
  const { exchange } = req.query; // Query parameter: 'nse' or 'bse'

  // Validate the query parameter
  if (!exchange) {
    return res.status(400).json({ error: "Exchange query parameter is required (e.g., 'nse' or 'bse')." });
  }

  // Filter stocks using the helper function
  const filteredStocks = filterByExchange(exchange);

  // Return the filtered stocks as JSON
  res.json({ stocks: filteredStocks });
});
///Correct API Calls Filter by NSE:http://localhost:3000/stocks/filter/exchange?exchange=nseFilter by BSE:http://localhost:3000/stocks/filter/exchange?exchange=bs

// Filter by industry function
function filterByIndustry(industry) {
  return stocks.filter(stock => stock.industry.toLowerCase() === industry.toLowerCase());
}

// Endpoint to filter stocks by industry
app.get('/stocks/filter/industry', (req, res) => {
  const industry = req.query.industry;

  if (!industry) {
    return res.status(400).json({ error: "Industry parameter is required" });
  }

  const filteredStocks = filterByIndustry(industry);
  
  if (filteredStocks.length === 0) {
    return res.status(404).json({ message: `No stocks found for industry: ${industry}` });
  }

  res.json(filteredStocks);
});

//Correct Api Calls: http://localhost:3000/stocks/filter/industry?industry=finance or Pharma or Power

//Ans 5 Endpoint to send all stocks
app.get('/stocks', (req, res) => {
  res.json(stocks);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

