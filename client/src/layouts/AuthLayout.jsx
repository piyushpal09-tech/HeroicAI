import { Link, Outlet } from 'react-router-dom'
import CursorLogo from '@/components/layout/CursorLogo.jsx'
import ThemeToggle from '@/components/layout/ThemeToggle.jsx'

const AuthLayout = () => (
  <div className="relative min-h-screen overflow-hidden">
    <div className="absolute inset-0 grid-overlay" />
    <div className="absolute left-1/4 top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
    <div className="absolute right-1/4 top-48 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

    <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <CursorLogo />
        </Link>
        <ThemeToggle />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Outlet />
      </div>
    </div>
  </div>
)

export default AuthLayout
