import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function Counter({ to, suffix = '' }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true) }, { threshold: 0.6 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!on) return
    let t0 = null
    const run = (ts) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / 2000, 1)
      setN(Math.floor((1 - Math.pow(1 - p, 4)) * to))
      if (p < 1) requestAnimationFrame(run)
    }
    requestAnimationFrame(run)
  }, [on, to])
  return <span ref={ref}>{n}{suffix}</span>
}

/* ─────────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────────── */
function MagneticBtn({ children, to, style }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      <Link to={to} style={style}>{children}</Link>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   MARQUEE STRIP
───────────────────────────────────────────── */
function Marquee() {
  const items = ['React', 'Node.js', 'PostgreSQL', 'AI & ML', 'Python', 'Audio DSP', 'Bioinformatics', 'WebSockets', 'Docker', 'TypeScript']
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid #2A3446', borderBottom: '1px solid #2A3446', background: '#0D1117', padding: '18px 0' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
        style={{ display: 'flex', gap: 0, width: 'max-content' }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, color: i % 4 === 0 ? '#B87333' : '#2A3446', letterSpacing: '0.2em', padding: '0 32px', whiteSpace: 'nowrap' }}>
              {item}
            </span>
            <span style={{ color: '#2A3446', fontSize: 10 }}>✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CURSOR FOLLOWER
───────────────────────────────────────────── */
function CursorGlow() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 80, damping: 20 })
  const sy = useSpring(y, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <motion.div style={{
      position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none',
      x: sx, y: sy,
      translateX: '-50%', translateY: '-50%',
      width: 400, height: 400, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(184,115,51,0.06) 0%, transparent 65%)',
    }} />
  )
}

/* ─────────────────────────────────────────────
   PROJECT ROW
───────────────────────────────────────────── */
const projects = [
  { num: '01', title: 'Hushpod',       cat: 'Audio Engineering',  year: '2024', desc: 'Zero-latency synchronized audio player for distributed networks.', tech: ['Python','WebSockets','Audio API'], color: '#B87333' },
  { num: '02', title: 'Smart Campus',  cat: 'Enterprise Systems', year: '2024', desc: '10,000+ concurrent users. Real-time campus analytics.', tech: ['Java','Spring Boot','PostgreSQL'], color: '#4A6FA5' },
  { num: '03', title: 'Genome Storage',cat: 'Data Architecture',  year: '2024', desc: 'DNA data encoding — translating binaries into biology.', tech: ['Python','Bioinformatics','Algorithms'], color: '#B87333' },
]

