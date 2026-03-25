import TextareaAutosize from 'react-textarea-autosize'
import { cn } from '@/utils/cn.js'

const Textarea = ({ label, error, helper, className, textareaClassName, id, ...props }) => (
  <label className={cn('block space-y-2', className)} htmlFor={id}>
    {label ? <span className="text-sm font-medium text-foreground">{label}</span> : null}
    <TextareaAutosize
      id={id}
      minRows={5}
      className={cn(
        'w-full rounded-2xl border border-white/10 bg-panel/80 px-4 py-3 text-sm text-foreground placeholder:text-muted/90 transition duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
        error && 'border-danger/60 focus:border-danger/60 focus:ring-danger/20',
        textareaClassName,
      )}
      {...props}
    />
    {error ? <span className="text-sm text-danger">{error}</span> : null}
    {!error && helper ? <span className="text-sm text-muted">{helper}</span> : null}
  </label>
)

export default Textarea
