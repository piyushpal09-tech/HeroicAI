import { SignUp } from '@clerk/react'
import SEO from '@/components/layout/SEO.jsx'

const SignupPage = () => {
  return (
    <>
      <SEO title="Sign Up" description="Create your HeroicAI account and start using premium AI workflows." path="/signup" />
      <div className="flex w-full justify-center">
        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/login"
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

export default SignupPage
