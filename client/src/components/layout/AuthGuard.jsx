import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@clerk/react'
import Skeleton from '@/components/ui/Skeleton.jsx'

const AuthGuard = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth()
  const location = useLocation()

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-72 w-full" />
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default AuthGuard
