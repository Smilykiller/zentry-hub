import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '@/context/AuthContext'
import { loginSchema } from '@/utils/validators'
import { ArrowUpRight, Eye, EyeOff } from 'lucide-react'

const T = {
  bg:'#08090B', surface:'#0F1117', card:'#141820',
  border:'#1E2535', copper:'#C4843A', copperL:'#E09B52',
  white:'#F2EFE9', gray:'#8A97AB', grayD:'#404B5C',
}

export default function AdminLogin() {
  const { login, admin, loading } = useAuth()
  const navigate  = useNavigate()
  const [error,  setError]  = useState('')
  const [showPw, setShowPw] = useState(false)

  // If already logged in, go to dashboard
  useEffect(() => {
    if (!loading && admin) {
      navigate('/admin', { replace: true })
    }
  }, [admin, loading, navigate])

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    try {
      setError('')
      // Clear any stale cookies first
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      await login(data.email, data.password)
      navigate('/admin', { replace: true })
    } catch (e) {
      const msg = e?.response?.data?.error || 'Invalid credentials. Please try again.'
      setError(msg)
    }
  }

  // Show loading while checking existing auth
  if (loading) {
    return (
      <div style={{ minHeight:'100vh', background:T.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:24, height:24, border:`2px solid ${T.border}`, borderTopColor:T.copper, borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  return (
    <>
      <Helmet><title>Admin Login — Zentry Hub</title></Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&family=Fragment+Mono&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes rotHex{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        input:focus{border-color:rgba(196,132,58,0.7)!important;outline:none;}
        input::placeholder{color:#2A3446;}
        @media(max-width:768px){.login-split{grid-template-columns:1fr!important;}.login-left{display:none!important;}}
      `}</style>

      <div style={{ minHeight:'100vh', background:T.bg, display:'flex' }}>

        {/* LEFT PANEL */}
        <div className="login-left" style={{
          width:'44%', background:T.surface,
          borderRight:`1px solid ${T.border}`,
          display:'flex', flexDirection:'column',
          justifyContent:'center', alignItems:'center',
          padding:'60px', position:'relative', overflow:'hidden',
        }}>
          {/* Rotating hex rings */}
          {[360, 280, 200].map((s,i)=>(
            <div key={s} style={{
              position:'absolute', top:'50%', left:'50%',
              width:s, height:s, marginLeft:-s/2, marginTop:-s/2,
              border:`1px solid rgba(196,132,58,${0.08-i*0.02})`,
              borderRadius:'50%',
              animation:`rotHex ${35+i*10}s linear infinite${i%2?' reverse':''}`,
            }}/>
          ))}

          <div style={{ position:'relative', textAlign:'center' }}>
            {/* Z polygon mark */}
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" style={{marginBottom:28,display:'block',margin:'0 auto 28px'}}>
              <polygon points="50,4 96,28 96,72 50,96 4,72 4,28" fill="none" stroke="rgba(196,132,58,0.25)" strokeWidth="1.5"/>
              <polygon points="22,20 78,20 78,32 38,68 78,68 78,80 22,80 22,68 62,32 22,32" fill="url(#lg1)"/>
              <defs>
                <linearGradient id="lg1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E09B52"/><stop offset="1" stopColor="#C4843A"/>
                </linearGradient>
              </defs>
            </svg>

            <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:44,letterSpacing:'0.1em',color:T.white,lineHeight:1,marginBottom:8}}>
              ZENTRY<span style={{color:T.copper}}>HUB</span>
            </h1>
            <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:9,color:T.grayD,letterSpacing:'0.22em',textTransform:'uppercase',marginBottom:48}}>
              Control Panel
            </p>

            <div style={{display:'flex',flexDirection:'column',gap:14,maxWidth:260}}>
              {['Manage portfolio projects','Approve client reviews','View contact enquiries'].map((f,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:3,height:3,background:T.copper,flexShrink:0}}/>
                  <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:14,color:T.gray,fontWeight:300}}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'60px 40px' }}>
          <div style={{ width:'100%', maxWidth:400 }}>

            <div style={{marginBottom:44}}>
              <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:9,color:T.copper,letterSpacing:'0.22em',textTransform:'uppercase',marginBottom:12}}>
                Restricted Access
              </p>
              <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(44px,6vw,64px)',letterSpacing:'-0.01em',color:T.white,lineHeight:0.95}}>
                System<br/>Login.
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',flexDirection:'column',gap:20}}>

              {/* Email */}
              <div>
                <label style={{fontFamily:"'Fragment Mono',monospace",fontSize:9,color:T.grayD,letterSpacing:'0.2em',textTransform:'uppercase',display:'block',marginBottom:10}}>
                  Email Address
                </label>
                <input {...register('email')} type="email" placeholder="admin@zentryhub.in"
                  style={{width:'100%',background:T.card,border:`1px solid ${T.border}`,color:T.white,padding:'14px 16px',fontFamily:"'Space Grotesk',sans-serif",fontSize:15,outline:'none',transition:'border-color 0.2s',borderRadius:0}}
                />
                {errors.email && <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:10,color:'#E07070',marginTop:6}}>{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label style={{fontFamily:"'Fragment Mono',monospace",fontSize:9,color:T.grayD,letterSpacing:'0.2em',textTransform:'uppercase',display:'block',marginBottom:10}}>
                  Password
                </label>
                <div style={{position:'relative'}}>
                  <input {...register('password')} type={showPw?'text':'password'} placeholder="••••••••"
                    style={{width:'100%',background:T.card,border:`1px solid ${T.border}`,color:T.white,padding:'14px 48px 14px 16px',fontFamily:"'Space Grotesk',sans-serif",fontSize:15,outline:'none',transition:'border-color 0.2s',borderRadius:0}}
                  />
                  <button type="button" onClick={()=>setShowPw(!showPw)}
                    style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:T.grayD,padding:0,display:'flex'}}>
                    {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
                {errors.password && <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:10,color:'#E07070',marginTop:6}}>{errors.password.message}</p>}
              </div>

              {/* Error */}
              {error && (
                <div style={{background:'rgba(224,112,112,0.07)',border:'1px solid rgba(224,112,112,0.25)',padding:'13px 16px',fontFamily:"'Space Grotesk',sans-serif",fontSize:13,color:'#E07070'}}>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={isSubmitting}
                style={{
                  display:'flex',alignItems:'center',justifyContent:'center',gap:8,
                  fontFamily:"'Space Grotesk',sans-serif",fontSize:11,fontWeight:700,
                  letterSpacing:'0.18em',textTransform:'uppercase',
                  color:T.bg,border:'none',
                  background:isSubmitting?T.copper:`linear-gradient(135deg,${T.copper},${T.copperL})`,
                  padding:'16px',width:'100%',
                  cursor:isSubmitting?'not-allowed':'pointer',
                  marginTop:8,
                  boxShadow:`0 0 36px rgba(196,132,58,0.2)`,
                  transition:'opacity 0.2s,transform 0.2s',
                }}
                onMouseEnter={e=>{if(!isSubmitting){e.currentTarget.style.opacity='0.88';e.currentTarget.style.transform='translateY(-1px)'}}}
                onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='translateY(0)'}}
              >
                {isSubmitting ? (
                  <div style={{width:16,height:16,border:'2px solid rgba(8,9,11,0.3)',borderTopColor:T.bg,borderRadius:'50%',animation:'spin 0.7s linear infinite'}}/>
                ) : (
                  <><ArrowUpRight size={14}/> Access Dashboard</>
                )}
              </button>
            </form>

            <p style={{fontFamily:"'Fragment Mono',monospace",fontSize:9,color:T.border,letterSpacing:'0.12em',textAlign:'center',marginTop:32}}>
              Unauthorised access is monitored and logged.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}