import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Plus, Minus } from 'lucide-react'

const T = {
  bg:'#08090B', surface:'#0F1117', card:'#141820',
  border:'#1E2535', borderL:'#2A3446',
  copper:'#C4843A', copperL:'#E09B52', copperD:'#8A5C28',
  slate:'#4A6FA5', white:'#F2EFE9', gray:'#8A97AB', grayD:'#404B5C',
}

function Reveal({ children, delay=0, y=32, style={} }) {
  return (
    <motion.div initial={{opacity:0,y}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,amount:0.15}}
      transition={{duration:0.75,delay,ease:[0.16,1,0.3,1]}} style={style}>
      {children}
    </motion.div>
  )
}

const SERVICES = [
  {
    n:'01', tag:'Core', accent:T.copper,
    title:'Full-Stack Web Engineering',
    short:'React to PostgreSQL. Systems built to last.',
    desc:'End-to-end web systems — React frontends that feel instant, Node.js backends that scale, PostgreSQL databases that stay reliable under load. We own the entire stack and every decision in it.',
    items:['Custom React Applications','REST & GraphQL APIs','PostgreSQL & MongoDB','Auth & Security','Performance Optimisation','CI/CD Pipelines'],
  },
  {
    n:'02', tag:'Intelligence', accent:T.slate,
    title:'AI & Machine Learning',
    short:'Models that think. Systems that act.',
    desc:'Custom ML models built from scratch — not wrappers around existing APIs. Real data pipelines, real training, real deployment. From research prototype to production system.',
    items:['Custom ML Models','Data Pipeline Architecture','NLP & Computer Vision','Model Training & Evaluation','Python & TensorFlow','Research to Production'],
  },
  {
    n:'03', tag:'Niche', accent:T.copper,
    title:'Specialised Domain Systems',
    short:'Where generic software ends, we begin.',
    desc:'Audio engineering platforms, bioinformatics tools, institutional management systems. We go deep into domains where most agencies stay on the surface.',
    items:['Audio DSP & Synchronisation','Bioinformatics Algorithms','Campus Management Systems','Genome Data Processing','Scientific Computing','Domain Research'],
  },
  {
    n:'04', tag:'Data', accent:T.slate,
    title:'Data Architecture',
    short:'Structure your data. Own your future.',
    desc:'Database design, data modelling, ETL pipelines, analytics dashboards. Your data is your most valuable asset — we treat it that way.',
    items:['Database Schema Design','ETL Pipeline Engineering','Analytics Dashboards','Real-time Processing','Storage Optimisation','Data Modelling'],
  },
  {
    n:'05', tag:'Strategy', accent:T.copper,
    title:'Technical Consulting',
    short:'Think before you build.',
    desc:'Architecture reviews, tech stack decisions, code audits, roadmap planning. The most expensive line of code is the wrong one written early.',
    items:['Architecture Reviews','Code Audits','Stack Selection','Technical Roadmapping','Security Assessment','Performance Profiling'],
  },
  {
    n:'06', tag:'Support', accent:T.slate,
    title:'Maintenance & Evolution',
    short:'Shipped is not finished.',
    desc:'Ongoing engineering for systems already in production. Bug fixes, feature additions, dependency updates, scaling support — we stay with you.',
    items:['Bug Fixes & Patches','Feature Development','Dependency Updates','Performance Monitoring','Scaling Support','Documentation'],
  },
]

