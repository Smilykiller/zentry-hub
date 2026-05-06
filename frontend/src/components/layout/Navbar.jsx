import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'
import logo from '@/assets/images/logo.png'

const links = [
  { to: '/services',     label: 'Services' },
  { to: '/work',         label: 'Work' },
  { to: '/about',        label: 'Agency' },
  { to: '/testimonials', label: 'Clients' },
]

export default function Navbar() {
  const scrolled = useScrolled(60)
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Fragment+Mono&family=DM+Serif+Display:ital@0;1&display=swap');
        .nav-lnk {
          font-family:'Space Grotesk',sans-serif;
          font-size:11px;font-weight:500;
          letter-spacing:0.18em;text-transform:uppercase;
          text-decoration:none;color:#8B9DB5;
          transition:color 0.2s;position:relative;padding-bottom:4px;
        }
        .nav-lnk::after{
          content:'';position:absolute;bottom:0;left:0;right:0;
          height:1px;background:linear-gradient(90deg,#B87333,#D4956A);
          transform:scaleX(0);transition:transform 0.3s ease;transform-origin:left;
        }
        .nav-lnk:hover{color:#F0EDE8;}
        .nav-lnk:hover::after,.nav-lnk.act::after{transform:scaleX(1);}
        .nav-lnk.act{color:#B87333;}
        @media(max-width:900px){.dnav{display:none!important;}.mburg{display:flex!important;}}
      `}</style>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position:'fixed',top:0,left:0,right:0,zIndex:100,
          background: scrolled ? 'rgba(13,17,23,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(42,52,70,0.5)' : '1px solid transparent',
          transition:'all 0.5s ease',
        }}
      >
        <div style={{
          maxWidth:1280,margin:'0 auto',padding:'0 2.5rem',
          height:76,display:'flex',alignItems:'center',justifyContent:'space-between',
        }}>

          {/* LOGO + WORDMARK */}
          <Link to="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:14 }}>
            <motion.div
              whileHover={{ scale:1.08, rotate:3 }}
              transition={{ type:'spring',stiffness:400,damping:25 }}
              style={{
                width:44,height:44,flexShrink:0,
                filter:'drop-shadow(0 0 16px rgba(184,115,51,0.5))',
              }}
            >
              <img src={logo} alt="Zentry Hub"
                style={{ width:'100%',height:'100%',objectFit:'contain',display:'block' }}
              />
            </motion.div>
            <div style={{ display:'flex',flexDirection:'column',lineHeight:1 }}>
              <span style={{
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize:24,letterSpacing:'0.16em',color:'#F0EDE8',lineHeight:1,
              }}>
                ZENTRY<span style={{ color:'#B87333' }}>HUB</span>
              </span>
              <span style={{
                fontFamily:"'Fragment Mono',monospace",
                fontSize:8,letterSpacing:'0.22em',color:'#4A5568',
                textTransform:'uppercase',marginTop:3,
              }}>
                Engineering Studio
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="dnav" style={{ display:'flex',alignItems:'center',gap:44 }}>
            {links.map(link => (
              <Link key={link.to} to={link.to}
                className={`nav-lnk${pathname===link.to?' act':''}`}>
                {link.label}
              </Link>
            ))}
            <Link to="/contact" style={{
              display:'inline-flex',alignItems:'center',gap:7,
              fontFamily:"'Space Grotesk',sans-serif",
              fontSize:10,fontWeight:600,letterSpacing:'0.2em',textTransform:'uppercase',
              textDecoration:'none',color:'#0D1117',
              background:'linear-gradient(135deg,#B87333,#D4956A)',
              padding:'11px 22px',
              boxShadow:'0 0 24px rgba(184,115,51,0.3)',
              transition:'box-shadow 0.3s',
            }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='0 0 40px rgba(184,115,51,0.55)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='0 0 24px rgba(184,115,51,0.3)'}
            >
              Initiate <ArrowUpRight size={12}/>
            </Link>
          </div>

          {/* MOBILE BURGER */}
          <button onClick={()=>setOpen(!open)} className="mburg"
            style={{
              display:'none',background:'none',border:'1px solid #2A3446',
              color:'#F0EDE8',cursor:'pointer',padding:8,
              alignItems:'center',justifyContent:'center',
            }}>
            {open ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0,clipPath:'inset(0 0 100% 0)' }}
            animate={{ opacity:1,clipPath:'inset(0 0 0% 0)' }}
            exit={{ opacity:0,clipPath:'inset(0 0 100% 0)' }}
            transition={{ duration:0.5,ease:[0.16,1,0.3,1] }}
            style={{
              position:'fixed',top:76,left:0,right:0,bottom:0,zIndex:99,
              background:'#0D1117',padding:'60px 2.5rem',
              display:'flex',flexDirection:'column',justifyContent:'space-between',
            }}
          >
            <div style={{ display:'flex',flexDirection:'column',gap:4 }}>
              {links.map((link,i)=>(
                <motion.div key={link.to}
                  initial={{ opacity:0,x:-60 }}
                  animate={{ opacity:1,x:0 }}
                  transition={{ delay:i*0.08,ease:[0.16,1,0.3,1] }}
                >
                  <Link to={link.to} onClick={()=>setOpen(false)} style={{
                    display:'block',
                    fontFamily:"'Bebas Neue',sans-serif",
                    fontSize:'clamp(52px,14vw,96px)',
                    letterSpacing:'0.04em',
                    color: pathname===link.to ? '#B87333' : '#F0EDE8',
                    textDecoration:'none',lineHeight:1.05,transition:'color 0.2s',
                  }}
                    onMouseEnter={e=>e.currentTarget.style.color='#B87333'}
                    onMouseLeave={e=>e.currentTarget.style.color=pathname===link.to?'#B87333':'#F0EDE8'}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}}>
              <Link to="/contact" onClick={()=>setOpen(false)} style={{
                display:'inline-flex',alignItems:'center',gap:10,
                fontFamily:"'Space Grotesk',sans-serif",
                fontSize:12,fontWeight:600,letterSpacing:'0.18em',textTransform:'uppercase',
                textDecoration:'none',color:'#0D1117',
                background:'linear-gradient(135deg,#B87333,#D4956A)',padding:'18px 40px',
              }}>
                Start a Project <ArrowUpRight size={15}/>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}