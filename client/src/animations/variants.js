export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.35, ease: 'easeIn' },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

export const pageTransition = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.28, ease: 'easeInOut' },
  },
}

export const drawerMotion = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.24,
      ease: 'easeInOut',
    },
  },
}

export const modalMotion = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 22,
    },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
}

export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.22, ease: 'easeOut' },
  },
}

export const buttonMotion = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.12, ease: 'easeOut' },
  },
}

export const floatingCard = {
  initial: { opacity: 0, y: 18 },
  animate: (index = 0) => ({
    opacity: 1,
    y: [0, -10, 0],
    transition: {
      opacity: { duration: 0.5, delay: index * 0.1 },
      y: {
        duration: 5 + index,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.2,
      },
    },
  }),
}

export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}
