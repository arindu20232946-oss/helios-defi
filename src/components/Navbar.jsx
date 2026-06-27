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
    <header className="navbar-lux sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 py-3 lg:px-10">
        
        {/* LOGO & BRANDING - Sleek, contained, and elegantly bold */}
        <Link to="/" className="flex flex-shrink-0 items-center gap-3 transition hover:opacity-90">
          <img src="/logo.png" alt="Helios DeFi logo" className="h-10 w-auto object-contain lg:h-12" />
          <span className="text-xl font-extrabold tracking-wide text-helios-gold lg:text-2xl">
            HELIOS DEFI
          </span>
        </Link>

        {/* CENTER NAVIGATION */}
        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex xl:gap-6">
          <NavLink to="/" className={navLink}>Home</NavLink>
          <button type="button" onClick={() => goToSection('about')} className={navButton}>About Us</button>
          <button type="button" onClick={() => goToSection('plans')} className={navButton}>Plan</button>
          <NavLink to="/dashboard" className={navLink}>Dashboard</NavLink>
          <button type="button" onClick={() => goToSection('insights')} className={navButton}>Blog</button>
          <button type="button" onClick={() => goToSection('features')} className={navButton}>Page</button>
          <button type="button" onClick={() => goToSection('contact')} className={navButton}>Contact</button>
        </nav>

        {/* RIGHT ACTION BUTTONS */}
        <div className="flex flex-shrink-0 items-center justify-end gap-3">
          <Link
            to={user ? '/dashboard' : '/login'}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-helios-gold text-black transition hover:bg-[#ffd178] lg:h-11 lg:w-11"
            aria-label="Account"
          >
            <UserRound size={20} />
          </Link>

          <button className="hidden h-10 items-center gap-2 rounded-md border border-helios-gold/30 px-3 text-sm text-white transition hover:border-helios-gold/60 md:flex lg:h-11 lg:px-4">
            Eng <ChevronDown size={16} />
          </button>

          {user && (
            <button onClick={handleLogout} className="hidden h-10 items-center gap-2 rounded-md border border-white/15 px-3 text-sm font-semibold text-white transition hover:border-helios-gold/50 md:flex lg:h-11 lg:px-4">
              <LogOut size={16} /> Logout
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
