import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'

import Navbar         from '@/components/layout/Navbar'
import Footer         from '@/components/layout/Footer'
import PageTransition from '@/components/layout/PageTransition'
import ScrollToTop    from '@/hooks/ScrollToTop'
import ProtectedRoute from '@/components/admin/ProtectedRoute'
import { AuthProvider } from '@/context/AuthContext'

// Lazy-loaded pages
const Home         = lazy(() => import('@/pages/Home'))
const Services     = lazy(() => import('@/pages/Services'))
const Work         = lazy(() => import('@/pages/Work'))
const About        = lazy(() => import('@/pages/About'))
const Testimonials = lazy(() => import('@/pages/Testimonials'))
const Contact      = lazy(() => import('@/pages/Contact'))
const NotFound     = lazy(() => import('@/pages/NotFound'))
const AdminLogin   = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 2 } },
})

// Loading fallback
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0D1117',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 20,
    }}>
      <div style={{
        width: 32, height: 32,
        border: '2px solid #2A3446',
        borderTopColor: '#B87333',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span style={{
        fontFamily: "'Fragment Mono', monospace",
        fontSize: 10, letterSpacing: '0.25em',
        color: '#2A3446', textTransform: 'uppercase',
      }}>
        Loading
      </span>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

// Inner app — needs to be inside Router to use useLocation
function AppInner() {
  const location = useLocation()
  const isAdmin  = location.pathname.startsWith('/admin')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0D1117' }}>
      <ScrollToTop />

      {/* Navbar — hidden on admin pages */}
      {!isAdmin && <Navbar />}

      <main style={{ flex: 1 }}>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public */}
              <Route path="/"             element={<PageTransition><Home /></PageTransition>} />
              <Route path="/services"     element={<PageTransition><Services /></PageTransition>} />
              <Route path="/work"         element={<PageTransition><Work /></PageTransition>} />
              <Route path="/about"        element={<PageTransition><About /></PageTransition>} />
              <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
              <Route path="/contact"      element={<PageTransition><Contact /></PageTransition>} />

              {/* Admin */}
              <Route path="/admin/login"  element={<AdminLogin />} />
              <Route path="/admin"        element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

              {/* 404 */}
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Footer — hidden on admin pages */}
      {!isAdmin && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <AppInner />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}