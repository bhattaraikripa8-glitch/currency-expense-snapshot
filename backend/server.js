const express = require("express");

const expenseRoutes = require("./routes/expenses");
const convertRoutes = require("./routes/convert");

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Currency Expense API is running",
  });
});

app.use("/expenses", expenseRoutes);
app.use("/convert", convertRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});