import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, UserRound } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  function goToSection(sectionId) {
    navigate('/')
    window.setTimeout(() => {
      const section = document.getElementById(sectionId)
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const navButton = 'px-3 py-2 text-[15px] font-semibold text-white transition hover:text-helios-gold'
  const navLink = ({ isActive }) =>
    `px-3 py-2 text-[15px] font-semibold transition ${isActive ? 'text-helios-gold' : 'text-white hover:text-helios-gold'}`

  return (
    <header className="navbar-lux sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Helios DeFi logo" className="h-16 w-44 object-contain object-left" />
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          <NavLink to="/" className={navLink}>Home</NavLink>
          <button type="button" onClick={() => goToSection('about')} className={navButton}>About Us</button>
          <button type="button" onClick={() => goToSection('plans')} className={navButton}>Plan</button>
          <NavLink to="/dashboard" className={navLink}>Dashboard</NavLink>
          <button type="button" onClick={() => goToSection('insights')} className={navButton}>Blog</button>
          <button type="button" onClick={() => goToSection('features')} className={navButton}>Page</button>
          <button type="button" onClick={() => goToSection('contact')} className={navButton}>Contact</button>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={user ? '/dashboard' : '/login'}
            className="flex h-14 w-14 items-center justify-center rounded-md bg-helios-gold text-black transition hover:bg-[#ffd178]"
            aria-label="Account"
          >
            <UserRound size={24} />
          </Link>

          <button className="hidden h-14 items-center gap-5 rounded-md border border-helios-gold/30 px-5 text-white md:flex">
            Eng <ChevronDown size={18} />
          </button>

          {user && (
            <button onClick={handleLogout} className="hidden items-center gap-2 rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:border-helios-gold/50 md:flex">
              <LogOut size={16} /> Logout
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
