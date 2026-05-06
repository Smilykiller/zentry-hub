import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 — Zentry Hub</title></Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500&family=Fragment+Mono&display=swap');
      `}</style>

      <div style={{
        minHeight:'100vh', background:'#0D1117',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        padding:'2rem', textAlign:'center',
        position:'relative', overflow:'hidden',
      }}>
        {/* Giant 404 bg */}
        <div style={{
          position:'absolute', inset:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          pointerEvents:'none',
        }}>
          <motion.span
            initial={{ opacity:0, scale:0.8 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:1, ease:[0.16,1,0.3,1] }}
            style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:'clamp(180px,40vw,520px)',
              color:'rgba(184,115,51,0.04)',
              letterSpacing:'-0.06em', lineHeight:1,
              userSelect:'none',
            }}>
            404
          </motion.span>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.3, ease:[0.16,1,0.3,1] }}
          style={{ position:'relative' }}
        >
          <p style={{
            fontFamily:"'Fragment Mono',monospace",
            fontSize:11, color:'#B87333',
            letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:24,
          }}>
            Error 404
          </p>
          <h1 style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:'clamp(48px,8vw,96px)',
            letterSpacing:'-0.02em', color:'#F0EDE8',
            lineHeight:1, marginBottom:20,
          }}>
            Page Not Found.
          </h1>
          <p style={{
            fontFamily:"'Space Grotesk',sans-serif",
            fontSize:17, color:'#8B9DB5',
            fontWeight:300, lineHeight:1.7,
            maxWidth:400, margin:'0 auto 48px',
          }}>
            The page you're looking for has been moved, deleted, or never existed.
          </p>
          <Link to="/" style={{
            display:'inline-flex', alignItems:'center', gap:10,
            fontFamily:"'Space Grotesk',sans-serif",
            fontSize:11, fontWeight:600,
            letterSpacing:'0.18em', textTransform:'uppercase',
            textDecoration:'none', color:'#0D1117',
            background:'linear-gradient(135deg,#B87333,#D4956A)',
            padding:'18px 40px',
            boxShadow:'0 0 40px rgba(184,115,51,0.3)',
          }}>
            Return Home <ArrowUpRight size={14}/>
          </Link>
        </motion.div>
      </div>
    </>
  )
}