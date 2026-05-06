import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '@/context/AuthContext'
import { loginSchema } from '@/utils/validators'
import Spinner from '@/components/ui/Spinner'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    try {
      setError('')
      await login(data.email, data.password)
      navigate('/admin')
    } catch {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <>
      <Helmet><title>Admin Login | Zentry Hub</title></Helmet>
      <div className="min-h-screen bg-zentry-dark flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <span className="text-2xl font-heading font-bold tracking-[0.2em] text-zentry-white">
              ZENTRY<span className="text-zentry-copper">HUB</span>
            </span>
            <p className="text-zentry-gray text-sm mt-2 tracking-widest uppercase font-mono">System Access</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}
            className="bg-zentry-surface border border-zentry-border rounded-xl p-8 space-y-5">

            <div>
              <label className="text-xs font-semibold tracking-widest text-zentry-gray uppercase mb-2 block">
                Email
              </label>
              <input {...register('email')} type="email"
                className="w-full bg-zentry-dark border border-zentry-border text-zentry-white
                           px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-zentry-copper
                           transition-colors" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold tracking-widest text-zentry-gray uppercase mb-2 block">
                Password
              </label>
              <input {...register('password')} type="password"
                className="w-full bg-zentry-dark border border-zentry-border text-zentry-white
                           px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-zentry-copper
                           transition-colors" />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button type="submit" disabled={isSubmitting}
              className="w-full btn-primary justify-center rounded-lg">
              {isSubmitting ? <Spinner size="sm" /> : 'Access System'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
