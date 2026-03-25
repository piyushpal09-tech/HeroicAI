import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const api = axios.create({
  baseURL,
  withCredentials: true,
})

// Token getter — set by AuthContext once Clerk is loaded
let _getToken = null

export const registerTokenGetter = (fn) => {
  _getToken = fn
}

api.interceptors.request.use(async (config) => {
  if (_getToken) {
    try {
      const token = await _getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch {
      // If Clerk isn't ready yet, proceed without token
    }
  }

  return config
})

// Legacy no-op exported for backward compatibility
export const setStoredToken = () => {}

export default api
