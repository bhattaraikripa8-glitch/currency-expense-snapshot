# Currency & Expense Snapshot

A small full-stack expense tracking application built as part of the **Tech LeadHers Fellowship Take-Home Assignment**.

The application allows users to add expenses in different currencies and view each expense converted into a selected home currency. It also calculates the total value of all expenses in that home currency.

## Features

* Add expenses with a title, amount, and currency
* View all added expenses
* Delete expenses
* Select a home currency
* Convert each expense into the selected home currency
* Display a running total in the home currency
* Input validation for expense data
* Loading and error states
* Graceful handling of currency conversion failures
* Responsive layout using plain CSS
* In-memory expense storage

## Supported Currencies

The application currently supports:

* NPR — Nepalese Rupee
* USD — US Dollar
* EUR — Euro
* INR — Indian Rupee
* GBP — British Pound

## Tech Stack

### Backend

* Node.js
* Express.js
* In-memory JavaScript array for storage

### Frontend

* React
* Vite
* Plain CSS

### Exchange Rate API

Currency conversion uses the **Frankfurter API**.

The React frontend does not call Frankfurter directly. Instead, it sends requests to the Express `/convert` endpoint, and the Express server communicates with the external API.

No API key is required for the current Frankfurter integration.

## Project Structure

```text
currency-expense-snapshot/
│
├── backend/
│   ├── routes/
│   │   ├── expenses.js
│   │   └── convert.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   └── HomeCurrencySelector.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

Clone the repository:

```bash
git clone <https://github.com/bhattaraikripa8-glitch/currency-expense-snapshot>
```

Move into the project:

```bash
cd currency-expense-snapshot
```

## Run the Backend

Open a terminal and move into the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the Express server:

```bash
npm start
```

The backend will run at:

```text
http://localhost:5000
```

## Run the Frontend

Open another terminal from the project directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The frontend will run at:

```text
http://localhost:5173
```

Both the backend and frontend need to be running while using the application.

## API Endpoints

### Get All Expenses

```http
GET /expenses
```

Returns all expenses currently stored in memory.

### Add an Expense

```http
POST /expenses
```

Example request body:

```json
{
  "title": "Lunch",
  "amount": 500,
  "currency": "NPR"
}
```

### Delete an Expense

```http
DELETE /expenses/:id
```

Deletes the expense matching the supplied ID.

### Convert Currency

```http
GET /convert?from=USD&to=NPR&amount=100
```

The backend retrieves the exchange rate from the external currency service and returns the converted amount to the frontend.

## Validation

The backend rejects invalid expense requests including:

* Empty titles
* Missing or invalid amounts
* Amounts less than or equal to zero
* Unsupported currency codes

Appropriate HTTP error responses and messages are returned to the frontend.

## Error Handling

The application includes basic error handling for both expense operations and currency conversion.

If the external exchange-rate service is unavailable or takes too long to respond, the Express `/convert` endpoint returns an error instead of allowing the server to crash.

The React interface displays loading and error states such as:

* Loading expenses
* Adding an expense
* Converting currencies
* Calculating the total
* Conversion unavailable

## Storage

Expenses are stored in an in-memory JavaScript array on the Express server.

Because no database is used, expense data is cleared whenever the backend server is restarted.

This behavior is intentional for the requirements of this assignment.

## Assumptions

* Only NPR, USD, EUR, INR, and GBP are supported in the current version.
* Expense dates default to the time when an expense is created.
* Expense amounts must be greater than zero.
* Internet access is required when a new exchange rate needs to be retrieved.
* Exchange rates may change depending on the latest data available from the external API.

## Improvements With More Time

Given more development time, I would consider:

* Caching exchange rates to reduce repeated API requests
* Providing cached or fallback rates when the external service is unavailable
* Adding automated backend and frontend tests
* Supporting additional currencies
* Adding persistent database storage
* Improving accessibility and form feedback
* Adding editing functionality for existing expenses
* Improving currency formatting using locale-aware formatting

## Author

Kripa Bhattarai
