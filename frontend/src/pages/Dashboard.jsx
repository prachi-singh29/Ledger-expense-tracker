import { useState } from 'react'
import { Wallet, TrendingUp, TrendingDown, Receipt } from 'lucide-react'
import Layout from '../components/Layout'
import StatCard from '../components/StatCard'
import CategoryDonut from '../components/CategoryDonut'
import TrendChart from '../components/TrendChart'
import TransactionsTable from '../components/TransactionsTable'
import ExpenseFormModal from '../components/ExpenseFormModal'
import ConfirmDialog from '../components/ConfirmDialog'
import { useExpenses } from '../context/ExpenseContext'

export default function Dashboard() {
  const { expenses, summary, addExpense, editExpense, deleteExpense, loading } = useExpenses()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

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
    <Layout title="Dashboard" subtitle="Your financial overview at a glance" onAdd={openAdd}>
      {loading && !summary ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-400 border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Balance" value={summary?.balance} icon={Wallet} tone="teal" />
            <StatCard label="Total Income" value={summary?.totalIncome} icon={TrendingUp} tone="mint" />
            <StatCard label="Total Expense" value={summary?.totalExpense} icon={TrendingDown} tone="coral" />
            <StatCard
              label="Transactions"
              value={summary?.transactionCount ?? 0}
              icon={Receipt}
              tone="violet"
              format="number"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
            <div className="xl:col-span-3">
              <TrendChart expenses={expenses} />
            </div>
            <div className="xl:col-span-2">
              <CategoryDonut data={summary?.byCategory} />
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-ink">Recent Transactions</h2>
            </div>
            <TransactionsTable
              expenses={summary?.recent}
              onEdit={openEdit}
              onDelete={setPendingDelete}
            />
          </div>
        </div>
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
