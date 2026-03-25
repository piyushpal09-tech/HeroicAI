import { useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import PageShell from '@/components/layout/PageShell.jsx'
import SEO from '@/components/layout/SEO.jsx'
import Badge from '@/components/ui/Badge.jsx'
import GlassCard from '@/components/ui/GlassCard.jsx'
import GlowButton from '@/components/ui/GlowButton.jsx'
import { comparisonRows, pricingTiers } from '@/data/site.js'

const PricingPage = () => {
  const [billing, setBilling] = useState('monthly')

  return (
    <PageShell>
      <SEO
        title="Pricing"
        description="Choose the HeroicAI plan that fits your usage, delivery speed, and team needs."
        path="/pricing"
      />

      <section className="page-section pt-16">
        <div className="section-container space-y-12">
          <div className="max-w-3xl space-y-4">
            <p className="section-kicker">Plans</p>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl">
              Transparent pricing for builders, pros, and agencies
            </h1>
            <p className="text-lg leading-8 text-muted">
              Keep the stack lean on Free, unlock full velocity on Pro, or scale collaborative client delivery on Agency.
            </p>
          </div>

          <div className="inline-flex rounded-full border border-white/10 bg-surface/70 p-1">
            {['monthly', 'yearly'].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setBilling(value)}
                className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                  billing === value ? 'bg-primary/15 text-primary' : 'text-muted'
                }`}
              >
                {value === 'monthly' ? 'Monthly' : 'Annual (20% off)'}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <GlassCard key={tier.name} className={`h-full space-y-6 ${tier.featured ? 'border-secondary/40 shadow-violet' : ''}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <Badge variant={tier.featured ? 'violet' : 'cyan'}>{tier.badge}</Badge>
                    <div>
                      <h2 className="text-3xl font-semibold text-foreground">{tier.name}</h2>
                      <p className="mt-3 text-sm leading-7 text-muted">{tier.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-semibold text-foreground">
                      ${billing === 'monthly' ? tier.monthly : tier.yearly}
                    </p>
                    <p className="text-sm text-muted">per month</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-1 rounded-full bg-success/10 p-1 text-success">
                        <FiCheck />
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <GlowButton to="/signup" variant={tier.featured ? 'primary' : 'secondary'} fullWidth>
                  Choose {tier.name}
                </GlowButton>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-white/5 text-foreground">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Feature</th>
                    <th className="px-6 py-4 font-semibold">Free</th>
                    <th className="px-6 py-4 font-semibold">Pro</th>
                    <th className="px-6 py-4 font-semibold">Agency</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row[0]} className="border-t border-white/8">
                      {row.map((cell) => (
                        <td key={cell} className="px-6 py-4 text-muted">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageShell>
  )
}

export default PricingPage
