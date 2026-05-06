import React, { createContext, useContext, useState, useEffect } from 'react'
import { adminApi } from '@/services/adminApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin]       = useState(null)
  const [loading, setLoading]   = useState(true)

  // On mount — check if JWT cookie is still valid
  useEffect(() => {
    adminApi.me()
      .then(res => setAdmin(res.data))
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const res = await adminApi.login({ email, password })
    setAdmin(res.data)
    return res.data
  }

  const logout = async () => {
    await adminApi.logout()
    setAdmin(null)
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
