function ExpenseList({
  expenses,
  conversions,
  homeCurrency,
  onDelete,
}) {
  if (expenses.length === 0) {
    return <p>No expenses added yet.</p>;
  }

  return (
    <div>
      <h2>Expenses</h2>

      {expenses.map((expense) => {
        const conversion = conversions[expense.id];

        return (
          <div key={expense.id}>
            <h3>{expense.title}</h3>

            <p>
              {expense.amount} {expense.currency}
            </p>

            {conversion?.loading && (
              <p>Converting...</p>
            )}

            {!conversion?.loading &&
              conversion?.error && (
                <p>Conversion unavailable</p>
              )}

            {!conversion?.loading &&
              !conversion?.error &&
              conversion && (
                <p>
                  ≈ {conversion.amount} {homeCurrency}
                </p>
              )}

            <p>
              {new Date(
                expense.date
              ).toLocaleDateString()}
            </p>

            <button
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