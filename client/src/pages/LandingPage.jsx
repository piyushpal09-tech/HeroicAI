import { motion } from 'framer-motion'
import { FiArrowRight, FiCheck, FiChevronDown } from 'react-icons/fi'
import { fadeInUp, floatingCard, staggerContainer } from '@/animations/variants.js'
import PageShell from '@/components/layout/PageShell.jsx'
import SEO from '@/components/layout/SEO.jsx'
import ParticlesBackground from '@/components/layout/ParticlesBackground.jsx'
import AnimatedCounter from '@/components/layout/AnimatedCounter.jsx'
import Badge from '@/components/ui/Badge.jsx'
import GlowButton from '@/components/ui/GlowButton.jsx'
import GlassCard from '@/components/ui/GlassCard.jsx'
import { featureHighlights, floatingSnippets, pricingTiers, quickSteps, stats } from '@/data/site.js'

const MotionDiv = motion.div
const MotionAnchor = motion.a

const LandingPage = () => (
  <PageShell>
    <SEO
      title="AI Tools Platform"
      description="Premium AI SaaS for builders, agencies, and ambitious product teams."
    />

    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
      <ParticlesBackground dense />
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="section-container relative z-10 py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <MotionDiv variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
            <MotionDiv variants={fadeInUp} className="space-y-5">
              <Badge variant="cyan">Powered by Claude AI</Badge>
              <div className="space-y-6">
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl lg:text-[72px]">
                  Build Smarter with <span className="text-gradient">Agentic AI</span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted">
                  PiyushAI is your all-in-one platform for AI-powered development tools, resume strategy,
                  documentation generation, startup validation, and content planning.
                </p>
              </div>
            </MotionDiv>

            <MotionDiv variants={fadeInUp} className="flex flex-col gap-4 sm:flex-row">
              <GlowButton to="/signup">
                Get Started Free <FiArrowRight />
              </GlowButton>
              <GlowButton to="/tools" variant="secondary">
                Explore Tools
              </GlowButton>
            </MotionDiv>

            <MotionDiv variants={fadeInUp} className="grid gap-4 sm:grid-cols-3">
              {['Auth-protected platform', 'Streaming AI responses', 'Responsive premium UI'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-background/30 px-4 py-3 text-sm text-muted">
                  {item}
                </div>
              ))}
            </MotionDiv>
          </MotionDiv>

          <div className="relative hidden min-h-[520px] lg:block">
            {floatingSnippets.map((snippet, index) => (
              <MotionDiv
                key={snippet}
                custom={index}
                variants={floatingCard}
                initial="initial"
                animate="animate"
                className={`absolute rounded-[28px] border border-white/10 bg-surface/70 p-5 font-mono text-sm text-foreground/80 shadow-card backdrop-blur-xl ${
                  index % 2 === 0 ? 'left-0' : 'right-0'
                } ${index < 2 ? 'top-0' : 'bottom-0'} w-[min(100%,18rem)]`}
              >
                <p className="mb-3 text-xs uppercase tracking-[0.26em] text-primary/70">Live Snippet</p>
                <code className="block whitespace-pre-wrap leading-7">{snippet}</code>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>

      <MotionAnchor
        href="#features"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted"
      >
        Scroll
        <span className="rounded-full border border-white/10 p-3">
          <FiChevronDown className="animate-bounce" />
        </span>
      </MotionAnchor>
    </section>

    <section id="features" className="page-section">
      <div className="section-container">
        <MotionDiv variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-12">
          <MotionDiv variants={fadeInUp} className="max-w-3xl space-y-4">
            <p className="section-kicker">Feature Stack</p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
              Everything you need to build faster
            </h2>
            <p className="text-lg leading-8 text-muted">
              A focused suite of AI workflows for builders who want better engineering output and sharper delivery.
            </p>
          </MotionDiv>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featureHighlights.map((feature) => (
              <MotionDiv key={feature.title} variants={fadeInUp}>
                <GlassCard accent className="h-full space-y-5">
                  <div className="inline-flex rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm leading-7 text-muted">{feature.description}</p>
                  </div>
                </GlassCard>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>

    <section className="page-section">
      <div className="section-container">
        <MotionDiv variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-12">
          <MotionDiv variants={fadeInUp} className="max-w-3xl space-y-4">
            <p className="section-kicker">How It Works</p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
              Move from prompt to output in three steps
            </h2>
          </MotionDiv>

          <div className="grid gap-6 lg:grid-cols-3">
            {quickSteps.map((step, index) => (
              <MotionDiv key={step.title} variants={fadeInUp} className="relative">
                {index < quickSteps.length - 1 ? (
                  <div className="absolute right-[-12%] top-12 hidden h-px w-[24%] bg-gradient-to-r from-primary/40 to-transparent lg:block" />
                ) : null}
                <GlassCard className="h-full space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-lg font-semibold text-primary shadow-glow">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-7 text-muted">{step.description}</p>
                </GlassCard>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>

    <section className="page-section">
      <div className="section-container">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <GlassCard key={stat.label} className="space-y-3 text-center">
              <p className="text-4xl font-semibold text-foreground sm:text-5xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.label === 'Platform Uptime' ? 1 : 0}
                />
              </p>
              <p className="text-sm uppercase tracking-[0.24em] text-muted">{stat.label}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    <section id="pricing" className="page-section">
      <div className="section-container">
        <MotionDiv variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-12">
          <MotionDiv variants={fadeInUp} className="max-w-3xl space-y-4">
            <p className="section-kicker">Pricing</p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
              Pick a plan that matches your build velocity
            </h2>
          </MotionDiv>

          <div className="grid gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <MotionDiv key={tier.name} variants={fadeInUp}>
                <GlassCard className={`h-full space-y-6 ${tier.featured ? 'border-secondary/40 shadow-violet' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <Badge variant={tier.featured ? 'violet' : 'cyan'}>{tier.badge}</Badge>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">{tier.name}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted">{tier.description}</p>
                      </div>
                    </div>
                    <p className="text-3xl font-semibold text-foreground">${tier.monthly}/mo</p>
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
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>

    <section className="page-section pt-0">
      <div className="section-container">
        <GlassCard className="overflow-hidden px-6 py-12 sm:px-10">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="space-y-4">
              <p className="section-kicker">Ready When You Are</p>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                <span className="text-gradient">Ready to build with AI?</span>
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-muted">
                Launch with premium tooling, fast auth, and a polished workflow that feels ready for real customers.
              </p>
            </div>
            <GlowButton to="/signup">Get Started Free</GlowButton>
          </div>
        </GlassCard>
      </div>
    </section>
  </PageShell>
)

export default LandingPage
