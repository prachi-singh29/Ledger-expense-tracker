import { Menu, Plus, RefreshCw, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Topbar({ title, subtitle, onMenuClick, onRefresh, onAdd, refreshing }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-edge/[0.06] bg-canvas/70 px-5 py-4 backdrop-blur-xl sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-edge/[0.06] hover:text-ink lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="font-display text-xl font-semibold text-ink sm:text-2xl">{title}</h1>
          {subtitle && <p className="mt-0.5 text-sm text-ink-faint">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={toggleTheme}
          className="btn-ghost !px-2.5"
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={onRefresh}
          className="btn-ghost !px-2.5"
          aria-label="Refresh data"
          title="Refresh"
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
        </button>
        <button onClick={onAdd} className="btn-primary">
          <Plus size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Add Transaction</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  )
}
