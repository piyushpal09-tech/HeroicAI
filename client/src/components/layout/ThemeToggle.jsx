import { FiMoon, FiSun } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme.js'

const MotionButton = motion.button

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <MotionButton
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-surface/80 text-foreground transition hover:border-primary/40 hover:text-primary"
      aria-label="Toggle color theme"
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </MotionButton>
  )
}

export default ThemeToggle
