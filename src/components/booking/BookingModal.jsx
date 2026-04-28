import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, ChevronLeft, Calendar, Clock, User, Package, PartyPopper } from 'lucide-react'
import { format, addDays, parseISO } from 'date-fns'
import { PARTY_PACKAGES } from '../../data/products'
import { useBooking } from '../../context/BookingContext'

const STEPS = ['Package', 'Date & Time', 'Event Details', 'Your Info', 'Review']

const EVENT_TYPES = [
  { id: 'birthday',  label: 'Birthday Party',     emoji: '🎂' },
  { id: 'wedding',   label: 'Wedding',             emoji: '💍' },
  { id: 'corporate', label: 'Corporate Event',     emoji: '🏢' },
  { id: 'reunion',   label: 'Family Reunion',      emoji: '👨‍👩‍👧' },
  { id: 'other',     label: 'Other',               emoji: '🎉' },
]

const TIME_SLOTS = ['12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM']

const slideVariants = {
  enter:  (d) => ({ x: d > 0 ? 32 : -32, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d) => ({ x: d > 0 ? -32 : 32, opacity: 0 }),
}

function StepDots({ step, total }) {
  return (
    <div className="flex gap-1.5 px-6 py-3 bg-neutral-50 border-b border-neutral-100">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={[
            'h-1.5 flex-1 rounded-full transition-all duration-500',
            i <= step ? 'bg-brand-500' : 'bg-neutral-200',
          ].join(' ')}
        />
      ))}
    </div>
  )
}

