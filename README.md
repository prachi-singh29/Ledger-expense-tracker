# Ledger — Full-Stack Expense Tracker

A modern, full-stack expense tracker with a Spring Boot + MySQL REST API and a
React (Vite) dashboard styled with Tailwind CSS in a dark, glassmorphism aesthetic.

```
expense-tracker/
├── backend/     Spring Boot 3 (Java 17) REST API + MySQL
├── frontend/    React 18 + Vite + Tailwind CSS dashboard
└── render.yaml  One-click Render blueprint for both services
```

---

## ✨ Features

- Add / edit / delete income and expense transactions
- Dashboard with balance, income, expense, and transaction-count stat cards
- Income vs. expense trend chart and category breakdown donut chart
- Searchable, filterable transaction table
- Toast notifications, confirm-before-delete, form validation
- Fully responsive, dark glassmorphism UI with smooth micro-interactions

---

## 1. Backend — Spring Boot API

**Stack:** Java 17, Spring Boot 3, Spring Data JPA, MySQL, Maven

### Run locally

1. Create a MySQL database (or let the app create it automatically):
   ```sql
   CREATE DATABASE expense_tracker;
   ```
   A reference schema with sample data is in `backend/schema.sql` if you'd
   rather set it up by hand in MySQL Workbench.

2. Set your DB credentials as environment variables (defaults assume
   `root` / `root` on `localhost:3306`):
   ```bash
   export SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/expense_tracker?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
   export SPRING_DATASOURCE_USERNAME=root
   export SPRING_DATASOURCE_PASSWORD=root
   export CORS_ALLOWED_ORIGINS=http://localhost:5173
   ```

3. Run it (requires Maven 3.9+ and JDK 17 installed):
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   The API starts on `http://localhost:8080`. In IntelliJ IDEA, you can
   simply open the `backend` folder as a Maven project and run
   `ExpenseTrackerApplication`.

### API endpoints

| Method | Endpoint                | Description                       |
|--------|--------------------------|------------------------------------|
| GET    | `/api/expenses`          | List all transactions              |
| GET    | `/api/expenses/{id}`     | Get one transaction                |
| GET    | `/api/expenses/summary`  | Totals, category breakdown, recent |
| POST   | `/api/expenses`          | Create a transaction               |
| PUT    | `/api/expenses/{id}`     | Update a transaction                |
| DELETE | `/api/expenses/{id}`     | Delete a transaction               |
| GET    | `/api/health`            | Health check                       |

Import these into **Postman** to test manually, or open the endpoints
directly once the app is running.

---

## 2. Frontend — React + Vite Dashboard

**Stack:** React 18, Vite, Axios, React Router, Tailwind CSS, Recharts, lucide-react

### Run locally

```bash
cd frontend
npm install
cp .env.example .env      # set VITE_API_URL if backend isn't on localhost:8080
npm run dev
```

The app runs on `http://localhost:5173` and talks to the backend at the
URL in `VITE_API_URL` (defaults to `http://localhost:8080`).

---

## Tooling used in this project

Git · GitHub · Postman · IntelliJ IDEA (backend) · VS Code (frontend) · MySQL Workbench

---

## Tech notes

- The backend uses `spring.jpa.hibernate.ddl-auto=update`, so the `expenses`
  table is created automatically on first run — no manual migration needed.
- All monetary values are stored as `DECIMAL(12,2)` and displayed with
  tabular monospace numerals in the UI for a clean "ledger" feel.
- CORS is configured via the `CORS_ALLOWED_ORIGINS` env var (comma-separated
  if you need more than one origin).
