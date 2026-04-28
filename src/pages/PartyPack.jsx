import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, CalendarDays, MapPin, Clock, Star } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import BookingModal from '../components/booking/BookingModal'
import { PARTY_PACKAGES } from '../data/products'

const BASE = import.meta.env.BASE_URL

const EVENT_GALLERY = [
  `${BASE}images/Crew-1.png`,
  `${BASE}images/IG-1.png`,
  `${BASE}images/IG-2.png`,
  `${BASE}images/PHOTO-2022-10-10-20-05-48.jpg`,
]

export default function PartyPack() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* Hero */}
      <section className="bg-hero pt-10 pb-16">
        <div className="wrap text-center">
          <AnimatedSection>
            <p className="label mb-3">Party Packages</p>
            <h1 className="h-hero mb-4">
              Make your event <span className="text-gradient">unforgettable</span>
            </h1>
            <p className="body-lg max-w-lg mx-auto mb-8">
              Bring the quequito experience to any party, wedding, or corporate event. Fresh mini pancakes made live at your venue.
            </p>
            <button onClick={() => setBookingOpen(true)} className="btn-primary px-8 py-3.5 text-base">
              <CalendarDays size={17} /> Book Your Event
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="section bg-neutral-50 -mt-6">
        <div className="wrap">
          <AnimatedSection className="text-center mb-12">
            <p className="label mb-3">Pricing</p>
            <h2 className="h-section mb-3">Packages for every size</h2>
            <p className="body-lg max-w-md mx-auto">
              All packages include live service, any toppings, and a dedicated quequitero at your event.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PARTY_PACKAGES.map((pkg, i) => (
              <AnimatedSection key={pkg.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={[
                    'relative rounded-3xl overflow-hidden border-2 bg-white',
                    pkg.popular ? 'border-brand-400 shadow-brand' : 'border-neutral-100 shadow-card',
                  ].join(' ')}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 left-0 right-0 text-center bg-brand-500 py-1.5">
                      <span className="text-xs font-bold text-white uppercase tracking-widest">✨ Most Popular</span>
                    </div>
                  )}

                  {/* Gradient header */}
                  <div className={`bg-gradient-to-br ${pkg.color} px-6 pt-${pkg.popular ? '10' : '6'} pb-6 flex items-center justify-between`}>
                    <div>
                      <h3 className="font-display font-extrabold text-2xl text-neutral-900">{pkg.name}</h3>
                      <p className="text-sm text-neutral-500">{pkg.subtitle}</p>
                    </div>
                    <img src={pkg.mascot} alt="" className="w-16 h-16 object-contain" />
                  </div>

                  {/* Price */}
                  <div className="px-6 py-4 border-b border-neutral-100">
                    <p className="font-display font-extrabold text-4xl text-brand-600">
                      ${pkg.price.toLocaleString()}
                      <span className="font-body text-base font-normal text-neutral-400 ml-1">MXN</span>
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">+50% deposit to confirm booking</p>
                  </div>

                  {/* Includes */}
                  <div className="px-6 py-5">
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">What's included</p>
                    <ul className="space-y-2.5">
                      {pkg.includes.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={11} className="text-green-600" />
                          </span>
                          <span className="text-sm text-neutral-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-6 pb-6">
                    <motion.button
                      onClick={() => setBookingOpen(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all ${
                        pkg.popular
                          ? 'btn-primary justify-center shadow-brand'
                          : 'border-2 border-neutral-200 text-neutral-700 hover:border-brand-300 hover:text-brand-600'
                      }`}
                    >
                      Book this package
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How the event works */}
      <section className="section bg-white">
        <div className="wrap">
          <AnimatedSection className="text-center mb-12">
            <p className="label mb-3">The Experience</p>
            <h2 className="h-section mb-3">
              Your event, our <span className="text-gradient">passion</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: CalendarDays, title: 'Book 1 week ahead', desc: 'Submit your booking at least 7 days before your event to guarantee availability.' },
              { icon: MapPin,       title: 'Any location',       desc: 'We set up anywhere in Mazatlán — homes, venues, rooftops, parks.' },
              { icon: Clock,       title: '2 hours of service', desc: 'A dedicated quequitero makes fresh pancakes live throughout your event.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.1} className="card p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-brand-500" />
                </div>
                <h4 className="font-display font-bold text-neutral-800 mb-2">{title}</h4>
                <p className="text-sm text-neutral-500">{desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Event gallery */}
      <section className="section bg-neutral-50">
        <div className="wrap">
          <AnimatedSection className="text-center mb-10">
            <p className="label mb-3">Past Events</p>
            <h2 className="h-section">See us in action</h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {EVENT_GALLERY.map((src, i) => (
              <AnimatedSection key={i} delay={i * 0.07} className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src={src}
                  alt="Event"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Payment info */}
      <section className="section bg-white">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection direction="left">
              <div className="relative rounded-[2rem] overflow-hidden aspect-video">
                <img src={`${BASE}images/MP-1.png`} alt="Payment methods" className="w-full h-full object-cover bg-neutral-100" />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <p className="label mb-3">Easy Payments</p>
              <h2 className="h-section mb-4">
                Any payment, <span className="text-gradient">any way</span>
              </h2>
              <p className="body-lg mb-4">
                Credit card, debit card, PayPal, OXXO, bank transfer — we make it easy so you can focus on enjoying your event.
              </p>
              <p className="body-lg mb-6">
                A 50% deposit confirms your booking. The balance is due on the event day.
              </p>
              <button
                onClick={() => setBookingOpen(true)}
                className="btn-primary"
              >
                <CalendarDays size={16} /> Start Booking
              </button>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
