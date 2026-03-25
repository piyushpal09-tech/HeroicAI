import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import MarketingLayout from '@/layouts/MarketingLayout.jsx'
import AuthLayout from '@/layouts/AuthLayout.jsx'
import AppLayout from '@/layouts/AppLayout.jsx'
import AuthGuard from '@/components/layout/AuthGuard.jsx'
import LandingPage from '@/pages/LandingPage.jsx'
import PricingPage from '@/pages/PricingPage.jsx'
import ContactPage from '@/pages/ContactPage.jsx'
import LoginPage from '@/pages/LoginPage.jsx'
import SignupPage from '@/pages/SignupPage.jsx'
import DashboardPage from '@/pages/DashboardPage.jsx'
import ToolsPage from '@/pages/ToolsPage.jsx'
import ToolDetailPage from '@/pages/ToolDetailPage.jsx'
import NotFoundPage from '@/pages/NotFoundPage.jsx'

const ScrollManager = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.hash, location.pathname])

  return null
}

const App = () => {
  const location = useLocation()

  return (
    <>
      <ScrollManager />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login/*" element={<LoginPage />} />
            <Route path="/signup/*" element={<SignupPage />} />
          </Route>

          <Route
            element={
              <AuthGuard>
                <AppLayout />
              </AuthGuard>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/:toolName" element={<ToolDetailPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
