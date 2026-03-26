import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SEO from '@/components/layout/SEO.jsx'
import GlassCard from '@/components/ui/GlassCard.jsx'
import Badge from '@/components/ui/Badge.jsx'
import { useAuth } from '@/hooks/useAuth.js'
import { useToast } from '@/hooks/useToast.js'

const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { completeOAuth } = useAuth()
  const { showToast } = useToast()

  useEffect(() => {
    let cancelled = false

    const finishAuth = async () => {
      const error = searchParams.get('error')
      const token = searchParams.get('token')
      const returnTo = searchParams.get('returnTo') || '/dashboard'

      if (error) {
        showToast({
          title: 'Google sign-in unavailable',
          description: error,
          variant: 'error',
        })

        navigate('/login', { replace: true })
        return
      }

      if (!token) {
        showToast({
          title: 'Google sign-in failed',
          description: 'No sign-in token was returned from the server.',
          variant: 'error',
        })

        navigate('/login', { replace: true })
        return
      }

      try {
        await completeOAuth(token)

        if (!cancelled) {
          showToast({
            title: 'Google sign-in complete',
            description: 'Your HeroicAI account is ready.',
            variant: 'success',
          })
          navigate(returnTo, { replace: true })
        }
      } catch (oauthError) {
        if (!cancelled) {
          showToast({
            title: 'Google sign-in failed',
            description: oauthError.response?.data?.message || oauthError.message,
            variant: 'error',
          })
          navigate('/login', { replace: true })
        }
      }
    }

    finishAuth()

    return () => {
      cancelled = true
    }
  }, [completeOAuth, navigate, searchParams, showToast])

  return (
    <>
      <SEO title="Completing Sign-In" description="Finishing your Google sign-in and loading HeroicAI." path="/auth/callback" />
      <GlassCard className="w-full max-w-xl p-8 sm:p-10">
        <div className="space-y-4">
          <Badge variant="cyan">Google OAuth</Badge>
          <div>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground">Finishing your sign-in</h1>
            <p className="mt-3 text-base leading-7 text-muted">
              HeroicAI is verifying your Google account and preparing your workspace.
            </p>
          </div>
        </div>
      </GlassCard>
    </>
  )
}

export default AuthCallbackPage
