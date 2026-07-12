import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import AuroraBackground from './AuroraBackground'
import Toast from './Toast'
import { useExpenses } from '../context/ExpenseContext'

export default function Layout({ title, subtitle, onAdd, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { refresh, loading, toast, setToast } = useExpenses()

  return (
    <div className="flex min-h-screen bg-canvas">
      <AuroraBackground />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setSidebarOpen(true)}
          onRefresh={refresh}
          onAdd={onAdd}
          refreshing={loading}
        />
        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  )
}
