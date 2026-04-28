import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Truck, Heart, Users, Clock } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import StarRating from '../components/ui/StarRating'
import ProductCard from '../components/shop/ProductCard'
import { PRODUCTS, TESTIMONIALS, TOPPINGS } from '../data/products'

const BASE = import.meta.env.BASE_URL

const FEATURES = [
  { icon: Truck,  title: 'Home Delivery',     desc: 'Fresh to your door via Rappi' },
  { icon: Heart,  title: 'Made with Love',    desc: 'Family recipe, every batch' },
  { icon: Users,  title: 'Events & Catering', desc: 'Book us for any occasion' },
  { icon: Clock,  title: 'Made Fresh Daily',  desc: 'Never frozen, always fluffy' },
]

const GALLERY = [
  `${BASE}images/Quequitos-1.jpg`,
  `${BASE}images/Quequitos-tray.jpg`,
  `${BASE}images/IG-1.png`,
  `${BASE}images/IG-2.png`,
  `${BASE}images/Crew-1.png`,
  `${BASE}images/PHOTO-2022-10-10-20-04-33.jpg`,
]

export default function Home() {
  const { openBooking } = useOutletContext()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-hero min-h-[92vh] flex items-center">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-brand-100/60 blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-rose-100/50 blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="wrap relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-0">
            {/* Text */}
            <div className="order-2 lg:order-1">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 rounded-full px-3 py-1.5 text-sm font-semibold mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse-slow" />
                Now delivering in Mazatlán 🛵
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-hero mb-5"
              >
                Fluffy mini<br />
                <span className="text-gradient">pancakes</span><br />
                made with love.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="body-lg max-w-sm mb-8"
              >
                Los Quequitos are Mazatlán's favourite street-food dessert — fresh, fluffy, and impossible to share.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <Link to="/menu" className="btn-primary px-7 py-3.5 text-base">
                  Order Now <ArrowRight size={16} />
                </Link>
                <button
                  onClick={openBooking}
                  className="btn-secondary px-7 py-3.5 text-base"
                >
                  Book an Event
                </button>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  {[`UP-2.jpg`, `UP-3.jpg`, `UP-4.jpg`].map((img, i) => (
                    <img
                      key={i}
                      src={`${BASE}images/${img}`}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <StarRating rating={5} size={12} />
                    <span className="font-display font-bold text-sm text-neutral-800">5.0</span>
                  </div>
                  <p className="text-xs text-neutral-500">Loved by 500+ customers</p>
                </div>
              </motion.div>
            </div>

            {/* Hero image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Main image */}
                <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-[2.5rem] overflow-hidden shadow-card-lg">
                  <img
                    src={`${BASE}images/Quequitos-tray.jpg`}
                    alt="Fresh mini pancakes"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating mascot */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-6 -left-8 w-24 h-24 drop-shadow-xl"
                >
                  <img src={`${BASE}images/ElQuequito-Patineta.png`} alt="" />
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, type: 'spring' }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card-md px-3 py-2"
                >
                  <p className="text-2xs text-neutral-400 font-semibold">From</p>
                  <p className="font-display font-extrabold text-brand-600 text-lg leading-none">$6 USD</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features strip ── */}
      <section className="bg-white border-y border-neutral-100">
        <div className="wrap">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-neutral-100">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.08} className="flex items-center gap-3 px-6 py-5">
                <div className="w-10 h-10 rounded-2xl bg-brand-50 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-brand-500" />
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-neutral-800">{title}</p>
                  <p className="text-xs text-neutral-400">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="section bg-neutral-50">
        <div className="wrap">
          <AnimatedSection className="text-center mb-12">
            <p className="label mb-3">Our Menu</p>
            <h2 className="h-section mb-3">
              Pick your <span className="text-gradient">perfect size</span>
            </h2>
            <p className="body-lg max-w-md mx-auto">
              Every set comes with your choice of toppings — sweet, indulgent, or both.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 0.08} />
            ))}
          </div>

          <AnimatedSection className="text-center mt-8" delay={0.3}>
            <Link to="/menu" className="btn-ghost gap-2">
              See full menu & toppings <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section bg-white">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <AnimatedSection direction="left" className="relative">
              <div className="relative rounded-[2rem] overflow-hidden aspect-square max-w-md mx-auto">
                <img src={`${BASE}images/Quequitos-1.jpg`} alt="Making mini pancakes" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 to-transparent" />
              </div>
              {/* Mascot */}
              <motion.img
                src={`${BASE}images/ElQuequito-Red.png`}
                alt=""
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 w-28 drop-shadow-xl hidden sm:block"
              />
            </AnimatedSection>

            {/* Steps */}
            <div>
              <AnimatedSection>
                <p className="label mb-3">How It Works</p>
                <h2 className="h-section mb-8">
                  Fresh in <span className="text-gradient">4 simple steps</span>
                </h2>
              </AnimatedSection>

              {[
                { n: '01', title: 'Choose your size',    desc: 'Pick from 10, 20, 30 or 40 mini pancakes depending on your craving.' },
                { n: '02', title: 'Pick your toppings',  desc: 'Mix and match up to 3 favorites — condensed milk, Nutella, pecans, and more.' },
                { n: '03', title: 'Add extra drizzle',   desc: 'Make it extra special with dulce de leche, maple syrup, or mocha drizzle.' },
                { n: '04', title: 'Enjoy!',              desc: 'Your order arrives hot, fresh, and impossibly fluffy. Happiness in every bite.' },
              ].map((step, i) => (
                <AnimatedSection key={step.n} delay={i * 0.1} className="flex items-start gap-4 mb-6 last:mb-0">
                  <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-display font-black text-sm shrink-0 shadow-brand">
                    {step.n}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-neutral-800 mb-0.5">{step.title}</h4>
                    <p className="text-sm text-neutral-500">{step.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Toppings ── */}
      <section className="section bg-neutral-50">
        <div className="wrap">
          <AnimatedSection className="text-center mb-10">
            <p className="label mb-3">Toppings</p>
            <h2 className="h-section mb-3">Choose your favorites</h2>
            <p className="body-lg max-w-sm mx-auto">9 amazing toppings to mix and match — sweet, saucy, crunchy.</p>
          </AnimatedSection>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-3">
            {TOPPINGS.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 0.04} className="flex flex-col items-center gap-2 group">
                <div className={`w-full aspect-square rounded-2xl overflow-hidden ${t.color} border border-neutral-100 group-hover:shadow-card transition-all`}>
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-center text-2xs font-semibold text-neutral-500 leading-tight">{t.name}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section bg-white">
        <div className="wrap">
          <AnimatedSection className="text-center mb-12">
            <p className="label mb-3">Community Love</p>
            <h2 className="h-section">
              What our customers <span className="text-gradient">say</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 0.1} className="card p-6">
                <StarRating rating={t.rating} className="mb-4" />
                <blockquote className="font-body text-neutral-600 leading-relaxed italic mb-5">
                  "{t.text}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-display font-bold text-sm text-neutral-800">{t.name}</p>
                    <p className="text-xs text-neutral-400">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="section bg-neutral-50">
        <div className="wrap">
          <AnimatedSection className="text-center mb-10">
            <p className="label mb-3">Gallery</p>
            <h2 className="h-section mb-3">Delicious in every shot</h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY.map((src, i) => (
              <AnimatedSection
                key={i}
                delay={i * 0.06}
                className={`overflow-hidden rounded-3xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img
                  src={src}
                  alt="Los Quequitos"
                  className={[
                    'w-full object-cover transition-transform duration-500 hover:scale-105',
                    i === 0 ? 'aspect-square md:h-full' : 'aspect-square',
                  ].join(' ')}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA section ── */}
      <section className="section">
        <div className="wrap">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 to-peach-400 px-8 py-14 lg:px-16 lg:py-20 text-center">
              {/* Decorative mascots */}
              <img
                src={`${BASE}images/ElQuequito-Papalote.png`}
                alt=""
                className="absolute bottom-0 left-4 h-32 opacity-20 hidden md:block"
              />
              <img
                src={`${BASE}images/ElQuequito-Basquet.png`}
                alt=""
                className="absolute bottom-0 right-4 h-32 opacity-20 hidden md:block"
              />

              <p className="label text-white/70 mb-4">What are you waiting for?</p>
              <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white mb-4">
                Satisfy your sweet tooth.
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
                Order online or book us for your next event. Fresh, fluffy, and delivered with love.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 bg-white text-brand-600 px-7 py-3.5 rounded-2xl font-semibold hover:bg-neutral-50 shadow-brand-lg transition-all"
                >
                  Order Now <ArrowRight size={16} />
                </Link>
                <button
                  onClick={openBooking}
                  className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/30 px-7 py-3.5 rounded-2xl font-semibold hover:bg-white/30 transition-all"
                >
                  Book an Event
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
