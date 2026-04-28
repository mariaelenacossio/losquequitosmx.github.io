# Los Quequitos MX — v2.0

A fully redesigned, production-ready e-commerce and event booking platform for a local mini pancake business in Mazatlán, Mexico. Built as a portfolio project demonstrating modern React architecture, Shopify-inspired UX, and clean visual design.

---

## Live Site

**[https://mariaelenacossio.github.io/losquequitosmx.github.io/](https://mariaelenacossio.github.io/losquequitosmx.github.io/)**

---

## Overview

Originally a 5-page vanilla HTML/Bootstrap college project, this site has been completely rebuilt as a modern single-page React application. It features a full e-commerce product catalog, cart system, multi-step event booking flow, and an admin dashboard.

---

## Features

### E-Commerce System

- Product grid with live search and price sorting
- Product detail modal with topping selection (2–3 per set)
- Quantity selector per item
- Cart persisted to `localStorage`
- Cart badge with real-time count
- WhatsApp checkout integration — pre-filled order message

### Event Booking System — 5-Step Wizard

1. **Package selection** — 50 / 75 / 100 guests with pricing
2. **Date & time** — calendar picker (min 7 days notice) + time slot grid
3. **Event details** — event type selector + description
4. **Contact info** — name, email, phone, notes
5. **Review & confirm** — summary with deposit reminder

### Admin Dashboard (`/#/admin` — password: `quequitos2024`)

| Tab | Functionality |
|---|---|
| **Overview stats** | Total bookings, pending, confirmed, estimated revenue |
| **Bookings** | Filter by status, confirm / cancel, delete |
| **Packages** | Package overview with active booking counts |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 (custom design tokens) |
| Animation | Framer Motion 11 |
| Routing | React Router 6 (HashRouter) |
| State | React Context API + `localStorage` |
| Date handling | date-fns 3 |
| Icons | Lucide React |
| Fonts | Nunito + Inter (Google Fonts) |
| Deployment | GitHub Pages + GitHub Actions |

---

## Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `brand-500` | `#F97316` | Primary CTA, buttons |
| `brand-50`  | `#FFF6EE` | Section tints |
| `neutral-900`| `#1A1714` | Primary text |
| `neutral-50` | `#FAFAF9` | Page background |

### Typography

| Role | Font | Weight |
|---|---|---|
| Display / Headings | Nunito | 700–900 |
| Body text | Inter | 300–600 |

---

## Local Setup

```bash
git clone https://github.com/mariaelenacossio/losquequitosmx.github.io
cd losquequitosmx.github.io
npm install
npm run dev
```

### Build for production

```bash
npm run build
npm run preview
```

### Deploy

```bash
npm run deploy
# or push to main — GitHub Actions deploys automatically
```

---

## Project Structure

```
src/
├── components/
│   ├── booking/BookingModal.jsx   # 5-step event booking wizard
│   ├── cart/CartDrawer.jsx        # Slide-in cart
│   ├── layout/                    # Navbar, Footer, Layout
│   ├── shop/                      # ProductCard, ProductModal
│   └── ui/                        # AnimatedSection, StarRating
├── context/
│   ├── CartContext.jsx
│   └── BookingContext.jsx
├── data/products.js               # Products, toppings, packages, team
├── pages/
│   ├── Home.jsx
│   ├── Menu.jsx
│   ├── PartyPack.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── admin/
│       ├── AdminLogin.jsx
│       └── AdminDashboard.jsx
└── styles/globals.css
public/images/                     # All product + mascot photos
```

---

## Version History

| Version | Description |
|---|---|
| **v1** | Vanilla HTML + Bootstrap 5 college project |
| **v2** | Full React rebuild — e-commerce, booking, admin, Framer Motion |

*Built with React 18, Tailwind CSS 3 & Framer Motion 11 — 2026*
