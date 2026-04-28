import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import { TEAM } from '../data/products'

const BASE = import.meta.env.BASE_URL

const STATS = [
  { value: '500+', label: 'Happy customers' },
  { value: '4+',   label: 'Years serving' },
  { value: '9',    label: 'Unique toppings' },
  { value: '100%', label: 'Made with love' },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero pt-10 pb-16">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <p className="label mb-3">Our Story</p>
              <h1 className="h-hero mb-5">
                We are a small<br />
                <span className="text-gradient">family business</span><br />
                with big flavors.
              </h1>
              <p className="body-lg max-w-sm mb-6">
                We're proud to serve a unique dessert in Mazatlán that satisfies any sweet tooth in town — made from a family recipe passed down through generations.
              </p>
              <p className="body-lg max-w-sm mb-8">
                As a family business, it's important to us that you feel the passion and love we put into every single quequito. We invite you to try them, love them, and support us!
              </p>
              <Link to="/menu" className="btn-primary gap-2">
                Order Now <ArrowRight size={16} />
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] max-w-md mx-auto">
                <img
                  src={`${BASE}images/WhatsApp Image 2022-10-10 at 8.10.59 PM.jpeg`}
                  alt="Los Quequitos team"
                  className="w-full h-full object-cover"
                />
                {/* Floating mascot */}
                <motion.img
                  src={`${BASE}images/ElQuequito-Sorprendido.png`}
                  alt=""
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -right-4 w-20 drop-shadow-xl"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-neutral-100">
        <div className="wrap">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-neutral-100">
            {STATS.map(({ value, label }, i) => (
              <AnimatedSection key={label} delay={i * 0.08} className="px-6 py-7 text-center">
                <p className="font-display font-extrabold text-4xl text-brand-600 mb-1">{value}</p>
                <p className="text-sm text-neutral-500">{label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-neutral-50">
        <div className="wrap">
          <AnimatedSection className="text-center mb-12">
            <p className="label mb-3">Meet the Team</p>
            <h2 className="h-section mb-3">
              The people behind <span className="text-gradient">every quequito</span>
            </h2>
            <p className="body-lg max-w-md mx-auto">
              A small but mighty team that puts their heart into every batch.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="card overflow-hidden"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="badge-orange mb-2">{member.role}</p>
                    <h3 className="font-display font-bold text-neutral-900 mb-2">{member.name}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Event gallery */}
      <section className="section bg-white">
        <div className="wrap">
          <AnimatedSection className="text-center mb-10">
            <p className="label mb-3">Events</p>
            <h2 className="h-section">Inside our events</h2>
          </AnimatedSection>

          <div className="grid grid-cols-3 gap-3">
            {[
              `${BASE}images/Crew-1.png`,
              `${BASE}images/IG-2.png`,
              `${BASE}images/IG-1.png`,
            ].map((src, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="aspect-square rounded-3xl overflow-hidden">
                <img src={src} alt="Event" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-neutral-50">
        <div className="wrap">
          <AnimatedSection className="text-center mb-10">
            <p className="label mb-3">Our Values</p>
            <h2 className="h-section">What we stand for</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { emoji: '❤️', title: 'Made with Love',    desc: 'Every quequito is made fresh by hand. We never cut corners on quality.' },
              { emoji: '🌱', title: 'Community First',    desc: 'We\'re proud to be a local business that gives back to the Mazatlán community.' },
              { emoji: '😄', title: 'Bring Joy',          desc: 'Our mission is simple — put a smile on your face, one quequito at a time.' },
            ].map(({ emoji, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.1} className="card p-6 text-center">
                <span className="text-4xl mb-4 block">{emoji}</span>
                <h4 className="font-display font-bold text-neutral-800 mb-2">{title}</h4>
                <p className="text-sm text-neutral-500">{desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-white">
        <div className="wrap text-center">
          <AnimatedSection>
            <h2 className="h-section mb-4">
              Ready to try <span className="text-gradient">Los Quequitos?</span>
            </h2>
            <p className="body-lg max-w-sm mx-auto mb-8">
              Order online or find us in Mazatlán. We'd love to make your day a little sweeter.
            </p>
            <Link to="/menu" className="btn-primary px-8 py-3.5 text-base">
              See Our Menu <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
