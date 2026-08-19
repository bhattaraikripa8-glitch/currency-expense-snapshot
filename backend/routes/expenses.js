const express = require("express");

const router = express.Router();

let expenses = [];

const supportedCurrencies = ["USD", "NPR", "EUR", "INR", "GBP"];

router.get("/", (req, res) => {
  res.json(expenses);
});

router.post("/", (req, res) => {
  const { title, amount, currency } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (
    amount === undefined ||
    amount === null ||
    isNaN(amount) ||
    Number(amount) <= 0
  ) {
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

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const expenseIndex = expenses.findIndex(
    (expense) => expense.id === id
  );

  if (expenseIndex === -1) {
    return res.status(404).json({
      message: "Expense not found",
    });
  }

  const deletedExpense = expenses.splice(expenseIndex, 1);

  res.json({
    message: "Expense deleted successfully",
    expense: deletedExpense[0],
  });
});

module.exports = router;