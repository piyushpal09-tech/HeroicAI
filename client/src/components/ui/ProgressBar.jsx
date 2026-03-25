import { motion } from 'framer-motion'
import { cn } from '@/utils/cn.js'

const MotionDiv = motion.div

const getTone = (value, max) => {
  const percentage = max ? (value / max) * 100 : 0

  if (percentage < 60) return 'bg-success'
  if (percentage < 85) return 'bg-yellow-400'
  return 'bg-danger'
}

const ProgressBar = ({ value = 0, max = 100, label, className }) => {
  const percentage = max ? Math.min((value / max) * 100, 100) : 0

  return (
    <div className={cn('space-y-2', className)}>
      {label ? (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">{label}</span>
          <span className="font-medium text-foreground">{Math.round(percentage)}%</span>
        </div>
      ) : null}
      <div className="h-3 overflow-hidden rounded-full bg-white/6">
        <MotionDiv
          initial={{ scaleX: 0 }}
          animate={{ scaleX: percentage / 100 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className={cn('h-full origin-left rounded-full', getTone(value, max))}
        />
      </div>
    </div>
  )
}

export default ProgressBar
