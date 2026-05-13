import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/utils/validators'
import { contactApi } from '@/services/contactApi'
import { ArrowUpRight, CheckCircle, MapPin, Mail, Clock } from 'lucide-react'

const T = {
  bg:'#08090B', surface:'#0F1117', card:'#141820',
  border:'#1E2535', borderL:'#2A3446',
  copper:'#C4843A', copperL:'#E09B52', copperD:'#8A5C28',
  slate:'#4A6FA5', white:'#F2EFE9', gray:'#8A97AB', grayD:'#404B5C',
}

function Reveal({ children, delay=0, y=28, style={} }) {
  return (
    <motion.div initial={{opacity:0,y}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,amount:0.15}}
      transition={{duration:0.75,delay,ease:[0.16,1,0.3,1]}} style={style}>
      {children}
    </motion.div>
  )
}

const inputBase = {
  width:'100%', background:T.surface,
  border:`1px solid ${T.border}`,
  color:T.white, padding:'14px 16px',
  fontFamily:"'Space Grotesk',sans-serif",
  fontSize:15, outline:'none',
  transition:'border-color 0.2s',
  borderRadius:0, appearance:'none',
}

const SERVICES = [
  'Full-Stack Web Engineering','AI & Machine Learning',
  'Niche Domain Systems','Data Architecture',
  'Technical Consulting','Maintenance & Support','Not sure yet',
]

