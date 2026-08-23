import { useState } from "react";

function ExpenseForm({ onExpenseAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NPR");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          currency,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add expense");
      }

      onExpenseAdded(data);

      setTitle("");
      setAmount("");
      setCurrency("NPR");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <form className="card expense-form" onSubmit={handleSubmit}>
    <h2>Add Expense</h2>

    <div className="form-fields">
      <div className="form-group">
        <label htmlFor="title">Title</label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Lunch"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>

        <input
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="e.g. 500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="currency">Currency</label>

        <select
          id="currency"
          value={currency}
          onChange={(event) =>
            setCurrency(event.target.value)
          }
        >
          <option value="NPR">NPR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
    </div>

    <button
      className="primary-button"
      type="submit"
      disabled={loading}
    >
      {loading ? "Adding..." : "Add Expense"}
    </button>

    {error && (
      <p className="error-message">{error}</p>
    )}
  </form>
);
}

export default ExpenseForm;