function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return <p>No expenses added yet.</p>;
  }

  return (
    <div>
      <h2>Expenses</h2>

      {expenses.map((expense) => (
        <div key={expense.id}>
          <h3>{expense.title}</h3>

          <p>
            {expense.amount} {expense.currency}
          </p>

          <p>
            {new Date(expense.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;