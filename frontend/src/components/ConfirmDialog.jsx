import { AlertTriangle } from 'lucide-react'

export default function ConfirmDialog({ open, title, description, onConfirm, onCancel, loading }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-sm animate-scale-in p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-coral-400/10">
          <AlertTriangle size={20} className="text-coral-400" />
        </div>
        <h3 className="mt-4 font-display text-base font-semibold text-ink">{title}</h3>
        <p className="mt-1.5 text-sm text-ink-muted">{description}</p>
        <div className="mt-6 flex justify-end gap-2.5">
          <button onClick={onCancel} className="btn-ghost">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-coral-500 px-4 py-2.5 text-sm font-semibold text-ink transition-all
              duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
