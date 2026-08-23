function HomeCurrencySelector({ homeCurrency, onChange }) {
  return (
  <div className="form-group">
    <label htmlFor="home-currency">
      Home Currency
    </label>

    <select
      id="home-currency"
      value={homeCurrency}
      onChange={(event) =>
        onChange(event.target.value)
      }
    >
      <option value="NPR">NPR</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="INR">INR</option>
      <option value="GBP">GBP</option>
    </select>
  </div>
);
}

export default HomeCurrencySelector;