import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const AnimatedCounter = ({ value, suffix = '', decimals = 0 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!inView) {
      return undefined
    }

    const duration = 1000
    const start = performance.now()

    const frame = (time) => {
      const progress = Math.min((time - start) / duration, 1)
      const nextValue = value * progress
      setDisplayValue(nextValue)

      if (progress < 1) {
        window.requestAnimationFrame(frame)
      }
    }

    const raf = window.requestAnimationFrame(frame)
    return () => window.cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default AnimatedCounter
