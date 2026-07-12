import { useEffect, useState } from 'react'
import { X, ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { CATEGORIES, todayISO } from '../utils/format'

const emptyForm = {
  title: '',
  amount: '',
  type: 'EXPENSE',
  category: CATEGORIES[0],
  description: '',
  date: todayISO(),
}

export default function ExpenseFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(
        initialData
          ? {
              title: initialData.title,
              amount: initialData.amount,
              type: initialData.type,
              category: initialData.category,
              description: initialData.description || '',
              date: initialData.date,
            }
          : emptyForm
      )
      setErrors({})
    }
  }, [open, initialData])

  if (!open) return null

  function validate() {
    const next = {}
    if (!form.title.trim()) next.title = 'Title is required'
    if (!form.amount || Number(form.amount) <= 0) next.amount = 'Enter an amount greater than zero'
    if (!form.category) next.category = 'Pick a category'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSubmit({ ...form, amount: Number(form.amount) })
      onClose()
    } catch (err) {
      setErrors({ form: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="glass-panel my-8 w-full max-w-md animate-scale-in p-6 sm:p-7"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">
            {initialData ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-muted transition-colors hover:bg-edge/[0.06] hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>

        {/* Type toggle */}
        <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-edge/[0.03] p-1.5">
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, type: 'EXPENSE' }))}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-all duration-200
              ${form.type === 'EXPENSE' ? 'bg-coral-500/15 text-coral-400 shadow-glass-sm' : 'text-ink-faint hover:text-ink-muted'}`}
          >
            <ArrowDownCircle size={16} /> Expense
          </button>
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, type: 'INCOME' }))}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-all duration-200
              ${form.type === 'INCOME' ? 'bg-mint-500/15 text-mint-400 shadow-glass-sm' : 'text-ink-faint hover:text-ink-muted'}`}
          >
            <ArrowUpCircle size={16} /> Income
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-muted">Title</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Grocery shopping"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
            {errors.title && <p className="mt-1 text-xs text-coral-400">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-muted">Amount (₹)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="input-field amount"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              />
              {errors.amount && <p className="mt-1 text-xs text-coral-400">{errors.amount}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-muted">Date</label>
              <input
                type="date"
                className="input-field"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-muted">Category</label>
            <select
              className="input-field"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-surface2">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-muted">
              Notes <span className="text-ink-faint">(optional)</span>
            </label>
            <textarea
              className="input-field resize-none"
              rows={2}
              placeholder="Add a short note…"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>
        </div>

        {errors.form && <p className="mt-3 text-xs text-coral-400">{errors.form}</p>}

        <div className="mt-6 flex justify-end gap-2.5">
          <button type="button" onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
            {submitting ? 'Saving…' : initialData ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </form>
    </div>
  )
}
