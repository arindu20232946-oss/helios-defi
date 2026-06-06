export default function StatCard({ label, value, detail, icon: Icon }) {
  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/50">{label}</p>
          <p className="mt-2 text-2xl font-black text-white">{value}</p>
          {detail && <p className="mt-2 text-sm text-white/50">{detail}</p>}
        </div>
        {Icon && (
          <div className="rounded-2xl border border-helios-green/25 bg-helios-green/10 p-3 text-helios-green">
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  )
}
