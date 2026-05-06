import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/utils/validators'
import { contactApi } from '@/services/contactApi'
import { ArrowUpRight, CheckCircle, MapPin, Mail, MessageSquare } from 'lucide-react'

const fadeUp = {
  hidden:  { opacity:0, y:36 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ duration:0.7, delay:i*0.1, ease:[0.16,1,0.3,1] } })
}

const services = [
  'Full-Stack Web Engineering',
  'AI & Machine Learning',
  'Specialised Domain Systems',
  'Data Architecture',
  'Technical Consulting',
  'Maintenance & Support',
  'Not sure yet',
]

const budgets = [
  'Under ₹50,000',
  '₹50,000 – ₹2,00,000',
  '₹2,00,000 – ₹5,00,000',
  '₹5,00,000+',
  'Let\'s discuss',
]

const inputStyle = {
  width:'100%',
  background:'#0D1117',
  border:'1px solid #2A3446',
  color:'#F0EDE8',
  padding:'16px 20px',
  fontFamily:"'Space Grotesk',sans-serif",
  fontSize:15, fontWeight:400,
  outline:'none',
  transition:'border-color 0.2s',
  borderRadius:0,
  appearance:'none',
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data) => {
    try {
      setServerError('')
      await contactApi.submit(data)
      setSubmitted(true)
    } catch (e) {
      setServerError(e?.response?.data?.error || 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact — Zentry Hub</title>
        <meta name="description" content="Start a project with Zentry Hub. Tell us what you're building." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Fragment+Mono&family=DM+Serif+Display:ital@0;1&display=swap');
        input:focus,select:focus,textarea:focus{ border-color:rgba(184,115,51,0.6)!important; }
        input::placeholder,textarea::placeholder{ color:#2A3446; }
        select option{ background:#161B22; color:#F0EDE8; }
        @media(max-width:900px){ .contact-grid{ grid-template-columns:1fr!important; } }
      `}</style>

      {/* HERO */}
      <section style={{
        minHeight:'55vh', background:'#0D1117',
        display:'flex', flexDirection:'column', justifyContent:'flex-end',
        padding:'120px 2.5rem 80px', position:'relative', overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', bottom:-60, right:-40,
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:'clamp(140px,28vw,380px)',
          color:'rgba(74,111,165,0.04)',
          lineHeight:1, userSelect:'none', pointerEvents:'none',
          letterSpacing:'-0.05em',
        }}>TALK</div>

        <div style={{ maxWidth:1280, margin:'0 auto', width:'100%' }}>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0}
            style={{ fontFamily:"'Fragment Mono',monospace", fontSize:11, color:'#B87333', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:24 }}>
            Get in touch
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:'clamp(64px,12vw,160px)',
              letterSpacing:'-0.02em', lineHeight:0.9, color:'#F0EDE8', marginBottom:40,
            }}>
            Let's build<br/>
            <span style={{ fontFamily:"'DM Serif Display',serif", fontStyle:'italic', color:'#B87333' }}>
              something real.
            </span>
          </motion.h1>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ background:'#0D1117', padding:'0 2.5rem 140px', borderTop:'1px solid #2A3446' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:80, paddingTop:80 }}>

            {/* LEFT — info */}
            <div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}>
                <p style={{
                  fontFamily:"'Space Grotesk',sans-serif",
                  fontSize:18, color:'#8B9DB5', lineHeight:1.8,
                  fontWeight:300, marginBottom:56,
                }}>
                  Tell us what you're building. We'll tell you if we're the right studio to build it with — honestly, even if the answer is no.
                </p>

                {/* Contact details */}
                <div style={{ display:'flex', flexDirection:'column', gap:32 }}>
                  {[
                    { icon:<MapPin size={16}/>, label:'Location', val:'Coimbatore, Tamil Nadu, India' },
                    { icon:<Mail size={16}/>, label:'Email', val:'hello@zentryhub.in' },
                    { icon:<MessageSquare size={16}/>, label:'Response time', val:'Within 24 hours' },
                  ].map(item => (
                    <div key={item.label} style={{ display:'flex', gap:16, alignItems:'flex-start' }}>
                      <div style={{
                        width:36, height:36, flexShrink:0,
                        border:'1px solid #2A3446',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        color:'#B87333',
                      }}>
                        {item.icon}
                      </div>
                      <div>
                        <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#4A5568', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:4 }}>
                          {item.label}
                        </p>
                        <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, color:'#8B9DB5' }}>
                          {item.val}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT — form */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} custom={1}>
              {submitted ? (
                <motion.div
                  initial={{ opacity:0, scale:0.95 }}
                  animate={{ opacity:1, scale:1 }}
                  style={{
                    border:'1px solid rgba(82,183,136,0.3)',
                    background:'rgba(82,183,136,0.05)',
                    padding:'64px 48px', textAlign:'center',
                  }}
                >
                  <CheckCircle size={48} color="#52B788" style={{ marginBottom:24 }}/>
                  <h3 style={{
                    fontFamily:"'Bebas Neue',sans-serif",
                    fontSize:48, letterSpacing:'0.03em',
                    color:'#F0EDE8', marginBottom:16, lineHeight:1,
                  }}>
                    Message Received.
                  </h3>
                  <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:16, color:'#8B9DB5', lineHeight:1.7 }}>
                    We've got your enquiry and will respond within 24 hours. We look forward to hearing more about what you're building.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} style={{ display:'flex', flexDirection:'column', gap:24 }}>

                  {/* Name + Email row */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                    <div>
                      <label style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#4A5568', letterSpacing:'0.18em', textTransform:'uppercase', display:'block', marginBottom:10 }}>
                        Full Name *
                      </label>
                      <input {...register('name')} placeholder="Your name" style={inputStyle}/>
                      {errors.name && <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#E07070', marginTop:6 }}>{errors.name.message}</p>}
                    </div>
                    <div>
                      <label style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#4A5568', letterSpacing:'0.18em', textTransform:'uppercase', display:'block', marginBottom:10 }}>
                        Email *
                      </label>
                      <input {...register('email')} type="email" placeholder="your@email.com" style={inputStyle}/>
                      {errors.email && <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#E07070', marginTop:6 }}>{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#4A5568', letterSpacing:'0.18em', textTransform:'uppercase', display:'block', marginBottom:10 }}>
                      Service *
                    </label>
                    <select {...register('service')} style={{ ...inputStyle, cursor:'pointer' }}>
                      <option value="">Select a service...</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service && <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#E07070', marginTop:6 }}>{errors.service.message}</p>}
                  </div>

                  {/* Budget */}
                  <div>
                    <label style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#4A5568', letterSpacing:'0.18em', textTransform:'uppercase', display:'block', marginBottom:10 }}>
                      Budget Range
                    </label>
                    <select {...register('budget')} style={{ ...inputStyle, cursor:'pointer' }}>
                      <option value="">Select a range...</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#4A5568', letterSpacing:'0.18em', textTransform:'uppercase', display:'block', marginBottom:10 }}>
                      Project Description *
                    </label>
                    <textarea {...register('message')} rows={6}
                      placeholder="Tell us what you're building — what problem it solves, who uses it, and what stage you're at..."
                      style={{ ...inputStyle, resize:'vertical', minHeight:160 }}
                    />
                    {errors.message && <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#E07070', marginTop:6 }}>{errors.message.message}</p>}
                  </div>

                  {serverError && (
                    <div style={{
                      background:'rgba(224,112,112,0.08)',
                      border:'1px solid rgba(224,112,112,0.25)',
                      padding:'14px 18px',
                      fontFamily:"'Space Grotesk',sans-serif",
                      fontSize:13, color:'#E07070',
                    }}>
                      {serverError}
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting}
                    style={{
                      display:'inline-flex', alignItems:'center', justifyContent:'center', gap:10,
                      fontFamily:"'Space Grotesk',sans-serif",
                      fontSize:11, fontWeight:700,
                      letterSpacing:'0.2em', textTransform:'uppercase',
                      color:'#0D1117',
                      background: isSubmitting
                        ? '#7A4D22'
                        : 'linear-gradient(135deg,#B87333,#D4956A)',
                      border:'none', padding:'20px 40px',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow:'0 0 40px rgba(184,115,51,0.25)',
                      transition:'all 0.3s', width:'100%',
                    }}
                    onMouseEnter={e=>{ if(!isSubmitting) e.currentTarget.style.boxShadow='0 0 60px rgba(184,115,51,0.45)' }}
                    onMouseLeave={e=>e.currentTarget.style.boxShadow='0 0 40px rgba(184,115,51,0.25)'}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{ width:16, height:16, border:'2px solid rgba(13,17,23,0.3)', borderTopColor:'#0D1117', borderRadius:'50%', animation:'spin 0.7s linear infinite' }}/>
                        Sending...
                      </>
                    ) : (
                      <>Send Enquiry <ArrowUpRight size={15}/></>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  )
}