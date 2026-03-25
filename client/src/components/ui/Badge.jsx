import { cn } from '@/utils/cn.js'

const variants = {
  cyan: 'border-primary/30 bg-primary/10 text-primary',
  violet: 'border-secondary/30 bg-secondary/10 text-secondary',
  green: 'border-success/30 bg-success/10 text-success',
  red: 'border-danger/30 bg-danger/10 text-danger',
  gray: 'border-white/10 bg-white/5 text-muted',
}

const Badge = ({ children, variant = 'gray', className }) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]',
      variants[variant],
      className,
    )}
  >
    {children}
  </span>
)

export default Badge
