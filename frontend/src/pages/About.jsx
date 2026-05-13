import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Zap } from 'lucide-react'

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

const STACK = [
  {cat:'Frontend',  items:['React 18','Vite','Tailwind CSS','Framer Motion']},
  {cat:'Backend',   items:['Node.js','Express','Python','FastAPI']},
  {cat:'Database',  items:['PostgreSQL','MongoDB','Prisma','Redis']},
  {cat:'AI & ML',   items:['TensorFlow','PyTorch','scikit-learn','Pandas']},
  {cat:'DevOps',    items:['Docker','GitHub Actions','Vercel','Render']},
  {cat:'Niche',     items:['Audio DSP','WebSockets','Bioinformatics','Algorithms']},
]

const VALUES = [
  {n:'01',t:'Logic first.',    d:'We spend more time on a whiteboard than at a keyboard. The most expensive line of code is the one that solves the wrong problem.'},
  {n:'02',t:'Depth over breadth.',d:'We say no to work that needs generalists. We take on projects that demand specialists — and we are obsessive about our craft.'},
  {n:'03',t:'Transparent always.',d:'No black boxes. You see our thinking, our progress, our doubts. The client and engineer should think together.'},
  {n:'04',t:'Shipped is not finished.',d:'Launch day is not the end. Systems need care and evolution. We build relationships, not just software.'},
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Zentry Hub</title>
        <meta name="description" content="Zentry Hub — software engineering studio from Coimbatore, India. Built on logic, depth, and craft."/>
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Fragment+Mono&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .section-pad{padding:112px 48px;}
        .container{max-width:1200px;margin:0 auto;width:100%;}
        @media(max-width:768px){
          .section-pad{padding:72px 24px;}
          .about-split{grid-template-columns:1fr!important;}
          .stack-grid{grid-template-columns:1fr 1fr!important;}
          .values-grid{grid-template-columns:1fr!important;}
        }
        @media(max-width:480px){.section-pad{padding:56px 20px;}.stack-grid{grid-template-columns:1fr!important;}}
      `}</style>

      {/* HERO */}
      <section style={{background:T.bg,padding:'140px 48px 100px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',bottom:-60,right:-40,fontFamily:"'DM Serif Display',serif",fontStyle:'italic',fontSize:'clamp(120px,20vw,280px)',color:'rgba(74,111,165,0.03)',lineHeight:1,userSelect:'none',pointerEvents:'none'}}>Studio</div>
        <div className="container">
          <div className="about-split" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}}>
            <div>
              <Reveal>
                <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:10,color:T.copper,letterSpacing:'0.22em',textTransform:'uppercase',marginBottom:20}}>The Studio</p>
              </Reveal>
              <div style={{overflow:'hidden'}}>
                <motion.h1 initial={{y:'105%'}} animate={{y:'0%'}} transition={{duration:1,delay:0.1,ease:[0.16,1,0.3,1]}}
                  style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(48px,8vw,112px)',letterSpacing:'-0.025em',lineHeight:0.9,color:T.white}}>
                  Born from
                </motion.h1>
              </div>
              <div style={{overflow:'hidden'}}>
                <motion.h1 initial={{y:'105%'}} animate={{y:'0%'}} transition={{duration:1,delay:0.18,ease:[0.16,1,0.3,1]}}
                  style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',fontSize:'clamp(42px,7vw,96px)',letterSpacing:'-0.02em',lineHeight:0.95,color:T.copper}}>
                  Pure Logic.
                </motion.h1>
              </div>
              <Reveal delay={0.3} style={{marginTop:28}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:20}}>
                  <MapPin size={13} color={T.copper}/>
                  <span style={{fontFamily:"'Fragment Mono',monospace",fontSize:10,color:T.gray,letterSpacing:'0.12em'}}>Coimbatore, Tamil Nadu, India</span>
                </div>
                <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'clamp(15px,1.4vw,17px)',color:T.gray,lineHeight:1.8,fontWeight:300}}>
                  Zentry Hub is a software engineering studio that builds systems others call complex and calls them Tuesday.
                </p>
              </Reveal>
            </div>

            {/* Founder card */}
            <Reveal delay={0.2}>
              <div style={{background:T.card,border:`1px solid ${T.border}`,padding:'44px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,${T.copper},transparent)`}}/>
                <div style={{
                  width:64,height:64,marginBottom:24,
                  background:`linear-gradient(135deg,${T.copper},${T.copperL})`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:T.bg,letterSpacing:'0.05em',
                }}>
                  ZH
                </div>
                <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,letterSpacing:'0.04em',color:T.white,marginBottom:4,lineHeight:1}}>Founder</h3>
                <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:9,color:T.copper,letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:20}}>Zentry Hub · Coimbatore</p>
                <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:14,color:T.gray,lineHeight:1.8,marginBottom:28,fontWeight:300}}>
                  A software engineer obsessed with building things that work — not just things that ship. Started Zentry Hub to bring engineering rigour to a market full of shortcuts.
                </p>
                <div style={{display:'inline-flex',alignItems:'center',gap:6,fontFamily:"'Fragment Mono',monospace",fontSize:9,color:T.grayD,border:`1px solid ${T.border}`,padding:'5px 12px',letterSpacing:'0.12em',textTransform:'uppercase'}}>
                  <Zap size={10} color={T.copper}/> Available for Projects
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="section-pad" style={{background:T.surface,borderTop:`1px solid ${T.border}`}}>
        <div className="container">
          <div className="about-split" style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:80}}>
            <Reveal>
              <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:10,color:T.copper,letterSpacing:'0.22em',textTransform:'uppercase',marginBottom:16}}>Origin</p>
              <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(36px,5vw,64px)',letterSpacing:'-0.02em',color:T.white,lineHeight:0.95}}>Why we exist.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',fontSize:'clamp(18px,2vw,24px)',color:T.white,lineHeight:1.6,marginBottom:28,paddingLeft:24,borderLeft:`2px solid ${T.copper}`}}>
                "Most agencies build what clients ask for. We build what clients actually need — and sometimes those are very different things."
              </blockquote>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:15,color:T.gray,lineHeight:1.85,marginBottom:20,fontWeight:300}}>
                Zentry Hub was founded in Coimbatore with a simple belief: engineering should be a craft, not a commodity. We saw too many projects fail not from lack of effort, but from lack of thinking.
              </p>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:15,color:T.gray,lineHeight:1.85,fontWeight:300}}>
                Architecture decisions made in haste. Databases designed without scale in mind. Interfaces built without understanding the human using them. So we built a studio where the first deliverable on any project is a plan — not a prototype.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-pad" style={{background:T.bg,borderTop:`1px solid ${T.border}`}}>
        <div className="container">
          <Reveal style={{marginBottom:56}}>
            <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:10,color:T.copper,letterSpacing:'0.22em',textTransform:'uppercase',marginBottom:16}}>Principles</p>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,6vw,80px)',letterSpacing:'-0.02em',color:T.white,lineHeight:0.95}}>How we work.</h2>
          </Reveal>
          <div className="values-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,background:T.border}}>
            {VALUES.map((v,i)=>(
              <Reveal key={v.n} delay={i*0.07}>
                <div style={{background:T.bg,padding:'44px 40px',height:'100%'}}>
                  <span style={{fontFamily:"'Fragment Mono',monospace",fontSize:10,color:T.grayD,letterSpacing:'0.12em',display:'block',marginBottom:20}}>{v.n}</span>
                  <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(22px,3vw,36px)',letterSpacing:'0.04em',color:T.white,lineHeight:1,marginBottom:16}}>{v.t}</h3>
                  <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:14,color:T.gray,lineHeight:1.8,fontWeight:300}}>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="section-pad" style={{background:T.surface,borderTop:`1px solid ${T.border}`}}>
        <div className="container">
          <Reveal style={{marginBottom:56}}>
            <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:10,color:T.copper,letterSpacing:'0.22em',textTransform:'uppercase',marginBottom:16}}>Arsenal</p>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,6vw,80px)',letterSpacing:'-0.02em',color:T.white,lineHeight:0.95}}>Tech we trust.</h2>
          </Reveal>
          <div className="stack-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,background:T.border}}>
            {STACK.map((s,i)=>(
              <Reveal key={s.cat} delay={i*0.06}>
                <div style={{background:T.surface,padding:'32px 28px'}}>
                  <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:9,color:T.copper,letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:18}}>{s.cat}</p>
                  {s.items.map(item=>(
                    <div key={item} style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                      <div style={{width:3,height:3,background:T.border,flexShrink:0}}/>
                      <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:14,color:T.gray}}>{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{background:T.bg,borderTop:`1px solid ${T.border}`,textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}>
          <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(80px,18vw,240px)',color:'rgba(196,132,58,0.025)',letterSpacing:'-0.05em',lineHeight:1,userSelect:'none'}}>CRAFT</span>
        </div>
        <div className="container" style={{position:'relative',maxWidth:600,margin:'0 auto'}}>
          <Reveal>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(40px,7vw,96px)',letterSpacing:'-0.025em',color:T.white,lineHeight:0.92,marginBottom:32}}>
              Work with<br/><span style={{color:T.copper}}>the Studio.</span>
            </h2>
            <Link to="/contact" style={{
              display:'inline-flex',alignItems:'center',gap:8,
              fontFamily:"'Space Grotesk',sans-serif",fontSize:11,fontWeight:700,
              letterSpacing:'0.18em',textTransform:'uppercase',
              textDecoration:'none',color:T.bg,
              background:`linear-gradient(135deg,${T.copper},${T.copperL})`,
              padding:'16px 36px',
              boxShadow:`0 0 40px rgba(196,132,58,0.25)`,
              transition:'opacity 0.2s,transform 0.2s',
            }}
              onMouseEnter={e=>{e.currentTarget.style.opacity='0.88';e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='translateY(0)'}}
            >
              Initiate a Project <ArrowUpRight size={14}/>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}