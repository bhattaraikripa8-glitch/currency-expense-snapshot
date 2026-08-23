import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import HomeCurrencySelector from "./components/HomeCurrencySelector";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [homeCurrency, setHomeCurrency] = useState("NPR");
  const [conversions, setConversions] = useState({});

  const [expensesLoading, setExpensesLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
  const loadExpenses = async () => {
    setExpensesLoading(true);
    setPageError("");

    try {
      const response = await fetch("/expenses");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load expenses");
      }

      setExpenses(data);
    } catch (error) {
      setPageError(error.message);
    } finally {
      setExpensesLoading(false);
    }
  };

  loadExpenses();
}, []);

  useEffect(() => {
  if (expenses.length === 0) {
    setConversions({});
    return;
  }

  const convertExpenses = async () => {
    const loadingState = {};

    expenses.forEach((expense) => {
      loadingState[expense.id] = {
        loading: true,
        amount: null,
        error: "",
      };
    });

    setConversions(loadingState);

    const results = await Promise.all(
      expenses.map(async (expense) => {
        try {
          const response = await fetch(
            `/convert?from=${expense.currency}&to=${homeCurrency}&amount=${expense.amount}`
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.message || "Failed to convert currency"
            );
          }

          return [
            expense.id,
            {
              loading: false,
              amount: data.convertedAmount,
              error: "",
            },
          ];
        } catch (error) {
          return [
            expense.id,
            {
              loading: false,
              amount: null,
              error: error.message,
            },
          ];
        }
      })
    );

    setConversions(Object.fromEntries(results));
  };

  convertExpenses();
}, [expenses, homeCurrency]);

  const handleExpenseAdded = (newExpense) => {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      newExpense,
    ]);
  };

  const handleDelete = async (id) => {
    setDeleteError("");
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
     setDeleteError(error.message);
  }
};

const total = expenses.reduce((sum, expense) => {
  const conversion = conversions[expense.id];

  if (
    conversion &&
    !conversion.loading &&
    !conversion.error &&
    conversion.amount !== null
  ) {
    return sum + conversion.amount;
  }

  return sum;
}, 0);

const totalLoading = expenses.some(
  (expense) => conversions[expense.id]?.loading
);

const totalHasError = expenses.some(
  (expense) => conversions[expense.id]?.error
);

  return (
  <div className="app">
    <header className="app-header">
      <h1>Currency & Expense Snapshot</h1>
      <p>Track expenses across multiple currencies.</p>
    </header>

    <div className="summary-grid">
      <div className="card">
        <HomeCurrencySelector
          homeCurrency={homeCurrency}
          onChange={setHomeCurrency}
        />
      </div>

      <div className="card">
        <h2>Total Expenses</h2>

        {totalLoading ? (
          <p className="status-message">Calculating total...</p>
        ) : totalHasError ? (
          <p className="error-message">
            Total unavailable because a conversion failed.
          </p>
        ) : (
          <p className="total-amount">
            {total.toFixed(2)} {homeCurrency}
          </p>
        )}
      </div>
    </div>

    <ExpenseForm onExpenseAdded={handleExpenseAdded} />

    <section className="expenses-section">
      <div className="expenses-header">
        <div>
          <h2>Expenses</h2>
          <p className="expense-count">
            {expenses.length} expense
            {expenses.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {deleteError && (
        <p className="error-message">{deleteError}</p>
      )}

      {expensesLoading ? (
        <p className="status-message">Loading expenses...</p>
      ) : pageError ? (
        <p className="error-message">{pageError}</p>
      ) : (
        <ExpenseList
          expenses={expenses}
          conversions={conversions}
          homeCurrency={homeCurrency}
          onDelete={handleDelete}
        />
      )}
    </section>
  </div>
);
}

export default App;