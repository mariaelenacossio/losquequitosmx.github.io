import { HashRouter, Routes, Route } from 'react-router-dom'
import { CartProvider }    from './context/CartContext'
import { BookingProvider } from './context/BookingContext'
import Layout       from './components/layout/Layout'
import Home         from './pages/Home'
import Menu         from './pages/Menu'
import PartyPack    from './pages/PartyPack'
import About        from './pages/About'
import Contact      from './pages/Contact'
import AdminLogin   from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

export default function App() {
  return (
    <HashRouter>
      <BookingProvider>
        <CartProvider>
          <Routes>
            {/* Admin (no shared layout) */}
            <Route path="/admin"           element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Public site */}
            <Route element={<Layout />}>
              <Route path="/"           element={<Home />} />
              <Route path="/menu"       element={<Menu />} />
              <Route path="/party-pack" element={<PartyPack />} />
              <Route path="/about"      element={<About />} />
              <Route path="/contact"    element={<Contact />} />
            </Route>
          </Routes>
        </CartProvider>
      </BookingProvider>
    </HashRouter>
  )
}
