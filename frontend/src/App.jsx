import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("/expenses")
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error("Failed to fetch expenses:", error);
      });
  }, []);

  const handleExpenseAdded = (newExpense) => {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      newExpense,
    ]);
  };

  return (
    <div>
      <h1>Currency & Expense Snapshot</h1>

      <ExpenseForm onExpenseAdded={handleExpenseAdded} />

      <p>Number of expenses: {expenses.length}</p>
    </div>
  );
}

export default App;