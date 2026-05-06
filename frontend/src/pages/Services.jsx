import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Plus, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden:  { opacity:0, y:40 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ duration:0.7, delay:i*0.1, ease:[0.16,1,0.3,1] } })
}

const services = [
  {
    num:'01', tag:'Core', color:'#B87333',
    title:'Full-Stack Web Engineering',
    short:'React to PostgreSQL. Systems built to last.',
    desc:'End-to-end web systems — React frontends that feel fast, Node.js backends that scale, PostgreSQL databases that stay reliable. We own the entire stack.',
    items:['Custom React Applications','REST & GraphQL APIs','PostgreSQL / MongoDB','Authentication & Security','Performance Optimisation','CI/CD & DevOps'],
  },
  {
    num:'02', tag:'Intelligence', color:'#4A6FA5',
    title:'AI & Machine Learning',
    short:'Models that think. Systems that act.',
    desc:'From data pipelines to deployed models. We build custom ML systems — not wrappers around GPT. Real algorithms, real training, real results.',
    items:['Custom ML Models','Data Pipeline Architecture','NLP & Computer Vision','Model Training & Evaluation','Python & TensorFlow','Research to Production'],
  },
  {
    num:'03', tag:'Niche', color:'#B87333',
    title:'Specialised Domain Systems',
    short:'Where generic software fails, we begin.',
    desc:'Audio engineering platforms, bioinformatics tools, institutional management systems. We go deep where most agencies stay shallow.',
    items:['Audio DSP & Synchronisation','Bioinformatics Algorithms','Campus Management Systems','Genome Data Processing','Scientific Computing','Domain Research'],
  },
  {
    num:'04', tag:'Enterprise', color:'#4A6FA5',
    title:'Data Architecture',
    short:'Structure your data. Own your future.',
    desc:'Database design, data modeling, ETL pipelines, analytics dashboards. Your data is your most valuable asset — treat it like one.',
    items:['Database Schema Design','ETL Pipeline Engineering','Analytics Dashboards','Data Modelling','Real-time Processing','Storage Optimisation'],
  },
  {
    num:'05', tag:'Strategy', color:'#B87333',
    title:'Technical Consulting',
    short:'Think before you build.',
    desc:'Architecture reviews, tech stack decisions, code audits, and roadmap planning. The most expensive line of code is the wrong one written early.',
    items:['Architecture Reviews','Code Audits','Stack Selection','Technical Roadmapping','Security Assessment','Performance Profiling'],
  },
  {
    num:'06', tag:'Support', color:'#4A6FA5',
    title:'Maintenance & Evolution',
    short:'Shipped is not finished.',
    desc:'Ongoing engineering support for systems already in production. Bug fixes, feature additions, dependency updates, scaling support.',
    items:['Bug Fixes & Patches','Feature Development','Dependency Updates','Performance Monitoring','Scaling Support','Documentation'],
  },
]

