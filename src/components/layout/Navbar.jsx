import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const BASE = import.meta.env.BASE_URL

const NAV_LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/menu',       label: 'Menu' },
  { to: '/party-pack', label: 'Party Pack' },
  { to: '/about',      label: 'About' },
  { to: '/contact',    label: 'Contact' },
]

export default function Navbar() {
  const { totalItems, openCart } = useCart()
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-neutral-100'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="wrap">
          <nav className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                src={`${BASE}images/Logo-LosQuequitos_Icono.png`}
                alt="Los Quequitos"
                className="h-9 w-auto"
              />
              <span className={[
                'font-display font-extrabold text-lg leading-tight transition-colors',
                scrolled ? 'text-neutral-900' : 'text-neutral-900',
              ].join(' ')}>
                Los <span className="text-brand-500">Quequitos</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) => [
                      'px-3 py-2 rounded-xl font-body font-medium text-sm transition-all duration-200',
                      isActive
                        ? 'text-brand-600 bg-brand-50'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
                    ].join(' ')}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <motion.button
                onClick={openCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 rounded-2xl bg-white border border-neutral-200 shadow-card hover:shadow-card-md transition-all"
                aria-label="Open cart"
              >
                <ShoppingBag size={18} className="text-neutral-700" />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-500 text-white text-2xs font-bold flex items-center justify-center"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Order CTA */}
              <Link
                to="/menu"
                className="hidden md:flex btn-primary text-sm px-4 py-2.5"
              >
                Order Now
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(v => !v)}
                className="md:hidden p-2.5 rounded-2xl bg-white border border-neutral-200 shadow-card"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-neutral-900/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-40 bg-white shadow-card-lg flex flex-col md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
                <span className="font-display font-extrabold text-neutral-900">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-xl hover:bg-neutral-100">
                  <X size={18} />
                </button>
              </div>
              {/* Links */}
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {NAV_LINKS.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) => [
                      'flex items-center px-4 py-3 rounded-2xl font-body font-semibold text-base transition-all',
                      isActive
                        ? 'text-brand-600 bg-brand-50'
                        : 'text-neutral-700 hover:bg-neutral-50',
                    ].join(' ')}
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
              <div className="p-4 border-t border-neutral-100">
                <Link to="/menu" className="btn-primary w-full text-center">
                  Order Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