function ServiceRow({ svc, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,amount:0.1}}
      transition={{duration:0.6,delay:index*0.05,ease:[0.16,1,0.3,1]}}
      style={{borderBottom:`1px solid ${T.border}`}}
    >
      {/* Header */}
      <button
        onClick={()=>setOpen(!open)}
        style={{
          width:'100%', background:'none', border:'none', cursor:'pointer',
          display:'grid', gridTemplateColumns:'52px 1fr auto',
          gap:24, alignItems:'center',
          padding:'36px 0',
          textAlign:'left',
          transition:'padding-left 0.3s',
          paddingLeft: open ? 8 : 0,
        }}
      >
        <span style={{fontFamily:"'Fragment Mono',monospace",fontSize:10,color:open?T.copper:T.grayD,letterSpacing:'0.14em',transition:'color 0.3s'}}>
          {svc.n}
        </span>

        <div>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:open?0:6,flexWrap:'wrap'}}>
            <span style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:'clamp(22px,3.5vw,40px)',
              letterSpacing:'0.04em', color:T.white, lineHeight:1,
            }}>
              {svc.title}
            </span>
            <span style={{
              fontFamily:"'Fragment Mono',monospace",
              fontSize:9, color:svc.accent,
              border:`1px solid ${svc.accent}35`,
              padding:'2px 8px', letterSpacing:'0.14em', textTransform:'uppercase',
            }}>
              {svc.tag}
            </span>
          </div>
          {!open && (
            <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:14,color:T.grayD}}>
              {svc.short}
            </p>
          )}
        </div>

        <div style={{
          width:36, height:36,
          border:`1px solid ${open ? T.copper : T.border}`,
          display:'flex', alignItems:'center', justifyContent:'center',
          color: open ? T.copper : T.grayD,
          flexShrink:0, transition:'all 0.3s',
        }}>
          {open ? <Minus size={14}/> : <Plus size={14}/>}
        </div>
      </button>

      {/* Expanded */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{height:0,opacity:0}}
            animate={{height:'auto',opacity:1}}
            exit={{height:0,opacity:0}}
            transition={{duration:0.4,ease:[0.16,1,0.3,1]}}
            style={{overflow:'hidden'}}
          >
            <div style={{
              display:'grid', gridTemplateColumns:'1fr 1fr',
              gap:48, padding:'0 0 40px 76px',
            }}
              className="svc-expand"
            >
              <div>
                <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:15,color:T.gray,lineHeight:1.8,marginBottom:28,fontWeight:300}}>
                  {svc.desc}
                </p>
                <Link to="/contact" style={{
                  display:'inline-flex',alignItems:'center',gap:6,
                  fontFamily:"'Space Grotesk',sans-serif",fontSize:12,fontWeight:600,
                  letterSpacing:'0.14em',textTransform:'uppercase',
                  textDecoration:'none',color:svc.accent,
                  borderBottom:`1px solid ${svc.accent}40`,paddingBottom:2,
                }}>
                  Discuss this <ArrowUpRight size={12}/>
                </Link>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px 24px',alignContent:'start'}}>
                {svc.items.map(item=>(
                  <div key={item} style={{display:'flex',alignItems:'center',gap:10}}>
                    <div style={{width:3,height:3,background:svc.accent,flexShrink:0}}/>
                    <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:13,color:T.gray}}>{item}</span>
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
        <meta name="description" content="Full-stack engineering, AI/ML, data architecture, niche systems and technical consulting."/>
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Fragment+Mono&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .section-pad{padding:112px 48px;}
        .container{max-width:1200px;margin:0 auto;width:100%;}
        @media(max-width:768px){
          .section-pad{padding:72px 24px;}
          .svc-expand{grid-template-columns:1fr!important;padding-left:0!important;}
          .svc-expand > div:last-child{grid-template-columns:1fr!important;}
        }
        @media(max-width:480px){.section-pad{padding:56px 20px;}}
      `}</style>

      {/* HERO */}
      <section style={{background:T.bg,padding:'140px 48px 80px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',bottom:-80,right:-60,fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(120px,22vw,320px)',color:'rgba(196,132,58,0.025)',letterSpacing:'-0.05em',lineHeight:1,userSelect:'none',pointerEvents:'none'}}>06</div>
        <div className="container">
          <Reveal>
            <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:10,color:T.copper,letterSpacing:'0.22em',textTransform:'uppercase',marginBottom:20}}>What we build</p>
          </Reveal>
          <div style={{overflow:'hidden'}}>
            <motion.h1 initial={{y:'105%'}} animate={{y:'0%'}} transition={{duration:1,delay:0.1,ease:[0.16,1,0.3,1]}}
              style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(52px,9vw,128px)',letterSpacing:'-0.025em',lineHeight:0.9,color:T.white}}>
              Engineered
            </motion.h1>
          </div>
          <div style={{overflow:'hidden'}}>
            <motion.h1 initial={{y:'105%'}} animate={{y:'0%'}} transition={{duration:1,delay:0.18,ease:[0.16,1,0.3,1]}}
              style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(52px,9vw,128px)',letterSpacing:'-0.025em',lineHeight:0.9,color:'transparent',WebkitTextStroke:`1.5px rgba(196,132,58,0.5)`}}>
              Capabilities.
            </motion.h1>
          </div>
          <Reveal delay={0.3} style={{marginTop:32}}>
            <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'clamp(15px,1.4vw,17px)',color:T.gray,lineHeight:1.8,maxWidth:480,fontWeight:300}}>
              Six service pillars. One studio. Every engagement is built with the same obsession — the right solution, not the familiar one.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES ACCORDION */}
      <section style={{background:T.bg,padding:'0 48px 120px'}}>
        <div className="container" style={{borderTop:`1px solid ${T.border}`}}>
          {SERVICES.map((svc,i)=><ServiceRow key={svc.n} svc={svc} index={i}/>)}
        </div>
      </section>

      {/* CTA */}
      <section style={{background:T.surface,borderTop:`1px solid ${T.border}`,padding:'100px 48px'}}>
        <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:40}}>
          <Reveal>
            <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:10,color:T.copper,letterSpacing:'0.22em',textTransform:'uppercase',marginBottom:16}}>Not sure what you need?</p>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(36px,5.5vw,72px)',letterSpacing:'-0.02em',color:T.white,lineHeight:1}}>
              Let's figure it<br/><span style={{color:T.copper}}>out together.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/contact" style={{
              display:'inline-flex',alignItems:'center',gap:8,
              fontFamily:"'Space Grotesk',sans-serif",fontSize:11,fontWeight:700,
              letterSpacing:'0.18em',textTransform:'uppercase',
              textDecoration:'none',color:T.bg,
              background:`linear-gradient(135deg,${T.copper},${T.copperL})`,
              padding:'16px 36px',flexShrink:0,
              boxShadow:`0 0 40px rgba(196,132,58,0.25)`,
              transition:'opacity 0.2s,transform 0.2s',
            }}
              onMouseEnter={e=>{e.currentTarget.style.opacity='0.88';e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='translateY(0)'}}
            >
              Start a Conversation <ArrowUpRight size={14}/>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}