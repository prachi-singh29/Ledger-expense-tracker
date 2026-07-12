const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 2,
})

export function formatCurrency(value) {
  const num = Number(value ?? 0)
  return currencyFormatter.format(num)
}

export function formatCompact(value) {
  const num = Number(value ?? 0)
  return numberFormatter.format(num)
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export const CATEGORIES = [
  'Food & Dining',
  'Transport',
  'Rent & Bills',
  'Shopping',
  'Health',
  'Education',
  'Entertainment',
  'Salary',
  'Freelance',
  'Investment',
  'Other',
]

export const CATEGORY_COLORS = {
  'Food & Dining': '#FBBF24',
  'Transport': '#22D3AE',
  'Rent & Bills': '#7C6CF6',
  'Shopping': '#FB7185',
  'Health': '#34D399',
  'Education': '#60A5FA',
  'Entertainment': '#F472B6',
  'Salary': '#34D399',
  'Freelance': '#22D3AE',
  'Investment': '#A78BFA',
  'Other': '#94A3B8',
}

export function colorForCategory(category) {
  return CATEGORY_COLORS[category] || '#94A3B8'
}
