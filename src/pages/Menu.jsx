import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, Search } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import ProductCard from '../components/shop/ProductCard'
import { PRODUCTS, TOPPINGS } from '../data/products'

const BASE = import.meta.env.BASE_URL

export default function Menu() {
  const [search, setSearch]     = useState('')
  const [sortBy, setSortBy]     = useState('default')

  const filtered = PRODUCTS
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      return 0
    })

  return (
    <>
      {/* Hero */}
      <section className="bg-hero pt-10 pb-14">
        <div className="wrap text-center">
          <AnimatedSection>
            <p className="label mb-3">Our Menu</p>
            <h1 className="h-hero mb-4">
              Find your perfect <span className="text-gradient">quequito</span>
            </h1>
            <p className="body-lg max-w-md mx-auto">
              From a quick solo treat to a full-on sharing session — we've got the size for every craving.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Products */}
      <section className="section bg-neutral-50 -mt-6">
        <div className="wrap">
          {/* Search & filter bar */}
          <AnimatedSection className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search menu..."
                className="input pl-9"
              />
            </div>
            <div className="relative shrink-0">
              <SlidersHorizontal size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="input pl-9 pr-8 appearance-none bg-white sm:w-44"
              >
                <option value="default">Default order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </AnimatedSection>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🥞</p>
              <p className="font-display font-bold text-neutral-700">No results found</p>
              <p className="text-sm text-neutral-400 mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} delay={i * 0.07} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Toppings showcase */}
      <section className="section bg-white">
        <div className="wrap">
          <AnimatedSection className="text-center mb-12">
            <p className="label mb-3">Customize</p>
            <h2 className="h-section mb-3">
              Build your dream <span className="text-gradient">stack</span>
            </h2>
            <p className="body-lg max-w-md mx-auto">
              Every order lets you choose from 9 premium toppings. Set of 10–20 gets 2 toppings, 30–40 gets 3.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {TOPPINGS.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 0.05}>
                <div className={`card overflow-hidden group`}>
                  <div className={`aspect-square ${t.color} overflow-hidden`}>
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-lg mb-0.5">{t.emoji}</p>
                    <p className="font-display font-bold text-sm text-neutral-800">{t.name}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery info */}
      <section className="section bg-neutral-50">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection direction="left">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3]">
                <img src={`${BASE}images/rappi.png`} alt="Rappi delivery" className="w-full h-full object-cover bg-neutral-100" />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <p className="label mb-3">We Come to You</p>
              <h2 className="h-section mb-4">
                Fresh delivery <span className="text-gradient">right to your door</span>
              </h2>
              <p className="body-lg mb-4">
                Can't make it out? No problem. Order via Rappi and we'll bring your quequitos hot and fresh, wherever you are in Mazatlán.
              </p>
              <p className="body-lg mb-6">
                Always soft, always fresh — with all your favorite toppings packed carefully for the journey.
              </p>
              <a
                href="https://wa.me/5216692458200?text=Hi!%20I%20would%20like%20to%20place%20an%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Order via WhatsApp
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
