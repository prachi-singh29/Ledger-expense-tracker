import { formatCurrency } from '../utils/format'

export default function StatCard({ label, value, icon: Icon, tone = 'teal', trend, format = 'currency' }) {
  const toneStyles = {
    teal: 'text-teal-400 bg-teal-400/10',
    violet: 'text-violet-400 bg-violet-400/10',
    coral: 'text-coral-400 bg-coral-400/10',
    mint: 'text-mint-400 bg-mint-400/10',
  }

  const displayValue = format === 'currency' ? formatCurrency(value) : Number(value ?? 0)

  return (
    <div className="glass-panel glass-panel-hover animate-fade-up p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-ink-muted">{label}</p>
          <p className="amount mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            {displayValue}
          </p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneStyles[tone]}`}>
          <Icon size={20} strokeWidth={2} />
        </div>
      </div>
      {trend && (
        <p className="mt-3 text-xs font-medium text-ink-faint">{trend}</p>
      )}
    </div>
  )
}
