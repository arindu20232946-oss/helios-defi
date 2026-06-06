import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login, isSupabaseConfigured } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto grid min-h-[calc(100vh-88px)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-helios-green">Member access</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight">Login to <span className="gold-gradient-text">Helios DeFi</span></h1>
        <p className="mt-5 max-w-xl leading-8 text-white/60">
          Access your investor dashboard to see your profile, invested amount, account status,
          and current plan.
        </p>
        {!isSupabaseConfigured && (
          <div className="warning-box mt-6 rounded-3xl p-5 text-sm leading-6">
            Demo admin login: <strong>admin@heliosdefi.com</strong> / <strong>admin123</strong>
          </div>
        )}
      </section>

      <section className="glass-card rounded-[2rem] p-6 sm:p-8">
        <img src="/logo.png" alt="Helios DeFi" className="mx-auto mb-6 h-24 w-24 rounded-3xl object-cover" />
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">Email</label>
            <input className="input-field" name="email" type="email" value={form.email} onChange={updateField} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">Password</label>
            <input className="input-field" name="password" type="password" value={form.password} onChange={updateField} required />
          </div>

          {error && <p className="rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}

          <button className="btn-primary w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/55">
          Do not have an account? <Link to="/register" className="font-bold text-helios-green">Create account</Link>
        </p>
      </section>
    </main>
  )
}
