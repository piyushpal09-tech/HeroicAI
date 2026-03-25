import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import PageShell from '@/components/layout/PageShell.jsx'
import SEO from '@/components/layout/SEO.jsx'
import HistoryList from '@/components/layout/HistoryList.jsx'
import Badge from '@/components/ui/Badge.jsx'
import GlassCard from '@/components/ui/GlassCard.jsx'
import GlowButton from '@/components/ui/GlowButton.jsx'
import ProgressBar from '@/components/ui/ProgressBar.jsx'
import { dashboardHighlights, toolDefinitions } from '@/data/site.js'
import { useAuth } from '@/hooks/useAuth.js'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const DashboardPage = () => {
  const { user } = useAuth()
  const history = user?.toolHistory || []
  const usageCount = user?.dailyUsage?.count || 0
  const usageLimit = user?.plan === 'free' ? 10 : 100

  return (
    <PageShell>
      <SEO title="Dashboard" description="Monitor usage, revisit recent AI runs, and jump back into your most-used HeroicAI tools." path="/dashboard" />

      <div className="space-y-8">
        <GlassCard className="overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <Badge variant="cyan">{user?.plan || 'free'} plan</Badge>
              <div>
                <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                  {getGreeting()}, {user?.name || 'Piyush'}
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
                  Welcome back. Your workspace is ready for code reviews, docs, proposals, content planning, and idea validation.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <GlowButton to="/tools">Open Tools</GlowButton>
                <GlowButton to="/pricing" variant="secondary">
                  Compare Plans
                </GlowButton>
              </div>
            </div>

            <div className="space-y-5 rounded-[28px] border border-white/10 bg-background/35 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-muted">Usage</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">
                    {usageCount}/{usageLimit}
                  </p>
                </div>
                <Badge variant={user?.plan === 'free' ? 'cyan' : 'violet'}>{user?.plan || 'free'}</Badge>
              </div>
              <ProgressBar value={usageCount} max={usageLimit} label="Daily requests used" />
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {toolDefinitions.slice(0, 4).map((tool) => (
                <GlassCard key={tool.slug} className="space-y-4">
                  <div className="inline-flex rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
                    <tool.icon />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-foreground">{tool.name}</h2>
                    <p className="text-sm leading-7 text-muted">{tool.description}</p>
                  </div>
                  <Link to={`/tools/${tool.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Open Tool <FiArrowUpRight />
                  </Link>
                </GlassCard>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {dashboardHighlights.map((highlight) => (
                <GlassCard key={highlight.title} className="space-y-4">
                  <div className="inline-flex rounded-2xl border border-secondary/20 bg-secondary/10 p-3 text-secondary">
                    <highlight.icon />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{highlight.title}</h3>
                  <p className="text-sm leading-7 text-muted">{highlight.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <HistoryList history={history} />
            {user?.plan === 'free' ? (
              <GlassCard className="space-y-4">
                <Badge variant="violet">Upgrade</Badge>
                <h3 className="text-2xl font-semibold text-foreground">Unlock all eight tools and unlimited requests</h3>
                <p className="text-sm leading-7 text-muted">
                  Move to Pro for faster outputs, full history, and unlimited daily tool runs.
                </p>
                <GlowButton to="/pricing" fullWidth>
                  Upgrade Plan
                </GlowButton>
              </GlassCard>
            ) : null}
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export default DashboardPage
