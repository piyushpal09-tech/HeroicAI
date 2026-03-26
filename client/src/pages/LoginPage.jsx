import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiLock, FiMail } from 'react-icons/fi'
import SEO from '@/components/layout/SEO.jsx'
import GlassCard from '@/components/ui/GlassCard.jsx'
import GlowButton from '@/components/ui/GlowButton.jsx'
import Input from '@/components/ui/Input.jsx'
import Badge from '@/components/ui/Badge.jsx'
import { useAuth } from '@/hooks/useAuth.js'
import { useToast } from '@/hooks/useToast.js'

const LoginPage = () => {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const googleReturnTo = location.state?.from?.pathname || '/dashboard'
  const googleLoginUrl = new URL('/api/auth/google/start', import.meta.env.VITE_API_URL || window.location.origin)

  googleLoginUrl.searchParams.set('returnTo', googleReturnTo)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (!formState.email.trim()) nextErrors.email = 'Email is required.'
    if (!formState.password.trim()) nextErrors.password = 'Password is required.'

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setSubmitting(true)

    try {
      await login(formState)
      showToast({
        title: 'Welcome back',
        description: 'You are now signed in and ready to use HeroicAI.',
        variant: 'success',
      })
      navigate(location.state?.from?.pathname || '/dashboard')
    } catch (error) {
      showToast({
        title: 'Login failed',
        description: error.response?.data?.message || error.message,
        variant: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEO title="Login" description="Sign in to HeroicAI and continue your AI-powered workflow." path="/login" />
      <GlassCard className="w-full max-w-xl p-8 sm:p-10">
        <div className="space-y-4">
          <Badge variant="cyan">Secure Access</Badge>
          <div>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground">Welcome back</h1>
            <p className="mt-3 text-base leading-7 text-muted">
              Sign in to continue your AI workflows, saved history, and dashboard.
            </p>
          </div>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input
            id="login-email"
            type="email"
            label="Email"
            value={formState.email}
            onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
            error={errors.email}
            placeholder="you@company.com"
            icon={FiMail}
          />
          <Input
            id="login-password"
            type="password"
            label="Password"
            value={formState.password}
            onChange={(event) => setFormState((current) => ({ ...current, password: event.target.value }))}
            error={errors.password}
            placeholder="Enter your password"
            icon={FiLock}
          />

          <div className="flex items-center justify-between gap-3 text-sm">
            <button type="button" className="text-muted transition hover:text-foreground">
              Forgot password?
            </button>
            <Link to="/signup" className="text-primary transition hover:text-foreground">
              Need an account?
            </Link>
          </div>

          <GlowButton type="submit" fullWidth disabled={submitting}>
            {submitting ? 'Signing in...' : 'Login'}
          </GlowButton>

          <GlowButton
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => {
              window.location.href = googleLoginUrl.toString()
            }}
          >
            Continue with Google
          </GlowButton>
        </form>
      </GlassCard>
    </>
  )
}

export default LoginPage
