import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Plus, Check } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import ProductModal from './ProductModal'

export default function ProductCard({ product, delay = 0 }) {
  const { addItem } = useCart()
  const [modalOpen, setModalOpen] = useState(false)
  const [added,     setAdded]     = useState(false)

  const quickAdd = () => {
    addItem(product, [])
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="card group overflow-hidden cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badge */}
          {product.badge && (
            <span className={[
              'absolute top-3 left-3 px-2.5 py-1 rounded-xl text-xs font-bold',
              product.badge === 'Popular'    ? 'bg-brand-500 text-white'   : '',
              product.badge === 'Best Value' ? 'bg-rose-500 text-white'    : '',
            ].join(' ')}>
              {product.badge}
            </span>
          )}
          {/* Toppings badge */}
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-sm text-xs font-semibold text-neutral-700 shadow-card">
            +{product.toppingsIncluded} toppings
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div>
              <h3 className="font-display font-bold text-neutral-900 text-base">{product.name}</h3>
              <p className="text-xs text-neutral-400 mt-0.5">{product.tagline}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-display font-extrabold text-lg text-brand-600">${product.price}</p>
              <p className="text-2xs text-neutral-400">{product.priceMXN} MXN</p>
            </div>
          </div>

          <p className="text-xs text-neutral-500 leading-relaxed mb-4 line-clamp-2">{product.description}</p>

          {/* CTA row */}
          <div className="flex gap-2" onClick={e => e.stopPropagation()}>
            <motion.button
              onClick={quickAdd}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={[
                'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-sm font-semibold transition-all',
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-brand-500 hover:bg-brand-600 text-white shadow-brand',
              ].join(' ')}
            >
              {added ? <Check size={14} /> : <ShoppingBag size={14} />}
              {added ? 'Added!' : 'Add to Order'}
            </motion.button>
            <button
              onClick={() => setModalOpen(true)}
              className="px-3 py-2.5 rounded-2xl border border-neutral-200 hover:bg-neutral-50 text-neutral-600 transition-all"
              aria-label="Choose toppings"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </motion.div>

      <ProductModal
        product={product}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
