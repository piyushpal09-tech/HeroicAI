import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { useAuth as useClerkAuth, useUser, useClerk } from '@clerk/react'
import { registerTokenGetter } from '@/utils/api.js'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const { isLoaded, isSignedIn, getToken } = useClerkAuth()
  const { user: clerkUser } = useUser()
  const { signOut } = useClerk()

  // Register Clerk's getToken so axios always sends a fresh Bearer token
  useEffect(() => {
    registerTokenGetter(getToken)
  }, [getToken])

  // Map Clerk user shape to the shape the rest of the app expects
  const user = useMemo(() => {
    if (!clerkUser) return null
    return {
      _id: clerkUser.id,
      name: clerkUser.fullName || clerkUser.firstName || clerkUser.username || 'User',
      email: clerkUser.primaryEmailAddress?.emailAddress || '',
      imageUrl: clerkUser.imageUrl,
      plan: clerkUser.publicMetadata?.plan || 'free',
      dailyUsage: clerkUser.publicMetadata?.dailyUsage || { count: 0, resetAt: new Date().toISOString() },
      toolHistory: clerkUser.publicMetadata?.toolHistory || [],
    }
  }, [clerkUser])

  const logout = useCallback(async () => {
    await signOut()
  }, [signOut])

  const value = useMemo(
    () => ({
      user,
      isLoading: !isLoaded,
      isAuthenticated: Boolean(isSignedIn),
      logout,
      getToken,
      // Legacy stubs — kept so existing components don't break
      login: () => Promise.resolve(),
      signup: () => Promise.resolve(),
      refreshUser: () => Promise.resolve(user),
      setUser: () => {},
      injectDemoUser: () => {},
    }),
    [user, isLoaded, isSignedIn, logout, getToken],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }

  return context
}
