export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.3fr_1fr]">
        <div>
          <p className="text-lg font-black gold-gradient-text">HELIOS DEFI</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/45">
            A premium digital investment dashboard concept for account access, invested amount display, and admin updates.
          </p>
        </div>
        <div className="rounded-3xl border border-helios-gold/20 bg-helios-gold/5 p-5 text-sm leading-7 text-white/52">
          Digital assets and DeFi investments involve risk. Returns are not guaranteed. Helios DeFi provides tracking
          information only and should not be considered financial advice.
        </div>
        <div className="text-sm text-white/45 md:text-right">
          <p>© {new Date().getFullYear()} Helios DeFi.</p>
          <p className="mt-2">All rights reserved.</p>
          <p className="mt-2">Investor dashboard · Demo/Supabase ready</p>
        </div>
      </div>
    </footer>
  )
}
