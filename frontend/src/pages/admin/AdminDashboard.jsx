import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { LogOut, FolderOpen, MessageSquare, Mail } from 'lucide-react'

// TODO Phase 4 — Full AdminDashboard with Projects, Testimonials, Leads tabs
export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <>
      <Helmet><title>Dashboard | Zentry Hub Admin</title></Helmet>
      <div className="min-h-screen bg-zentry-dark text-zentry-white">
        <header className="border-b border-zentry-border px-8 py-4 flex justify-between items-center">
          <span className="font-heading font-bold tracking-widest text-zentry-white">
            ZENTRY<span className="text-zentry-copper">HUB</span>
            <span className="ml-3 text-xs text-zentry-gray font-normal">Admin Dashboard</span>
          </span>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-zentry-gray hover:text-zentry-copper transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </header>
        <div className="max-w-5xl mx-auto px-8 py-16">
          <p className="eyebrow mb-4">Welcome Back</p>
          <h1 className="text-4xl font-heading font-bold mb-2">Control Panel</h1>
          <p className="text-zentry-gray mb-12">Full dashboard UI coming in Phase 4.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <FolderOpen />, label: 'Projects',     desc: 'Add, edit, delete portfolio projects' },
              { icon: <MessageSquare />, label: 'Testimonials', desc: 'Approve or reject pending reviews' },
              { icon: <Mail />,      label: 'Leads',        desc: 'View contact form submissions' },
            ].map(tab => (
              <div key={tab.label} className="zh-card cursor-pointer">
                <div className="text-zentry-copper mb-4 w-8 h-8">{tab.icon}</div>
                <h3 className="font-semibold text-zentry-white mb-1">{tab.label}</h3>
                <p className="text-zentry-gray text-sm">{tab.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
