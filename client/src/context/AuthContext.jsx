import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import api, { setStoredToken } from '@/utils/api.js'

const AuthContext = createContext(null)

const demoUser = {
  name: 'Piyush',
  email: 'Palp12633@gmail.com',
  plan: 'free',
  dailyUsage: { count: 0, resetAt: new Date().toISOString() },
  toolHistory: [],
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('heroicai_token'))
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(Boolean(token))
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(token))

  const persistAuth = useCallback((payload) => {
    if (payload?.token) {
      setStoredToken(payload.token)
      setToken(payload.token)
      setIsAuthenticated(true)
    }

    if (payload?.user) {
      setUser(payload.user)
    }
  }, [])

  const clearAuth = useCallback(() => {
    setStoredToken(null)
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const refreshUser = useCallback(async () => {
    if (!token) {
      clearAuth()
      setIsLoading(false)
      return null
    }

    try {
      const response = await api.get('/api/auth/me')
      setUser(response.data.user)
      setIsAuthenticated(true)
      return response.data.user
    } catch {
      clearAuth()
      return null
    } finally {
      setIsLoading(false)
    }
  }, [clearAuth, token])

  useEffect(() => {
    if (token) {
      refreshUser()
      return
    }

    setIsLoading(false)
  }, [refreshUser, token])

  const login = useCallback(async (payload) => {
    const response = await api.post('/api/auth/login', payload)
    persistAuth(response.data)
    return response.data.user
  }, [persistAuth])

  const signup = useCallback(async (payload) => {
    const response = await api.post('/api/auth/register', payload)
    persistAuth(response.data)
    return response.data.user
  }, [persistAuth])

  const logout = useCallback(async () => {
    try {
      await api.post('/api/auth/logout')
    } catch {
      return null
    } finally {
      clearAuth()
    }
  }, [clearAuth])

  const injectDemoUser = useCallback(() => {
    setUser(demoUser)
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated,
      login,
      signup,
      logout,
      refreshUser,
      setUser,
      injectDemoUser,
    }),
    [injectDemoUser, isAuthenticated, isLoading, login, logout, refreshUser, signup, token, user],
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
