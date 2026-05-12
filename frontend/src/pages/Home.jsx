import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

/* ── theme ───────────────────────────────────────────────────── */
const T = {
  bg:      '#08090B',
  surface: '#0F1117',
  card:    '#141820',
  border:  '#1E2535',
  borderL: '#2A3446',
  copper:  '#C4843A',
  copperL: '#E09B52',
  copperD: '#8A5C28',
  slate:   '#4A6FA5',
  white:   '#F2EFE9',
  gray:    '#8A97AB',
  grayD:   '#404B5C',
}

/* ── smooth spring scroll progress ──────────────────────────── */
function useSmoothScroll(target, opts) {
  const { scrollYProgress } = useScroll({ target, ...opts })
  return useSpring(scrollYProgress, { stiffness: 80, damping: 25 })
}

/* ── animated Z canvas — single crisp hero element ──────────── */
function HeroZMark() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let t = 0

    const DPR = window.devicePixelRatio || 1
    const SIZE = Math.min(window.innerWidth * 0.42, 520)
    canvas.width  = SIZE * DPR
    canvas.height = SIZE * DPR
    canvas.style.width  = SIZE + 'px'
    canvas.style.height = SIZE + 'px'
    ctx.scale(DPR, DPR)

    const CX = SIZE / 2
    const CY = SIZE / 2
    const R  = SIZE * 0.38

    // Hex vertices
    const hex = (r, offset = 0) =>
      Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 + offset
        return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r }
      })

    // Draw Z path
    const drawZ = (scale, alpha) => {
      const s = SIZE * scale
      const ox = CX - s * 0.32
      const oy = CY - s * 0.32
      const w  = s * 0.64
      const h  = s * 0.64
      const sw = h * 0.18 // stroke weight

      ctx.save()
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.moveTo(ox,          oy)
      ctx.lineTo(ox + w,      oy)
      ctx.lineTo(ox + w,      oy + sw)
      ctx.lineTo(ox + sw * 0.6, oy + h - sw)
      ctx.lineTo(ox + w,      oy + h - sw)
      ctx.lineTo(ox + w,      oy + h)
      ctx.lineTo(ox,          oy + h)
      ctx.lineTo(ox,          oy + h - sw)
      ctx.lineTo(ox + w - sw * 0.6, oy + sw)
      ctx.lineTo(ox,          oy + sw)
      ctx.closePath()

      const grd = ctx.createLinearGradient(ox, oy, ox + w, oy + h)
      grd.addColorStop(0,   '#E8A855')
      grd.addColorStop(0.4, T.copper)
      grd.addColorStop(1,   T.copperD)
      ctx.fillStyle = grd
      ctx.fill()
      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE)
      t += 0.008

      // Outer ring — slow rotation
      ctx.save()
      ctx.translate(CX, CY)
      ctx.rotate(t * 0.3)
      ctx.translate(-CX, -CY)

      // Hex ring 1
      const h1 = hex(R * 1.0, 0)
      ctx.beginPath()
      h1.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
      ctx.closePath()
      ctx.strokeStyle = `rgba(196,132,58,0.2)`
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()

      // Middle ring — counter rotation
      ctx.save()
      ctx.translate(CX, CY)
      ctx.rotate(-t * 0.18)
      ctx.translate(-CX, -CY)

      const h2 = hex(R * 0.78, Math.PI / 6)
      ctx.beginPath()
      h2.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
      ctx.closePath()
      ctx.strokeStyle = `rgba(196,132,58,0.12)`
      ctx.lineWidth = 1
      ctx.stroke()

      // Dots at hex vertices
      h2.forEach((p, i) => {
        const pulse = 0.5 + Math.sin(t * 2 + i * 1.05) * 0.5
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(196,132,58,${0.3 + pulse * 0.5})`
        ctx.fill()
      })
      ctx.restore()

      // Inner ring — static
      const h3 = hex(R * 0.52, 0)
      ctx.beginPath()
      h3.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
      ctx.closePath()
      ctx.strokeStyle = `rgba(196,132,58,0.07)`
      ctx.lineWidth = 1
      ctx.stroke()

      // Radial lines from centre to outer hex
      h1.forEach((p, i) => {
        const a = Math.sin(t + i * 1.1) * 0.5 + 0.5
        ctx.beginPath()
        ctx.moveTo(CX, CY)
        ctx.lineTo(p.x, p.y)
        ctx.strokeStyle = `rgba(196,132,58,${0.04 + a * 0.06})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      })

      // Ambient glow
      const glow = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 0.7)
      glow.addColorStop(0,   `rgba(196,132,58,0.07)`)
      glow.addColorStop(1,   `rgba(196,132,58,0)`)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(CX, CY, R * 0.7, 0, Math.PI * 2)
      ctx.fill()

      // Z mark — centred, slight float
      const floatY = Math.sin(t * 0.9) * 6
      ctx.save()
      ctx.translate(0, floatY)
      drawZ(0.38, 1)
      ctx.restore()

      // Orbiting dot
      const orbitX = CX + Math.cos(t * 0.7) * R * 0.88
      const orbitY = CY + Math.sin(t * 0.7) * R * 0.88
      ctx.beginPath()
      ctx.arc(orbitX, orbitY, 3.5, 0, Math.PI * 2)
      ctx.fillStyle = T.copperL
      ctx.fill()
      ctx.beginPath()
      ctx.arc(orbitX, orbitY, 10, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(196,132,58,0.12)`
      ctx.fill()

      // Counter-orbit dot
      const cx2 = CX + Math.cos(-t * 0.5 + Math.PI) * R * 0.7
      const cy2 = CY + Math.sin(-t * 0.5 + Math.PI) * R * 0.7
      ctx.beginPath()
      ctx.arc(cx2, cy2, 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(74,111,165,0.7)`
      ctx.fill()

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', margin: '0 auto', opacity: 0.95 }}
    />
  )
}

