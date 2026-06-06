import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { demoStore } from '../lib/demoStore'

const AuthContext = createContext(null)

function normalizeSupabaseUser(user) {
  if (!user) return null
  return {
    id: user.id,
    email: user.email,
    full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Investor',
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadSession() {
      if (isSupabaseConfigured) {
        const { data } = await supabase.auth.getSession()
        if (mounted) {
          setUser(normalizeSupabaseUser(data?.session?.user))
          setLoading(false)
        }
      } else {
        setUser(demoStore.currentUser())
        setLoading(false)
      }
    }

    loadSession()

    if (isSupabaseConfigured) {
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(normalizeSupabaseUser(session?.user))
      })
      return () => listener.subscription.unsubscribe()
    }

    return () => {
      mounted = false
    }
  }, [])

  async function register({ fullName, email, password }) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      })
      if (error) throw error
      const normalizedUser = normalizeSupabaseUser(data.user)
      setUser(data.session ? normalizedUser : null)
      return { user: normalizedUser, session: data.session }
    }

    const created = demoStore.register({ fullName, email, password })
    setUser(created)
    return { user: created, session: true }
  }

  async function login({ email, password }) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      const normalizedUser = normalizeSupabaseUser(data.user)
      setUser(data.session ? normalizedUser : null)
      return { user: normalizedUser, session: data.session }
    }

    const loggedIn = demoStore.login({ email, password })
    setUser(loggedIn)
    return loggedIn
  }

  async function logout() {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    } else {
      demoStore.logout()
    }
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, loading, register, login, logout, isSupabaseConfigured }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
