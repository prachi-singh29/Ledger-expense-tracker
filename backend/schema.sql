-- Reference schema only — Hibernate (spring.jpa.hibernate.ddl-auto=update)
-- will create/update this table automatically on application startup.
-- Use this file if you prefer to create the schema manually in MySQL Workbench.

CREATE DATABASE IF NOT EXISTS expense_tracker
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE expense_tracker;

CREATE TABLE IF NOT EXISTS expenses (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(120)   NOT NULL,
  amount      DECIMAL(12,2)  NOT NULL,
  type        VARCHAR(20)    NOT NULL,        -- INCOME | EXPENSE
  category    VARCHAR(60)    NOT NULL,
  description VARCHAR(255),
  date        DATE           NOT NULL,
  created_at  DATETIME       NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample data (optional)
INSERT INTO expenses (title, amount, type, category, description, date, created_at) VALUES
  ('Monthly Salary', 45000.00, 'INCOME', 'Salary', 'July payout', CURDATE(), NOW()),
  ('Grocery Shopping', 2350.50, 'EXPENSE', 'Food & Dining', 'Weekly groceries', CURDATE(), NOW()),
  ('Electricity Bill', 1800.00, 'EXPENSE', 'Rent & Bills', NULL, CURDATE(), NOW());
