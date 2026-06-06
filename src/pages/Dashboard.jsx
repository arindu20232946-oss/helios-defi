import { useEffect, useState } from 'react'
import { BadgeDollarSign, CheckCircle2, Clock, UserRound } from 'lucide-react'
import StatCard from '../components/StatCard'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { demoStore } from '../lib/demoStore'

function formatMoney(value) {
  const number = Number(value || 0)
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
}

export default function Dashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProfile() {
      setLoading(true)
      setError('')
      try {
        if (isSupabaseConfigured) {
          const { data, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (profileError) throw profileError
          setProfile(data)
        } else {
          setProfile(demoStore.getProfile(user.id))
        }
      } catch (err) {
        setError(err.message || 'Unable to load your profile.')
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) loadProfile()
  }, [user])

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 text-center text-helios-green">Loading dashboard...</div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-8 text-red-100">{error}</div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-helios-green">Investor Dashboard</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Welcome, <span className="gold-gradient-text">{profile?.full_name || user.email}</span>
          </h1>
          <p className="mt-4 max-w-2xl leading-8 text-white/60">
            This page displays your account information and investment records stored in the backend.
          </p>
        </div>
        <img src="/logo.png" alt="Helios DeFi" className="h-28 w-28 rounded-3xl object-cover shadow-gold" />
      </section>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Invested Amount" value={formatMoney(profile?.invested_amount)} detail="Amount assigned by admin" icon={BadgeDollarSign} />
        <StatCard label="Account Status" value={profile?.status || 'Pending'} detail="Current investment status" icon={CheckCircle2} />
        <StatCard label="Investment Plan" value={profile?.investment_plan || 'Starter Plan'} detail="Selected plan type" icon={Clock} />
        <StatCard label="Investor Email" value={profile?.email || user.email} detail="Registered account" icon={UserRound} />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="glass-card rounded-3xl p-6">
          <h2 className="text-2xl font-black text-white">Investment Overview</h2>
          <p className="mt-3 leading-7 text-white/55">
            Your investment details are shown here for tracking purposes. Contact the Helios DeFi admin team
            if the amount or status needs to be corrected.
          </p>
          <div className="mt-6 rounded-3xl border border-white/10 bg-black/30 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white/50">Current record</p>
                <p className="mt-2 text-4xl font-black gold-gradient-text">{formatMoney(profile?.invested_amount)}</p>
              </div>
              <div className="rounded-full border border-helios-green/25 bg-helios-green/10 px-4 py-2 text-sm font-bold text-helios-green">
                {profile?.status || 'Pending'}
              </div>
            </div>
            <div className="mt-6 h-3 rounded-full bg-white/10">
              <div className="h-3 w-2/3 rounded-full bg-gradient-to-r from-helios-green via-helios-gold to-helios-blue" />
            </div>
          </div>
        </div>

        <div className="warning-box rounded-3xl p-6">
          <h2 className="text-xl font-black text-white">Important Disclaimer</h2>
          <p className="mt-3 leading-7 text-sm">
            Helios DeFi provides investment tracking information only. Digital assets and DeFi investments
            involve risk. Returns are not guaranteed, and this website should not be treated as financial advice.
          </p>
        </div>
      </section>
    </main>
  )
}
