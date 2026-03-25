import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiLock, FiMail, FiUser } from 'react-icons/fi'
import SEO from '@/components/layout/SEO.jsx'
import GlassCard from '@/components/ui/GlassCard.jsx'
import GlowButton from '@/components/ui/GlowButton.jsx'
import Input from '@/components/ui/Input.jsx'
import Badge from '@/components/ui/Badge.jsx'
import { useAuth } from '@/hooks/useAuth.js'
import { useToast } from '@/hooks/useToast.js'

const SignupPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { signup } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (!formState.name.trim()) nextErrors.name = 'Name is required.'
    if (!formState.email.trim()) nextErrors.email = 'Email is required.'
    if (!formState.password.trim()) nextErrors.password = 'Password is required.'
    if (formState.password.length < 8) nextErrors.password = 'Use at least 8 characters.'
    if (formState.password !== formState.confirmPassword) nextErrors.confirmPassword = 'Passwords must match.'
    if (!formState.acceptedTerms) nextErrors.acceptedTerms = 'You need to accept the terms.'

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setSubmitting(true)

    try {
      await signup({
        name: formState.name,
        email: formState.email,
        password: formState.password,
      })
      showToast({
        title: 'Account created',
        description: 'Your HeroicAI workspace is ready.',
        variant: 'success',
      })
      navigate('/dashboard')
    } catch (error) {
      showToast({
        title: 'Sign up failed',
        description: error.response?.data?.message || error.message,
        variant: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEO title="Signup" description="Create your HeroicAI account and start using premium AI workflows." path="/signup" />
      <GlassCard className="w-full max-w-2xl p-8 sm:p-10">
        <div className="space-y-4">
          <Badge variant="violet">Launch Your Workspace</Badge>
          <div>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground">Create your HeroicAI account</h1>
            <p className="mt-3 text-base leading-7 text-muted">
              Build faster with AI tools for engineering, strategy, and delivery in one polished hub.
            </p>
          </div>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="signup-name"
              label="Name"
              value={formState.name}
              onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
              error={errors.name}
              placeholder="Piyush Pal"
              icon={FiUser}
            />
            <Input
              id="signup-email"
              type="email"
              label="Email"
              value={formState.email}
              onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
              error={errors.email}
              placeholder="you@company.com"
              icon={FiMail}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="signup-password"
              type="password"
              label="Password"
              value={formState.password}
              onChange={(event) => setFormState((current) => ({ ...current, password: event.target.value }))}
              error={errors.password}
              placeholder="Create a secure password"
              icon={FiLock}
            />
            <Input
              id="signup-confirm-password"
              type="password"
              label="Confirm password"
              value={formState.confirmPassword}
              onChange={(event) =>
                setFormState((current) => ({ ...current, confirmPassword: event.target.value }))
              }
              error={errors.confirmPassword}
              placeholder="Repeat password"
              icon={FiLock}
            />
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-background/30 px-4 py-4 text-sm text-muted">
            <input
              type="checkbox"
              checked={formState.acceptedTerms}
              onChange={(event) =>
                setFormState((current) => ({ ...current, acceptedTerms: event.target.checked }))
              }
              className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-primary focus:ring-primary/20"
            />
            <span>
              I agree to HeroicAI’s terms and understand this account unlocks AI-powered workflows and saved history.
            </span>
          </label>
          {errors.acceptedTerms ? <p className="text-sm text-danger">{errors.acceptedTerms}</p> : null}

          <GlowButton type="submit" fullWidth disabled={submitting}>
            {submitting ? 'Creating account...' : 'Create Account'}
          </GlowButton>

          <p className="text-center text-sm text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-primary transition hover:text-foreground">
              Login
            </Link>
          </p>
        </form>
      </GlassCard>
    </>
  )
}

export default SignupPage
