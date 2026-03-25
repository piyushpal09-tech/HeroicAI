import PageShell from '@/components/layout/PageShell.jsx'
import SEO from '@/components/layout/SEO.jsx'
import HistoryList from '@/components/layout/HistoryList.jsx'
import Badge from '@/components/ui/Badge.jsx'
import GlassCard from '@/components/ui/GlassCard.jsx'
import GlowButton from '@/components/ui/GlowButton.jsx'
import ProgressBar from '@/components/ui/ProgressBar.jsx'
import { toolDefinitions } from '@/data/site.js'
import { useAuth } from '@/hooks/useAuth.js'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const ToolsPage = () => {
  const { user } = useAuth()
  const usageCount = user?.dailyUsage?.count || 0
  const usageLimit = user?.plan === 'free' ? 10 : 100

  return (
    <PageShell>
      <SEO title="Tools Hub" description="Explore the HeroicAI tools hub and jump into your next AI workflow." path="/tools" />

      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <GlassCard className="space-y-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <Badge variant="cyan">{user?.plan || 'free'} plan</Badge>
                <div>
                  <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground">
                    {getGreeting()}, {user?.name || 'Piyush'}
                  </h1>
                  <p className="mt-3 text-lg leading-8 text-muted">
                    Choose the exact AI tool you need and stream polished output in real time.
                  </p>
                </div>
              </div>

              <div className="min-w-[240px] space-y-3 rounded-[24px] border border-white/10 bg-background/35 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted">Daily usage</span>
                  <span className="font-semibold text-foreground">
                    {usageCount}/{usageLimit}
                  </span>
                </div>
                <ProgressBar value={usageCount} max={usageLimit} />
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {toolDefinitions.map((tool) => (
              <GlassCard key={tool.slug} className="flex h-full flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
                    <tool.icon />
                  </div>
                  <Badge variant="gray">{tool.eyebrow}</Badge>
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">{tool.name}</h2>
                  <p className="text-sm leading-7 text-muted">{tool.description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 text-sm text-muted">
                  <span>{tool.usageCount.toLocaleString()} runs</span>
                  <GlowButton to={`/tools/${tool.slug}`} variant="secondary">
                    Open Tool
                  </GlowButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="hidden xl:block">
          <HistoryList history={user?.toolHistory || []} title="Recent Results" />
        </div>
      </div>
    </PageShell>
  )
}

export default ToolsPage
