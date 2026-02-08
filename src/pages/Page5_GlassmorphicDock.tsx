import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { players, teamStats, LOGO_URL } from '@/data/players'
import { news } from '@/data/news'
import { sponsorTiers } from '@/data/sponsors'
import { ContactForm } from '@/components/shared/ContactForm'
import { cn } from '@/lib/utils'
import {
  Home,
  Users,
  Trophy,
  Newspaper,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  Crown,
  Shield,
  Star,
  Check,
  ArrowRight,
  Sparkles,
  Target,
  ChevronRight,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Animated background blobs
// ---------------------------------------------------------------------------
function FloatingBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-purple-600 opacity-20 blur-3xl"
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -100, 60, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '-10%', left: '-10%' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-violet-700 opacity-15 blur-3xl"
        animate={{
          x: [0, -100, 80, 0],
          y: [0, 80, -120, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '40%', right: '-5%' }}
      />
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full bg-indigo-600 opacity-15 blur-3xl"
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -60, 100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '5%', left: '30%' }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Glass card wrapper
// ---------------------------------------------------------------------------
function GlassCard({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section wrapper with inView animation
// ---------------------------------------------------------------------------
function Section({
  id,
  children,
  className,
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      className={cn('relative z-10', className)}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}

// ---------------------------------------------------------------------------
// Typing text effect
// ---------------------------------------------------------------------------
function TypingText({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 80)

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => {
      clearInterval(interval)
      clearInterval(cursorInterval)
    }
  }, [text])

  return (
    <span className={className}>
      {displayed}
      <span
        className={cn(
          'inline-block w-[3px] h-[1em] bg-bigbro-purple ml-1 align-middle transition-opacity',
          showCursor ? 'opacity-100' : 'opacity-0'
        )}
      />
    </span>
  )
}

// ---------------------------------------------------------------------------
// Animated gradient text (for sponsor tier names)
// ---------------------------------------------------------------------------
function GradientText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent font-bold',
        className
      )}
      style={{
        backgroundImage:
          'linear-gradient(90deg, #7c3aed, #a78bfa, #c4b5fd, #7c3aed)',
        backgroundSize: '200% auto',
        animation: 'gradientShift 3s linear infinite',
      }}
    >
      {children}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Dock navigation items
// ---------------------------------------------------------------------------
const dockItems = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'chi-siamo', icon: Users, label: 'Chi Siamo' },
  { id: 'la-rosa', icon: Shield, label: 'La Rosa' },
  { id: 'sponsor', icon: Trophy, label: 'Sponsor' },
  { id: 'news', icon: Newspaper, label: 'News' },
  { id: 'contatti', icon: Mail, label: 'Contatti' },
]

// ---------------------------------------------------------------------------
// Role icon mapping
// ---------------------------------------------------------------------------
function getRoleIcon(role: string) {
  if (role.toLowerCase().includes('attaccante')) return Target
  if (role.toLowerCase().includes('centrocampista')) return Sparkles
  if (role.toLowerCase().includes('difensore')) return Shield
  if (role.toLowerCase().includes('allenatore')) return Crown
  return Star
}

// ---------------------------------------------------------------------------
// Category badge colors
// ---------------------------------------------------------------------------
function getCategoryColor(category: string) {
  switch (category) {
    case 'mercato':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
    case 'match':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/20'
    case 'lifestyle':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/20'
    case 'team':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/20'
    default:
      return 'bg-white/10 text-white/70 border-white/10'
  }
}

