import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { expenseService } from '../api/expenseService'

const ExpenseContext = createContext(null)

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, variant = 'success') => {
    setToast({ message, variant, id: Date.now() })
  }, [])

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [list, summaryData] = await Promise.all([
        expenseService.getAll(),
        expenseService.getSummary(),
      ])
      setExpenses(list)
      setSummary(summaryData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const addExpense = useCallback(
    async (payload) => {
      const created = await expenseService.create(payload)
      await refresh()
      showToast(`${created.type === 'INCOME' ? 'Income' : 'Expense'} added`)
      return created
    },
    [refresh, showToast]
  )

  const editExpense = useCallback(
    async (id, payload) => {
      const updated = await expenseService.update(id, payload)
      await refresh()
      showToast('Transaction updated')
      return updated
    },
    [refresh, showToast]
  )

  const deleteExpense = useCallback(
    async (id) => {
      await expenseService.remove(id)
      await refresh()
      showToast('Transaction deleted', 'danger')
    },
    [refresh, showToast]
  )

  const value = useMemo(
    () => ({
      expenses,
      summary,
      loading,
      error,
      toast,
      setToast,
      refresh,
      addExpense,
      editExpense,
      deleteExpense,
    }),
    [expenses, summary, loading, error, toast, refresh, addExpense, editExpense, deleteExpense]
  )

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export function useExpenses() {
  const ctx = useContext(ExpenseContext)
  if (!ctx) throw new Error('useExpenses must be used within ExpenseProvider')
  return ctx
}
