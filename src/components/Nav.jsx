import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { profile } from '../data/profile.js'

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goToSection = (id) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-line-soft bg-canvas/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-canvas/0'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6"
      >
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0 })}
          className="text-[15px] font-semibold tracking-tight text-ink"
        >
          {profile.name}
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goToSection(s.id)}
              className="rounded-full px-3 py-1.5 text-[14px] text-muted transition-colors hover:text-ink"
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}
