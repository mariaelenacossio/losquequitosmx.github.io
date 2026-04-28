import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',   // 'up' | 'left' | 'right' | 'none'
  once = true,
  as: Tag = 'div',
}) {
  const ref  = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px' })

  const yMap    = { up: 20, down: -20, left: 0, right: 0, none: 0 }
  const xMap    = { up: 0, down: 0, left: 20, right: -20, none: 0 }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yMap[direction], x: xMap[direction] }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
