const express = require("express");

const app = express();
const PORT = 5000;
let expenses = [];

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

  const newExpense = {
    id: Date.now(),
    title,
    amount,
    currency,
    date: new Date(),
  };

  expenses.push(newExpense);

  res.status(201).json(newExpense);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

