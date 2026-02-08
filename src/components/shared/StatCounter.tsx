import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatCounterProps {
  value: number
  label: string
  suffix?: string
  className?: string
  valueClassName?: string
}

export function StatCounter({ value, label, suffix = '', className, valueClassName }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('text-center', className)}
    >
      <div className={cn('text-4xl md:text-5xl font-bold font-heading text-bigbro-purple', valueClassName)}>
        {count}{suffix}
      </div>
      <div className="text-bigbro-text-muted text-sm mt-1 uppercase tracking-wider">{label}</div>
    </motion.div>
  )
}
