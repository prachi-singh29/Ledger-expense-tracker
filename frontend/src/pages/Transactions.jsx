import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Layout from '../components/Layout'
import TransactionsTable from '../components/TransactionsTable'
import ExpenseFormModal from '../components/ExpenseFormModal'
import ConfirmDialog from '../components/ConfirmDialog'
import { useExpenses } from '../context/ExpenseContext'
import { CATEGORIES } from '../utils/format'

export default function Transactions() {
  const { expenses, addExpense, editExpense, deleteExpense, loading } = useExpenses()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [categoryFilter, setCategoryFilter] = useState('ALL')

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchesSearch =
        !search ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description?.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === 'ALL' || e.type === typeFilter
      const matchesCategory = categoryFilter === 'ALL' || e.category === categoryFilter
      return matchesSearch && matchesType && matchesCategory
    })
  }, [expenses, search, typeFilter, categoryFilter])

  function openAdd() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(expense) {
    setEditing(expense)
    setModalOpen(true)
  }

  async function handleSubmit(payload) {
    if (editing) {
      await editExpense(editing.id, payload)
    } else {
      await addExpense(payload)
    }
  }

  async function handleDelete() {
    if (!pendingDelete) return
    setDeleting(true)
    try {
      await deleteExpense(pendingDelete.id)
      setPendingDelete(null)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Layout title="Transactions" subtitle={`${filtered.length} of ${expenses.length} shown`} onAdd={openAdd}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            placeholder="Search transactions…"
            className="input-field pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input-field sm:w-40"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="ALL" className="bg-surface2">All Types</option>
          <option value="INCOME" className="bg-surface2">Income</option>
          <option value="EXPENSE" className="bg-surface2">Expense</option>
        </select>
        <select
          className="input-field sm:w-48"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="ALL" className="bg-surface2">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-surface2">
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading && !expenses.length ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-400 border-t-transparent" />
        </div>
      ) : (
        <TransactionsTable expenses={filtered} onEdit={openEdit} onDelete={setPendingDelete} />
      )}

      <ExpenseFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editing}
      />
      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this transaction?"
        description={`"${pendingDelete?.title}" will be permanently removed. This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
        loading={deleting}
      />
    </Layout>
  )
}
