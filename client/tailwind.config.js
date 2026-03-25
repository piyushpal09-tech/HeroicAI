/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fira Code"', 'monospace'],
        body: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        foreground: 'rgb(var(--color-text) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at top, rgba(0, 245, 255, 0.18), transparent 34%), radial-gradient(circle at 80% 18%, rgba(124, 58, 237, 0.2), transparent 24%), linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 48%)',
        'grid-fade':
          'linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
        'panel-glow':
          'linear-gradient(135deg, rgba(0, 245, 255, 0.16), rgba(124, 58, 237, 0.22))',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0, 245, 255, 0.16), 0 18px 48px rgba(0, 245, 255, 0.14)',
        violet: '0 0 0 1px rgba(124, 58, 237, 0.2), 0 18px 48px rgba(124, 58, 237, 0.18)',
        card: '0 24px 64px rgba(0, 0, 0, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        cursor: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 245, 255, 0.32)' },
          '100%': { boxShadow: '0 0 0 18px rgba(0, 245, 255, 0)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-2px)' },
          '40%': { transform: 'translateX(2px)' },
          '60%': { transform: 'translateX(-1px)' },
          '80%': { transform: 'translateX(1px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        cursor: 'cursor 1s step-end infinite',
        'pulse-ring': 'pulseRing 1.8s ease-out infinite',
        glitch: 'glitch 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
