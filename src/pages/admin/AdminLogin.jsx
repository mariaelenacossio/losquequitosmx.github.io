import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff } from 'lucide-react'

const BASE = import.meta.env.BASE_URL
const PASSWORD = 'quequitos2024'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [pw,      setPw]      = useState('')
  const [show,    setShow]    = useState(false)
  const [error,   setError]   = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (pw === PASSWORD) {
        sessionStorage.setItem('lq_admin', '1')
        navigate('/admin/dashboard')
      } else {
        setError(true)
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white rounded-3xl shadow-card-lg border border-neutral-100 p-8"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={`${BASE}images/Logo-LosQuequitos_Icono.png`} alt="" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="font-display font-extrabold text-2xl text-neutral-900">Admin Panel</h1>
          <p className="text-sm text-neutral-400 mt-1">Los Quequitos MX</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={e => { setPw(e.target.value); setError(false) }}
                placeholder="Enter admin password"
                className={`input pl-9 pr-9 ${error ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShow(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {show ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {error && <p className="text-xs text-red-500 mt-1">Incorrect password. Try again.</p>}
          </div>

          <motion.button
            type="submit"
            disabled={!pw || loading}
            whileHover={{ scale: pw && !loading ? 1.02 : 1 }}
            whileTap={{ scale: pw && !loading ? 0.98 : 1 }}
            className="btn-primary w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <p className="text-center text-xs text-neutral-400 mt-6">
          Password: <code className="bg-neutral-100 px-1.5 py-0.5 rounded font-mono">{PASSWORD}</code>
        </p>
      </motion.div>
    </div>
  )
}
