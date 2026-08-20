import { useEffect, useState } from "react";

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

  return (
    <div>
      <h1>Currency & Expense Snapshot</h1>

      <p>Number of expenses: {expenses.length}</p>
    </div>
  );
}

export default App;