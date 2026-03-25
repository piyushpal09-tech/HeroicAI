import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeIn } from '@/animations/variants.js'

const MotionSpan = motion.span

const Tooltip = ({ content, children }) => {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef(null)

  const openTooltip = () => {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setVisible(true), 200)
  }

  const closeTooltip = () => {
    window.clearTimeout(timeoutRef.current)
    setVisible(false)
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={openTooltip}
      onMouseLeave={closeTooltip}
      onFocus={openTooltip}
      onBlur={closeTooltip}
    >
      {children}
      <AnimatePresence>
        {visible ? (
          <MotionSpan
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-full left-1/2 z-30 mb-2 w-max -translate-x-1/2 rounded-xl border border-white/10 bg-panel px-3 py-2 text-xs text-foreground shadow-card"
          >
            {content}
          </MotionSpan>
        ) : null}
      </AnimatePresence>
    </span>
  )
}

export default Tooltip
