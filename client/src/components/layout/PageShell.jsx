import { motion } from 'framer-motion'
import { pageTransition } from '@/animations/variants.js'

const MotionMain = motion.main

const PageShell = ({ children, className = '' }) => (
  <MotionMain
    variants={pageTransition}
    initial="hidden"
    animate="visible"
    exit="exit"
    className={`page-shell ${className}`}
  >
    {children}
  </MotionMain>
)

export default PageShell
