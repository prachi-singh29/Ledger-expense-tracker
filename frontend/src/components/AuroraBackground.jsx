export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-teal-400/20 blur-[110px] animate-drift" />
      <div className="absolute -right-20 top-1/3 h-[380px] w-[380px] rounded-full bg-violet-400/20 blur-[110px] animate-drift-slow" />
      <div className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-coral-400/10 blur-[100px] animate-drift" />
    </div>
  )
}