function ServiceRow({ svc, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={{ once:true, amount:0.1 }} custom={index}
      style={{ borderBottom:'1px solid #2A3446' }}
    >
      {/* Header row */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          display:'grid', gridTemplateColumns:'64px 1fr auto auto',
          gap:32, alignItems:'center', padding:'40px 0',
          cursor:'pointer',
          transition:'all 0.3s',
        }}
        onMouseEnter={e=>e.currentTarget.style.paddingLeft='12px'}
        onMouseLeave={e=>e.currentTarget.style.paddingLeft='0'}
      >
        {/* Number */}
        <span style={{
          fontFamily:"'Fragment Mono',monospace",
          fontSize:12, color:'#2A3446', letterSpacing:'0.1em',
        }}>
          {svc.num}
        </span>

        {/* Title block */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8, flexWrap:'wrap' }}>
            <span style={{
              fontFamily:"'Fragment Mono',monospace",
              fontSize:9, color:svc.color,
              border:`1px solid ${svc.color}40`,
              padding:'3px 10px', letterSpacing:'0.18em', textTransform:'uppercase',
            }}>
              {svc.tag}
            </span>
          </div>
          <h3 style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:'clamp(28px,4vw,52px)',
            letterSpacing:'0.04em', color:'#F0EDE8', lineHeight:1,
          }}>
            {svc.title}
          </h3>
          <AnimatePresence>
            {!open && (
              <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, color:'#4A5568', marginTop:6 }}>
                {svc.short}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Tag on right */}
        <span style={{
          fontFamily:"'Space Grotesk',sans-serif",
          fontSize:11, color:'#4A5568', letterSpacing:'0.1em',
          textTransform:'uppercase', display:'none',
        }} className="hide-mobile">
          {svc.tag}
        </span>

        {/* Toggle icon */}
        <div style={{
          width:40, height:40, border:'1px solid #2A3446',
          display:'flex', alignItems:'center', justifyContent:'center',
          color: open ? '#B87333' : '#4A5568',
          borderColor: open ? 'rgba(184,115,51,0.5)' : '#2A3446',
          transition:'all 0.3s', flexShrink:0,
        }}>
          {open ? <Minus size={16}/> : <Plus size={16}/>}
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height:0, opacity:0 }}
            animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
            style={{ overflow:'hidden' }}
          >
            <div style={{
              display:'grid', gridTemplateColumns:'1fr 1fr',
              gap:48, paddingBottom:48, paddingLeft:96,
            }}>
              <div>
                <p style={{
                  fontFamily:"'Space Grotesk',sans-serif",
                  fontSize:16, color:'#8B9DB5', lineHeight:1.8, marginBottom:32,
                }}>
                  {svc.desc}
                </p>
                <Link to="/contact" style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  fontFamily:"'Space Grotesk',sans-serif",
                  fontSize:11, fontWeight:600,
                  letterSpacing:'0.15em', textTransform:'uppercase',
                  textDecoration:'none', color:svc.color,
                  borderBottom:`1px solid ${svc.color}50`,
                  paddingBottom:3,
                }}>
                  Discuss this service <ArrowUpRight size={13}/>
                </Link>
              </div>
              <div style={{
                display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, alignContent:'start',
              }}>
                {svc.items.map(item => (
                  <div key={item} style={{
                    display:'flex', alignItems:'center', gap:10,
                    fontFamily:"'Space Grotesk',sans-serif",
                    fontSize:13, color:'#8B9DB5',
                  }}>
                    <div style={{ width:4, height:4, background:svc.color, flexShrink:0 }}/>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services — Zentry Hub</title>
        <meta name="description" content="Full-stack web engineering, AI/ML, data architecture, niche systems and technical consulting." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Fragment+Mono&family=DM+Serif+Display:ital@0;1&display=swap');
        @media(max-width:768px){
          .hide-mobile{display:none!important;}
          .expand-grid{grid-template-columns:1fr!important;padding-left:0!important;}
        }
      `}</style>

      {/* HERO */}
      <section style={{
        minHeight:'70vh', background:'#0D1117',
        display:'flex', flexDirection:'column', justifyContent:'flex-end',
        padding:'0 2.5rem 80px', paddingTop:120,
        position:'relative', overflow:'hidden',
      }}>
        {/* BG number */}
        <div style={{
          position:'absolute', top:'50%', right:'-5%',
          transform:'translateY(-50%)',
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:'clamp(200px,35vw,500px)',
          color:'rgba(184,115,51,0.03)',
          lineHeight:1, userSelect:'none', pointerEvents:'none',
          letterSpacing:'-0.05em',
        }}>06</div>

        {/* Glow */}
        <div style={{
          position:'absolute', top:0, left:'30%',
          width:600, height:600, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(74,111,165,0.07) 0%,transparent 70%)',
          pointerEvents:'none',
        }}/>

        <div style={{ maxWidth:1280, margin:'0 auto', width:'100%' }}>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0}
            style={{
              fontFamily:"'Fragment Mono',monospace",
              fontSize:11, color:'#B87333',
              letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:24,
            }}>
            What we build
          </motion.p>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:'clamp(72px,14vw,180px)',
              letterSpacing:'-0.02em', lineHeight:0.9,
              color:'#F0EDE8', marginBottom:40,
            }}>
            Engineered<br/>
            <span style={{
              color:'transparent',
              WebkitTextStroke:'2px #B87333',
            }}>
              Capabilities
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            style={{
              fontFamily:"'Space Grotesk',sans-serif",
              fontSize:'clamp(16px,2vw,20px)', color:'#8B9DB5',
              lineHeight:1.7, maxWidth:520, fontWeight:300,
            }}>
            Six service pillars. One studio. Every project we take on is built with the same obsession — the right solution, not the familiar one.
          </motion.p>
        </div>
      </section>

      {/* SERVICES ACCORDION */}
      <section style={{ background:'#0D1117', padding:'0 2.5rem 140px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ borderTop:'1px solid #2A3446' }}>
            {services.map((svc,i) => (
              <ServiceRow key={svc.num} svc={svc} index={i}/>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{
        background:'#161B22', borderTop:'1px solid #2A3446',
        padding:'100px 2.5rem',
      }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:40 }}>
          <div>
            <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#B87333', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:16 }}>
              Not sure what you need?
            </p>
            <h2 style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:'clamp(40px,7vw,88px)',
              letterSpacing:'-0.02em', color:'#F0EDE8', lineHeight:1,
            }}>
              Let's figure it<br/>
              <span style={{ color:'#B87333' }}>out together.</span>
            </h2>
          </div>
          <Link to="/contact" style={{
            display:'inline-flex', alignItems:'center', gap:12,
            fontFamily:"'Space Grotesk',sans-serif",
            fontSize:12, fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase',
            textDecoration:'none', color:'#0D1117',
            background:'linear-gradient(135deg,#B87333,#D4956A)',
            padding:'22px 52px',
            boxShadow:'0 0 50px rgba(184,115,51,0.3)',
            transition:'all 0.3s',
            flexShrink:0,
          }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow='0 0 70px rgba(184,115,51,0.5)'}
            onMouseLeave={e=>e.currentTarget.style.boxShadow='0 0 50px rgba(184,115,51,0.3)'}
          >
            Start a Conversation <ArrowUpRight size={16}/>
          </Link>
        </div>
      </section>
    </>
  )
}