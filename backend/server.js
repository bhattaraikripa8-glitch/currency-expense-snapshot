const express = require("express");

const expenseRoutes = require("./routes/expenses");

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Currency Expense API is running",
  });
});

app.use("/expenses", expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});