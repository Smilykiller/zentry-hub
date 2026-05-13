import React, { createContext, useContext, useState, useEffect } from 'react'
import { adminApi } from '@/services/adminApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin]     = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount — check if JWT cookie is still valid
  // Timeout after 5 seconds so it never hangs
  useEffect(() => {
    let cancelled = false

    const timeout = setTimeout(() => {
      if (!cancelled) {
        setAdmin(null)
        setLoading(false)
      }
    }, 5000)

    adminApi.me()
      .then(res => {
        if (!cancelled) {
          setAdmin(res.data)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAdmin(null)
        }
      })
      .finally(() => {
        if (!cancelled) {
          clearTimeout(timeout)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [])

  const login = async (email, password) => {
    const res = await adminApi.login({ email, password })
    setAdmin(res.data)
    return res.data
  }

  const logout = async () => {
    try {
      await adminApi.logout()
    } catch {
      // ignore logout errors
    }
    setAdmin(null)
    // Clear any stale cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}