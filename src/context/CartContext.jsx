import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.findIndex(i => i.cartKey === action.payload.cartKey)
      if (existing >= 0) {
        const updated = [...state.items]
        updated[existing] = { ...updated[existing], qty: updated[existing].qty + 1 }
        return { ...state, items: updated }
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.cartKey !== action.payload) }
    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter(i => i.cartKey !== action.payload.cartKey) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.cartKey === action.payload.cartKey ? { ...i, qty: action.payload.qty } : i
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'SET_DRAWER':
      return { ...state, isOpen: action.payload }
    default:
      return state
  }
}

const STORAGE_KEY = 'losquequitos_cart'

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  }, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { ...init, items: JSON.parse(saved) } : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product, selectedToppings = []) => {
    const cartKey = `${product.id}__${selectedToppings.map(t => t.id).sort().join('-')}`
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, selectedToppings, cartKey },
    })
    dispatch({ type: 'SET_DRAWER', payload: true })
  }

  const removeItem = (cartKey) => dispatch({ type: 'REMOVE_ITEM', payload: cartKey })

  const updateQty = (cartKey, qty) => dispatch({ type: 'UPDATE_QTY', payload: { cartKey, qty } })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const openCart  = () => dispatch({ type: 'SET_DRAWER', payload: true })
  const closeCart = () => dispatch({ type: 'SET_DRAWER', payload: false })

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal   = state.items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      totalItems,
      subtotal,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      openCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
