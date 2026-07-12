export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="glass-panel flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-edge/[0.04]">
        <Icon size={24} className="text-ink-faint" />
      </div>
      <div>
        <p className="font-display text-base font-semibold text-ink-muted">{title}</p>
        <p className="mt-1 max-w-sm text-sm text-ink-faint">{description}</p>
      </div>
      {action}
    </div>
  )
}
