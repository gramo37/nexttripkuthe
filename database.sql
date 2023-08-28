CREATE DATABASE nexttripkuthe;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,
    reason VARCHAR(255) NOT NULL,
    money_paid DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE creditor_expense (
    expense_id INT REFERENCES expenses(expense_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    PRIMARY KEY (expense_id, user_id)
);

CREATE TABLE debtor_expense (
    expense_id INT REFERENCES expenses(expense_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    money_paid DECIMAL(10, 2),
    PRIMARY KEY (expense_id, user_id)
);