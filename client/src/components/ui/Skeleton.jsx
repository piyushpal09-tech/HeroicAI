import { cn } from '@/utils/cn.js'

const Skeleton = ({ className }) => (
  <div
    className={cn(
      'overflow-hidden rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] animate-shimmer',
      className,
    )}
  />
)

export default Skeleton
