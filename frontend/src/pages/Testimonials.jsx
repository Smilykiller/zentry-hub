// ══════════════════════════════════════════════════════════════════
// TESTIMONIALS PAGE
// ══════════════════════════════════════════════════════════════════
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { testimonialSchema } from '@/utils/validators'
import { testimonialsApi } from '@/services/testimonialsApi'
import { Star, Send, CheckCircle } from 'lucide-react'

const fadeUp = {
  hidden:  { opacity:0, y:36 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ duration:0.7, delay:i*0.08, ease:[0.16,1,0.3,1] } })
}

const inputStyle = {
  width:'100%', background:'#0D1117',
  border:'1px solid #2A3446', color:'#F0EDE8',
  padding:'14px 18px',
  fontFamily:"'Space Grotesk',sans-serif", fontSize:14,
  outline:'none', transition:'border-color 0.2s', borderRadius:0,
}

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div style={{ display:'flex', gap:6 }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background:'none', border:'none', cursor:'pointer', padding:2,
            color: n <= (hovered || value) ? '#B87333' : '#2A3446',
            transition:'color 0.15s', fontSize:0,
          }}
        >
          <Star size={24} fill={n <= (hovered || value) ? '#B87333' : 'none'}/>
        </button>
      ))}
    </div>
  )
}