export default function BookingModal({ isOpen, onClose }) {
  const { addBooking } = useBooking()
  const [step,      setStep]      = useState(0)
  const [direction, setDirection] = useState(1)
  const [confirmed, setConfirmed] = useState(false)

  const [data, setData] = useState({
    packageId: '',
    date: '',
    time: '',
    eventType: '',
    eventDescription: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  const update = (patch) => setData(prev => ({ ...prev, ...patch }))

  const go = (next) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  const handleConfirm = () => {
    addBooking({
      ...data,
      packageName: PARTY_PACKAGES.find(p => p.id === data.packageId)?.name || '',
      packagePrice: PARTY_PACKAGES.find(p => p.id === data.packageId)?.price || 0,
    })
    setConfirmed(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep(0); setDirection(1); setConfirmed(false)
      setData({ packageId: '', date: '', time: '', eventType: '', eventDescription: '', name: '', email: '', phone: '', notes: '' })
    }, 300)
  }

  if (!isOpen) return null

  const selectedPkg = PARTY_PACKAGES.find(p => p.id === data.packageId)
  const minDate = format(addDays(new Date(), 7), 'yyyy-MM-dd')

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className="relative w-full sm:max-w-lg bg-white shadow-card-lg rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{ maxHeight: '92dvh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-neutral-100">
          <div>
            <p className="text-2xs font-semibold uppercase tracking-widest text-brand-500 mb-0.5">
              {confirmed ? '🎉 Booking Confirmed!' : `Step ${step + 1} of ${STEPS.length}`}
            </p>
            <h2 className="font-display font-bold text-xl text-neutral-900">
              {confirmed ? 'See you soon!' : STEPS[step]}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {!confirmed && <StepDots step={step} total={STEPS.length} />}

        {/* Step content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(92dvh - 130px)' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={confirmed ? 'done' : step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 py-5"
            >
              {confirmed ? (
                <ConfirmedView booking={data} pkg={selectedPkg} onClose={handleClose} />
              ) : step === 0 ? (
                <PackageStep data={data} update={update} onNext={() => go(1)} />
              ) : step === 1 ? (
                <DateTimeStep data={data} update={update} minDate={minDate} onNext={() => go(2)} onBack={() => go(0)} />
              ) : step === 2 ? (
                <EventStep data={data} update={update} onNext={() => go(3)} onBack={() => go(1)} />
              ) : step === 3 ? (
                <ContactStep data={data} update={update} onNext={() => go(4)} onBack={() => go(2)} />
              ) : (
                <ReviewStep data={data} pkg={selectedPkg} onBack={() => go(3)} onConfirm={handleConfirm} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Step 1: Package ─── */
function PackageStep({ data, update, onNext }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-neutral-500">Choose the party package that best fits your event.</p>
      {PARTY_PACKAGES.map(pkg => {
        const isSelected = data.packageId === pkg.id
        return (
          <motion.button
            key={pkg.id}
            onClick={() => update({ packageId: pkg.id })}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={[
              'w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all',
              isSelected
                ? 'border-brand-400 bg-brand-50'
                : 'border-neutral-100 bg-neutral-50 hover:border-brand-200',
            ].join(' ')}
          >
            <img src={pkg.mascot} alt="" className="w-12 h-12 object-contain shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-display font-bold text-neutral-800">{pkg.name}</p>
                {pkg.popular && (
                  <span className="badge-orange text-2xs">Most Popular</span>
                )}
              </div>
              <p className="text-xs text-neutral-400">{pkg.subtitle}</p>
            </div>
            <p className="font-display font-extrabold text-brand-600 text-lg shrink-0">
              ${pkg.price.toLocaleString()} MXN
            </p>
          </motion.button>
        )
      })}
      <NavButtons onNext={onNext} nextDisabled={!data.packageId} />
    </div>
  )
}

/* ─── Step 2: Date & Time ─── */
function DateTimeStep({ data, update, minDate, onNext, onBack }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-500">
        We require at least 1 week advance notice. A 50% deposit secures your date.
      </p>
      <div>
        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Event Date</label>
        <input
          type="date"
          min={minDate}
          value={data.date}
          onChange={e => update({ date: e.target.value })}
          className="input"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-neutral-600 mb-2">Preferred Start Time</label>
        <div className="grid grid-cols-3 gap-2">
          {TIME_SLOTS.map(slot => (
            <button
              key={slot}
              onClick={() => update({ time: slot })}
              className={[
                'py-2 rounded-xl text-sm font-semibold border transition-all',
                data.time === slot
                  ? 'border-brand-400 bg-brand-50 text-brand-700'
                  : 'border-neutral-200 text-neutral-600 hover:border-brand-200',
              ].join(' ')}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
      {data.date && data.time && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-brand-50 rounded-2xl px-4 py-3 border border-brand-100"
        >
          <Calendar size={14} className="text-brand-500" />
          <p className="text-sm text-brand-700 font-medium">
            {format(parseISO(data.date), 'EEEE, MMMM d, yyyy')} at {data.time}
          </p>
        </motion.div>
      )}
      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!data.date || !data.time} />
    </div>
  )
}

/* ─── Step 3: Event details ─── */
function EventStep({ data, update, onNext, onBack }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-500">Tell us a bit about your event so we can prepare.</p>
      <div>
        <label className="block text-xs font-semibold text-neutral-600 mb-2">Event Type</label>
        <div className="grid grid-cols-2 gap-2">
          {EVENT_TYPES.map(evt => (
            <button
              key={evt.id}
              onClick={() => update({ eventType: evt.id })}
              className={[
                'flex items-center gap-2 px-3 py-2.5 rounded-2xl border text-sm font-semibold transition-all text-left',
                data.eventType === evt.id
                  ? 'border-brand-400 bg-brand-50 text-brand-700'
                  : 'border-neutral-200 text-neutral-600 hover:border-brand-200',
              ].join(' ')}
            >
              <span>{evt.emoji}</span> {evt.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Event Description (optional)</label>
        <textarea
          rows={3}
          value={data.eventDescription}
          onChange={e => update({ eventDescription: e.target.value })}
          placeholder="E.g., outdoor birthday party for 60 people, themed décor..."
          className="input resize-none"
        />
      </div>
      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!data.eventType} />
    </div>
  )
}

/* ─── Step 4: Contact info ─── */
function ContactStep({ data, update, onNext, onBack }) {
  const valid = data.name && data.email && data.phone
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-500">We'll use this to confirm your booking and send updates.</p>
      <div>
        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Full Name *</label>
        <input
          type="text"
          value={data.name}
          onChange={e => update({ name: e.target.value })}
          placeholder="Your full name"
          className="input"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Email *</label>
        <input
          type="email"
          value={data.email}
          onChange={e => update({ email: e.target.value })}
          placeholder="your@email.com"
          className="input"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Phone / WhatsApp *</label>
        <input
          type="tel"
          value={data.phone}
          onChange={e => update({ phone: e.target.value })}
          placeholder="+52 (669) 000-0000"
          className="input"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Additional Notes</label>
        <textarea
          rows={2}
          value={data.notes}
          onChange={e => update({ notes: e.target.value })}
          placeholder="Allergies, special requests..."
          className="input resize-none"
        />
      </div>
      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!valid} />
    </div>
  )
}

/* ─── Step 5: Review ─── */
function ReviewStep({ data, pkg, onBack, onConfirm }) {
  const rows = [
    { label: 'Package',    value: pkg?.name },
    { label: 'Price',      value: `$${pkg?.price?.toLocaleString()} MXN` },
    { label: 'Date',       value: data.date ? format(parseISO(data.date), 'MMMM d, yyyy') : '' },
    { label: 'Time',       value: data.time },
    { label: 'Event Type', value: EVENT_TYPES.find(e => e.id === data.eventType)?.label },
    { label: 'Name',       value: data.name },
    { label: 'Email',      value: data.email },
    { label: 'Phone',      value: data.phone },
    ...(data.notes ? [{ label: 'Notes', value: data.notes }] : []),
  ]
  return (
    <div>
      <p className="text-sm text-neutral-500 mb-4">Review your details before confirming.</p>
      <div className="rounded-2xl border border-neutral-200 overflow-hidden mb-4">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between px-4 py-2.5 border-b border-neutral-100 last:border-0">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">{label}</span>
            <span className="text-sm text-neutral-800 text-right max-w-[55%]">{value}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-neutral-400 mb-5">
        Confirmation will be sent to <strong className="text-neutral-600">{data.email}</strong>. A 50% deposit is required to secure the date.
      </p>
      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1 py-3 justify-center">Back</button>
        <motion.button
          onClick={onConfirm}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary flex-[2] py-3 justify-center"
        >
          Confirm Booking
        </motion.button>
      </div>
    </div>
  )
}

/* ─── Confirmed ─── */
function ConfirmedView({ booking, pkg, onClose }) {
  return (
    <div className="text-center py-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5"
      >
        <PartyPopper size={36} className="text-green-600" />
      </motion.div>
      <h3 className="font-display font-extrabold text-2xl text-neutral-900 mb-2">Booking Received!</h3>
      <p className="text-sm text-neutral-500 mb-1">
        We'll contact <strong className="text-neutral-700">{booking.name}</strong> at <strong className="text-neutral-700">{booking.email}</strong> within 24 hours to confirm your event.
      </p>
      <p className="text-sm text-neutral-500 mb-6">
        Remember, a 50% deposit of <strong className="text-brand-600">${Math.round(pkg?.price / 2).toLocaleString()} MXN</strong> is required to secure your date.
      </p>
      <a
        href={`https://wa.me/5216692458200?text=${encodeURIComponent(`Hi! I just submitted a booking for ${pkg?.name} on ${booking.date}. My name is ${booking.name}.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full justify-center py-3 mb-3"
      >
        Confirm via WhatsApp
      </a>
      <button onClick={onClose} className="btn-ghost w-full justify-center py-2">
        Close
      </button>
    </div>
  )
}

/* ─── Shared nav buttons ─── */
function NavButtons({ onNext, onBack, nextDisabled = false, nextLabel = 'Continue' }) {
  return (
    <div className="flex gap-3 pt-2">
      {onBack && (
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-2xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 transition-all flex items-center justify-center gap-1.5"
        >
          <ChevronLeft size={15} /> Back
        </button>
      )}
      <motion.button
        onClick={onNext}
        disabled={nextDisabled}
        whileHover={{ scale: nextDisabled ? 1 : 1.02 }}
        whileTap={{ scale: nextDisabled ? 1 : 0.98 }}
        className="flex-[2] btn-primary py-3 justify-center disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none disabled:cursor-not-allowed"
      >
        {nextLabel}
      </motion.button>
    </div>
  )
}
