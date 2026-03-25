import { cn } from '@/utils/cn.js'

const Input = ({
  label,
  error,
  helper,
  className,
  inputClassName,
  id,
  icon: Icon,
  ...props
}) => (
  <label className={cn('block space-y-2', className)} htmlFor={id}>
    {label ? <span className="text-sm font-medium text-foreground">{label}</span> : null}
    <div className="relative">
      {Icon ? (
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted">
          <Icon />
        </span>
      ) : null}
      <input
        id={id}
        className={cn(
          'min-h-11 w-full rounded-2xl border border-white/10 bg-panel/80 px-4 py-3 text-sm text-foreground placeholder:text-muted/90 transition duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
          Icon && 'pl-11',
          error && 'border-danger/60 focus:border-danger/60 focus:ring-danger/20',
          inputClassName,
        )}
        {...props}
      />
    </div>
    {error ? <span className="text-sm text-danger">{error}</span> : null}
    {!error && helper ? <span className="text-sm text-muted">{helper}</span> : null}
  </label>
)

export default Input
