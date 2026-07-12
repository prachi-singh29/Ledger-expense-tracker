import { ArrowDownCircle, ArrowUpCircle, Pencil, Trash2, Receipt } from 'lucide-react'
import { formatCurrency, formatDate, colorForCategory } from '../utils/format'
import EmptyState from './EmptyState'

export default function TransactionsTable({ expenses, onEdit, onDelete, compact = false }) {
  if (!expenses?.length) {
    return (
      <EmptyState
        icon={Receipt}
        title="No transactions yet"
        description="Add your first income or expense to start building your ledger."
      />
    )
  }

  return (
    <div className="glass-panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-edge/[0.06] text-xs font-medium uppercase tracking-wide text-ink-faint">
              <th className="px-5 py-3.5">Transaction</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Date</th>
              <th className="px-5 py-3.5 text-right">Amount</th>
              {!compact && <th className="px-5 py-3.5 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr
                key={e.id}
                className="border-b border-edge/[0.04] text-sm transition-colors duration-150 last:border-0 hover:bg-edge/[0.025]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                        ${e.type === 'INCOME' ? 'bg-mint-400/10 text-mint-400' : 'bg-coral-400/10 text-coral-400'}`}
                    >
                      {e.type === 'INCOME' ? <ArrowUpCircle size={16} /> : <ArrowDownCircle size={16} />}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink-muted">{e.title}</p>
                      {e.description && (
                        <p className="truncate text-xs text-ink-faint">{e.description}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="chip">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: colorForCategory(e.category) }}
                    />
                    {e.category}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-ink-muted">{formatDate(e.date)}</td>
                <td
                  className={`amount px-5 py-4 text-right font-semibold ${
                    e.type === 'INCOME' ? 'text-mint-400' : 'text-coral-400'
                  }`}
                >
                  {e.type === 'INCOME' ? '+' : '−'}
                  {formatCurrency(e.amount)}
                </td>
                {!compact && (
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => onEdit(e)}
                        className="rounded-lg p-2 text-ink-faint transition-colors hover:bg-edge/[0.06] hover:text-teal-400"
                        aria-label="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => onDelete(e)}
                        className="rounded-lg p-2 text-ink-faint transition-colors hover:bg-edge/[0.06] hover:text-coral-400"
                        aria-label="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
