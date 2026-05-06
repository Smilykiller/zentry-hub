import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '@/context/AuthContext'
import { loginSchema } from '@/utils/validators'
import { ArrowUpRight, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const [error, setError]   = useState('')
  const [showPw, setShowPw] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    try {
      setError('')
      await login(data.email, data.password)
      navigate('/admin')
    } catch {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <>
      <Helmet><title>Admin Login — Zentry Hub</title></Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Fragment+Mono&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes rotHex { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input:focus { border-color: rgba(184,115,51,0.7) !important; outline: none; }
        input::placeholder { color: #2A3446; }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#0D1117',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Left decorative panel */}
        <div style={{
          width: '45%', background: '#161B22',
          borderRight: '1px solid #2A3446',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          padding: '60px', position: 'relative', overflow: 'hidden',
        }} className="left-panel">

          {/* Rotating hex */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <svg width="500" height="500" viewBox="0 0 500 500" style={{ animation: 'rotHex 40s linear infinite', opacity: 0.06 }}>
              <polygon points="250,10 480,135 480,365 250,490 20,365 20,135" fill="none" stroke="#B87333" strokeWidth="1" />
            </svg>
            <svg width="360" height="360" viewBox="0 0 360 360" style={{ position: 'absolute', animation: 'rotHex 28s linear infinite reverse', opacity: 0.04 }}>
              <polygon points="180,8 346,98 346,262 180,352 14,262 14,98" fill="none" stroke="#D4956A" strokeWidth="1" />
            </svg>
          </div>

          {/* Z mark */}
          <div style={{ position: 'relative', marginBottom: 48 }}>
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <polygon points="50,4 96,28 96,72 50,96 4,72 4,28" fill="none" stroke="#B87333" strokeWidth="1.5" opacity="0.35" />
              <polygon points="22,20 78,20 78,32 38,68 78,68 78,80 22,80 22,68 62,32 22,32" fill="url(#lg1)" />
              <defs>
                <linearGradient id="lg1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B87333" /><stop offset="1" stopColor="#D4956A" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h1 style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 52, letterSpacing: '0.08em',
            color: '#F0EDE8', lineHeight: 1, textAlign: 'center', marginBottom: 16,
          }}>
            ZENTRY<span style={{ color: '#B87333' }}>HUB</span>
          </h1>
          <p style={{
            fontFamily: "'Fragment Mono',monospace",
            fontSize: 10, color: '#4A5568',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            textAlign: 'center', marginBottom: 48,
          }}>
            Control Panel
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 280 }}>
            {[
              'Manage portfolio projects',
              'Approve client testimonials',
              'View and respond to leads',
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 4, height: 4, background: '#B87333', flexShrink: 0 }} />
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, color: '#8B9DB5' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right login form */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '60px 40px',
        }}>
          <div style={{ width: '100%', maxWidth: 400 }}>

            <div style={{ marginBottom: 48 }}>
              <p style={{
                fontFamily: "'Fragment Mono',monospace",
                fontSize: 10, color: '#B87333',
                letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 12,
              }}>
                Restricted Access
              </p>
              <h2 style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 52, letterSpacing: '-0.01em',
                color: '#F0EDE8', lineHeight: 0.95,
              }}>
                System<br />Login.
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Email */}
              <div>
                <label style={{
                  fontFamily: "'Fragment Mono',monospace",
                  fontSize: 9, color: '#4A5568',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  display: 'block', marginBottom: 10,
                }}>
                  Email Address
                </label>
                <input {...register('email')} type="email" placeholder="admin@zentryhub.in"
                  style={{
                    width: '100%', background: '#161B22',
                    border: '1px solid #2A3446', color: '#F0EDE8',
                    padding: '14px 18px',
                    fontFamily: "'Space Grotesk',sans-serif", fontSize: 15,
                    outline: 'none', transition: 'border-color 0.2s', borderRadius: 0,
                  }}
                />
                {errors.email && (
                  <p style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: '#E07070', marginTop: 6 }}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label style={{
                  fontFamily: "'Fragment Mono',monospace",
                  fontSize: 9, color: '#4A5568',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  display: 'block', marginBottom: 10,
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input {...register('password')} type={showPw ? 'text' : 'password'} placeholder="••••••••"
                    style={{
                      width: '100%', background: '#161B22',
                      border: '1px solid #2A3446', color: '#F0EDE8',
                      padding: '14px 50px 14px 18px',
                      fontFamily: "'Space Grotesk',sans-serif", fontSize: 15,
                      outline: 'none', transition: 'border-color 0.2s', borderRadius: 0,
                    }}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: '#4A5568',
                      padding: 0, display: 'flex',
                    }}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: '#E07070', marginTop: 6 }}>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Error */}
              {error && (
                <div style={{
                  background: 'rgba(224,112,112,0.08)',
                  border: '1px solid rgba(224,112,112,0.25)',
                  padding: '14px 18px',
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 13, color: '#E07070',
                }}>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={isSubmitting}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: '#0D1117', border: 'none',
                  background: isSubmitting ? '#7A4D22' : 'linear-gradient(135deg,#B87333,#D4956A)',
                  padding: '18px', width: '100%',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 0 40px rgba(184,115,51,0.2)',
                  transition: 'all 0.3s',
                  marginTop: 8,
                }}
                onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.boxShadow = '0 0 60px rgba(184,115,51,0.45)' }}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(184,115,51,0.2)'}
              >
                {isSubmitting ? (
                  <div style={{ width: 16, height: 16, border: '2px solid rgba(13,17,23,0.3)', borderTopColor: '#0D1117', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                ) : (
                  <><ArrowUpRight size={15} /> Access Dashboard</>
                )}
              </button>
            </form>

            <p style={{
              fontFamily: "'Fragment Mono',monospace",
              fontSize: 10, color: '#2A3446',
              letterSpacing: '0.12em', textAlign: 'center', marginTop: 36,
            }}>
              Unauthorised access is monitored and logged.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .left-panel { display: none !important; } }
      `}</style>
    </>
  )
}