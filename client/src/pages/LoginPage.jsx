import { SignIn } from '@clerk/react'
import SEO from '@/components/layout/SEO.jsx'

const LoginPage = () => {
  return (
    <>
      <SEO title="Login" description="Sign in to HeroicAI and continue your AI-powered workflow." path="/login" />
      <div className="flex w-full justify-center">
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/signup"
          fallbackRedirectUrl="/dashboard"
          appearance={{
            variables: {
              colorPrimary: '#7c3aed',
              colorBackground: '#0d0d0f',
              colorInputBackground: '#18181b',
              colorText: '#f4f4f5',
              colorTextSecondary: '#a1a1aa',
              colorInputText: '#f4f4f5',
              borderRadius: '16px',
              fontFamily: 'inherit',
            },
            elements: {
              card: 'shadow-none bg-transparent',
              rootBox: 'w-full',
            },
          }}
        />
      </div>
    </>
  )
}

export default LoginPage
