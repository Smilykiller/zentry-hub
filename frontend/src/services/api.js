import axios from 'axios'

// Central Axios instance — all API calls go through this
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,   // send httpOnly JWT cookie on every request
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor — handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Not logged in — redirect to admin login if on admin page
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
