import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { colorForCategory, formatCurrency } from '../utils/format'
import { PieChart as PieIcon } from 'lucide-react'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="rounded-lg border border-edge/10 bg-surface2/95 px-3 py-2 text-xs shadow-glass backdrop-blur-xl">
      <p className="font-medium text-ink-muted">{item.name}</p>
      <p className="amount mt-0.5 text-teal-400">{formatCurrency(item.value)}</p>
    </div>
  )
}

export default function CategoryDonut({ data }) {
  const entries = Object.entries(data || {}).map(([name, value]) => ({ name, value }))
  const total = entries.reduce((sum, e) => sum + e.value, 0)

  if (!entries.length) {
    return (
      <div className="glass-panel flex h-full min-h-[280px] flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-edge/[0.04]">
          <PieIcon size={20} className="text-ink-faint" />
        </div>
        <div>
          <p className="text-sm font-medium text-ink-muted">No spending yet</p>
          <p className="mt-1 text-xs text-ink-faint">Add an expense to see the category split.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-panel h-full p-5 sm:p-6">
      <h3 className="font-display text-base font-semibold text-ink">Spending by Category</h3>
      <div className="relative mt-2 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={entries}
              dataKey="value"
              nameKey="name"
              innerRadius="62%"
              outerRadius="88%"
              paddingAngle={3}
              stroke="none"
            >
              {entries.map((entry) => (
                <Cell key={entry.name} fill={colorForCategory(entry.name)} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[11px] font-medium text-ink-faint">Total spent</p>
          <p className="amount text-lg font-semibold text-ink">{formatCurrency(total)}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {entries.map((entry) => (
          <span key={entry.name} className="chip">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: colorForCategory(entry.name) }}
            />
            {entry.name}
          </span>
        ))}
      </div>
    </div>
  )
}
