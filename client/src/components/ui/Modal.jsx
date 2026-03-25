import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { fadeIn, modalMotion } from '@/animations/variants.js'

const MotionDiv = motion.div

const Modal = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open ? (
      <MotionDiv
        className="fixed inset-0 z-[80] flex items-center justify-center bg-background/75 px-4 backdrop-blur-md"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <MotionDiv
          variants={modalMotion}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-2xl rounded-[32px] border border-primary/20 bg-surface/95 p-6 shadow-card"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 p-2 text-muted transition hover:border-primary/40 hover:text-foreground"
              aria-label="Close modal"
            >
              <FiX />
            </button>
          </div>
          {children}
        </MotionDiv>
      </MotionDiv>
    ) : null}
  </AnimatePresence>
)

export default Modal
