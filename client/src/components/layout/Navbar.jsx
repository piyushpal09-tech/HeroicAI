import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { drawerMotion } from '@/animations/variants.js'
import { marketingNav } from '@/data/site.js'
import GlowButton from '@/components/ui/GlowButton.jsx'
import CursorLogo from '@/components/layout/CursorLogo.jsx'
import ThemeToggle from '@/components/layout/ThemeToggle.jsx'

const navLinkClass =
  'rounded-full px-3 py-2 text-sm text-muted transition hover:text-foreground'
const MotionDiv = motion.div

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-7xl rounded-full border px-4 py-3 transition-all duration-300 ${
          scrolled ? 'border-primary/20 bg-black/60 shadow-card backdrop-blur-md' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <CursorLogo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {marketingNav.map((item) => (
              <NavLink key={item.label} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <GlowButton to="/login" variant="ghost">
              Login
            </GlowButton>
            <GlowButton to="/signup">Get Started</GlowButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-surface/80 text-foreground"
              aria-label="Open navigation menu"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <MotionDiv
              variants={drawerMotion}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-4 rounded-[28px] border border-white/10 bg-surface/90 p-4 backdrop-blur-xl lg:hidden"
            >
              <div className="flex flex-col gap-3">
                {marketingNav.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition hover:bg-white/5"
                  >
                    {item.label}
                  </NavLink>
                ))}
                <GlowButton to="/login" variant="ghost" fullWidth onClick={() => setOpen(false)}>
                  Login
                </GlowButton>
                <GlowButton to="/signup" fullWidth onClick={() => setOpen(false)}>
                  Get Started
                </GlowButton>
              </div>
            </MotionDiv>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Navbar
