import {
  FiActivity,
  FiBriefcase,
  FiCalendar,
  FiCode,
  FiCpu,
  FiDatabase,
  FiFileText,
  FiGithub,
  FiGrid,
  FiLinkedin,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiShield,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi'

export const siteConfig = {
  brand: 'PiyushAI',
  author: 'Piyush Pal',
  email: 'Palp12633@gmail.com',
  phone: '+91 6291262514',
  description:
    'Premium AI SaaS platform for code review, resume optimization, content planning, proposal generation, and developer productivity workflows.',
  baseUrl: 'https://heroicai.vercel.app',
}

export const marketingNav = [
  { label: 'Features', to: { pathname: '/', hash: '#features' } },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Tools', to: '/tools' },
  { label: 'Contact', to: '/contact' },
]

export const featureHighlights = [
  {
    title: 'Code Reviewer',
    description: 'Surface bugs, security gaps, and performance wins before shipping.',
    icon: FiCode,
  },
  {
    title: 'Resume Optimizer',
    description: 'Match your resume to real job descriptions and lift ATS performance.',
    icon: FiFileText,
  },
  {
    title: 'API Docs Generator',
    description: 'Turn rough endpoint notes into polished developer documentation fast.',
    icon: FiCpu,
  },
  {
    title: 'DB Schema Designer',
    description: 'Map ideas into MongoDB and PostgreSQL schemas with production awareness.',
    icon: FiDatabase,
  },
  {
    title: 'Proposal Writer',
    description: 'Create confident client-ready proposals with scope, pricing, and delivery.',
    icon: FiBriefcase,
  },
  {
    title: 'Content Planner',
    description: 'Plan 30 days of strategic content across the platforms that matter most.',
    icon: FiCalendar,
  },
  {
    title: 'Support Bot Builder',
    description: 'Convert docs and FAQs into embed-ready support bot snippets in minutes.',
    icon: FiMessageSquare,
  },
  {
    title: 'Startup Validator',
    description: 'Stress-test ideas with risk analysis, market framing, and viability scoring.',
    icon: FiTrendingUp,
  },
]

export const toolDefinitions = [
  {
    slug: 'code-reviewer',
    name: 'Code Reviewer',
    description:
      'Audit source code for bugs, security issues, performance gaps, and maintainability risks.',
    icon: FiCode,
    usageCount: 2450,
    eyebrow: 'Engineering',
  },
  {
    slug: 'resume-optimizer',
    name: 'Resume Optimizer',
    description:
      'Refine resumes against a target job description and expose ATS alignment opportunities.',
    icon: FiFileText,
    usageCount: 1312,
    eyebrow: 'Career',
  },
  {
    slug: 'api-docs',
    name: 'API Docs Generator',
    description:
      'Produce clean Swagger-style documentation from route definitions or endpoint ideas.',
    icon: FiCpu,
    usageCount: 984,
    eyebrow: 'Backend',
  },
  {
    slug: 'db-schema',
    name: 'DB Schema Designer',
    description:
      'Translate product requirements into a clear schema strategy for MongoDB, PostgreSQL, or both.',
    icon: FiDatabase,
    usageCount: 875,
    eyebrow: 'Data',
  },
  {
    slug: 'proposal-writer',
    name: 'Proposal Writer',
    description:
      'Generate polished project proposals with positioning, scope, timeline, and budget framing.',
    icon: FiBriefcase,
    usageCount: 642,
    eyebrow: 'Agency',
  },
  {
    slug: 'content-planner',
    name: 'Content Planner',
    description:
      'Build channel-aware 30-day content calendars tailored to audience, niche, and format.',
    icon: FiCalendar,
    usageCount: 1120,
    eyebrow: 'Marketing',
  },
  {
    slug: 'support-bot',
    name: 'Support Bot Builder',
    description:
      'Turn product docs and FAQs into widget-ready chatbot code your team can ship quickly.',
    icon: FiMessageSquare,
    usageCount: 709,
    eyebrow: 'Support',
  },
  {
    slug: 'idea-validator',
    name: 'Startup Idea Validator',
    description:
      'Evaluate demand, competition, risks, and strategic upside before you commit to build.',
    icon: FiTrendingUp,
    usageCount: 1555,
    eyebrow: 'Strategy',
  },
]

export const stats = [
  { label: 'AI Tools', value: 8, suffix: '' },
  { label: 'Active Users', value: 100, suffix: '+' },
  { label: 'Requests Processed', value: 10, suffix: 'K+' },
  { label: 'Platform Uptime', value: 99.9, suffix: '%' },
]

export const pricingTiers = [
  {
    name: 'Free',
    monthly: 0,
    yearly: 0,
    description: 'For solo builders exploring the platform.',
    badge: 'Start here',
    features: ['10 requests/day', '3 tools included', 'EmailJS contact support', 'Community roadmap access'],
  },
  {
    name: 'Pro',
    monthly: 19,
    yearly: 15,
    description: 'For professionals shipping with AI every day.',
    badge: 'Most Popular',
    featured: true,
    features: ['Unlimited requests', 'All 8 tools unlocked', 'Priority response speed', 'Saved history and faster workflows'],
  },
  {
    name: 'Agency',
    monthly: 49,
    yearly: 39,
    description: 'For teams managing multiple brands or products.',
    badge: 'Scale teams',
    features: ['Everything in Pro', 'Team seats and access roles', 'API access and automations', 'Custom branding support'],
  },
]

export const comparisonRows = [
  ['Daily requests', '10/day', 'Unlimited', 'Unlimited'],
  ['Tools available', '3 core tools', 'All 8 tools', 'All 8 tools + API'],
  ['History retention', 'Basic', 'Extended', 'Extended + shared'],
  ['Team seats', '1', '1', 'Up to 10'],
  ['Branding options', 'No', 'No', 'Custom branded'],
  ['Priority support', 'EmailJS form', 'Priority queue', 'Priority queue + onboarding'],
]

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/piyushpal09-tech', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/piyush-pal-1a0734215/', icon: FiLinkedin },
  { label: 'Email', href: `mailto:${siteConfig.email}`, icon: FiMail },
]

