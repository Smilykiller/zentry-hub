import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import logo from '@/assets/images/logo.png'

// ── Custom SVG social icons — no lucide dependency ────────────────
const IconGitHub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const IconTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// ── Copper Z mark built from SVG polygons ─────────────────────────
const ZMark = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="fzg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B87333" />
        <stop offset="0.5" stopColor="#D4956A" />
        <stop offset="1" stopColor="#B87333" />
      </linearGradient>
    </defs>
    {/* Outer hex frame */}
    <polygon points="50,4 96,28 96,72 50,96 4,72 4,28"
      fill="none" stroke="url(#fzg)" strokeWidth="1.5" opacity="0.4" />
    {/* Z shape inside */}
    <polygon points="22,20 78,20 78,32 38,68 78,68 78,80 22,80 22,68 62,32 22,32"
      fill="url(#fzg)" />
  </svg>
)

export default function Footer() {
  return (
    <footer style={{ background: '#0D1117', borderTop: '1px solid #2A3446' }}>

      {/* Top copper gradient rule */}
      <div style={{
        height: 2,
        background: 'linear-gradient(90deg, transparent, #B87333 25%, #D4956A 50%, #B87333 75%, transparent)',
        opacity: 0.5,
      }} />

      {/* ── CTA STRIP ── */}
      <div style={{
        borderBottom: '1px solid #2A3446',
        padding: '96px 2.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Ghost word */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          paddingRight: '3%', pointerEvents: 'none', userSelect: 'none',
        }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(100px, 22vw, 300px)',
            color: 'rgba(184,115,51,0.04)',
            letterSpacing: '-0.05em', lineHeight: 1,
          }}>BUILD</span>
        </div>

        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap',
          gap: 48, position: 'relative',
        }}>
          <div>
            <p style={{
              fontFamily: "'Fragment Mono', monospace",
              fontSize: 10, color: '#B87333',
              letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 20,
            }}>
              Ready when you are
            </p>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 7vw, 100px)',
              letterSpacing: '-0.02em', lineHeight: 0.92,
              color: '#F0EDE8',
            }}>
              Let's build something<br />
              <span style={{ color: '#B87333' }}>extraordinary.</span>
            </h2>
          </div>
          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11, fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            textDecoration: 'none', color: '#0D1117',
            background: 'linear-gradient(135deg, #B87333, #D4956A)',
            padding: '22px 48px', flexShrink: 0,
            boxShadow: '0 0 50px rgba(184,115,51,0.3)',
            transition: 'box-shadow 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 80px rgba(184,115,51,0.6)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 50px rgba(184,115,51,0.3)'}
          >
            Initiate Project <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 2.5rem 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2.2fr 1fr 1fr 1fr',
          gap: 64, marginBottom: 64,
        }}>

          {/* Brand — logo + Z mark combined */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              {/* Real logo image */}
              <div style={{
                width: 48, height: 48, flexShrink: 0,
                filter: 'drop-shadow(0 0 14px rgba(184,115,51,0.5))',
              }}>
                <img
                  src={logo}
                  alt="Zentry Hub"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </div>
              {/* Wordmark */}
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 22, letterSpacing: '0.14em', color: '#F0EDE8',
                }}>
                  ZENTRY<span style={{ color: '#B87333' }}>HUB</span>
                </span>
                <span style={{
                  fontFamily: "'Fragment Mono', monospace",
                  fontSize: 8, letterSpacing: '0.22em', color: '#4A5568',
                  textTransform: 'uppercase', marginTop: 3,
                }}>
                  Engineering Studio
                </span>
              </div>
            </div>

            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14, color: '#8B9DB5',
              lineHeight: 1.85, maxWidth: 280,
              marginBottom: 32, fontWeight: 300,
            }}>
              Software engineering studio from Coimbatore, India. We build systems that don't just ship — they last.
            </p>

            {/* Social icons — custom SVG, zero import risk */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: <IconGitHub />,   href: '#',                           label: 'GitHub' },
                { icon: <IconLinkedIn />, href: '#',                           label: 'LinkedIn' },
                { icon: <IconTwitter />,  href: '#',                           label: 'X / Twitter' },
                { icon: <Mail size={15}/>,href: 'mailto:hello@zentryhub.in',  label: 'Email' },
              ].map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  style={{
                    width: 38, height: 38,
                    border: '1px solid #2A3446',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#4A5568', textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#B87333'
                    e.currentTarget.style.color = '#B87333'
                    e.currentTarget.style.background = 'rgba(184,115,51,0.06)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#2A3446'
                    e.currentTarget.style.color = '#4A5568'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={{
              fontFamily: "'Fragment Mono', monospace",
              fontSize: 9, color: '#4A5568',
              letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 28,
            }}>
              Company
            </p>
            {[
              { to: '/about',        label: 'About' },
              { to: '/work',         label: 'Portfolio' },
              { to: '/services',     label: 'Services' },
              { to: '/testimonials', label: 'Clients' },
              { to: '/contact',      label: 'Contact' },
            ].map(x => (
              <div key={x.to} style={{ marginBottom: 14 }}>
                <Link to={x.to} style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14, color: '#8B9DB5',
                  textDecoration: 'none', transition: 'color 0.2s',
                  display: 'inline-flex', alignItems: 'center', gap: 0,
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#B87333'}
                  onMouseLeave={e => e.currentTarget.style.color = '#8B9DB5'}
                >
                  {x.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <p style={{
              fontFamily: "'Fragment Mono', monospace",
              fontSize: 9, color: '#4A5568',
              letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 28,
            }}>
              Services
            </p>
            {[
              'Web Engineering',
              'AI & Machine Learning',
              'Niche Systems',
              'Data Architecture',
              'Consulting',
            ].map(s => (
              <div key={s} style={{ marginBottom: 14 }}>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14, color: '#8B9DB5',
                }}>
                  {s}
                </span>
              </div>
            ))}
          </div>

          {/* Location + contact */}
          <div>
            <p style={{
              fontFamily: "'Fragment Mono', monospace",
              fontSize: 9, color: '#4A5568',
              letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 28,
            }}>
              Find us
            </p>

            {/* Location */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 20 }}>
              <MapPin size={13} color="#B87333" style={{ flexShrink: 0, marginTop: 3 }} />
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14, color: '#8B9DB5', lineHeight: 1.7,
              }}>
                Coimbatore,<br />Tamil Nadu, India
              </p>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 28 }}>
              <Mail size={13} color="#B87333" />
              <a href="mailto:hello@zentryhub.in" style={{
                fontFamily: "'Fragment Mono', monospace",
                fontSize: 12, color: '#8B9DB5', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#B87333'}
                onMouseLeave={e => e.currentTarget.style.color = '#8B9DB5'}
              >
                hello@zentryhub.in
              </a>
            </div>

            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: "'Fragment Mono', monospace",
              fontSize: 10, color: '#B87333', textDecoration: 'none',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              borderBottom: '1px solid rgba(184,115,51,0.35)', paddingBottom: 3,
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderBottomColor = 'rgba(184,115,51,0.8)'}
              onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(184,115,51,0.35)'}
            >
              Start a project <ArrowUpRight size={11} />
            </Link>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{
          borderTop: '1px solid #2A3446', paddingTop: 32,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <p style={{
            fontFamily: "'Fragment Mono', monospace",
            fontSize: 11, color: '#2A3446',
          }}>
            © {new Date().getFullYear()} Zentry Hub. All rights reserved.
          </p>

          {/* Z mark watermark */}
          <ZMark size={28} />

          <p style={{
            fontFamily: "'Fragment Mono', monospace",
            fontSize: 11, color: '#2A3446',
          }}>
            Engineered in Coimbatore, India.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          footer .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}