import { NavLink, Outlet } from 'react-router-dom'
import { FiGrid, FiHome, FiTool } from 'react-icons/fi'
import Badge from '@/components/ui/Badge.jsx'
import ProgressBar from '@/components/ui/ProgressBar.jsx'
import CursorLogo from '@/components/layout/CursorLogo.jsx'
import ThemeToggle from '@/components/layout/ThemeToggle.jsx'
import GlowButton from '@/components/ui/GlowButton.jsx'
import { toolDefinitions } from '@/data/site.js'
import { useAuth } from '@/hooks/useAuth.js'

const topLinks = [
  { label: 'Dashboard', to: '/dashboard', icon: FiHome },
  { label: 'Tools', to: '/tools', icon: FiGrid },
]

const AppLayout = () => {
  const { user, logout } = useAuth()
  const usageCount = user?.dailyUsage?.count || 0
  const usageLimit = user?.plan === 'free' ? 10 : 100

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-80 flex-col border-r border-white/10 bg-surface/65 px-6 py-8 backdrop-blur-xl lg:flex">
          <div className="flex items-center justify-between">
            <CursorLogo />
            <ThemeToggle />
          </div>

          <div className="mt-10 space-y-3">
            {topLinks.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                      isActive
                        ? 'border border-primary/25 bg-primary/10 text-foreground'
                        : 'text-muted hover:bg-white/5 hover:text-foreground'
                    }`
                  }
                >
                  <Icon />
                  {item.label}
                </NavLink>
              )
            })}
          </div>

          <div className="mt-10">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">Tool Stack</p>
            <div className="space-y-2">
              {toolDefinitions.map((tool) => (
                <NavLink
                  key={tool.slug}
                  to={`/tools/${tool.slug}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                      isActive
                        ? 'border border-secondary/25 bg-secondary/10 text-foreground'
                        : 'text-muted hover:bg-white/5 hover:text-foreground'
                    }`
                  }
                >
                  <tool.icon />
                  <span>{tool.name}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="mt-auto space-y-5 rounded-[28px] border border-white/10 bg-background/40 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-muted">Signed in as</p>
                <p className="mt-1 font-semibold text-foreground">{user?.name || 'Guest Builder'}</p>
              </div>
              <Badge variant={user?.plan === 'pro' ? 'violet' : user?.plan === 'agency' ? 'green' : 'cyan'}>
                {user?.plan || 'free'}
              </Badge>
            </div>
            <ProgressBar value={usageCount} max={usageLimit} label="Daily usage" />
            <GlowButton variant="ghost" onClick={logout} fullWidth>
              Logout
            </GlowButton>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <div className="sticky top-0 z-40 border-b border-white/10 bg-background/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <CursorLogo />
              <div className="flex items-center gap-3">
                <Badge variant="cyan">{user?.plan || 'free'}</Badge>
                <ThemeToggle />
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-10 lg:pt-8">
            <Outlet />
          </div>

          <nav className="fixed inset-x-4 bottom-4 z-40 rounded-full border border-white/10 bg-surface/90 p-2 backdrop-blur-xl lg:hidden">
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Home', to: '/dashboard', icon: FiHome },
                { label: 'Tools', to: '/tools', icon: FiTool },
                { label: 'Hub', to: '/tools/code-reviewer', icon: FiGrid },
              ].map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex min-h-11 flex-col items-center justify-center rounded-full text-xs transition ${
                      isActive ? 'bg-primary/15 text-primary' : 'text-muted'
                    }`
                  }
                >
                  <item.icon className="mb-1" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