/* ── scroll reveal ───────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 40, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ── counter ─────────────────────────────────────────────────── */
function Counter({ to, suffix = '' }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true) },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!on) return
    let t0 = null
    const run = ts => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / 1800, 1)
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * to))
      if (p < 1) requestAnimationFrame(run)
    }
    requestAnimationFrame(run)
  }, [on, to])
  return <span ref={ref}>{n}{suffix}</span>
}

/* ── marquee ─────────────────────────────────────────────────── */
function Marquee() {
  const items = [
    'React', 'Node.js', 'PostgreSQL', 'Python',
    'AI & ML', 'Audio DSP', 'Bioinformatics',
    'Docker', 'TypeScript', 'WebSockets',
  ]
  const double = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', padding: '20px 0' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 32, ease: 'linear' }}
        style={{ display: 'flex', width: 'max-content', alignItems: 'center', gap: 0 }}
      >
        {double.map((item, i) => (
          <React.Fragment key={i}>
            <span style={{
              fontFamily: "'Fragment Mono', monospace",
              fontSize: 11, letterSpacing: '0.18em',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
              color: i % 5 === 0 ? T.copper : T.grayD,
              padding: '0 32px',
            }}>
              {item}
            </span>
            <span style={{ color: T.border, fontSize: 14, flexShrink: 0 }}>✦</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

/* ── service card ────────────────────────────────────────────── */
function ServiceCard({ n, title, desc, accent, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <Reveal delay={delay}>
      <motion.div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        animate={{ y: hov ? -4 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          background: hov ? T.card : 'transparent',
          border: `1px solid ${hov ? T.borderL : T.border}`,
          padding: '36px 32px',
          cursor: 'default',
          transition: 'background 0.3s, border-color 0.3s',
          boxShadow: hov ? `0 20px 60px rgba(0,0,0,0.4)` : 'none',
          position: 'relative',
          height: '100%',
        }}
      >
        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          opacity: hov ? 1 : 0, transition: 'opacity 0.3s',
        }} />

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: 28,
        }}>
          <span style={{
            fontFamily: "'Fragment Mono', monospace",
            fontSize: 10, color: T.grayD,
            letterSpacing: '0.18em',
          }}>
            {n}
          </span>
          <motion.div animate={{ opacity: hov ? 1 : 0.3, x: hov ? 0 : -4 }} transition={{ duration: 0.25 }}>
            <ArrowUpRight size={15} color={accent} />
          </motion.div>
        </div>

        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(20px, 2.4vw, 28px)',
          letterSpacing: '0.06em', color: T.white,
          lineHeight: 1, marginBottom: 16,
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 14, color: T.gray,
          lineHeight: 1.75, fontWeight: 300,
        }}>
          {desc}
        </p>

        {/* Bottom corner gem */}
        <div style={{
          position: 'absolute', bottom: 28, right: 28,
          width: 5, height: 5, background: accent,
          transform: 'rotate(45deg)',
          opacity: hov ? 0.7 : 0.15,
          transition: 'opacity 0.3s',
        }} />
      </motion.div>
    </Reveal>
  )
}

