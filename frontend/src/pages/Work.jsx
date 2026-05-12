import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { projectsApi } from '@/services/projectsApi'

const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

const FALLBACK = [
  {
    id: 1, title: 'Hushpod', category: 'Audio Engineering',
    description: 'Zero-latency synchronized audio player engineered for distributed networks. Deep tech infrastructure meets immersive sonic experience.',
    tech_stack: ['Python', 'WebSockets', 'Audio API'],
    image_url: 'https://placehold.co/800x500/161B22/B87333?text=HUSHPOD',
    live_url: null, github_url: null, is_featured: true, display_order: 1,
  },
  {
    id: 2, title: 'Smart Campus', category: 'Enterprise Systems',
    description: 'High-throughput attendance and student management for 10,000+ concurrent users across multiple campuses in real time.',
    tech_stack: ['Java', 'Spring Boot', 'PostgreSQL'],
    image_url: 'https://placehold.co/800x500/161B22/4A6FA5?text=SMART+CAMPUS',
    live_url: null, github_url: null, is_featured: true, display_order: 2,
  },
  {
    id: 3, title: 'Genome Storage', category: 'Data Architecture',
    description: 'Algorithmic encoding for DNA data storage — translating digital binaries into biological sequences for ultra-dense archival.',
    tech_stack: ['Python', 'Bioinformatics', 'Algorithms'],
    image_url: 'https://placehold.co/800x500/161B22/F0EDE8?text=GENOME+STORAGE',
    live_url: null, github_url: null, is_featured: true, display_order: 3,
  },
]

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const accent = index % 2 === 0 ? '#B87333' : '#4A6FA5'

  return (
    <motion.article
      layout
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0D1117',
        border: `1px solid ${hovered ? accent + '55' : '#2A3446'}`,
        transition: 'border-color 0.4s, transform 0.4s, box-shadow 0.4s',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.5), 0 0 50px ${accent}12` : 'none',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9' }}>
        <img
          src={project.image_url}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'transform 0.7s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
          onError={e => {
            e.target.src = `https://placehold.co/800x500/161B22/B87333?text=${encodeURIComponent(project.title)}`
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(13,17,23,0.9))' }} />
        {project.is_featured && (
          <div style={{
            position: 'absolute', top: 14, left: 14,
            fontFamily: "'Fragment Mono',monospace", fontSize: 9,
            color: accent, border: `1px solid ${accent}55`,
            padding: '3px 10px', letterSpacing: '0.18em', textTransform: 'uppercase',
            background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(8px)',
          }}>Featured</div>
        )}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          fontFamily: "'Fragment Mono',monospace", fontSize: 9, color: '#8B9DB5',
          background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(8px)',
          padding: '3px 10px', letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>{project.category}</div>
      </div>

      {/* Content */}
      <div style={{ padding: '28px 28px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(28px,3.5vw,44px)',
          letterSpacing: '0.03em', color: '#F0EDE8',
          lineHeight: 1, marginBottom: 14,
        }}>{project.title}</h3>

        <p style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: 14, color: '#8B9DB5',
          lineHeight: 1.75, marginBottom: 20, flex: 1,
        }}>{project.description}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          {project.tech_stack.map(t => (
            <span key={t} style={{
              fontFamily: "'Fragment Mono',monospace",
              fontSize: 9, color: '#4A5568',
              border: '1px solid #2A3446', padding: '3px 10px', letterSpacing: '0.08em',
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {project.live_url ? (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
              textDecoration: 'none', color: accent,
              borderBottom: `1px solid ${accent}55`, paddingBottom: 2,
            }}>
              Live Site <ExternalLink size={11} />
            </a>
          ) : (
            <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: '#2A3446', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              In Progress
            </span>
          )}
          <div style={{
            marginLeft: 'auto', width: 36, height: 36,
            border: `1px solid ${hovered ? accent : '#2A3446'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: hovered ? accent : '#4A5568', transition: 'all 0.3s', flexShrink: 0,
          }}>
            <ArrowUpRight size={15} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Work() {
  const [filter, setFilter] = useState('All')

  const { data: apiProjects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsApi.getAll().then(r => r.data),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  })

  const allProjects = (!apiProjects || apiProjects.length === 0) ? FALLBACK : apiProjects
  const categories  = ['All', ...new Set(allProjects.map(p => p.category))]
  const filtered    = filter === 'All' ? allProjects : allProjects.filter(p => p.category === filter)

  return (
    <>
      <Helmet>
        <title>Work — Zentry Hub</title>
        <meta name="description" content="Portfolio of engineering projects by Zentry Hub — audio systems, enterprise software, AI research, and data architecture." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Fragment+Mono&display=swap');
        .fbtn { font-family:'Fragment Mono',monospace; font-size:10px; letter-spacing:0.15em; text-transform:uppercase; background:none; border:1px solid #2A3446; color:#4A5568; cursor:pointer; padding:9px 18px; transition:all 0.25s; white-space:nowrap; }
        .fbtn:hover { border-color:rgba(184,115,51,0.4); color:#B87333; }
        .fbtn.on { border-color:rgba(184,115,51,0.5); color:#B87333; background:rgba(184,115,51,0.07); }
        @keyframes spin { to { transform:rotate(360deg); } }
        @media(max-width:700px) { .wgrid { grid-template-columns:1fr !important; } }
      `}</style>

      {/* HERO */}
      <section style={{ minHeight:'58vh', background:'#0D1117', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'120px 2.5rem 80px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', bottom:-60, right:-40, fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(140px,28vw,380px)', color:'rgba(184,115,51,0.03)', lineHeight:1, userSelect:'none', pointerEvents:'none', letterSpacing:'-0.05em' }}>WORK</div>
        <div style={{ position:'absolute', top:'30%', left:'30%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(74,111,165,0.06) 0%,transparent 65%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:1280, margin:'0 auto', width:'100%' }}>
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
            style={{ fontFamily:"'Fragment Mono',monospace", fontSize:11, color:'#B87333', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:24 }}>
            Selected Projects
          </motion.p>
          <div style={{ overflow:'hidden' }}>
            <motion.h1 initial={{ y:'100%' }} animate={{ y:'0%' }} transition={{ duration:1, delay:0.1, ease:[0.16,1,0.3,1] }}
              style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(64px,13vw,180px)', letterSpacing:'-0.02em', lineHeight:0.9, color:'#F0EDE8', margin:0 }}>
              Proven
            </motion.h1>
          </div>
          <div style={{ overflow:'hidden' }}>
            <motion.h1 initial={{ y:'100%' }} animate={{ y:'0%' }} transition={{ duration:1, delay:0.18, ease:[0.16,1,0.3,1] }}
              style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(64px,13vw,180px)', letterSpacing:'-0.02em', lineHeight:0.9, color:'transparent', WebkitTextStroke:'2px rgba(184,115,51,0.6)', margin:0 }}>
              Capabilities.
            </motion.h1>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ background:'#0D1117', borderTop:'1px solid #2A3446', borderBottom:'1px solid #2A3446', position:'sticky', top:76, zIndex:40, backdropFilter:'blur(20px)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'16px 2.5rem', display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
          <span style={{ fontFamily:"'Fragment Mono',monospace", fontSize:9, color:'#4A5568', letterSpacing:'0.2em', textTransform:'uppercase', marginRight:8, flexShrink:0 }}>Filter:</span>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`fbtn${filter === cat ? ' on' : ''}`}>
              {cat}{cat !== 'All' && <span style={{ marginLeft:6, opacity:0.5 }}>({allProjects.filter(p => p.category === cat).length})</span>}
            </button>
          ))}
          <div style={{ marginLeft:'auto' }}>
            <span style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#4A5568', letterSpacing:'0.12em' }}>
              {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
            </span>
          </div>
        </div>
      </div>

      {/* GRID */}
      <section style={{ background:'#0D1117', padding:'64px 2.5rem 140px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          {isLoading ? (
            <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}>
              <div style={{ width:32, height:32, border:'2px solid #2A3446', borderTopColor:'#B87333', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={filter} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}
                className="wgrid"
                style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(360px,1fr))', gap:2, background:'#2A3446' }}>
                {filtered.length > 0 ? (
                  filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)
                ) : (
                  <div style={{ background:'#0D1117', gridColumn:'1/-1', padding:'80px 40px', textAlign:'center' }}>
                    <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:'#2A3446', letterSpacing:'0.04em', marginBottom:12 }}>No projects in this category</p>
                    <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, color:'#4A5568' }}>Check back soon.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </>
  )
}