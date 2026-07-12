import { NavLink } from 'react-router-dom'
import { LayoutGrid, Receipt, Wallet } from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutGrid, end: true },
  { to: '/transactions', label: 'Transactions', icon: Receipt },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed z-40 flex h-full w-64 flex-col border-r border-edge/[0.06] bg-surface/95 px-4 py-6
          backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:bg-surface/60
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-8 flex items-center gap-2.5 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
            <Wallet size={18} className="text-base-950" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-display text-base font-semibold leading-none text-ink">Ledger</p>
            <p className="mt-0.5 text-[11px] font-medium text-ink-faint">Expense Tracker</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="glass-panel px-4 py-4">
          <p className="font-display text-sm font-semibold text-ink">Stay on budget</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Log every transaction the day it happens — small habits compound into clear numbers.
          </p>
        </div>
      </aside>
    </>
  )
}
