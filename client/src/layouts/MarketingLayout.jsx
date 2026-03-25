import { Outlet } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar.jsx'
import Footer from '@/components/layout/Footer.jsx'

const MarketingLayout = () => (
  <div className="page-shell">
    <div className="floating-orb left-[-8rem] top-24 h-72 w-72 bg-primary/10" />
    <div className="floating-orb right-[-8rem] top-56 h-80 w-80 bg-secondary/10" />
    <Navbar />
    <Outlet />
    <Footer />
  </div>
)

export default MarketingLayout
