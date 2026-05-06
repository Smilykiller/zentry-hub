import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Zap } from 'lucide-react'

const fadeUp = {
  hidden:  { opacity:0, y:40 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ duration:0.8, delay:i*0.1, ease:[0.16,1,0.3,1] } })
}

const stack = [
  { cat:'Frontend',  items:['React 18','Vite','Tailwind CSS','Framer Motion'] },
  { cat:'Backend',   items:['Node.js','Express','Python','FastAPI'] },
  { cat:'Database',  items:['PostgreSQL','MongoDB','Prisma','Redis'] },
  { cat:'AI & ML',   items:['TensorFlow','PyTorch','scikit-learn','Pandas'] },
  { cat:'DevOps',    items:['Docker','GitHub Actions','Vercel','Railway'] },
  { cat:'Niche',     items:['Audio DSP','WebSockets','Bioinformatics','Algorithms'] },
]

const values = [
  {
    num:'01',
    title:'Logic first.',
    body:'We spend more time on a whiteboard than at a keyboard. The most expensive line of code is the one that solves the wrong problem.',
  },
  {
    num:'02',
    title:'Depth over breadth.',
    body:'We say no to projects that need generalists. We take on work that demands specialists — and we are obsessively specific about our craft.',
  },
  {
    num:'03',
    title:'Transparent throughout.',
    body:'No black boxes. You see our thinking, our progress, our doubts. We believe the client and the engineer should think together.',
  },
  {
    num:'04',
    title:'Shipped is not finished.',
    body:'Launch day is not the end. Systems need care, evolution, and occasional rethinking. We build relationships, not just software.',
  },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Zentry Hub</title>
        <meta name="description" content="Zentry Hub — software engineering studio from Coimbatore, India. Built on logic, depth, and craft." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Fragment+Mono&family=DM+Serif+Display:ital@0;1&display=swap');
        @media(max-width:768px){
          .about-split{grid-template-columns:1fr!important;}
          .stack-grid{grid-template-columns:1fr 1fr!important;}
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        minHeight:'90vh', background:'#0D1117',
        display:'flex', flexDirection:'column', justifyContent:'center',
        padding:'120px 2.5rem 80px', position:'relative', overflow:'hidden',
      }}>
        {/* BG italic text */}
        <div style={{
          position:'absolute', bottom:-80, right:-80,
          fontFamily:"'DM Serif Display',serif",
          fontStyle:'italic',
          fontSize:'clamp(120px,25vw,360px)',
          color:'rgba(74,111,165,0.04)',
          lineHeight:1, userSelect:'none', pointerEvents:'none',
        }}>Studio</div>

        {/* Glow */}
        <div style={{
          position:'absolute', top:'20%', left:'40%',
          width:700, height:700, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(184,115,51,0.06) 0%,transparent 70%)',
          pointerEvents:'none',
        }}/>

        <div style={{ maxWidth:1280, margin:'0 auto', width:'100%' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }} className="about-split">
            <div>
              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0}
                style={{ fontFamily:"'Fragment Mono',monospace", fontSize:11, color:'#B87333', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:24 }}>
                The Studio
              </motion.p>
              <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
                style={{
                  fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:'clamp(64px,10vw,140px)',
                  letterSpacing:'-0.02em', lineHeight:0.9,
                  color:'#F0EDE8', marginBottom:40,
                }}>
                Born from<br/>
                <span style={{
                  fontFamily:"'DM Serif Display',serif",
                  fontStyle:'italic',
                  color:'#B87333',
                  fontSize:'0.85em',
                }}>
                  Pure Logic.
                </span>
              </motion.h1>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}
                style={{ display:'flex', alignItems:'center', gap:8, marginBottom:32 }}>
                <MapPin size={14} color="#B87333"/>
                <span style={{ fontFamily:"'Fragment Mono',monospace", fontSize:11, color:'#8B9DB5', letterSpacing:'0.1em' }}>
                  Coimbatore, Tamil Nadu, India
                </span>
              </motion.div>

              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3}
                style={{
                  fontFamily:"'Space Grotesk',sans-serif",
                  fontSize:18, color:'#8B9DB5', lineHeight:1.8,
                  fontWeight:300, maxWidth:460,
                }}>
                Zentry Hub is a software engineering studio that builds systems others call complex and calls them Tuesday.
              </motion.p>
            </div>

            {/* Founder card */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}
              style={{
                border:'1px solid #2A3446',
                background:'#161B22', padding:'48px',
                position:'relative', overflow:'hidden',
              }}>
              {/* Accent top bar */}
              <div style={{
                position:'absolute', top:0, left:0, right:0, height:2,
                background:'linear-gradient(90deg,#B87333,#D4956A,transparent)',
              }}/>

              {/* Founder photo placeholder — replace with actual photo */}
              <div style={{
                width:80, height:80, marginBottom:28,
                background:'linear-gradient(135deg,#B87333,#D4956A)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize:32, color:'#0D1117', letterSpacing:'0.05em',
              }}>
                ZH
              </div>

              <h3 style={{
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize:36, letterSpacing:'0.04em',
                color:'#F0EDE8', marginBottom:4, lineHeight:1,
              }}>
                Founder
              </h3>
              <p style={{
                fontFamily:"'Fragment Mono',monospace",
                fontSize:10, color:'#B87333',
                letterSpacing:'0.18em', textTransform:'uppercase',
                marginBottom:24,
              }}>
                Zentry Hub · Coimbatore
              </p>
              <p style={{
                fontFamily:"'Space Grotesk',sans-serif",
                fontSize:14, color:'#8B9DB5', lineHeight:1.8, marginBottom:32,
              }}>
                A software engineer obsessed with building things that work — not just things that ship. Started Zentry Hub to bring engineering rigour to a market full of shortcuts.
              </p>

              <div style={{ display:'flex', gap:12 }}>
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:6,
                  fontFamily:"'Fragment Mono',monospace",
                  fontSize:10, color:'#4A5568',
                  border:'1px solid #2A3446', padding:'6px 12px',
                  letterSpacing:'0.12em', textTransform:'uppercase',
                }}>
                  <Zap size={10} color="#B87333"/> Available for Projects
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section style={{ background:'#161B22', borderTop:'1px solid #2A3446', padding:'120px 2.5rem' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:80 }} className="about-split">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}>
              <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:11, color:'#B87333', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:16 }}>
                Origin
              </p>
              <h2 style={{
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize:'clamp(40px,6vw,80px)',
                letterSpacing:'-0.02em', color:'#F0EDE8', lineHeight:1,
              }}>
                Why we exist.
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} custom={1}>
              <p style={{
                fontFamily:"'DM Serif Display',serif",
                fontSize:'clamp(20px,2.5vw,28px)',
                color:'#F0EDE8', lineHeight:1.6,
                fontStyle:'italic', marginBottom:32,
                borderLeft:'2px solid #B87333', paddingLeft:32,
              }}>
                "Most software agencies build what clients ask for. We build what clients actually need — and sometimes those are very different things."
              </p>
              <p style={{
                fontFamily:"'Space Grotesk',sans-serif",
                fontSize:16, color:'#8B9DB5', lineHeight:1.9, marginBottom:24,
              }}>
                Zentry Hub was founded in Coimbatore with a simple belief: engineering should be a craft, not a commodity. We saw too many projects fail not from lack of effort, but from lack of thinking. Architecture decisions made in haste. Databases designed without scale in mind. Interfaces built without understanding the human using them.
              </p>
              <p style={{
                fontFamily:"'Space Grotesk',sans-serif",
                fontSize:16, color:'#8B9DB5', lineHeight:1.9,
              }}>
                So we built a studio where the first deliverable on any project is a plan — not a prototype. Where we ask the uncomfortable questions before writing a single line. Where depth of expertise matters more than breadth of clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ background:'#0D1117', padding:'120px 2.5rem', borderTop:'1px solid #2A3446' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} style={{ marginBottom:80 }}>
            <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:11, color:'#B87333', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:16 }}>
              Principles
            </p>
            <h2 style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:'clamp(48px,8vw,100px)',
              letterSpacing:'-0.02em', color:'#F0EDE8', lineHeight:1,
            }}>
              How we work.
            </h2>
          </motion.div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'#2A3446' }}>
            {values.map((v,i) => (
              <motion.div key={v.num}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once:true, amount:0.2 }} custom={i}
                style={{
                  background:'#0D1117', padding:'56px 48px',
                  transition:'background 0.3s',
                }}
                onMouseEnter={e=>e.currentTarget.style.background='#0D1117'}
              >
                <span style={{
                  fontFamily:"'Fragment Mono',monospace",
                  fontSize:11, color:'#2A3446',
                  letterSpacing:'0.15em', display:'block', marginBottom:24,
                }}>
                  {v.num}
                </span>
                <h3 style={{
                  fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:'clamp(28px,4vw,44px)',
                  letterSpacing:'0.03em', color:'#F0EDE8',
                  lineHeight:1, marginBottom:20,
                }}>
                  {v.title}
                </h3>
                <p style={{
                  fontFamily:"'Space Grotesk',sans-serif",
                  fontSize:15, color:'#8B9DB5', lineHeight:1.8,
                }}>
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ background:'#161B22', borderTop:'1px solid #2A3446', padding:'120px 2.5rem' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} style={{ marginBottom:64 }}>
            <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:11, color:'#B87333', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:16 }}>
              Arsenal
            </p>
            <h2 style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:'clamp(48px,8vw,100px)',
              letterSpacing:'-0.02em', color:'#F0EDE8', lineHeight:1,
            }}>
              Tech we trust.
            </h2>
          </motion.div>

          <div className="stack-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'#2A3446' }}>
            {stack.map((s,i) => (
              <motion.div key={s.cat}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once:true }} custom={i}
                style={{ background:'#161B22', padding:'36px 32px' }}
              >
                <p style={{
                  fontFamily:"'Fragment Mono',monospace",
                  fontSize:10, color:'#B87333',
                  letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:20,
                }}>
                  {s.cat}
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {s.items.map(item => (
                    <div key={item} style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:3, height:3, background:'#2A3446', flexShrink:0 }}/>
                      <span style={{
                        fontFamily:"'Space Grotesk',sans-serif",
                        fontSize:14, color:'#8B9DB5',
                      }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:'#0D1117', padding:'120px 2.5rem', borderTop:'1px solid #2A3446', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{
          position:'absolute', inset:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          pointerEvents:'none',
        }}>
          <span style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:'clamp(100px,25vw,320px)',
            color:'rgba(184,115,51,0.03)', letterSpacing:'-0.05em', lineHeight:1,
          }}>CRAFT</span>
        </div>
        <div style={{ position:'relative', maxWidth:700, margin:'0 auto' }}>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}
            style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:'clamp(52px,10vw,120px)',
              letterSpacing:'-0.03em', color:'#F0EDE8', lineHeight:0.95, marginBottom:40,
            }}>
            Work with<br/>
            <span style={{ color:'#B87333' }}>the Studio.</span>
          </motion.h2>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} custom={1}>
            <Link to="/contact" style={{
              display:'inline-flex', alignItems:'center', gap:12,
              fontFamily:"'Space Grotesk',sans-serif",
              fontSize:11, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase',
              textDecoration:'none', color:'#0D1117',
              background:'linear-gradient(135deg,#B87333,#D4956A)',
              padding:'20px 48px',
              boxShadow:'0 0 50px rgba(184,115,51,0.3)',
              transition:'box-shadow 0.3s',
            }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='0 0 70px rgba(184,115,51,0.5)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='0 0 50px rgba(184,115,51,0.3)'}
            >
              Initiate a Project <ArrowUpRight size={15}/>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}