function ProjectRow({ p, i }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid', gridTemplateColumns: '56px 1fr 100px 48px',
        gap: 32, alignItems: 'center',
        padding: '40px 0', borderBottom: '1px solid #2A3446',
        cursor: 'pointer', transition: 'padding-left 0.4s ease',
        paddingLeft: hov ? 12 : 0,
      }}
    >
      <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: hov ? '#B87333' : '#2A3446', transition: 'color 0.3s', letterSpacing: '0.1em' }}>{p.num}</span>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
          <h3 style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(28px,5vw,64px)',
            letterSpacing: '0.02em', color: '#F0EDE8', lineHeight: 1,
            transition: 'color 0.3s',
            ...(hov && { color: '#F0EDE8' }),
          }}>{p.title}</h3>
          <span style={{
            fontFamily: "'Fragment Mono',monospace",
            fontSize: 9, color: p.color,
            border: `1px solid ${p.color}45`,
            padding: '3px 10px', letterSpacing: '0.15em', textTransform: 'uppercase',
            opacity: hov ? 1 : 0.7, transition: 'opacity 0.3s',
          }}>{p.cat}</span>
        </div>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, color: '#4A5568', lineHeight: 1.6, maxWidth: 480, transition: 'color 0.3s', ...(hov && { color: '#8B9DB5' }) }}>{p.desc}</p>
      </div>
      <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 11, color: '#2A3446', letterSpacing: '0.1em', textAlign: 'right' }}>{p.year}</span>
      <div style={{
        width: 44, height: 44, border: '1px solid #2A3446',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#4A5568', flexShrink: 0, transition: 'all 0.3s',
        ...(hov && { borderColor: '#B87333', color: '#B87333', background: 'rgba(184,115,51,0.06)' }),
      }}>
        <ArrowUpRight size={17} />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY  = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const heroOp = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <>
      <Helmet>
        <title>Zentry Hub — Architecting Digital Futures</title>
        <meta name="description" content="Software engineering studio from Coimbatore. React, Node.js, AI/ML, niche systems." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Fragment+Mono&family=DM+Serif+Display:ital@0;1&display=swap');
        @keyframes shimmer{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.25}}
        @keyframes rotateHex{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes rotateHexR{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @media(max-width:900px){.hero-h1{font-size:clamp(60px,16vw,120px)!important;}.stats-g{grid-template-columns:1fr 1fr!important;}.method-g{grid-template-columns:1fr!important;}}
        @media(max-width:600px){.proj-row{grid-template-columns:40px 1fr 40px!important;}.proj-year{display:none!important;}}
      `}</style>

      <CursorGlow />

      {/* ══════════════ HERO ══════════════ */}
      <section ref={heroRef} style={{
        minHeight: '100vh', background: '#0D1117',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '100px 2.5rem 80px',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Rotating hex rings */}
        <div style={{ position: 'absolute', top: '50%', right: '-8%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <svg width="600" height="600" viewBox="0 0 600 600" style={{ animation: 'rotateHex 60s linear infinite', opacity: 0.07 }}>
            <polygon points="300,20 560,160 560,440 300,580 40,440 40,160" fill="none" stroke="#B87333" strokeWidth="1" />
          </svg>
          <svg width="460" height="460" viewBox="0 0 460 460" style={{ position: 'absolute', top: 70, left: 70, animation: 'rotateHexR 40s linear infinite', opacity: 0.05 }}>
            <polygon points="230,15 430,125 430,335 230,445 30,335 30,125" fill="none" stroke="#D4956A" strokeWidth="1" />
          </svg>
          <svg width="300" height="300" viewBox="0 0 300 300" style={{ position: 'absolute', top: 150, left: 150, animation: 'rotateHex 25s linear infinite', opacity: 0.06 }}>
            <polygon points="150,10 280,80 280,220 150,290 20,220 20,80" fill="rgba(184,115,51,0.04)" stroke="#B87333" strokeWidth="1" />
          </svg>
        </div>

        {/* Dot grid */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.02, pointerEvents: 'none' }}>
          <defs><pattern id="dg" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#B87333" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#dg)" />
        </svg>

        {/* Ambient glows */}
        <div style={{ position: 'absolute', top: '20%', left: '20%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(74,111,165,0.05) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '30%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(184,115,51,0.07) 0%,transparent 65%)', pointerEvents: 'none' }} />

        <motion.div style={{ y: heroY, opacity: heroOp }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>

            {/* Status pill */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} style={{ marginBottom: 48 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(184,115,51,0.3)', padding: '8px 18px' }}>
                <div style={{ width: 6, height: 6, background: '#52B788', borderRadius: '50%', animation: 'blink 2s infinite' }} />
                <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: '#8B9DB5', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                  Available for new projects
                </span>
                <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: '#B87333', letterSpacing: '0.12em' }}>· Coimbatore, India</span>
              </div>
            </motion.div>

            {/* Giant headline — mixed font personality */}
            <div style={{ marginBottom: 52 }}>
              {/* Line 1 — Bebas, left */}
              <div style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '100%' }} animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="hero-h1" style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 'clamp(72px,13vw,190px)',
                    letterSpacing: '-0.025em', lineHeight: 0.87,
                    color: '#F0EDE8', margin: 0,
                  }}>Architecting</h1>
                </motion.div>
              </div>

              {/* Line 2 — shimmer copper */}
              <div style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '100%' }} animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="hero-h1" style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 'clamp(72px,13vw,190px)',
                    letterSpacing: '-0.025em', lineHeight: 0.87,
                    color: 'transparent',
                    backgroundImage: 'linear-gradient(135deg,#B87333 0%,#D4956A 40%,#F0C080 60%,#B87333 100%)',
                    backgroundSize: '300% 100%',
                    WebkitBackgroundClip: 'text', backgroundClip: 'text',
                    animation: 'shimmer 5s linear infinite',
                    margin: 0,
                  }}>Digital</h1>
                </motion.div>
              </div>

              {/* Line 3 — DM Serif italic, offset right */}
              <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'flex-end' }}>
                <motion.div
                  initial={{ y: '100%' }} animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="hero-h1" style={{
                    fontFamily: "'DM Serif Display',serif",
                    fontStyle: 'italic',
                    fontSize: 'clamp(60px,11vw,160px)',
                    letterSpacing: '-0.02em', lineHeight: 0.87,
                    color: '#F0EDE8', margin: 0,
                    opacity: 0.9,
                  }}>Futures.</h1>
                </motion.div>
              </div>
            </div>

            {/* Sub + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 40 }}
            >
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(15px,1.6vw,19px)', color: '#8B9DB5', fontWeight: 300, lineHeight: 1.8, maxWidth: 440 }}>
                From Coimbatore to the world — we engineer software that doesn't just work,{' '}
                <em style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', color: '#D4956A' }}>it endures</em>.
              </p>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <MagneticBtn to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
                  textDecoration: 'none', color: '#0D1117',
                  background: 'linear-gradient(135deg,#B87333,#D4956A)',
                  padding: '18px 40px',
                  boxShadow: '0 0 50px rgba(184,115,51,0.35)',
                }}>
                  Start a Project <ArrowUpRight size={14} />
                </MagneticBtn>
                <Link to="/work" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: "'Fragment Mono',monospace",
                  fontSize: 10, color: '#8B9DB5', textDecoration: 'none',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  borderBottom: '1px solid #2A3446', paddingBottom: 3, transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#B87333'; e.currentTarget.style.borderBottomColor = 'rgba(184,115,51,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#8B9DB5'; e.currentTarget.style.borderBottomColor = '#2A3446' }}
                >
                  View Work <ArrowUpRight size={12} />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
            <ChevronDown size={16} color="#2A3446" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════ MARQUEE ══════════════ */}
      <Marquee />

      {/* ══════════════ STATS ══════════════ */}
      <section style={{ background: '#161B22', borderBottom: '1px solid #2A3446' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="stats-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {[
              { val: 3,   sx: '+',  label: 'Projects Shipped',    sub: 'and counting' },
              { val: 100, sx: '%',  label: 'Client Satisfaction', sub: 'every engagement' },
              { val: 6,   sx: '+',  label: 'Tech Domains',        sub: 'deep expertise' },
              { val: 24,  sx: 'hr', label: 'Response Time',       sub: 'guaranteed' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '56px 32px', textAlign: 'center', borderRight: i < 3 ? '1px solid #2A3446' : 'none', position: 'relative', overflow: 'hidden' }}>
                {/* BG ghost number */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 120, color: 'rgba(184,115,51,0.04)', lineHeight: 1, userSelect: 'none' }}>
                    {s.val}
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 'clamp(44px,6vw,80px)',
                    background: 'linear-gradient(135deg,#B87333,#D4956A)',
                    WebkitBackgroundClip: 'text', backgroundClip: 'text',
                    color: 'transparent', lineHeight: 1, marginBottom: 8,
                  }}>
                    <Counter to={s.val} suffix={s.sx} />
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, color: '#F0EDE8', letterSpacing: '0.12em', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 9, color: '#4A5568', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section style={{ background: '#0D1117', padding: '120px 2.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, flexWrap: 'wrap', gap: 24 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <p style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: '#B87333', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 16 }}>What we build</p>
              <h2 style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 'clamp(48px,8vw,110px)',
                letterSpacing: '-0.02em', lineHeight: 0.92, color: '#F0EDE8',
              }}>
                Engineered<br />
                <span style={{ color: 'transparent', WebkitTextStroke: '2px rgba(184,115,51,0.55)' }}>Capabilities.</span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Link to="/services" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: '#B87333',
                textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase',
                borderBottom: '1px solid rgba(184,115,51,0.4)', paddingBottom: 3,
              }}>
                All services <ArrowUpRight size={12} />
              </Link>
            </motion.div>
          </div>

          {/* 2x2 grid with thick separator lines */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#2A3446' }}>
            {[
              { n:'01', t:'Web Engineering',       d:'Full-stack systems from React to PostgreSQL. Engineered for scale, not just MVP.', color:'#B87333' },
              { n:'02', t:'AI & Machine Learning', d:'Custom models and pipelines. Real training, real results — not wrapper products.', color:'#4A6FA5' },
              { n:'03', t:'Niche Domain Systems',  d:'Audio DSP, bioinformatics, campus management. Deep where others stay shallow.', color:'#B87333' },
              { n:'04', t:'Technical Consulting',  d:'Architecture and strategy before a single line. The right path, mapped early.', color:'#4A6FA5' },
            ].map((svc, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: '#0D1117', padding: '56px 48px', cursor: 'default', transition: 'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0C1016'}
                onMouseLeave={e => e.currentTarget.style.background = '#0D1117'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                  <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 11, color: svc.color, letterSpacing: '0.1em' }}>{svc.n}</span>
                  <ArrowUpRight size={16} color="#2A3446" />
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(24px,3vw,40px)', letterSpacing: '0.03em', color: '#F0EDE8', lineHeight: 1, marginBottom: 20 }}>
                  {svc.t}
                </h3>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, color: '#8B9DB5', lineHeight: 1.75, fontWeight: 300 }}>
                  {svc.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ WORK ══════════════ */}
      <section style={{ background: '#0D1117', padding: '0 2.5rem 120px', borderTop: '1px solid #2A3446' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '80px 0 48px', flexWrap: 'wrap', gap: 24 }}>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: '#B87333', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>Selected Work</p>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,7vw,96px)', letterSpacing: '-0.02em', color: '#F0EDE8', lineHeight: 1 }}>
                Proven Capabilities.
              </h2>
            </motion.div>
            <Link to="/work" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: '#B87333', textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase', borderBottom: '1px solid rgba(184,115,51,0.4)', paddingBottom: 3 }}>
              All work <ArrowUpRight size={12} />
            </Link>
          </div>

          <div style={{ borderTop: '1px solid #2A3446' }}>
            {projects.map((p, i) => <ProjectRow key={p.num} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ══════════════ PROCESS ══════════════ */}
      <section style={{ background: '#161B22', borderTop: '1px solid #2A3446', padding: '120px 2.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="method-g" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: '#B87333', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 20 }}>How we work</p>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,7vw,100px)', letterSpacing: '-0.02em', lineHeight: 0.92, color: '#F0EDE8', marginBottom: 32 }}>
                Logic before<br />
                <span style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', color: '#B87333', fontSize: '0.88em' }}>a single line.</span>
              </h2>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, color: '#8B9DB5', lineHeight: 1.8, marginBottom: 40, fontWeight: 300, maxWidth: 400 }}>
                We spend more time at the whiteboard than at the keyboard. Architecture decisions made early determine outcomes made late.
              </p>
              <Link to="/about" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
                textDecoration: 'none', color: '#F0EDE8',
                border: '1px solid rgba(240,237,232,0.15)', padding: '14px 28px', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(184,115,51,0.5)'; e.currentTarget.style.color = '#B87333' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(240,237,232,0.15)'; e.currentTarget.style.color = '#F0EDE8' }}
              >
                About the Studio <ArrowUpRight size={14} />
              </Link>
            </motion.div>

            <div>
              {[
                { n:'01', t:'Understand', d:'Deep discovery — your domain, users, constraints, and definition of success before anything else.' },
                { n:'02', t:'Architect',  d:'System design first. Data models, API contracts, and infrastructure — all decided before coding.' },
                { n:'03', t:'Engineer',   d:'Iterative builds with continuous client visibility. Progress is transparent, always.' },
                { n:'04', t:'Deploy',     d:'Production launch with monitoring, documentation, and full knowledge transfer.' },
              ].map((step, i) => (
                <motion.div key={step.n}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 24, padding: '32px 0', borderBottom: i < 3 ? '1px solid #2A3446' : 'none' }}
                >
                  <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: '#B87333', letterSpacing: '0.1em', paddingTop: 3 }}>{step.n}</span>
                  <div>
                    <h4 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: '0.04em', color: '#F0EDE8', marginBottom: 8, lineHeight: 1 }}>{step.t}</h4>
                    <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, color: '#8B9DB5', lineHeight: 1.75 }}>{step.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section style={{ background: '#0D1117', padding: '160px 2.5rem', position: 'relative', overflow: 'hidden', borderTop: '1px solid #2A3446' }}>
        {/* Giant ghost word */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(120px,30vw,440px)', color: 'rgba(184,115,51,0.03)', letterSpacing: '-0.06em', lineHeight: 1, userSelect: 'none' }}>START</span>
        </div>
        {/* Glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle,rgba(184,115,51,0.05) 0%,transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: '#B87333', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 32 }}>
            Ready to build?
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(52px,11vw,140px)', letterSpacing: '-0.03em', color: '#F0EDE8', lineHeight: 0.92, marginBottom: 32 }}>
            Your idea.<br />
            <span style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', background: 'linear-gradient(135deg,#B87333,#D4956A)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontSize: '0.9em' }}>
              Our execution.
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, color: '#8B9DB5', lineHeight: 1.75, marginBottom: 60, fontWeight: 300 }}>
            Tell us what you're building. We'll tell you how to build it right.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
            <MagneticBtn to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
              textDecoration: 'none', color: '#0D1117',
              background: 'linear-gradient(135deg,#B87333,#D4956A)',
              padding: '22px 60px',
              boxShadow: '0 0 70px rgba(184,115,51,0.35)',
            }}>
              Initiate Project <ArrowUpRight size={16} />
            </MagneticBtn>
          </motion.div>
        </div>
      </section>
    </>
  )
}