/* ── project row ─────────────────────────────────────────────── */
function ProjectRow({ n, title, cat, desc, color, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <Reveal delay={delay}>
      <motion.div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: '48px 1fr auto',
          gap: 24, alignItems: 'center',
          padding: '32px 0',
          borderBottom: `1px solid ${T.border}`,
          cursor: 'default',
          paddingLeft: hov ? 12 : 0,
          transition: 'padding-left 0.4s ease',
        }}
      >
        <span style={{
          fontFamily: "'Fragment Mono', monospace",
          fontSize: 10, letterSpacing: '0.12em',
          color: hov ? T.copper : T.grayD,
          transition: 'color 0.3s',
        }}>
          {n}
        </span>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(22px, 3.5vw, 44px)',
              letterSpacing: '0.04em', color: T.white, lineHeight: 1,
            }}>
              {title}
            </h3>
            <span style={{
              fontFamily: "'Fragment Mono', monospace",
              fontSize: 9, color,
              border: `1px solid ${color}35`,
              padding: '3px 10px',
              letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              {cat}
            </span>
          </div>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14, color: hov ? T.gray : T.grayD,
            lineHeight: 1.65, transition: 'color 0.3s',
            maxWidth: 500,
          }}>
            {desc}
          </p>
        </div>

        <div style={{
          width: 40, height: 40,
          border: `1px solid ${hov ? T.copper : T.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: hov ? T.copper : T.grayD,
          transition: 'all 0.3s', flexShrink: 0,
        }}>
          <ArrowUpRight size={15} />
        </div>
      </motion.div>
    </Reveal>
  )
}

/* ═══════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef(null)
  const sp = useSmoothScroll(heroRef, { offset: ['start start', 'end start'] })
  const heroY   = useTransform(sp, [0, 1], ['0%', '18%'])
  const heroOp  = useTransform(sp, [0, 0.7], [1, 0])
  const canvasY = useTransform(sp, [0, 1], ['0%', '30%'])

  const SERVICES = [
    { n:'01', title:'Web Engineering',       accent:T.copper, desc:'Full-stack systems from React to PostgreSQL — production-grade from day one, built to scale.' },
    { n:'02', title:'AI & Machine Learning', accent:T.slate,  desc:'Custom models and pipelines built from scratch — real training, real results, not wrappers.' },
    { n:'03', title:'Niche Domain Systems',  accent:T.copper, desc:'Audio DSP, bioinformatics, campus management — depth where others stay shallow.' },
    { n:'04', title:'Technical Consulting',  accent:T.slate,  desc:'Architecture and strategy before a single line — the right path, mapped early.' },
  ]

  const PROJECTS = [
    { n:'01', title:'Hushpod',       cat:'Audio Engineering',  color:T.copper, desc:'Zero-latency synchronized audio player engineered for distributed networks.' },
    { n:'02', title:'Smart Campus',  cat:'Enterprise Systems', color:T.slate,  desc:'Real-time campus analytics platform for 10,000+ concurrent users.' },
    { n:'03', title:'Genome Storage',cat:'Data Architecture',  color:T.copper, desc:'Algorithmic DNA data encoding — translating digital binaries into biological sequences.' },
  ]

  return (
    <>
      <Helmet>
        <title>Zentry Hub — Architecting Digital Futures</title>
        <meta name="description" content="Software engineering studio from Coimbatore, India. React, Node.js, AI/ML and niche systems." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Fragment+Mono&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .section-pad { padding: 112px 48px; }
        .container   { max-width: 1200px; margin: 0 auto; width: 100%; }

        /* Grid helpers */
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4,1fr); }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }

        /* Mobile */
        @media (max-width: 768px) {
          .section-pad { padding: 72px 24px; }
          .grid-2  { grid-template-columns: 1fr; gap: 1px; }
          .grid-4  { grid-template-columns: 1fr 1fr; }
          .hero-grid { grid-template-columns: 1fr; }
          .hero-canvas { order: -1; }
          .hide-mobile { display: none; }
        }
        @media (max-width: 480px) {
          .section-pad { padding: 56px 20px; }
          .grid-4 { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* ─────────────────────────────────────────────
          HERO
      ───────────────────────────────────────────── */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        background: T.bg,
        display: 'flex', alignItems: 'center',
        padding: '100px 48px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle background glow */}
        <div style={{
          position: 'absolute', top: '20%', right: '15%',
          width: 600, height: 600, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(196,132,58,0.06) 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '10%',
          width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(74,111,165,0.05) 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        <motion.div
          className="container"
          style={{ y: heroY, opacity: heroOp }}
        >
          <div className="hero-grid">

            {/* LEFT — text */}
            <div>
              {/* Status */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                style={{ marginBottom: 40 }}
              >
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  border: `1px solid ${T.border}`,
                  padding: '8px 16px',
                  background: `rgba(15,17,23,0.8)`,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#52B788', flexShrink: 0, animation: 'blink 2s infinite' }} />
                  <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: T.gray, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                    Available for new projects
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <div style={{ marginBottom: 40 }}>
                {[
                  { text: 'Architecting', delay: 0.1, serif: false, shine: false },
                  { text: 'Digital',      delay: 0.2, serif: false, shine: true  },
                  { text: 'Futures.',     delay: 0.3, serif: true,  shine: false },
                ].map((line, i) => (
                  <div key={i} style={{ overflow: 'hidden' }}>
                    <motion.div
                      initial={{ y: '105%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1, delay: line.delay, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {line.shine ? (
                        <div style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 'clamp(52px, 8.5vw, 128px)',
                          letterSpacing: '-0.02em', lineHeight: 0.9,
                          backgroundImage: `linear-gradient(115deg, ${T.copper} 0%, ${T.copperL} 40%, #F0C070 60%, ${T.copper} 100%)`,
                          backgroundSize: '250% 100%',
                          WebkitBackgroundClip: 'text', backgroundClip: 'text',
                          color: 'transparent',
                          animation: 'shimmer 5s linear infinite',
                        }}>
                          {line.text}
                        </div>
                      ) : (
                        <div style={{
                          fontFamily: line.serif ? "'DM Serif Display',serif" : "'Bebas Neue',sans-serif",
                          fontStyle: line.serif ? 'italic' : 'normal',
                          fontSize: line.serif ? 'clamp(46px,7.5vw,112px)' : 'clamp(52px,8.5vw,128px)',
                          letterSpacing: '-0.02em', lineHeight: 0.9,
                          color: T.white,
                        }}>
                          {line.text}
                        </div>
                      )}
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(15px, 1.4vw, 17px)',
                  color: T.gray, fontWeight: 300, lineHeight: 1.8,
                  maxWidth: 400, marginBottom: 44,
                }}
              >
                Software engineering studio from Coimbatore.
                We build systems that don't just ship —{' '}
                <em style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', color: T.copperL }}>
                  they endure.
                </em>
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}
              >
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
                  textDecoration: 'none', color: T.bg,
                  background: `linear-gradient(135deg, ${T.copper}, ${T.copperL})`,
                  padding: '14px 32px',
                  transition: 'opacity 0.2s, transform 0.2s',
                  boxShadow: `0 0 40px rgba(196,132,58,0.3)`,
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  Start a Project <ArrowUpRight size={13} />
                </Link>

                <Link to="/work" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13, fontWeight: 500,
                  color: T.gray, textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = T.white}
                  onMouseLeave={e => e.currentTarget.style.color = T.gray}
                >
                  View Portfolio <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>

            {/* RIGHT — animated Z mark */}
            <motion.div
              className="hero-canvas"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: canvasY, display: 'flex', justifyContent: 'center' }}
            >
              <HeroZMark />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{
            position: 'absolute', bottom: 32, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}
        >
          <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 9, color: T.grayD, letterSpacing: '0.22em', textTransform: 'uppercase' }}>scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${T.copper}, transparent)` }}
          />
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────
          MARQUEE
      ───────────────────────────────────────────── */}
      <div style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <Marquee />
      </div>

      {/* ─────────────────────────────────────────────
          STATS
      ───────────────────────────────────────────── */}
      <section style={{ background: T.surface, borderBottom: `1px solid ${T.border}` }}>
        <div className="container" style={{ padding: '0 48px' }}>
          <div className="grid-4" style={{ borderLeft: `1px solid ${T.border}` }}>
            {[
              { val: 3,   sx: '+',  label: 'Projects Shipped' },
              { val: 100, sx: '%',  label: 'Client Satisfaction' },
              { val: 6,   sx: '+',  label: 'Tech Domains' },
              { val: 24,  sx: 'h',  label: 'Response Time' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{
                  padding: '52px 32px',
                  borderRight: `1px solid ${T.border}`,
                  borderBottom: 'none',
                  textAlign: 'left',
                }}>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(40px, 5vw, 64px)',
                    background: `linear-gradient(135deg, ${T.copper}, ${T.copperL})`,
                    WebkitBackgroundClip: 'text', backgroundClip: 'text',
                    color: 'transparent', lineHeight: 1, marginBottom: 8,
                  }}>
                    <Counter to={s.val} suffix={s.sx} />
                  </div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 13, color: T.grayD,
                    fontWeight: 400, letterSpacing: '0.04em',
                  }}>
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SERVICES
      ───────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: T.bg }}>
        <div className="container">

          {/* Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', marginBottom: 64,
            flexWrap: 'wrap', gap: 24,
          }}>
            <Reveal>
              <p style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: T.copper, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 16 }}>
                What we build
              </p>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(40px, 6vw, 80px)',
                letterSpacing: '-0.02em', lineHeight: 0.95, color: T.white,
              }}>
                Engineered<br />
                <span style={{ color: 'transparent', WebkitTextStroke: `1.5px rgba(196,132,58,0.5)` }}>
                  Capabilities.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/services" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: "'Fragment Mono',monospace", fontSize: 10,
                color: T.copper, textDecoration: 'none',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                borderBottom: `1px solid rgba(196,132,58,0.35)`, paddingBottom: 3,
              }}>
                All services <ArrowUpRight size={11} />
              </Link>
            </Reveal>
          </div>

          {/* Grid */}
          <div className="grid-2" style={{ background: T.border }}>
            {SERVICES.map((svc, i) => (
              <div key={i} style={{ background: T.bg }}>
                <ServiceCard {...svc} delay={i * 0.07} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          PROJECTS
      ───────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: T.surface, borderTop: `1px solid ${T.border}` }}>
        <div className="container">

          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', marginBottom: 56,
            flexWrap: 'wrap', gap: 24,
          }}>
            <Reveal>
              <p style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: T.copper, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 16 }}>
                Selected Work
              </p>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(40px, 6vw, 80px)',
                letterSpacing: '-0.02em', lineHeight: 0.95, color: T.white,
              }}>
                Proven Capabilities.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/work" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: "'Fragment Mono',monospace", fontSize: 10,
                color: T.copper, textDecoration: 'none',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                borderBottom: `1px solid rgba(196,132,58,0.35)`, paddingBottom: 3,
              }}>
                View all <ArrowUpRight size={11} />
              </Link>
            </Reveal>
          </div>

          <div style={{ borderTop: `1px solid ${T.border}` }}>
            {PROJECTS.map((p, i) => (
              <ProjectRow key={p.n} {...p} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          PROCESS
      ───────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: T.bg, borderTop: `1px solid ${T.border}` }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(240px,35%,380px) 1fr',
            gap: 80,
            alignItems: 'start',
          }}
            className="method-layout"
          >
            <Reveal>
              <p style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: T.copper, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 20 }}>
                How we work
              </p>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(36px, 5vw, 68px)',
                letterSpacing: '-0.02em', lineHeight: 0.95, color: T.white, marginBottom: 24,
              }}>
                Logic before<br />
                <span style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', color: T.copper, fontSize: '0.9em' }}>
                  a single line.
                </span>
              </h2>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, color: T.gray, lineHeight: 1.8, fontWeight: 300, marginBottom: 36 }}>
                More whiteboard than keyboard. The architecture decisions made on day one determine the outcomes on day one hundred.
              </p>
              <Link to="/about" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 500,
                color: T.gray, textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = T.white}
                onMouseLeave={e => e.currentTarget.style.color = T.gray}
              >
                About the Studio <ArrowRight size={13} />
              </Link>
            </Reveal>

            <div style={{ borderTop: `1px solid ${T.border}` }}>
              {[
                { n: '01', t: 'Understand', d: 'Deep discovery — your domain, users, constraints, and definition of success.' },
                { n: '02', t: 'Architect',  d: 'System design before code. Data models, API contracts, infrastructure.' },
                { n: '03', t: 'Engineer',   d: 'Iterative builds with continuous client visibility — no black boxes.' },
                { n: '04', t: 'Deploy',     d: 'Production launch with monitoring, documentation, and knowledge transfer.' },
              ].map((step, i) => (
                <Reveal key={step.n} delay={i * 0.1}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '44px 1fr',
                    gap: 20, padding: '28px 0',
                    borderBottom: `1px solid ${T.border}`,
                  }}>
                    <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: T.copper, letterSpacing: '0.1em', paddingTop: 3 }}>
                      {step.n}
                    </span>
                    <div>
                      <h4 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: '0.06em', color: T.white, marginBottom: 8, lineHeight: 1 }}>
                        {step.t}
                      </h4>
                      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, color: T.gray, lineHeight: 1.7 }}>
                        {step.d}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .method-layout { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
        `}</style>
      </section>

      {/* ─────────────────────────────────────────────
          CTA
      ───────────────────────────────────────────── */}
      <section style={{
        background: T.surface,
        borderTop: `1px solid ${T.border}`,
        padding: '120px 48px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Ghost word */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', userSelect: 'none',
        }}>
          <span style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(80px, 22vw, 320px)',
            color: 'rgba(196,132,58,0.03)',
            letterSpacing: '-0.05em', lineHeight: 1,
          }}>
            BUILD
          </span>
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <Reveal>
            <p style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: T.copper, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
              Ready?
            </p>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(44px, 8vw, 112px)',
              letterSpacing: '-0.025em', lineHeight: 0.92,
              color: T.white, marginBottom: 24,
            }}>
              Your idea.<br />
              <span style={{
                fontFamily: "'DM Serif Display',serif", fontStyle: 'italic',
                background: `linear-gradient(135deg, ${T.copper}, ${T.copperL})`,
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                color: 'transparent', fontSize: '0.9em',
              }}>
                Our execution.
              </span>
            </h2>
            <p style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 16, color: T.gray, lineHeight: 1.75,
              marginBottom: 52, fontWeight: 300,
            }}>
              Tell us what you're building.<br />We'll tell you how to build it right.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
                textDecoration: 'none', color: T.bg,
                background: `linear-gradient(135deg, ${T.copper}, ${T.copperL})`,
                padding: '16px 40px',
                boxShadow: `0 0 48px rgba(196,132,58,0.28)`,
                transition: 'opacity 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Initiate Project <ArrowUpRight size={14} />
              </Link>
              <Link to="/services" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 500,
                color: T.gray, textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = T.white}
                onMouseLeave={e => e.currentTarget.style.color = T.gray}
              >
                Our Services <ArrowRight size={13} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}