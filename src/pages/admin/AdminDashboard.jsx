import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarDays, Users, DollarSign, Clock, Trash2, Check, X, LogOut, Package } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { useBooking } from '../../context/BookingContext'
import { PARTY_PACKAGES } from '../../data/products'

const BASE = import.meta.env.BASE_URL

const STATUS_COLORS = {
  pending:   'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-500',
}

export default function AdminDashboard() {
  const navigate  = useNavigate()
  const { bookings, updateStatus, deleteBooking } = useBooking()
  const [tab, setTab] = useState('bookings')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    if (!sessionStorage.getItem('lq_admin')) navigate('/admin')
  }, [navigate])

  const logout = () => {
    sessionStorage.removeItem('lq_admin')
    navigate('/admin')
  }

  const filtered = bookings.filter(b => filterStatus === 'all' || b.status === filterStatus)

  const stats = {
    total:     bookings.length,
    pending:   bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    revenue:   bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => {
        const pkg = PARTY_PACKAGES.find(p => p.id === b.packageId)
        return sum + (pkg?.price || 0)
      }, 0),
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={`${BASE}images/Logo-LosQuequitos_Icono.png`} alt="" className="h-8 w-auto" />
          <div>
            <h1 className="font-display font-extrabold text-neutral-900">Admin Dashboard</h1>
            <p className="text-xs text-neutral-400">Los Quequitos MX</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-red-500 transition-colors"
        >
          <LogOut size={14} /> Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: CalendarDays, label: 'Total Bookings', value: stats.total,     color: 'bg-blue-50 text-blue-500' },
            { icon: Clock,        label: 'Pending',        value: stats.pending,   color: 'bg-yellow-50 text-yellow-500' },
            { icon: Check,        label: 'Confirmed',      value: stats.confirmed, color: 'bg-green-50 text-green-500' },
            { icon: DollarSign,   label: 'Est. Revenue',   value: `$${stats.revenue.toLocaleString()} MXN`, color: 'bg-brand-50 text-brand-500' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-card">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <Icon size={16} />
              </div>
              <p className="font-display font-extrabold text-2xl text-neutral-900">{value}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'bookings', label: 'Bookings', icon: CalendarDays },
            { id: 'packages', label: 'Packages', icon: Package },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={[
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                tab === t.id ? 'bg-brand-500 text-white shadow-brand' : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50',
              ].join(' ')}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        {/* Bookings tab */}
        {tab === 'bookings' && (
          <div>
            {/* Filter */}
            <div className="flex gap-2 mb-4">
              {['all', 'pending', 'confirmed', 'cancelled'].map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={[
                    'px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all',
                    filterStatus === s ? 'bg-neutral-900 text-white' : 'bg-white border border-neutral-200 text-neutral-600',
                  ].join(' ')}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-card overflow-hidden">
              {filtered.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-3xl mb-2">📅</p>
                  <p className="font-display font-bold text-neutral-600">No bookings yet</p>
                  <p className="text-sm text-neutral-400">Bookings will appear here once submitted.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-100">
                        {['ID', 'Customer', 'Package', 'Date', 'Event', 'Status', 'Actions'].map(h => (
                          <th key={h} className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wide px-4 py-3">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      {filtered.map(b => (
                        <motion.tr
                          key={b.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-neutral-50 transition-colors"
                        >
                          <td className="px-4 py-3 text-xs font-mono text-neutral-400">{b.id}</td>
                          <td className="px-4 py-3">
                            <p className="font-semibold text-sm text-neutral-800">{b.name}</p>
                            <p className="text-xs text-neutral-400">{b.email}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-neutral-600">{b.packageName}</td>
                          <td className="px-4 py-3 text-sm text-neutral-600">
                            {b.date ? format(parseISO(b.date), 'MMM d, yyyy') : '—'}
                            <br />
                            <span className="text-xs text-neutral-400">{b.time}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-neutral-600 capitalize">{b.eventType?.replace('-', ' ')}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-lg capitalize ${STATUS_COLORS[b.status] || ''}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1.5">
                              {b.status !== 'confirmed' && (
                                <button
                                  onClick={() => updateStatus(b.id, 'confirmed')}
                                  className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-all"
                                  title="Confirm"
                                >
                                  <Check size={13} />
                                </button>
                              )}
                              {b.status !== 'cancelled' && (
                                <button
                                  onClick={() => updateStatus(b.id, 'cancelled')}
                                  className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-all"
                                  title="Cancel"
                                >
                                  <X size={13} />
                                </button>
                              )}
                              <button
                                onClick={() => deleteBooking(b.id)}
                                className="p-1.5 rounded-lg bg-neutral-50 text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-all"
                                title="Delete"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Packages tab */}
        {tab === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PARTY_PACKAGES.map(pkg => {
              const pkgBookings = bookings.filter(b => b.packageId === pkg.id && b.status !== 'cancelled')
              return (
                <div key={pkg.id} className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={pkg.mascot} alt="" className="w-12 h-12 object-contain" />
                    <div>
                      <h3 className="font-display font-bold text-neutral-800">{pkg.name}</h3>
                      <p className="text-xs text-neutral-400">{pkg.subtitle}</p>
                    </div>
                  </div>
                  <p className="font-display font-extrabold text-2xl text-brand-600 mb-1">
                    ${pkg.price.toLocaleString()} MXN
                  </p>
                  <p className="text-xs text-neutral-400 mb-3">
                    {pkgBookings.length} active booking{pkgBookings.length !== 1 ? 's' : ''}
                  </p>
                  <div className="text-xs text-neutral-500 space-y-1">
                    {pkg.includes.map((inc, i) => (
                      <p key={i} className="flex items-center gap-1.5">
                        <Check size={10} className="text-green-500" /> {inc}
                      </p>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
