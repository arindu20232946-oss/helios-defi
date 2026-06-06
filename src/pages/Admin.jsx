import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { demoStore } from '../lib/demoStore'

export default function Admin() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function loadAdminData() {
    setLoading(true)
    setError('')
    try {
      if (isSupabaseConfigured) {
        const { data: adminProfile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) throw profileError
        setProfile(adminProfile)

        if (!adminProfile?.is_admin) {
          setUsers([])
          return
        }

        const { data: allUsers, error: usersError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })

        if (usersError) throw usersError
        setUsers(allUsers || [])
      } else {
        const adminProfile = demoStore.getProfile(user.id)
        setProfile(adminProfile)
        setUsers(adminProfile?.is_admin ? demoStore.getAllUsers() : [])
      }
    } catch (err) {
      setError(err.message || 'Unable to load admin data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.id) loadAdminData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  function updateLocalField(id, key, value) {
    setUsers((current) => current.map((item) => (item.id === id ? { ...item, [key]: value } : item)))
  }

  async function saveInvestment(item) {
    setMessage('')
    setError('')
    try {
      const updates = {
        invested_amount: Number(item.invested_amount || 0),
        investment_plan: item.investment_plan || 'Starter Plan',
        status: item.status || 'Pending',
      }

      if (isSupabaseConfigured) {
        const { error: updateError } = await supabase.from('profiles').update(updates).eq('id', item.id)
        if (updateError) throw updateError
      } else {
        demoStore.updateInvestment(item.id, updates)
      }

      setMessage(`Updated ${item.email}`)
      await loadAdminData()
    } catch (err) {
      setError(err.message || 'Unable to update investment.')
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 text-center text-helios-green">Loading admin panel...</div>
      </main>
    )
  }

  if (!profile?.is_admin) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="warning-box rounded-3xl p-8">
          <h1 className="text-3xl font-black text-white">Admin access required</h1>
          <p className="mt-4 leading-7">
            This page is only for admin users. In Supabase, set your profile field <strong>is_admin</strong> to <strong>true</strong> from the SQL editor.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-helios-green">Admin Panel</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Manage <span className="gold-gradient-text">investor records</span>
        </h1>
        <p className="mt-4 max-w-2xl leading-8 text-white/60">
          Add or edit invested amounts, plans, and account status for each Helios DeFi user.
        </p>
      </section>

      {message && <div className="mb-5 rounded-2xl border border-helios-green/30 bg-helios-green/10 p-4 text-green-100">{message}</div>}
      {error && <div className="mb-5 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-100">{error}</div>}

      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
        <div className="hidden grid-cols-[1.3fr_0.8fr_1fr_0.8fr_0.5fr] gap-4 border-b border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-white/60 lg:grid">
          <span>User</span>
          <span>Invested Amount</span>
          <span>Plan</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {users.map((item) => (
          <div key={item.id} className="grid gap-4 border-b border-white/10 p-4 last:border-b-0 lg:grid-cols-[1.3fr_0.8fr_1fr_0.8fr_0.5fr] lg:items-center">
            <div>
              <p className="font-bold text-white">{item.full_name || 'Investor'}</p>
              <p className="text-sm text-white/50">{item.email}</p>
              {item.is_admin && <p className="mt-1 text-xs font-bold text-helios-gold">Admin</p>}
            </div>

            <input
              className="input-field"
              type="number"
              min="0"
              step="0.01"
              value={item.invested_amount ?? 0}
              onChange={(event) => updateLocalField(item.id, 'invested_amount', event.target.value)}
            />

            <input
              className="input-field"
              value={item.investment_plan || ''}
              onChange={(event) => updateLocalField(item.id, 'investment_plan', event.target.value)}
            />

            <select
              className="input-field"
              value={item.status || 'Pending'}
              onChange={(event) => updateLocalField(item.id, 'status', event.target.value)}
            >
              <option>Pending</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Paused</option>
            </select>

            <button onClick={() => saveInvestment(item)} className="btn-primary flex items-center justify-center gap-2 text-sm">
              <Save size={16} /> Save
            </button>
          </div>
        ))}
      </section>
    </main>
  )
}
