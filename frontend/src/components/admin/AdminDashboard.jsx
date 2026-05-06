import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import { projectsApi } from '@/services/projectsApi'
import { testimonialsApi } from '@/services/testimonialsApi'
import { adminApi } from '@/services/adminApi'
import {
  LogOut, Plus, Trash2, Check, X,
  FolderOpen, MessageSquare, Mail,
  Eye, Star, ChevronDown, ChevronUp,
  ArrowUpRight, Edit2, AlertCircle
} from 'lucide-react'

// ── Colour tokens ─────────────────────────────────────────────────
const C = {
  bg:      '#0D1117',
  mid:     '#161B22',
  surface: '#1C2333',
  border:  '#2A3446',
  copper:  '#B87333',
  copperL: '#D4956A',
  slate:   '#4A6FA5',
  white:   '#F0EDE8',
  gray:    '#8B9DB5',
  grayD:   '#4A5568',
  success: '#52B788',
  danger:  '#E07070',
}

// ── Shared style helpers ──────────────────────────────────────────
const label = {
  fontFamily: "'Fragment Mono', monospace",
  fontSize: 9, letterSpacing: '0.22em',
  textTransform: 'uppercase', color: C.grayD,
}
const inputSty = {
  width: '100%', background: C.bg,
  border: `1px solid ${C.border}`,
  color: C.white, padding: '12px 16px',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 14, outline: 'none',
  transition: 'border-color 0.2s',
  borderRadius: 0,
}
const btnCopper = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 11, fontWeight: 700,
  letterSpacing: '0.18em', textTransform: 'uppercase',
  border: 'none', cursor: 'pointer', color: C.bg,
  background: `linear-gradient(135deg, ${C.copper}, ${C.copperL})`,
  padding: '12px 24px', transition: 'opacity 0.2s',
}
const btnGhost = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 11, fontWeight: 600,
  letterSpacing: '0.15em', textTransform: 'uppercase',
  border: `1px solid ${C.border}`,
  cursor: 'pointer', color: C.gray,
  background: 'transparent', padding: '11px 20px',
  transition: 'all 0.2s',
}
const btnDanger = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 10, fontWeight: 600,
  letterSpacing: '0.12em', textTransform: 'uppercase',
  border: `1px solid rgba(224,112,112,0.3)`,
  cursor: 'pointer', color: C.danger,
  background: 'rgba(224,112,112,0.06)', padding: '8px 14px',
  transition: 'all 0.2s',
}
const btnSuccess = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 10, fontWeight: 600,
  letterSpacing: '0.12em', textTransform: 'uppercase',
  border: `1px solid rgba(82,183,136,0.3)`,
  cursor: 'pointer', color: C.success,
  background: 'rgba(82,183,136,0.06)', padding: '8px 14px',
  transition: 'all 0.2s',
}

// ── Spinner ───────────────────────────────────────────────────────
const Spin = ({ size = 20 }) => (
  <div style={{
    width: size, height: size,
    border: `2px solid ${C.border}`,
    borderTopColor: C.copper,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    flexShrink: 0,
  }} />
)

