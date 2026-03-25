import { AnimatePresence, motion } from 'framer-motion'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi'
import { modalMotion } from '@/animations/variants.js'
import { cn } from '@/utils/cn.js'

const iconMap = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  info: FiInfo,
}

const toneMap = {
  success: 'border-success/30 bg-success/10 text-success',
  error: 'border-danger/30 bg-danger/10 text-danger',
  info: 'border-primary/30 bg-primary/10 text-primary',
}
const MotionDiv = motion.div

const ToastViewport = ({ toasts, onDismiss }) => (
  <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex w-full max-w-sm flex-col gap-3 sm:bottom-6 sm:right-6">
    <AnimatePresence>
      {toasts.map((toast) => {
        const Icon = iconMap[toast.variant] || FiInfo

        return (
          <MotionDiv
            key={toast.id}
            variants={modalMotion}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pointer-events-auto"
          >
            <div className="rounded-3xl border border-white/10 bg-background/90 p-4 shadow-card backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <div className={cn('rounded-2xl border p-2', toneMap[toast.variant])}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-foreground">{toast.title}</p>
                  <p className="text-sm text-muted">{toast.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onDismiss(toast.id)}
                  className="rounded-full p-1 text-muted transition hover:bg-white/5 hover:text-foreground"
                  aria-label="Dismiss notification"
                >
                  <FiX />
                </button>
              </div>
            </div>
          </MotionDiv>
        )
      })}
    </AnimatePresence>
  </div>
)

export default ToastViewport
