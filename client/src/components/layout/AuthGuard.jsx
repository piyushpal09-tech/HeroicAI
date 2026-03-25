import { Navigate, useLocation } from 'react-router-dom'
import Skeleton from '@/components/ui/Skeleton.jsx'
import { useAuth } from '@/hooks/useAuth.js'

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-72 w-full" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default AuthGuard
