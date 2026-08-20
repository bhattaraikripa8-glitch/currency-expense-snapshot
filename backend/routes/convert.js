const express = require("express");

const router = express.Router();

const supportedCurrencies = ["USD", "NPR", "EUR", "INR", "GBP"];

router.get("/", async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || amount === undefined) {
    return res.status(400).json({
      message: "from, to, and amount are required",
    });
  }

  const fromCurrency = from.toUpperCase();
  const toCurrency = to.toUpperCase();
  const numericAmount = Number(amount);

  if (!supportedCurrencies.includes(fromCurrency)) {
    return res.status(400).json({
      message: "Invalid source currency",
    });
  }

  if (!supportedCurrencies.includes(toCurrency)) {
    return res.status(400).json({
      message: "Invalid target currency",
    });
  }

  if (isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({
      message: "Amount must be a positive number",
    });
  }

  if (fromCurrency === toCurrency) {
    return res.json({
      from: fromCurrency,
      to: toCurrency,
      amount: numericAmount,
      rate: 1,
      convertedAmount: numericAmount,
    });
  }

  try {
    const response = await fetch(
      `https://api.frankfurter.dev/v2/rate/${fromCurrency}/${toCurrency}`,
      {
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      throw new Error("Exchange rate service returned an error");
    }

    const data = await response.json();

    const convertedAmount = numericAmount * data.rate;

    res.json({
      from: fromCurrency,
      to: toCurrency,
      amount: numericAmount,
      rate: data.rate,
      convertedAmount: Number(convertedAmount.toFixed(2)),
    });
  } catch (error) {
    if (error.name === "TimeoutError") {
      return res.status(504).json({
        message: "Currency conversion service timed out",
      });
    }

    res.status(502).json({
      message: "Unable to fetch exchange rate",
    });
  }
});

module.exports = router;