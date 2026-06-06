const USERS_KEY = 'helios_demo_users'
const SESSION_KEY = 'helios_demo_session'

const defaultAdmin = {
  id: 'admin-001',
  full_name: 'Helios Admin',
  email: 'admin@heliosdefi.com',
  password: 'admin123',
  invested_amount: 0,
  investment_plan: 'Admin Access',
  status: 'Active',
  is_admin: true,
  created_at: new Date().toISOString(),
}

function readUsers() {
  const saved = localStorage.getItem(USERS_KEY)
  if (!saved) {
    localStorage.setItem(USERS_KEY, JSON.stringify([defaultAdmin]))
    return [defaultAdmin]
  }
  try {
    const users = JSON.parse(saved)
    const hasAdmin = users.some((user) => user.email === defaultAdmin.email)
    const finalUsers = hasAdmin ? users : [defaultAdmin, ...users]
    localStorage.setItem(USERS_KEY, JSON.stringify(finalUsers))
    return finalUsers
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify([defaultAdmin]))
    return [defaultAdmin]
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function publicUser(user) {
  if (!user) return null
  const { password, ...safeUser } = user
  return safeUser
}

export const demoStore = {
  register({ fullName, email, password }) {
    const users = readUsers()
    const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase())
    if (exists) throw new Error('This email already exists.')

    const user = {
      id: crypto.randomUUID(),
      full_name: fullName,
      email,
      password,
      invested_amount: 0,
      investment_plan: 'Starter Plan',
      status: 'Pending',
      is_admin: false,
      created_at: new Date().toISOString(),
    }

    users.push(user)
    saveUsers(users)
    localStorage.setItem(SESSION_KEY, user.id)
    return publicUser(user)
  },

  login({ email, password }) {
    const users = readUsers()
    const user = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
    )
    if (!user) throw new Error('Incorrect email or password.')
    localStorage.setItem(SESSION_KEY, user.id)
    return publicUser(user)
  },

  logout() {
    localStorage.removeItem(SESSION_KEY)
  },

  currentUser() {
    const sessionId = localStorage.getItem(SESSION_KEY)
    if (!sessionId) return null
    const users = readUsers()
    return publicUser(users.find((user) => user.id === sessionId))
  },

  getProfile(id) {
    const users = readUsers()
    return publicUser(users.find((user) => user.id === id))
  },

  getAllUsers() {
    return readUsers().map(publicUser)
  },

  updateInvestment(id, updates) {
    const users = readUsers()
    const nextUsers = users.map((user) =>
      user.id === id
        ? {
            ...user,
            invested_amount: Number(updates.invested_amount || 0),
            investment_plan: updates.investment_plan || 'Starter Plan',
            status: updates.status || 'Pending',
          }
        : user,
    )
    saveUsers(nextUsers)
    return publicUser(nextUsers.find((user) => user.id === id))
  },
}
