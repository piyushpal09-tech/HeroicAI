import { Link } from 'react-router-dom'
import CursorLogo from '@/components/layout/CursorLogo.jsx'
import { marketingNav, siteConfig, socialLinks } from '@/data/site.js'

const Footer = () => (
  <footer className="border-t border-white/10 bg-black/30">
    <div className="section-container py-14">
      <div className="grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <CursorLogo />
          <p className="max-w-sm text-sm leading-7 text-muted">
            HeroicAI blends premium UI, AI productivity tools, and developer-first workflows into one polished platform.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground">Navigation</h3>
          <div className="flex flex-col gap-3 text-sm text-muted">
            {marketingNav.map((item) => (
              <Link key={item.label} to={item.to} className="transition hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground">Connect</h3>
          <div className="flex flex-col gap-3 text-sm text-muted">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a href={`mailto:${siteConfig.email}`} className="transition hover:text-foreground">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6 text-sm text-muted">
        © 2025 PiyushAI — Built by Piyush Pal with React & coffee.
      </div>
    </div>
  </footer>
)

export default Footer