export const contactCards = [
  { label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: FiMail },
  { label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone}`, icon: FiPhone },
  { label: 'GitHub', value: 'piyushpal09-tech', href: 'https://github.com/piyushpal09-tech', icon: FiGithub },
  {
    label: 'LinkedIn',
    value: 'Piyush Pal',
    href: 'https://www.linkedin.com/in/piyush-pal-1a0734215/',
    icon: FiLinkedin,
  },
]

export const dashboardHighlights = [
  {
    title: 'Operational Insight',
    description: 'Track your daily request budget and keep team velocity visible.',
    icon: FiActivity,
  },
  {
    title: 'Momentum Loops',
    description: 'Jump into your most-used tools without rebuilding context every time.',
    icon: FiZap,
  },
  {
    title: 'History You Can Reuse',
    description: 'Bring past outputs back into proposals, docs, and strategy workflows.',
    icon: FiGrid,
  },
  {
    title: 'Security Conscious',
    description: 'Auth-protected flows, session caching, and usage controls by plan.',
    icon: FiShield,
  },
]

export const quickSteps = [
  {
    step: '01',
    title: 'Sign Up',
    description: 'Create your account, choose your plan, and unlock your workspace.',
  },
  {
    step: '02',
    title: 'Choose a Tool',
    description: 'Pick the exact AI workflow you need across engineering, growth, or strategy.',
  },
  {
    step: '03',
    title: 'Get AI Results',
    description: 'Stream outputs live, save history, and turn insight into action faster.',
  },
]

export const floatingSnippets = [
  "const review = await heroicAI.run('code-reviewer')",
  'ATS_MATCH_SCORE: 91',
  'model: claude-sonnet-4-20250514',
  "schema.users.createIndex({ email: 1 }, { unique: true })",
]
