import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const api = axios.create({
  baseURL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('heroicai_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const setStoredToken = (token) => {
  if (token) {
    localStorage.setItem('heroicai_token', token)
    return
  }

  localStorage.removeItem('heroicai_token')
}

export default api
