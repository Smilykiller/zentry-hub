import axios from 'axios'

// Get API URL from environment
// Local:      http://localhost:5000/api
// Production: https://zentry-hub-backend.vercel.app/api
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,   // send cookies with every request
  timeout: 15000,          // 15 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — log in dev
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      // Only redirect if we're on an admin page
      if (window.location.pathname.startsWith('/admin') &&
          window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }

    if (import.meta.env.DEV) {
      console.error(`[API Error] ${status}:`, error.response?.data || error.message)
    }

    return Promise.reject(error)
  }
)

export default api