const BUDGETS = [
  'Under ₹50,000','₹50,000 – ₹2,00,000',
  '₹2,00,000 – ₹5,00,000','₹5,00,000+','Let\'s discuss',
]

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
    } catch(e) {
      setServerError(e?.response?.data?.error || 'Something went wrong. Please try again.')
    }
  }

  const Field = ({ label, error, children }) => (
    <div>
      <label style={{fontFamily:"'Fragment Mono',monospace",fontSize:9,color:T.grayD,letterSpacing:'0.2em',textTransform:'uppercase',display:'block',marginBottom:10}}>
        {label}
      </label>
      {children}
      {error && <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:10,color:'#E07070',marginTop:6}}>{error}</p>}
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Contact — Zentry Hub</title>
        <meta name="description" content="Start a project with Zentry Hub. Tell us what you're building."/>
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Fragment+Mono&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .container{max-width:1200px;margin:0 auto;width:100%;}
        input:focus,select:focus,textarea:focus{border-color:rgba(196,132,58,0.6)!important;outline:none;}
        input::placeholder,textarea::placeholder{color:#2A3446;}
        select option{background:#141820;color:#F2EFE9;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @media(max-width:768px){
          .contact-grid{grid-template-columns:1fr!important;}
          .form-row{grid-template-columns:1fr!important;}
        }
        @media(max-width:480px){.hero-pad{padding:100px 20px 60px!important;}.form-pad{padding:0 20px 80px!important;}}
      `}</style>

      {/* HERO */}
      <section className="hero-pad" style={{background:T.bg,padding:'140px 48px 80px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',bottom:-40,right:-40,fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(120px,20vw,280px)',color:'rgba(74,111,165,0.03)',letterSpacing:'-0.05em',lineHeight:1,userSelect:'none',pointerEvents:'none'}}>TALK</div>
        <div className="container">
          <Reveal>
            <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:10,color:T.copper,letterSpacing:'0.22em',textTransform:'uppercase',marginBottom:20}}>Get in touch</p>
          </Reveal>
          <div style={{overflow:'hidden'}}>
            <motion.h1 initial={{y:'105%'}} animate={{y:'0%'}} transition={{duration:1,delay:0.1,ease:[0.16,1,0.3,1]}}
              style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(52px,9vw,128px)',letterSpacing:'-0.025em',lineHeight:0.9,color:T.white}}>
              Let's build
            </motion.h1>
          </div>
          <div style={{overflow:'hidden'}}>
            <motion.h1 initial={{y:'105%'}} animate={{y:'0%'}} transition={{duration:1,delay:0.18,ease:[0.16,1,0.3,1]}}
              style={{fontFamily:"'DM Serif Display',serif",fontStyle:'italic',fontSize:'clamp(46px,8vw,112px)',letterSpacing:'-0.02em',lineHeight:0.95,color:T.copper}}>
              something real.
            </motion.h1>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="form-pad" style={{background:T.bg,padding:'0 48px 120px',borderTop:`1px solid ${T.border}`}}>
        <div className="container">
          <div className="contact-grid" style={{display:'grid',gridTemplateColumns:'1fr 1.8fr',gap:80,paddingTop:80}}>

            {/* LEFT INFO */}
            <Reveal>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:16,color:T.gray,lineHeight:1.85,fontWeight:300,marginBottom:56}}>
                Tell us what you're building. We'll tell you if we're the right studio — honestly, even if the answer is no.
              </p>
              <div style={{display:'flex',flexDirection:'column',gap:28}}>
                {[
                  {icon:<MapPin size={14}/>, label:'Location',      val:'Coimbatore, Tamil Nadu, India'},
                  {icon:<Mail size={14}/>,   label:'Email',         val:'hello@zentryhub.in'},
                  {icon:<Clock size={14}/>,  label:'Response time', val:'Within 24 hours'},
                ].map(item=>(
                  <div key={item.label} style={{display:'flex',gap:16,alignItems:'flex-start'}}>
                    <div style={{width:36,height:36,border:`1px solid ${T.border}`,display:'flex',alignItems:'center',justifyContent:'center',color:T.copper,flexShrink:0}}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:9,color:T.grayD,letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:4}}>{item.label}</p>
                      <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:14,color:T.gray}}>{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* RIGHT FORM */}
            <Reveal delay={0.1}>
              {submitted ? (
                <motion.div initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}}
                  style={{border:`1px solid rgba(82,183,136,0.3)`,background:'rgba(82,183,136,0.04)',padding:'56px 44px',textAlign:'center'}}>
                  <CheckCircle size={40} color="#52B788" style={{marginBottom:20,display:'block',margin:'0 auto 20px'}}/>
                  <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:40,letterSpacing:'0.04em',color:T.white,marginBottom:12,lineHeight:1}}>Message Received.</h3>
                  <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:15,color:T.gray,lineHeight:1.75,fontWeight:300}}>
                    We've got your enquiry and will respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',flexDirection:'column',gap:20}}>

                  <div className="form-row" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                    <Field label="Full Name *" error={errors.name?.message}>
                      <input {...register('name')} placeholder="Your name"
                        style={inputBase}
                        onFocus={e=>e.target.style.borderColor='rgba(196,132,58,0.6)'}
                        onBlur={e=>e.target.style.borderColor=T.border}
                      />
                    </Field>
                    <Field label="Email *" error={errors.email?.message}>
                      <input {...register('email')} type="email" placeholder="your@email.com"
                        style={inputBase}
                        onFocus={e=>e.target.style.borderColor='rgba(196,132,58,0.6)'}
                        onBlur={e=>e.target.style.borderColor=T.border}
                      />
                    </Field>
                  </div>

                  <Field label="Service *" error={errors.service?.message}>
                    <select {...register('service')} style={{...inputBase,cursor:'pointer'}}>
                      <option value="">Select a service...</option>
                      {SERVICES.map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>

                  <Field label="Budget Range">
                    <select {...register('budget')} style={{...inputBase,cursor:'pointer'}}>
                      <option value="">Select a range...</option>
                      {BUDGETS.map(b=><option key={b} value={b}>{b}</option>)}
                    </select>
                  </Field>

                  <Field label="Project Description *" error={errors.message?.message}>
                    <textarea {...register('message')} rows={6}
                      placeholder="Tell us what you're building — what problem it solves, who uses it, and what stage you're at..."
                      style={{...inputBase,resize:'vertical',minHeight:148}}
                      onFocus={e=>e.target.style.borderColor='rgba(196,132,58,0.6)'}
                      onBlur={e=>e.target.style.borderColor=T.border}
                    />
                  </Field>

                  {serverError && (
                    <div style={{background:'rgba(224,112,112,0.07)',border:'1px solid rgba(224,112,112,0.25)',padding:'13px 16px',fontFamily:"'Space Grotesk',sans-serif",fontSize:13,color:'#E07070'}}>
                      {serverError}
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} style={{
                    display:'inline-flex',alignItems:'center',justifyContent:'center',gap:8,
                    fontFamily:"'Space Grotesk',sans-serif",fontSize:11,fontWeight:700,
                    letterSpacing:'0.18em',textTransform:'uppercase',
                    color:T.bg,border:'none',
                    background:isSubmitting?T.copperD:`linear-gradient(135deg,${T.copper},${T.copperL})`,
                    padding:'16px',width:'100%',
                    cursor:isSubmitting?'not-allowed':'pointer',
                    boxShadow:`0 0 36px rgba(196,132,58,0.2)`,
                    transition:'opacity 0.2s,transform 0.2s',
                    marginTop:4,
                  }}
                    onMouseEnter={e=>{if(!isSubmitting){e.currentTarget.style.opacity='0.88';e.currentTarget.style.transform='translateY(-1px)'}}}
                    onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='translateY(0)'}}
                  >
                    {isSubmitting ? (
                      <div style={{width:16,height:16,border:'2px solid rgba(8,9,11,0.3)',borderTopColor:T.bg,borderRadius:'50%',animation:'spin 0.7s linear infinite'}}/>
                    ) : (
                      <><ArrowUpRight size={14}/> Send Enquiry</>
                    )}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}