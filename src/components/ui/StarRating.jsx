import { Star } from 'lucide-react'

export default function StarRating({ rating = 5, max = 5, size = 14 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'text-brand-400 fill-brand-400' : 'text-neutral-200 fill-neutral-200'}
        />
      ))}
    </div>
  )
}
