import { useEffect } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  const isDanger = toast.variant === 'danger'

  return (
    <div
      key={toast.id}
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 animate-fade-up items-center gap-2.5
        rounded-xl border border-edge/10 bg-surface2/95 px-4 py-3 shadow-glass backdrop-blur-xl"
    >
      {isDanger ? (
        <XCircle size={18} className="text-coral-400" />
      ) : (
        <CheckCircle2 size={18} className="text-mint-400" />
      )}
      <p className="text-sm font-medium text-ink-muted">{toast.message}</p>
    </div>
  )
}
