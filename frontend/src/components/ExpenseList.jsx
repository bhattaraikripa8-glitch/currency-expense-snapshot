function ExpenseList({
  expenses,
  conversions,
  homeCurrency,
  onDelete,
}) {
  if (expenses.length === 0) {
    return (
  <p className="empty-message">
    No expenses added yet.
  </p>
);
  }

  return (
  <div className="expense-list">
    {expenses.map((expense) => {
      const conversion = conversions[expense.id];

      return (
        <div className="expense-item" key={expense.id}>
          <div>
            <h3 className="expense-title">
              {expense.title}
            </h3>

            <p className="expense-original">
              {expense.amount} {expense.currency}
            </p>

            {conversion?.loading && (
              <p className="status-message">
                Converting...
              </p>
            )}

            {!conversion?.loading &&
              conversion?.error && (
                <p className="error-message">
                  Conversion unavailable
                </p>
              )}

            {!conversion?.loading &&
              !conversion?.error &&
              conversion && (
                <p className="expense-converted">
                  ≈ {conversion.amount} {homeCurrency}
                </p>
              )}

            <p className="expense-date">
              {new Date(
                expense.date
              ).toLocaleDateString()}
            </p>
          </div>

          <button
            className="delete-button"
            onClick={() => onDelete(expense.id)}
          >
            Delete
          </button>
        </div>
      );
    })}
  </div>
);
}

export default ExpenseList;