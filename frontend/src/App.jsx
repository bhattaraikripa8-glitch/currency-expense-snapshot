import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import HomeCurrencySelector from "./components/HomeCurrencySelector";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [homeCurrency, setHomeCurrency] = useState("NPR");

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

  const handleDelete = async (id) => {
  try {
    const response = await fetch(`/expenses/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete expense");
    }

    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    );
  } catch (error) {
    console.error("Failed to delete expense:", error);
  }
};

  return (
  <div>
    <h1>Currency & Expense Snapshot</h1>
    <HomeCurrencySelector
    homeCurrency={homeCurrency}
    onChange={setHomeCurrency}/>

    <ExpenseForm onExpenseAdded={handleExpenseAdded} />

    <p>Number of expenses: {expenses.length}</p>

    <ExpenseList 
    expenses={expenses} 
    onDelete={handleDelete}/>
  </div>
);
}

export default App;