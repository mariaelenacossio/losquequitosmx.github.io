import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Check, Minus, Plus } from 'lucide-react'
import { TOPPINGS } from '../../data/products'
import { useCart } from '../../context/CartContext'

export default function ProductModal({ product, isOpen, onClose }) {
  const { addItem } = useCart()
  const [selected, setSelected] = useState([])
  const [qty,      setQty]      = useState(1)

  if (!product) return null

  const maxToppings = product.toppingsIncluded

  const toggle = (topping) => {
    if (selected.find(t => t.id === topping.id)) {
      setSelected(prev => prev.filter(t => t.id !== topping.id))
    } else if (selected.length < maxToppings) {
      setSelected(prev => [...prev, topping])
    }
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product, selected)
    setSelected([])
    setQty(1)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-card-lg overflow-hidden"
            style={{ maxHeight: '92dvh' }}
          >
            {/* Product image */}
            <div className="relative aspect-[16/7] bg-neutral-100 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5">
                <h2 className="font-display font-extrabold text-2xl text-white">{product.name}</h2>
                <p className="text-white/80 text-sm">{product.tagline}</p>
              </div>
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(92dvh - 200px)' }}>
              <div className="p-5 space-y-5">
                {/* Price row */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-500">{product.description}</p>
                  <p className="font-display font-extrabold text-2xl text-brand-600 shrink-0 ml-4">
                    ${product.price}
                  </p>
                </div>

                {/* Toppings */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-display font-bold text-neutral-800">Choose your toppings</p>
                    <span className={[
                      'text-xs font-semibold px-2 py-0.5 rounded-full',
                      selected.length === maxToppings
                        ? 'bg-green-100 text-green-700'
                        : 'bg-brand-100 text-brand-700',
                    ].join(' ')}>
                      {selected.length}/{maxToppings}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {TOPPINGS.map(topping => {
                      const isSelected  = !!selected.find(t => t.id === topping.id)
                      const isDisabled  = !isSelected && selected.length >= maxToppings
                      return (
                        <motion.button
                          key={topping.id}
                          onClick={() => toggle(topping)}
                          disabled={isDisabled}
                          whileTap={!isDisabled ? { scale: 0.95 } : {}}
                          className={[
                            'relative flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all text-center',
                            isSelected  ? 'border-brand-400 bg-brand-50'           : '',
                            !isSelected && !isDisabled ? 'border-neutral-100 bg-neutral-50 hover:border-brand-200' : '',
                            isDisabled  ? 'border-neutral-100 bg-neutral-50 opacity-40 cursor-not-allowed' : '',
                          ].join(' ')}
                        >
                          <div className={`w-12 h-12 rounded-xl overflow-hidden ${topping.color}`}>
                            <img src={topping.image} alt={topping.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-2xs font-semibold text-neutral-600 leading-tight">{topping.name}</span>
                          {isSelected && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-brand-500 flex items-center justify-center">
                              <Check size={9} className="text-white" />
                            </span>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Qty + Add */}
                <div className="flex items-center gap-3 pb-safe">
                  {/* Qty */}
                  <div className="flex items-center gap-2 bg-neutral-100 rounded-2xl p-1">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-xl bg-white shadow-card flex items-center justify-center hover:bg-neutral-50 transition-all"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="font-display font-bold text-sm w-6 text-center">{qty}</span>
                    <button
                      onClick={() => setQty(q => q + 1)}
                      className="w-8 h-8 rounded-xl bg-white shadow-card flex items-center justify-center hover:bg-neutral-50 transition-all"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <motion.button
                    onClick={handleAdd}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary flex-1 py-3 justify-center"
                  >
                    <ShoppingBag size={16} />
                    Add {qty > 1 ? `${qty}x` : ''} to Order — ${(product.price * qty).toFixed(2)}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