// ---------------------------------------------------------------------------
// macOS Dock Component
// ---------------------------------------------------------------------------
function Dock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1
    const distance = Math.abs(index - hoveredIndex)
    if (distance === 0) return 1.5
    if (distance === 1) return 1.25
    if (distance === 2) return 1.1
    return 1
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-2xl px-4 py-3 flex items-end gap-2 shadow-2xl shadow-black/30">
        {dockItems.map((item, index) => {
          const Icon = item.icon
          const scale = getScale(index)

          return (
            <motion.button
              key={item.id}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => scrollToSection(item.id)}
              animate={{ scale }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              aria-label={item.label}
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className="absolute -top-10 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/10"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                <Icon className="w-5 h-5 text-bigbro-text" />
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
}

// ---------------------------------------------------------------------------
// SECTION 1: Hero
// ---------------------------------------------------------------------------
function HeroSection() {
  const heroTitle = 'BIGBRO'
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background element */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-bigbro-purple/10 blur-3xl" />
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Logo */}
        <motion.img
          src={LOGO_URL}
          alt="BigBro FC"
          className="w-28 h-28 mx-auto mb-10 drop-shadow-[0_0_40px_rgba(124,58,237,0.5)]"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 1 }}
        />

        {/* Wave reveal title */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold font-heading tracking-widest mb-6">
          {heroTitle.split('').map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block text-gradient"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.3 + i * 0.1,
                type: 'spring',
                stiffness: 120,
                damping: 12,
              }}
            >
              {letter}
            </motion.span>
          ))}
          <motion.span
            className="inline-block text-bigbro-text ml-4"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.3 + heroTitle.length * 0.1,
              type: 'spring',
              stiffness: 120,
              damping: 12,
            }}
          >
            FC
          </motion.span>
        </h1>

        {/* Typing subtitle */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-xl md:text-2xl font-heading tracking-[0.3em] text-bigbro-purple-light">
            <TypingText text="IL GOBBO NON MOLLA MAI" />
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          {[
            { label: 'Posizione', value: teamStats.positionLabel, icon: Trophy },
            { label: 'Vittorie', value: teamStats.wins.toString(), icon: Crown },
            { label: 'Gol Fatti', value: teamStats.goals.toString(), icon: Target },
            { label: 'Giocatori', value: players.length.toString(), icon: Users },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <GlassCard
                key={stat.label}
                className="px-6 py-4 flex items-center gap-3 hover:bg-white/10 transition-colors duration-300"
              >
                <Icon className="w-5 h-5 text-bigbro-purple" />
                <div className="text-left">
                  <p className="text-2xl font-bold text-bigbro-text font-heading">
                    {stat.value}
                  </p>
                  <p className="text-xs text-bigbro-text-muted uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </GlassCard>
            )
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/20 rounded-full mx-auto flex items-start justify-center p-1.5"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-1.5 h-1.5 bg-bigbro-purple rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// SECTION 2: Chi Siamo
// ---------------------------------------------------------------------------
function ChiSiamoSection() {
  const bentoItems = [
    {
      title: 'La Nostra Storia',
      content:
        'BigBro FC nasce dalla visione di Moonryde, presidente e fondatore. Una squadra costruita sulla passione, sulla grinta e sul desiderio di dominare la Kings League Italia. Terzi nel Girone A, ma con la fame di chi punta al vertice.',
      span: 'md:col-span-2 md:row-span-2',
      gradient: 'from-purple-900/40 to-violet-900/20',
      icon: Shield,
    },
    {
      title: 'Moonryde',
      content:
        'Presidente e fondatore. Content creator visionario che ha portato il calcio digitale a un nuovo livello.',
      span: 'md:col-span-1',
      gradient: 'from-indigo-900/40 to-blue-900/20',
      icon: Crown,
    },
    {
      title: 'Kings League',
      content:
        'La competizione calcistica rivoluzionaria ideata da Gerard Piqu\u00e9. Adrenalina pura, regole innovative, spettacolo totale.',
      span: 'md:col-span-1',
      gradient: 'from-violet-900/40 to-purple-900/20',
      icon: Trophy,
    },
    {
      title: 'La Mentalit\u00e0',
      content:
        'Il Gobbo non molla mai. Grinta, determinazione e spirito di squadra sono i pilastri del nostro DNA.',
      span: 'md:col-span-1',
      gradient: 'from-fuchsia-900/40 to-pink-900/20',
      icon: Target,
    },
    {
      title: 'Il Futuro',
      content:
        'Puntiamo alla vetta. Ogni partita \u00e8 un passo verso la gloria nella Kings League Italia.',
      span: 'md:col-span-1',
      gradient: 'from-blue-900/40 to-indigo-900/20',
      icon: Sparkles,
    },
  ]

  return (
    <Section id="chi-siamo" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-heading mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">Chi Siamo</span>
          </motion.h2>
          <p className="text-bigbro-text-muted max-w-xl mx-auto">
            La storia, la visione e l'ambizione di BigBro FC.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {bentoItems.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                className={item.span}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard
                  className={cn(
                    'h-full p-7 bg-gradient-to-br transition-all duration-500 hover:bg-white/10 group',
                    item.gradient
                  )}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-bigbro-purple/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-bigbro-purple-light" />
                    </div>
                    <h3 className="text-xl font-bold text-bigbro-text font-heading">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-bigbro-text-muted leading-relaxed">
                    {item.content}
                  </p>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// SECTION 3: La Rosa
// ---------------------------------------------------------------------------
function LaRosaSection() {
  return (
    <Section id="la-rosa" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-heading mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">La Rosa</span>
          </motion.h2>
          <p className="text-bigbro-text-muted max-w-xl mx-auto">
            I guerrieri che portano in alto i colori di BigBro FC.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player, i) => {
            const RoleIcon = getRoleIcon(player.role)
            return (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard className="p-6 group hover:-translate-y-2 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
                  {/* Player header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bigbro-purple/30 to-violet-600/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      <RoleIcon className="w-7 h-7 text-bigbro-purple-light" />
                    </div>
                    <span className="text-5xl font-bold font-heading text-white/5 group-hover:text-white/10 transition-colors">
                      {player.number === 0 ? 'HC' : `#${player.number}`}
                    </span>
                  </div>

                  {/* Name & role */}
                  <h3 className="text-xl font-bold text-bigbro-text font-heading mb-1 group-hover:text-bigbro-purple-light transition-colors">
                    {player.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-bigbro-purple font-medium">
                      {player.role}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-bigbro-text-muted text-sm leading-relaxed">
                    {player.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-5 h-px bg-gradient-to-r from-transparent via-bigbro-purple/30 to-transparent" />
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// SECTION 4: Pacchetti Sponsor
// ---------------------------------------------------------------------------
function SponsorSection() {
  const tierIcons = [Crown, Star, Shield]

  return (
    <Section id="sponsor" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-heading mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">Pacchetti Sponsor</span>
          </motion.h2>
          <p className="text-bigbro-text-muted max-w-xl mx-auto">
            Unisciti a BigBro FC. Scegli il pacchetto pi\u00f9 adatto alla tua visibilit\u00e0.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sponsorTiers.map((tier, i) => {
            const Icon = tierIcons[i] || Star
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <GlassCard
                  className={cn(
                    'p-8 h-full flex flex-col group hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10',
                    tier.highlighted &&
                      'border-bigbro-purple/30 bg-white/[0.08] ring-1 ring-bigbro-purple/20'
                  )}
                >
                  {/* Tier badge */}
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-bigbro-purple text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                        Consigliato
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-bigbro-purple/20 border border-white/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-bigbro-purple-light" />
                  </div>

                  {/* Tier name with animated gradient */}
                  <p className="text-sm text-bigbro-text-muted uppercase tracking-wider mb-1">
                    {tier.tier}
                  </p>
                  <h3 className="text-2xl font-heading font-bold mb-6">
                    <GradientText className="text-2xl font-heading">
                      {tier.name}
                    </GradientText>
                  </h3>

                  {/* Features */}
                  <ul className="space-y-3 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-bigbro-text-muted"
                      >
                        <Check className="w-4 h-4 text-bigbro-purple mt-0.5 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={cn(
                      'mt-8 w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300',
                      tier.highlighted
                        ? 'bg-bigbro-purple hover:bg-bigbro-purple-dark text-white'
                        : 'bg-white/10 hover:bg-white/20 text-bigbro-text border border-white/10'
                    )}
                    onClick={() => {
                      const el = document.getElementById('contatti')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Contattaci
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// SECTION 5: Gobbo News
// ---------------------------------------------------------------------------
function NewsSection() {
  return (
    <Section id="news" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-heading mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">Gobbo News</span>
          </motion.h2>
          <p className="text-bigbro-text-muted max-w-xl mx-auto">
            Tutte le ultime dal mondo BigBro FC.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6 group hover:bg-white/10 transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/5">
                {/* Category + Date */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={cn(
                      'text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border',
                      getCategoryColor(article.category)
                    )}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs text-bigbro-text-muted">
                    {article.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-bigbro-text font-heading mb-3 group-hover:text-bigbro-purple-light transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-bigbro-text-muted text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                {/* Read more */}
                <div className="flex items-center gap-1 text-bigbro-purple text-sm font-medium group-hover:gap-2 transition-all">
                  Leggi di pi\u00f9
                  <ChevronRight className="w-4 h-4" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// SECTION 6: Contatti
// ---------------------------------------------------------------------------
function ContattiSection() {
  return (
    <Section id="contatti" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-heading mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">Contatti</span>
          </motion.h2>
          <p className="text-bigbro-text-muted max-w-xl mx-auto">
            Vuoi far parte del progetto BigBro? Scrivici.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 md:p-12">
            <ContactForm
              inputClassName="bg-white/5 border-white/10 backdrop-blur-md focus:border-bigbro-purple/50"
              buttonClassName="bg-bigbro-purple hover:bg-bigbro-purple-dark backdrop-blur-md"
            />
          </GlassCard>
        </motion.div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// SECTION 7: Footer
// ---------------------------------------------------------------------------
function FooterSection() {
  const socials = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ]

  return (
    <footer className="relative z-10 mt-12">
      <div className="backdrop-blur-xl bg-white/5 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo & name */}
            <div className="flex items-center gap-4">
              <img
                src={LOGO_URL}
                alt="BigBro FC"
                className="w-10 h-10 drop-shadow-[0_0_15px_rgba(124,58,237,0.4)]"
              />
              <div>
                <h4 className="font-heading font-bold text-bigbro-text text-lg">
                  BIGBRO FC
                </h4>
                <p className="text-bigbro-text-muted text-xs">
                  Kings League Italia
                </p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:border-bigbro-purple/30 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-bigbro-text-muted group-hover:text-bigbro-purple-light transition-colors" />
                  </a>
                )
              })}
            </div>

            {/* Copyright */}
            <p className="text-bigbro-text-muted text-sm">
              &copy; {new Date().getFullYear()} BigBro FC. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ---------------------------------------------------------------------------
// CSS keyframes injected inline
// ---------------------------------------------------------------------------
const injectStyles = `
@keyframes gradientShift {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}
`

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------
export default function Page5_GlassmorphicDock() {
  return (
    <>
      {/* Injected keyframe animation */}
      <style>{injectStyles}</style>

      <div className="min-h-screen bg-bigbro-black text-bigbro-text overflow-x-hidden">
        {/* Background blobs */}
        <FloatingBlobs />

        {/* Main content with bottom padding for dock */}
        <main className="pb-28">
          <HeroSection />
          <ChiSiamoSection />
          <LaRosaSection />
          <SponsorSection />
          <NewsSection />
          <ContattiSection />
        </main>

        <FooterSection />

        {/* macOS-style Dock */}
        <Dock />
      </div>
    </>
  )
}
