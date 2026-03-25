import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { buttonMotion } from '@/animations/variants.js'
import { cn } from '@/utils/cn.js'

const MotionButton = motion.button
const MotionLink = motion(Link)
const MotionAnchor = motion.a

const variantStyles = {
  primary: 'text-white',
  secondary: 'text-foreground',
  ghost: 'text-foreground',
}

const gradientStyles = {
  primary: 'from-primary via-cyan-300 to-secondary',
  secondary: 'from-secondary via-primary/80 to-primary',
  ghost: 'from-white/15 via-white/5 to-white/15',
}

const innerStyles = {
  primary: 'bg-background/95 group-hover:bg-panel/95',
  secondary: 'bg-panel/90 group-hover:bg-panel',
  ghost: 'bg-transparent group-hover:bg-surface/80',
}

const sharedClasses =
  'group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60'

const GlowButton = forwardRef(
  (
    {
      children,
      className,
      variant = 'primary',
      to,
      href,
      type = 'button',
      fullWidth = false,
      target,
      rel,
      ...props
    },
    ref,
  ) => {
    const content = (
      <>
        <span
          className={cn(
            'absolute inset-0 rounded-full bg-gradient-to-r opacity-90 transition-opacity duration-300 group-hover:opacity-100',
            gradientStyles[variant],
          )}
        />
        <span
          className={cn(
            'absolute inset-[1px] rounded-full transition-colors duration-300',
            innerStyles[variant],
          )}
        />
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-primary/20 to-secondary/0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </>
    )

    const classes = cn(
      sharedClasses,
      variantStyles[variant],
      fullWidth && 'w-full',
      className,
    )

    const motionProps = {
      ref,
      variants: buttonMotion,
      initial: 'rest',
      whileHover: 'hover',
      whileTap: 'tap',
      className: classes,
      ...props,
    }

    if (to) {
      return <MotionLink to={to} {...motionProps}>{content}</MotionLink>
    }

    if (href) {
      return (
        <MotionAnchor href={href} target={target} rel={rel} {...motionProps}>
          {content}
        </MotionAnchor>
      )
    }

    return (
      <MotionButton type={type} {...motionProps}>
        {content}
      </MotionButton>
    )
  },
)

GlowButton.displayName = 'GlowButton'

export default GlowButton
