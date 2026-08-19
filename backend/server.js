const express = require("express");

const app = express();
const PORT = 5000;
let expenses = [];
const supportedCurrencies = ["USD", "NPR", "EUR", "INR", "GBP"];

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Currency Expense API is running",
  });
});

app.get("/expenses", (req, res) => {
  res.json(expenses);
});

app.post("/expenses", (req, res) => {
  const { title, amount, currency } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (amount === undefined || amount === null || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({
      message: "Amount must be a positive number",
    });
  }

  if (!currency || !supportedCurrencies.includes(currency.toUpperCase())) {
    return res.status(400).json({
      message: "Invalid currency code",
    });
  }

  const newExpense = {
    id: Date.now(),
    title: title.trim(),
    amount: Number(amount),
    currency: currency.toUpperCase(),
    date: new Date(),
  };

  expenses.push(newExpense);

  res.status(201).json(newExpense);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

