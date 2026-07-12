import { Routes, Route } from 'react-router-dom'
import { ExpenseProvider } from './context/ExpenseContext'
import { ThemeProvider } from './context/ThemeContext'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ExpenseProvider>
    </ThemeProvider>
  )
}
