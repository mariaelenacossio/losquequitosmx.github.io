import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Facebook, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import { HOURS } from '../data/products'

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const update = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setLoading(true)
    // Simulate async (in production: send to email service)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  const CONTACT_ITEMS = [
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+52 (669) 245-8200',
      href: 'https://wa.me/5216692458200',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'losquequitosmztmx@gmail.com',
      href: 'mailto:losquequitosmztmx@gmail.com',
      color: 'bg-brand-50 text-brand-600',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Mazatlán, Sinaloa, México',
      href: 'https://maps.google.com/?q=Mazatlán,Sinaloa,Mexico',
      color: 'bg-red-50 text-red-500',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@losquequitosmx',
      href: 'https://www.instagram.com/losquequitosmx/',
      color: 'bg-pink-50 text-pink-500',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      value: 'LosQuequitosMx',
      href: 'https://www.facebook.com/LosQuequitosMx/',
      color: 'bg-blue-50 text-blue-500',
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-hero pt-10 pb-16">
        <div className="wrap text-center">
          <AnimatedSection>
            <p className="label mb-3">Get in Touch</p>
            <h1 className="h-hero mb-4">
              We'd love to <span className="text-gradient">hear from you</span>
            </h1>
            <p className="body-lg max-w-md mx-auto">
              Questions about our menu, a custom order, or want to book an event? Reach out — we're always happy to help.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main content */}
      <section className="section bg-neutral-50 -mt-6">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left: contact info */}
            <div className="space-y-6">
              <AnimatedSection direction="left">
                <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">Contact information</h2>

                <div className="space-y-3">
                  {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-neutral-100 hover:border-brand-200 hover:shadow-card transition-all group"
                    >
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-neutral-400">{label}</p>
                        <p className="text-sm font-semibold text-neutral-700 group-hover:text-brand-600 transition-colors">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </AnimatedSection>

              {/* Hours */}
              <AnimatedSection direction="left" delay={0.1}>
                <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={16} className="text-brand-500" />
                    <h3 className="font-display font-bold text-neutral-900">Opening Hours</h3>
                  </div>
                  <div className="space-y-2">
                    {HOURS.map(({ day, hours }) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="text-neutral-500">{day}</span>
                        <span className={hours === 'Closed' ? 'text-neutral-300 font-medium' : 'text-neutral-800 font-semibold'}>
                          {hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* WhatsApp quick CTA */}
              <AnimatedSection direction="left" delay={0.15}>
                <a
                  href="https://wa.me/5216692458200?text=Hi!%20I%20would%20like%20to%20place%20an%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-500 text-white p-4 rounded-2xl hover:bg-green-600 transition-all shadow-card group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="font-display font-bold">Order instantly via WhatsApp</p>
                    <p className="text-sm text-green-100">Tap to chat — fastest way to order</p>
                  </div>
                </a>
              </AnimatedSection>
            </div>

            {/* Right: contact form */}
            <AnimatedSection direction="right">
              <div className="bg-white rounded-3xl border border-neutral-100 shadow-card p-7">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-neutral-900 mb-2">Message sent!</h3>
                    <p className="text-sm text-neutral-500">
                      Thanks for reaching out! We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }) }}
                      className="btn-ghost mt-6"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-display font-bold text-xl text-neutral-900 mb-6">Send us a message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Your Name *</label>
                          <input
                            name="name"
                            value={form.name}
                            onChange={update}
                            type="text"
                            placeholder="Full name"
                            required
                            className="input"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Phone</label>
                          <input
                            name="phone"
                            value={form.phone}
                            onChange={update}
                            type="tel"
                            placeholder="+52 (669) 000-0000"
                            className="input"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Email *</label>
                        <input
                          name="email"
                          value={form.email}
                          onChange={update}
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="input"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Message *</label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={update}
                          rows={5}
                          placeholder="Tell us about your order, event, or question..."
                          required
                          className="input resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <>
                            <Send size={16} /> Send Message
                          </>
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
