import { Link } from 'react-router-dom'
import { Instagram, Facebook, Phone, Mail, MapPin, Clock, Heart } from 'lucide-react'
import { HOURS } from '../../data/products'

const BASE = import.meta.env.BASE_URL

const SOCIALS = [
  { icon: Instagram, label: '@losquequitosmx', href: 'https://www.instagram.com/losquequitosmx/', color: 'hover:text-pink-500' },
  { icon: Facebook,  label: 'LosQuequitosMx',  href: 'https://www.facebook.com/LosQuequitosMx/', color: 'hover:text-blue-500' },
]

export default function Footer({ onBookParty }) {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="wrap py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={`${BASE}images/Logo-LosQuequitos_Horizontal-Blanco.png`}
                alt="Los Quequitos"
                className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Fluffy mini pancakes made with love in Mazatlán, Sinaloa. A family recipe, fresh every time.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 ${color} transition-all`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {[
                { to: '/',           label: 'Home' },
                { to: '/menu',       label: 'Menu' },
                { to: '/party-pack', label: 'Party Pack' },
                { to: '/about',      label: 'About Us' },
                { to: '/contact',    label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">
              <Clock size={11} className="inline mr-1 -mt-0.5" />Open Hours
            </p>
            <ul className="space-y-1.5">
              {HOURS.map(({ day, hours }) => (
                <li key={day} className="flex justify-between text-sm">
                  <span className="text-neutral-500">{day.slice(0, 3)}</span>
                  <span className={hours === 'Closed' ? 'text-neutral-600' : 'text-neutral-300'}>
                    {hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">Get in Touch</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/5216692458200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-brand-400 shrink-0" />
                  +52 (669) 245-8200
                </a>
              </li>
              <li>
                <a
                  href="mailto:losquequitosmztmx@gmail.com"
                  className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-brand-400 shrink-0" />
                  losquequitosmztmx@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-brand-400 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-400 leading-snug">
                  Mazatlán, Sinaloa, México
                </span>
              </li>
            </ul>
            {onBookParty && (
              <button
                onClick={onBookParty}
                className="mt-5 w-full py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-all"
              >
                Book an Event →
              </button>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-600">
            © 2026 Los Quequitos MX · Mazatlán, Sinaloa
          </p>
          <p className="text-xs text-neutral-600 flex items-center gap-1">
            Made with <Heart size={11} className="text-brand-400 fill-brand-400" /> as a portfolio project
          </p>
        </div>
      </div>
    </footer>
  )
}
