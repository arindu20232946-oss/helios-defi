import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const navigate = useNavigate()
  const { register, isSupabaseConfigured } = useAuth()
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const result = await register(form)
      if (isSupabaseConfigured && !result.session) {
        setMessage('Account created. Please confirm your email, then login to access your dashboard.')
        return
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto grid min-h-[calc(100vh-88px)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-helios-green">New investor</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight">Create your <span className="gold-gradient-text">investment account</span></h1>
        <p className="mt-5 max-w-xl leading-8 text-white/60">
          Register to access a private dashboard where your profile and investment amount can be displayed from the backend.
        </p>
      </section>

      <section className="glass-card rounded-[2rem] p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">Full name</label>
            <input className="input-field" name="fullName" type="text" value={form.fullName} onChange={updateField} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">Email</label>
            <input className="input-field" name="email" type="email" value={form.email} onChange={updateField} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">Password</label>
            <input className="input-field" name="password" type="password" minLength="6" value={form.password} onChange={updateField} required />
          </div>

          {message && <p className="rounded-2xl border border-helios-green/30 bg-helios-green/10 p-3 text-sm text-green-100">{message}</p>}
          {error && <p className="rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}

          <button className="btn-primary w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/55">
          Already have an account? <Link to="/login" className="font-bold text-helios-green">Login</Link>
        </p>
      </section>
    </main>
  )
}