// ── Stat card ─────────────────────────────────────────────────────
const StatCard = ({ icon, label: lbl, value, color }) => (
  <div style={{
    background: C.mid, border: `1px solid ${C.border}`,
    padding: '28px 24px', display: 'flex', gap: 20, alignItems: 'center',
  }}>
    <div style={{
      width: 48, height: 48, flexShrink: 0,
      border: `1px solid ${color}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color,
    }}>
      {icon}
    </div>
    <div>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 40, color: C.white, lineHeight: 1,
      }}>{value}</div>
      <div style={{ ...label, color: C.grayD, marginTop: 4 }}>{lbl}</div>
    </div>
  </div>
)

// ══════════════════════════════════════════════════════════════════
//  PROJECTS TAB
// ══════════════════════════════════════════════════════════════════
function ProjectsTab() {
  const qc = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title: '', category: '', description: '',
    tech_stack: '', live_url: '', github_url: '',
    is_featured: false, display_order: 0,
  })
  const [imgFile, setImgFile] = useState(null)
  const [confirmDel, setConfirmDel] = useState(null)

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => projectsApi.getAll().then(r => r.data),
  })

  const createMut = useMutation({
    mutationFn: (fd) => projectsApi.create(fd),
    onSuccess: () => { qc.invalidateQueries(['admin-projects']); resetForm() },
  })

  const deleteMut = useMutation({
    mutationFn: (id) => projectsApi.remove(id),
    onSuccess: () => { qc.invalidateQueries(['admin-projects']); setConfirmDel(null) },
  })

  const updateMut = useMutation({
    mutationFn: ({ id, data }) => projectsApi.update(id, data),
    onSuccess: () => { qc.invalidateQueries(['admin-projects']); resetForm() },
  })

  const resetForm = () => {
    setForm({ title: '', category: '', description: '', tech_stack: '', live_url: '', github_url: '', is_featured: false, display_order: 0 })
    setImgFile(null)
    setEditing(null)
    setShowForm(false)
  }

  const startEdit = (p) => {
    setForm({
      title: p.title, category: p.category, description: p.description,
      tech_stack: p.tech_stack.join(', '),
      live_url: p.live_url || '', github_url: p.github_url || '',
      is_featured: p.is_featured, display_order: p.display_order,
    })
    setEditing(p.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = () => {
    const fd = new FormData()
    fd.append('title', form.title)
    fd.append('category', form.category)
    fd.append('description', form.description)
    fd.append('tech_stack', JSON.stringify(form.tech_stack.split(',').map(t => t.trim()).filter(Boolean)))
    fd.append('live_url', form.live_url)
    fd.append('github_url', form.github_url)
    fd.append('is_featured', form.is_featured)
    fd.append('display_order', form.display_order)
    if (imgFile) fd.append('image', imgFile)

    if (editing) {
      const data = {
        title: form.title, category: form.category,
        description: form.description,
        tech_stack: form.tech_stack.split(',').map(t => t.trim()).filter(Boolean),
        live_url: form.live_url || null,
        github_url: form.github_url || null,
        is_featured: form.is_featured,
        display_order: parseInt(form.display_order),
      }
      updateMut.mutate({ id: editing, data })
    } else {
      createMut.mutate(fd)
    }
  }

  const inp = (field, label_text, opts = {}) => (
    <div>
      <div style={{ ...label, marginBottom: 8 }}>{label_text}</div>
      <input
        value={form[field]}
        onChange={e => setForm(f => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))}
        style={inputSty}
        onFocus={e => e.target.style.borderColor = `rgba(184,115,51,0.6)`}
        onBlur={e => e.target.style.borderColor = C.border}
        {...opts}
      />
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 40, color: C.white, letterSpacing: '0.04em', lineHeight: 1 }}>Projects</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, color: C.gray, marginTop: 4 }}>{projects.length} total</p>
        </div>
        <button style={btnCopper} onClick={() => { resetForm(); setShowForm(!showForm) }}>
          <Plus size={14} /> {showForm && !editing ? 'Cancel' : 'Add Project'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: C.mid, border: `1px solid ${C.border}`, padding: '36px', marginBottom: 32, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.copper}, ${C.copperL})` }} />
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: C.white, letterSpacing: '0.04em', marginBottom: 28 }}>
            {editing ? 'Edit Project' : 'New Project'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {inp('title', 'Title *', { placeholder: 'Project name' })}
            {inp('category', 'Category *', { placeholder: 'e.g. Web Engineering' })}
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ ...label, marginBottom: 8 }}>Description *</div>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={4} placeholder="Project description..."
              style={{ ...inputSty, resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = `rgba(184,115,51,0.6)`}
              onBlur={e => e.target.style.borderColor = C.border}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {inp('tech_stack', 'Tech Stack (comma separated)', { placeholder: 'React, Node.js, PostgreSQL' })}
            <div>
              <div style={{ ...label, marginBottom: 8 }}>Project Image</div>
              <input type="file" accept="image/*"
                onChange={e => setImgFile(e.target.files[0])}
                style={{ ...inputSty, padding: '10px 16px', cursor: 'pointer' }}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: 16, marginBottom: 24 }}>
            {inp('live_url', 'Live URL', { placeholder: 'https://...' })}
            {inp('github_url', 'GitHub URL', { placeholder: 'https://github.com/...' })}
            <div>
              <div style={{ ...label, marginBottom: 8 }}>Order</div>
              <input type="number" value={form.display_order}
                onChange={e => setForm(f => ({ ...f, display_order: e.target.value }))}
                style={inputSty}
                onFocus={e => e.target.style.borderColor = `rgba(184,115,51,0.6)`}
                onBlur={e => e.target.style.borderColor = C.border}
              />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <input type="checkbox" id="featured" checked={form.is_featured}
              onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))}
              style={{ accentColor: C.copper, width: 16, height: 16 }}
            />
            <label htmlFor="featured" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, color: C.gray, cursor: 'pointer' }}>
              Feature on homepage
            </label>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={btnCopper} onClick={submit}
              disabled={createMut.isLoading || updateMut.isLoading}>
              {(createMut.isLoading || updateMut.isLoading) ? <Spin size={14} /> : null}
              {editing ? 'Save Changes' : 'Create Project'}
            </button>
            <button style={btnGhost} onClick={resetForm}>Cancel</button>
          </div>
        </div>
      )}

      {/* Projects list */}
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Spin size={32} /></div>
      ) : projects.length === 0 ? (
        <div style={{ background: C.mid, border: `1px solid ${C.border}`, padding: '60px', textAlign: 'center' }}>
          <FolderOpen size={40} color={C.grayD} style={{ marginBottom: 16 }} />
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", color: C.gray }}>No projects yet. Add your first one.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: C.border }}>
          {projects.map(p => (
            <div key={p.id} style={{ background: C.mid, padding: '24px 28px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: C.white, letterSpacing: '0.04em' }}>{p.title}</span>
                  <span style={{ ...label, color: C.copper, border: `1px solid ${C.copper}40`, padding: '2px 8px' }}>{p.category}</span>
                  {p.is_featured && <span style={{ ...label, color: C.success, border: `1px solid rgba(82,183,136,0.4)`, padding: '2px 8px' }}>Featured</span>}
                </div>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: C.gray, marginBottom: 10, lineHeight: 1.6 }}>
                  {p.description.substring(0, 120)}{p.description.length > 120 ? '...' : ''}
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.tech_stack.map(t => (
                    <span key={t} style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 9, color: C.grayD, border: `1px solid ${C.border}`, padding: '2px 8px', letterSpacing: '0.08em' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button style={btnGhost} onClick={() => startEdit(p)}>
                  <Edit2 size={12} /> Edit
                </button>
                {confirmDel === p.id ? (
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 10, color: C.danger }}>Sure?</span>
                    <button style={btnDanger} onClick={() => deleteMut.mutate(p.id)}>
                      {deleteMut.isLoading ? <Spin size={12} /> : <Check size={12} />} Yes
                    </button>
                    <button style={btnGhost} onClick={() => setConfirmDel(null)}><X size={12} /></button>
                  </div>
                ) : (
                  <button style={btnDanger} onClick={() => setConfirmDel(p.id)}>
                    <Trash2 size={12} /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
//  TESTIMONIALS TAB
// ══════════════════════════════════════════════════════════════════
function TestimonialsTab() {
  const qc = useQueryClient()
  const [tab, setTab] = useState('pending')

  const { data: approved = [], isLoading: loadA } = useQuery({
    queryKey: ['admin-testimonials-approved'],
    queryFn: () => testimonialsApi.getApproved().then(r => r.data),
  })
  const { data: pending = [], isLoading: loadP } = useQuery({
    queryKey: ['admin-testimonials-pending'],
    queryFn: () => testimonialsApi.getPending().then(r => r.data),
  })

  const approveMut = useMutation({
    mutationFn: (id) => testimonialsApi.approve(id),
    onSuccess: () => {
      qc.invalidateQueries(['admin-testimonials-approved'])
      qc.invalidateQueries(['admin-testimonials-pending'])
    },
  })
  const deleteMut = useMutation({
    mutationFn: (id) => testimonialsApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries(['admin-testimonials-approved'])
      qc.invalidateQueries(['admin-testimonials-pending'])
    },
  })

  const list = tab === 'pending' ? pending : approved
  const loading = tab === 'pending' ? loadP : loadA

  const Stars = ({ n }) => (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} fill={i <= n ? C.copper : 'none'} color={i <= n ? C.copper : C.border} />
      ))}
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 40, color: C.white, letterSpacing: '0.04em', lineHeight: 1 }}>Testimonials</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, color: C.gray, marginTop: 4 }}>
            {pending.length} pending · {approved.length} approved
          </p>
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: 2, background: C.border, marginBottom: 28, width: 'fit-content' }}>
        {['pending', 'approved'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            fontFamily: "'Fragment Mono',monospace",
            fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
            border: 'none', padding: '12px 24px', cursor: 'pointer',
            background: tab === t ? C.copper : C.mid,
            color: tab === t ? C.bg : C.gray,
            transition: 'all 0.2s',
            position: 'relative',
          }}>
            {t === 'pending' && pending.length > 0 && (
              <span style={{
                position: 'absolute', top: 6, right: 6,
                width: 16, height: 16, borderRadius: '50%',
                background: C.danger, color: '#fff',
                fontFamily: "'Fragment Mono',monospace", fontSize: 9,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{pending.length}</span>
            )}
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Spin size={32} /></div>
      ) : list.length === 0 ? (
        <div style={{ background: C.mid, border: `1px solid ${C.border}`, padding: '60px', textAlign: 'center' }}>
          <MessageSquare size={40} color={C.grayD} style={{ marginBottom: 16 }} />
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", color: C.gray }}>
            No {tab} reviews.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: C.border }}>
          {list.map(t => (
            <div key={t.id} style={{ background: C.mid, padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: C.white, letterSpacing: '0.04em' }}>{t.author_name}</span>
                    <span style={{ ...label, color: C.copper }}>{t.project_name}</span>
                    <Stars n={t.rating} />
                  </div>
                  <p style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', fontSize: 16, color: C.gray, lineHeight: 1.65, maxWidth: 600 }}>
                    "{t.review_text}"
                  </p>
                  <p style={{ ...label, color: C.grayD, marginTop: 10 }}>
                    {new Date(t.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {tab === 'pending' && (
                    <button style={btnSuccess} onClick={() => approveMut.mutate(t.id)}>
                      {approveMut.isLoading ? <Spin size={12} /> : <Check size={12} />} Approve
                    </button>
                  )}
                  <button style={btnDanger} onClick={() => deleteMut.mutate(t.id)}>
                    {deleteMut.isLoading ? <Spin size={12} /> : <Trash2 size={12} />} Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
//  LEADS TAB
// ══════════════════════════════════════════════════════════════════
function LeadsTab() {
  const qc = useQueryClient()
  const [expanded, setExpanded] = useState(null)

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: () => adminApi.getLeads().then(r => r.data),
  })

  const markReadMut = useMutation({
    mutationFn: (id) => adminApi.markRead(id),
    onSuccess: () => qc.invalidateQueries(['admin-leads']),
  })

  const unread = leads.filter(l => !l.is_read).length

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 40, color: C.white, letterSpacing: '0.04em', lineHeight: 1 }}>Leads</h2>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, color: C.gray, marginTop: 4 }}>
          {leads.length} total · <span style={{ color: unread > 0 ? C.danger : C.gray }}>{unread} unread</span>
        </p>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Spin size={32} /></div>
      ) : leads.length === 0 ? (
        <div style={{ background: C.mid, border: `1px solid ${C.border}`, padding: '60px', textAlign: 'center' }}>
          <Mail size={40} color={C.grayD} style={{ marginBottom: 16 }} />
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", color: C.gray }}>No enquiries yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: C.border }}>
          {leads.map(lead => (
            <div key={lead.id} style={{
              background: lead.is_read ? C.mid : `rgba(184,115,51,0.04)`,
              borderLeft: lead.is_read ? 'none' : `3px solid ${C.copper}`,
            }}>
              {/* Row header */}
              <div
                onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                style={{
                  padding: '20px 28px',
                  display: 'grid', gridTemplateColumns: '1fr 140px 120px 48px',
                  gap: 16, alignItems: 'center', cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    {!lead.is_read && <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.copper, flexShrink: 0 }} />}
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: C.white, letterSpacing: '0.04em' }}>{lead.name}</span>
                    <span style={{ ...label, color: C.slate }}>{lead.service}</span>
                  </div>
                  <p style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 11, color: C.grayD }}>{lead.email}</p>
                </div>
                <span style={{ ...label, color: C.copper }}>{lead.budget}</span>
                <span style={{ ...label, color: C.grayD }}>
                  {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
                {expanded === lead.id
                  ? <ChevronUp size={16} color={C.grayD} />
                  : <ChevronDown size={16} color={C.grayD} />
                }
              </div>

              {/* Expanded */}
              {expanded === lead.id && (
                <div style={{ padding: '0 28px 28px', borderTop: `1px solid ${C.border}` }}>
                  <p style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 15, color: C.gray, lineHeight: 1.8,
                    padding: '20px 0 24px',
                  }}>
                    {lead.message}
                  </p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <a href={`mailto:${lead.email}`} style={{ ...btnCopper, textDecoration: 'none', fontSize: 10 }}>
                      <Mail size={12} /> Reply via Email
                    </a>
                    {!lead.is_read && (
                      <button style={btnGhost} onClick={() => markReadMut.mutate(lead.id)}>
                        <Eye size={12} /> Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
//  MAIN DASHBOARD
// ══════════════════════════════════════════════════════════════════
export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('projects')

  const { data: projects = [] } = useQuery({ queryKey: ['admin-projects'], queryFn: () => projectsApi.getAll().then(r => r.data) })
  const { data: pending = [] } = useQuery({ queryKey: ['admin-testimonials-pending'], queryFn: () => testimonialsApi.getPending().then(r => r.data) })
  const { data: leads = [] } = useQuery({ queryKey: ['admin-leads'], queryFn: () => adminApi.getLeads().then(r => r.data) })

  const unreadLeads = leads.filter(l => !l.is_read).length

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const tabs = [
    { id: 'projects',      label: 'Projects',      icon: <FolderOpen size={16} />,    badge: null },
    { id: 'testimonials',  label: 'Testimonials',  icon: <MessageSquare size={16} />, badge: pending.length || null },
    { id: 'leads',         label: 'Leads',         icon: <Mail size={16} />,           badge: unreadLeads || null },
  ]

  return (
    <>
      <Helmet><title>Dashboard — Zentry Hub Admin</title></Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&family=Fragment+Mono&family=DM+Serif+Display:ital@0;1&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        input:focus, textarea:focus { border-color: rgba(184,115,51,0.6) !important; outline: none; }
        input::placeholder, textarea::placeholder { color: #2A3446; }
        select option { background: #161B22; color: #F0EDE8; }
      `}</style>

      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>

        {/* ── TOP BAR ── */}
        <header style={{
          background: C.mid, borderBottom: `1px solid ${C.border}`,
          padding: '0 2rem', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 50,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Z polygon mark */}
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
              <polygon points="50,4 96,28 96,72 50,96 4,72 4,28" fill="none" stroke="#B87333" strokeWidth="2" opacity="0.4" />
              <polygon points="22,20 78,20 78,32 38,68 78,68 78,80 22,80 22,68 62,32 22,32" fill="url(#ag)" />
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B87333" /><stop offset="1" stopColor="#D4956A" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: '0.12em', color: C.white }}>
                ZENTRY<span style={{ color: C.copper }}>HUB</span>
              </span>
              <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 9, color: C.grayD, letterSpacing: '0.15em', marginLeft: 10 }}>
                ADMIN
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.success }} />
              <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 11, color: C.gray }}>{admin?.email}</span>
            </div>
            <a href="/" target="_blank" rel="noopener" style={{
              ...btnGhost, textDecoration: 'none', padding: '8px 14px', fontSize: 10,
            }}>
              <ArrowUpRight size={12} /> Site
            </a>
            <button style={{ ...btnGhost, padding: '8px 14px', fontSize: 10 }} onClick={handleLogout}>
              <LogOut size={12} /> Logout
            </button>
          </div>
        </header>

        <div style={{ display: 'flex', flex: 1 }}>

          {/* ── SIDEBAR ── */}
          <aside style={{
            width: 220, background: C.mid,
            borderRight: `1px solid ${C.border}`,
            padding: '32px 0', flexShrink: 0,
            position: 'sticky', top: 64,
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
          }}>
            {/* Stats summary */}
            <div style={{ padding: '0 20px 28px', borderBottom: `1px solid ${C.border}`, marginBottom: 20 }}>
              {[
                { label: 'Projects', val: projects.length, color: C.copper },
                { label: 'Pending Reviews', val: pending.length, color: pending.length > 0 ? C.danger : C.grayD },
                { label: 'Unread Leads', val: unreadLeads, color: unreadLeads > 0 ? C.copper : C.grayD },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontFamily: "'Fragment Mono',monospace", fontSize: 9, color: C.grayD, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.label}</span>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: s.color, lineHeight: 1 }}>{s.val}</span>
                </div>
              ))}
            </div>

            {/* Nav tabs */}
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 20px', background: 'none', border: 'none',
                  cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
                  borderLeft: activeTab === tab.id ? `3px solid ${C.copper}` : '3px solid transparent',
                  background: activeTab === tab.id ? 'rgba(184,115,51,0.06)' : 'transparent',
                  color: activeTab === tab.id ? C.copper : C.gray,
                  position: 'relative',
                }}
              >
                {tab.icon}
                <span style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400,
                }}>
                  {tab.label}
                </span>
                {tab.badge && (
                  <span style={{
                    marginLeft: 'auto',
                    minWidth: 20, height: 20, borderRadius: '50%',
                    background: C.danger, color: '#fff',
                    fontFamily: "'Fragment Mono',monospace", fontSize: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0 4px',
                  }}>{tab.badge}</span>
                )}
              </button>
            ))}
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main style={{ flex: 1, padding: '40px 40px', minWidth: 0 }}>
            {activeTab === 'projects'     && <ProjectsTab />}
            {activeTab === 'testimonials' && <TestimonialsTab />}
            {activeTab === 'leads'        && <LeadsTab />}
          </main>
        </div>
      </div>
    </>
  )
}