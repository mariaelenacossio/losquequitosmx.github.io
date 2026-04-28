import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal, clearCart } = useCart()

  const handleWhatsApp = () => {
    if (items.length === 0) return
    const lines = items.map(i =>
      `• ${i.qty}x ${i.name}${i.selectedToppings?.length ? ` (${i.selectedToppings.map(t => t.name).join(', ')})` : ''} — $${(i.price * i.qty).toFixed(2)}`
    )
    const msg = encodeURIComponent(
      `Hi! I'd like to place an order:\n\n${lines.join('\n')}\n\nTotal: $${subtotal.toFixed(2)} USD\n\nThank you!`
    )
    window.open(`https://wa.me/5216692458200?text=${msg}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-card-lg flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-brand-500" />
                <h2 className="font-display font-bold text-neutral-900">Your Order</h2>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 rounded-xl hover:bg-neutral-100 text-neutral-500 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-3xl bg-brand-50 flex items-center justify-center mb-4">
                      <ShoppingBag size={28} className="text-brand-300" />
                    </div>
                    <p className="font-display font-bold text-neutral-700 mb-1">Your cart is empty</p>
                    <p className="text-sm text-neutral-400">Add some quequitos to get started!</p>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <motion.div
                      key={item.cartKey}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      className="flex gap-3 p-3 rounded-2xl border border-neutral-100 bg-neutral-50"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-sm text-neutral-800 truncate">{item.name}</p>
                        {item.selectedToppings?.length > 0 && (
                          <p className="text-xs text-neutral-400 truncate mt-0.5">
                            {item.selectedToppings.map(t => t.name).join(', ')}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          {/* Qty controls */}
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateQty(item.cartKey, item.qty - 1)}
                              className="w-6 h-6 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-all"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="font-body font-semibold text-sm w-5 text-center">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.cartKey, item.qty + 1)}
                              className="w-6 h-6 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-all"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <p className="font-display font-bold text-sm text-brand-600">
                            ${(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.cartKey)}
                        className="self-start p-1 rounded-lg text-neutral-300 hover:text-red-400 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-neutral-100 px-5 py-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-neutral-500">Subtotal</span>
                  <span className="font-display font-bold text-lg text-neutral-900">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-neutral-400 -mt-1">
                  Delivery fee calculated at checkout via WhatsApp
                </p>
                <motion.button
                  onClick={handleWhatsApp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full justify-center gap-2 py-3.5"
                >
                  Order via WhatsApp
                  <ArrowRight size={16} />
                </motion.button>
                <button
                  onClick={clearCart}
                  className="w-full text-xs text-neutral-400 hover:text-red-400 transition-colors text-center py-1"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
