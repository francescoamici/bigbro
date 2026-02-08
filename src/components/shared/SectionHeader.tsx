import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  titleClassName?: string
}

export function SectionHeader({ title, subtitle, className, titleClassName }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={cn('text-center mb-16', className)}
    >
      <h2 className={cn('text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-4', titleClassName)}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-bigbro-text-muted text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
