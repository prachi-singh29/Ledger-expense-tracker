import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { formatCurrency, formatDate } from '../utils/format'
import { TrendingUp } from 'lucide-react'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-edge/10 bg-surface2/95 px-3 py-2 text-xs shadow-glass backdrop-blur-xl">
      <p className="font-medium text-ink-muted">{formatDate(label)}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="amount mt-0.5" style={{ color: p.color }}>
          {p.dataKey === 'income' ? 'Income' : 'Expense'}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  )
}

export default function TrendChart({ expenses }) {
  const sorted = [...(expenses || [])].sort((a, b) => new Date(a.date) - new Date(b.date))

  const byDate = {}
  sorted.forEach((e) => {
    const key = e.date
    if (!byDate[key]) byDate[key] = { date: key, income: 0, expense: 0 }
    if (e.type === 'INCOME') byDate[key].income += Number(e.amount)
    else byDate[key].expense += Number(e.amount)
  })
  const chartData = Object.values(byDate).slice(-14)

  if (!chartData.length) {
    return (
      <div className="glass-panel flex h-full min-h-[280px] flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-edge/[0.04]">
          <TrendingUp size={20} className="text-ink-faint" />
        </div>
        <div>
          <p className="text-sm font-medium text-ink-muted">Nothing to chart yet</p>
          <p className="mt-1 text-xs text-ink-faint">Your income vs. expense trend appears here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-panel h-full p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-ink">Income vs Expense</h3>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-ink-muted">
            <span className="h-2 w-2 rounded-full bg-mint-400" /> Income
          </span>
          <span className="flex items-center gap-1.5 text-ink-muted">
            <span className="h-2 w-2 rounded-full bg-coral-400" /> Expense
          </span>
        </div>
      </div>
      <div className="mt-4 h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#34D399" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FB7185" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#FB7185" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(d) => formatDate(d).replace(/,.*/, '')}
              tick={{ fill: '#64748B', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64748B', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={48}
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="income" stroke="#34D399" strokeWidth={2} fill="url(#incomeFill)" />
            <Area type="monotone" dataKey="expense" stroke="#FB7185" strokeWidth={2} fill="url(#expenseFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
