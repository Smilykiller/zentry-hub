import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth()

  // Show nothing while checking auth — no redirect yet
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#08090B', gap: 16,
      }}>
        <div style={{
          width: 32, height: 32,
          border: '2px solid #1E2535',
          borderTopColor: '#C4843A',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <span style={{
          fontFamily: "'Fragment Mono', monospace",
          fontSize: 10, color: '#404B5C',
          letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>
          Verifying access...
        </span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  // Not logged in — redirect to login
  if (!admin) {
    return <Navigate to="/admin/login" replace />
  }

  // Logged in — show dashboard
  return children
}