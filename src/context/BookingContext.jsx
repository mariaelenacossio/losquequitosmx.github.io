import { createContext, useContext, useReducer, useEffect } from 'react'

const BookingContext = createContext(null)

const STORAGE_KEY = 'losquequitos_bookings'

function bookingReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] }
    case 'UPDATE_STATUS':
      return {
        ...state,
        bookings: state.bookings.map(b =>
          b.id === action.payload.id ? { ...b, status: action.payload.status } : b
        ),
      }
    case 'DELETE_BOOKING':
      return { ...state, bookings: state.bookings.filter(b => b.id !== action.payload) }
    default:
      return state
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, { bookings: [] }, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { bookings: JSON.parse(saved) } : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.bookings))
  }, [state.bookings])

  const addBooking = (data) => {
    const booking = {
      ...data,
      id: `BK-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    }
    dispatch({ type: 'ADD_BOOKING', payload: booking })
    return booking.id
  }

  const updateStatus = (id, status) => dispatch({ type: 'UPDATE_STATUS', payload: { id, status } })
  const deleteBooking = (id)          => dispatch({ type: 'DELETE_BOOKING', payload: id })

  return (
    <BookingContext.Provider value={{
      bookings: state.bookings,
      addBooking,
      updateStatus,
      deleteBooking,
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider')
  return ctx
}
