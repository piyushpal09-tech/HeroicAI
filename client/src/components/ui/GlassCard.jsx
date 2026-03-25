import { motion } from 'framer-motion'
import { hoverLift } from '@/animations/variants.js'
import { cn } from '@/utils/cn.js'

const MotionDiv = motion.div

const GlassCard = ({ children, className, accent = false, ...props }) => (
  <MotionDiv
    variants={hoverLift}
    initial="rest"
    whileHover="hover"
    className={cn(
      'group relative overflow-hidden rounded-[28px] border border-primary/20 bg-surface/75 p-6 shadow-card backdrop-blur-xl transition-colors duration-300 hover:border-primary/60 hover:shadow-glow',
      accent && 'before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent',
      className,
    )}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-primary/[0.03] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="relative z-10">{children}</div>
  </MotionDiv>
)

export default GlassCard