function TestimonialCard({ t, index }) {
  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={{ once:true, amount:0.15 }} custom={index}
      style={{
        background:'#161B22', border:'1px solid #2A3446',
        padding:'40px', position:'relative', overflow:'hidden',
        transition:'border-color 0.3s, transform 0.3s',
      }}
      whileHover={{ y:-4, borderColor:'rgba(184,115,51,0.35)' }}
    >
      {/* Quote mark */}
      <div style={{
        position:'absolute', top:24, right:28,
        fontFamily:"'DM Serif Display',serif",
        fontSize:80, color:'rgba(184,115,51,0.08)',
        lineHeight:1, userSelect:'none', pointerEvents:'none',
      }}>"</div>

      {/* Stars */}
      <div style={{ display:'flex', gap:4, marginBottom:24 }}>
        {[1,2,3,4,5].map(n => (
          <Star key={n} size={14}
            fill={n <= t.rating ? '#B87333' : 'none'}
            color={n <= t.rating ? '#B87333' : '#2A3446'}
          />
        ))}
      </div>

      <p style={{
        fontFamily:"'DM Serif Display',serif",
        fontStyle:'italic',
        fontSize:'clamp(16px,2vw,20px)',
        color:'#F0EDE8', lineHeight:1.65, marginBottom:32,
      }}>
        "{t.review_text}"
      </p>

      <div style={{ borderTop:'1px solid #2A3446', paddingTop:24 }}>
        <p style={{
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:20, letterSpacing:'0.05em', color:'#F0EDE8', marginBottom:4,
        }}>
          {t.author_name}
        </p>
        <p style={{
          fontFamily:"'Fragment Mono',monospace",
          fontSize:10, color:'#B87333',
          letterSpacing:'0.15em', textTransform:'uppercase',
        }}>
          {t.project_name}
        </p>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const [submitted, setSubmitted] = useState(false)
  const [rating, setRating] = useState(5)
  const [ratingError, setRatingError] = useState('')

  const { data:testimonials=[], isLoading } = useQuery({
    queryKey:['testimonials'],
    queryFn: () => testimonialsApi.getApproved().then(r=>r.data),
  })

  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { rating:5 },
  })

  const onSubmit = async (data) => {
    if (!rating) { setRatingError('Please select a rating'); return }
    setRatingError('')
    try {
      await testimonialsApi.submit({ ...data, rating })
      setSubmitted(true)
    } catch {}
  }

  const placeholderTestimonials = [
    { id:1, author_name:'Rajesh Kumar', project_name:'Smart Campus System', review_text:'The team at Zentry Hub delivered beyond our expectations. The campus management system they built handles our 8,000 students without breaking a sweat. Exceptional technical depth.', rating:5 },
    { id:2, author_name:'Priya Mehta', project_name:'E-commerce Platform', review_text:'What stood out was how much they understood our business before writing a single line of code. The architecture they designed will scale with us for years.', rating:5 },
    { id:3, author_name:'Arun Selvam', project_name:'Data Analytics Dashboard', review_text:'Rare to find engineers who communicate as clearly as they code. Weekly updates, zero surprises, delivered on time. Highly recommend.', rating:5 },
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials : placeholderTestimonials

  return (
    <>
      <Helmet>
        <title>Clients — Zentry Hub</title>
        <meta name="description" content="What clients say about working with Zentry Hub." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Fragment+Mono&family=DM+Serif+Display:ital@0;1&display=swap');
        input:focus,textarea:focus{border-color:rgba(184,115,51,0.6)!important;}
        input::placeholder,textarea::placeholder{color:#2A3446;}
        @media(max-width:768px){.tgrid{grid-template-columns:1fr!important;}}
      `}</style>

      {/* HERO */}
      <section style={{
        minHeight:'55vh', background:'#0D1117',
        display:'flex', flexDirection:'column', justifyContent:'flex-end',
        padding:'120px 2.5rem 80px', position:'relative', overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', bottom:-40, right:-60,
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:'clamp(120px,25vw,360px)',
          color:'rgba(74,111,165,0.04)',
          lineHeight:1, userSelect:'none', pointerEvents:'none', letterSpacing:'-0.05em',
        }}>CLIENTS</div>

        <div style={{ maxWidth:1280, margin:'0 auto', width:'100%' }}>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0}
            style={{ fontFamily:"'Fragment Mono',monospace", fontSize:11, color:'#B87333', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:24 }}>
            Social proof
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:'clamp(64px,12vw,160px)',
              letterSpacing:'-0.02em', lineHeight:0.9, color:'#F0EDE8', marginBottom:24,
            }}>
            What clients<br/>
            <span style={{ fontFamily:"'DM Serif Display',serif", fontStyle:'italic', color:'#B87333' }}>
              actually say.
            </span>
          </motion.h1>
        </div>
      </section>

      {/* TESTIMONIALS GRID */}
      <section style={{ background:'#0D1117', padding:'80px 2.5rem', borderTop:'1px solid #2A3446' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          {isLoading ? (
            <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}>
              <div style={{ width:32, height:32, border:'2px solid #2A3446', borderTopColor:'#B87333', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
            </div>
          ) : (
            <div className="tgrid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2, background:'#2A3446' }}>
              {displayTestimonials.map((t,i) => (
                <TestimonialCard key={t.id} t={t} index={i}/>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SUBMIT REVIEW */}
      <section style={{ background:'#161B22', borderTop:'1px solid #2A3446', padding:'100px 2.5rem' }}>
        <div style={{ maxWidth:640, margin:'0 auto' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}>
            <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:11, color:'#B87333', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:16, textAlign:'center' }}>
              Worked with us?
            </p>
            <h2 style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:'clamp(40px,8vw,88px)',
              letterSpacing:'-0.02em', color:'#F0EDE8', lineHeight:1,
              textAlign:'center', marginBottom:48,
            }}>
              Leave a review.
            </h2>

            {submitted ? (
              <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                style={{
                  border:'1px solid rgba(82,183,136,0.3)',
                  background:'rgba(82,183,136,0.05)',
                  padding:'48px', textAlign:'center',
                }}>
                <CheckCircle size={40} color="#52B788" style={{ marginBottom:20 }}/>
                <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:40, color:'#F0EDE8', marginBottom:12 }}>
                  Thank you!
                </h3>
                <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, color:'#8B9DB5' }}>
                  Your review has been submitted and will appear after moderation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} style={{ display:'flex', flexDirection:'column', gap:20 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                  <div>
                    <label style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#4A5568', letterSpacing:'0.18em', textTransform:'uppercase', display:'block', marginBottom:8 }}>Your Name *</label>
                    <input {...register('author_name')} placeholder="Full name" style={inputStyle}/>
                    {errors.author_name && <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#E07070', marginTop:5 }}>{errors.author_name.message}</p>}
                  </div>
                  <div>
                    <label style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#4A5568', letterSpacing:'0.18em', textTransform:'uppercase', display:'block', marginBottom:8 }}>Project Name *</label>
                    <input {...register('project_name')} placeholder="Project we worked on" style={inputStyle}/>
                    {errors.project_name && <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#E07070', marginTop:5 }}>{errors.project_name.message}</p>}
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#4A5568', letterSpacing:'0.18em', textTransform:'uppercase', display:'block', marginBottom:10 }}>Rating *</label>
                  <StarRating value={rating} onChange={setRating}/>
                  {ratingError && <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#E07070', marginTop:5 }}>{ratingError}</p>}
                </div>

                <div>
                  <label style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#4A5568', letterSpacing:'0.18em', textTransform:'uppercase', display:'block', marginBottom:8 }}>Your Review *</label>
                  <textarea {...register('review_text')} rows={5} placeholder="Share your experience working with us..." style={{ ...inputStyle, resize:'vertical', minHeight:130 }}/>
                  {errors.review_text && <p style={{ fontFamily:"'Fragment Mono',monospace", fontSize:10, color:'#E07070', marginTop:5 }}>{errors.review_text.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting}
                  style={{
                    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:10,
                    fontFamily:"'Space Grotesk',sans-serif",
                    fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase',
                    color:'#0D1117',
                    background: isSubmitting ? '#7A4D22' : 'linear-gradient(135deg,#B87333,#D4956A)',
                    border:'none', padding:'18px 36px', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow:'0 0 30px rgba(184,115,51,0.2)',
                    transition:'all 0.3s', width:'100%',
                  }}>
                  {isSubmitting ? 'Submitting...' : <><Send size={14}/> Submit Review</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  )
}

export default Testimonials