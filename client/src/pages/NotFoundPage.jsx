import { Link } from 'react-router-dom'
import PageShell from '@/components/layout/PageShell.jsx'
import SEO from '@/components/layout/SEO.jsx'
import GlowButton from '@/components/ui/GlowButton.jsx'

const NotFoundPage = () => (
  <PageShell className="flex items-center justify-center">
    <SEO title="404" description="The page you requested could not be found." path="/404" />
    <div className="text-center">
      <p className="animate-glitch text-sm uppercase tracking-[0.4em] text-danger">404</p>
      <h1 className="mt-6 text-6xl font-semibold tracking-[-0.05em] text-foreground sm:text-7xl">
        Signal Lost
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
        The route you were looking for is not available. Head back home and relaunch the workflow.
      </p>
      <div className="mt-10 flex justify-center">
        <GlowButton to="/">Back Home</GlowButton>
      </div>
      <Link to="/dashboard" className="mt-5 inline-flex text-sm text-primary transition hover:text-foreground">
        Go to dashboard instead
      </Link>
    </div>
  </PageShell>
)

export default NotFoundPage
