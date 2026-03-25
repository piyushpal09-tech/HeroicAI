import { useRef } from 'react'
import { useInView } from 'framer-motion'

export const useScrollReveal = (amount = 0.18) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount })

  return {
    ref,
    inView,
    initial: 'hidden',
    animate: inView ? 'visible' : 'hidden',
  }
}

export default useScrollReveal
