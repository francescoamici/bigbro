import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView, useMotionValue, AnimatePresence } from 'framer-motion'
import { players, teamStats, LOGO_URL, MOONRYDE_IMAGE_URL } from '@/data/players'
import { news } from '@/data/news'
import { sponsorTiers } from '@/data/sponsors'
import { ContactForm } from '@/components/shared/ContactForm'
import { cn } from '@/lib/utils'
import {
  Trophy,
  Users,
  Star,
  Target,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  Gem,
  Crown,
  Shield,
  Check,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Hand,
  Menu,
  X,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Injected CSS keyframes
// ---------------------------------------------------------------------------
const injectStyles = `
@keyframes slowGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes borderTravel {
  0% { --border-angle: 0deg; }
  100% { --border-angle: 360deg; }
}

@property --border-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
`

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
      className={cn('relative', className)}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.section>
  )
}

// ---------------------------------------------------------------------------
// Role icon helper
// ---------------------------------------------------------------------------
function getRoleIcon(role: string) {
  if (role.toLowerCase().includes('portiere')) return Hand
  if (role.toLowerCase().includes('attaccante')) return Target
  if (role.toLowerCase().includes('centrocampista')) return Sparkles
  if (role.toLowerCase().includes('difensore')) return Shield
  if (role.toLowerCase().includes('allenatore')) return Crown
  return Star
}

// ---------------------------------------------------------------------------
// Category color helper
// ---------------------------------------------------------------------------
function getCategoryStyle(category: string) {
  switch (category) {
    case 'mercato':
      return 'text-emerald-400'
    case 'match':
      return 'text-bigbro-purple-light'
    case 'lifestyle':
      return 'text-amber-400'
    case 'team':
      return 'text-blue-400'
    default:
      return 'text-bigbro-text-muted'
  }
}

// ---------------------------------------------------------------------------
// SECTION 1: Navbar
// ---------------------------------------------------------------------------
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  const links = [
    { label: 'Chi Siamo', id: 'chi-siamo' },
    { label: 'Rosa', id: 'la-rosa' },
    { label: 'Sponsor', id: 'sponsor' },
    { label: 'News', id: 'news' },
    { label: 'Contatti', id: 'contatti' },
  ]

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || mobileOpen
          ? 'bg-bigbro-black/80 backdrop-blur-xl border-b border-white/[0.04]'
          : 'bg-transparent'
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 group"
        >
          <img
            src={LOGO_URL}
            alt="BigBro FC"
            className="w-9 h-9 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-bigbro-text font-light text-sm tracking-[0.25em] uppercase hidden sm:inline">
            BigBro FC
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-bigbro-text-muted text-[13px] font-light tracking-[0.12em] uppercase hover:text-bigbro-text transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollTo('contatti')}
          className="hidden md:block text-[13px] font-light tracking-[0.12em] uppercase text-bigbro-text border border-white/[0.12] rounded-full px-6 py-2.5 hover:bg-white/[0.04] hover:border-white/[0.2] transition-all duration-300"
        >
          Diventa Sponsor
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-bigbro-text p-2"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-bigbro-black/90 backdrop-blur-xl border-t border-white/[0.04]"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-bigbro-text-muted text-sm font-light tracking-[0.12em] uppercase hover:text-bigbro-text transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contatti')}
                className="mt-2 text-sm font-light tracking-[0.12em] uppercase text-bigbro-text border border-white/[0.12] rounded-full px-6 py-2.5 text-center"
              >
                Diventa Sponsor
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ---------------------------------------------------------------------------
// SECTION 2: Hero with highlight effect + slow gradient + shimmer stats
// ---------------------------------------------------------------------------
function HeroSection() {
  const taglineWords = ['IL', 'GOBBO', 'NON', 'MOLLA', 'MAI']
  const highlightIndices = [1, 3] // "GOBBO" and "MOLLA" get the animated highlight

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Slow background gradient animation */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0a0a0a 0%, #111111 25%, #0f0a1a 50%, #0a0a0a 75%, #111111 100%)',
          backgroundSize: '400% 400%',
          animation: 'slowGradient 20s ease infinite',
        }}
      />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-bigbro-purple/[0.03] blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Logo */}
        <motion.img
          src={LOGO_URL}
          alt="BigBro FC"
          className="w-20 h-20 mx-auto mb-16 opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Title */}
        <motion.h1
          className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-[0.15em] text-bigbro-text mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          BIGBRO
        </motion.h1>

        {/* Tagline with hero highlight effect */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {taglineWords.map((word, i) => {
            const isHighlighted = highlightIndices.includes(i)
            return (
              <span key={i} className="relative inline-block">
                {isHighlighted && (
                  <motion.span
                    className="absolute inset-0 -inset-x-2 rounded-sm bg-bigbro-purple/[0.12]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 1.2 + i * 0.15,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    style={{ originX: 0 }}
                  />
                )}
                <span
                  className={cn(
                    'relative text-lg md:text-xl font-light tracking-[0.35em] uppercase',
                    isHighlighted
                      ? 'text-bigbro-purple-light'
                      : 'text-bigbro-text-muted'
                  )}
                >
                  {word}
                </span>
              </span>
            )
          })}
        </motion.div>

        {/* Stats with shimmer text */}
        <motion.div
          className="flex flex-wrap justify-center gap-16 md:gap-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {[
            { label: 'Posizione', value: '3\u00b0', sub: 'Girone A', icon: Trophy },
            { label: 'Vittorie', value: String(teamStats.wins), sub: 'stagione', icon: Users },
            { label: 'Gol', value: String(teamStats.goals), sub: 'segnati', icon: Target },
          ].map((stat, i) => {
            const StatIcon = stat.icon
            return (
              <div key={i} className="text-center group">
                <StatIcon className="w-3.5 h-3.5 text-bigbro-text-muted/30 mx-auto mb-3 group-hover:text-bigbro-purple-light/50 transition-colors duration-500" />
                <p
                  className="text-4xl md:text-5xl font-extralight tracking-wide mb-1"
                  style={{
                    background:
                      'linear-gradient(90deg, #a3a3a3 0%, #f5f5f5 25%, #a78bfa 50%, #f5f5f5 75%, #a3a3a3 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 4s linear infinite',
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-[11px] font-light tracking-[0.25em] uppercase text-bigbro-text-muted">
                  {stat.sub}
                </p>
              </div>
            )
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-[1px] h-12 bg-gradient-to-b from-transparent via-bigbro-text-muted/40 to-transparent mx-auto"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// SECTION 3: Chi Siamo with comparison slider
// ---------------------------------------------------------------------------
function ComparisonSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [sliderPos, setSliderPos] = useState(0.5)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useEffect(() => {
    if (containerWidth > 0) {
      x.set(containerWidth * 0.5)
    }
  }, [containerWidth, x])

  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      if (containerWidth > 0) {
        setSliderPos(Math.max(0, Math.min(1, latest / containerWidth)))
      }
    })
    return unsubscribe
  }, [x, containerWidth])

  const beforeStats = [
    { label: 'Inizio Stagione', value: '---' },
    { label: 'Partite', value: '0' },
    { label: 'Vittorie', value: '0' },
    { label: 'Gol', value: '0' },
  ]

  const afterStats = [
    { label: 'Girone A', value: '3\u00b0' },
    { label: 'Partite', value: '7' },
    { label: 'Vittorie', value: String(teamStats.wins) },
    { label: 'Gol', value: String(teamStats.goals) },
  ]

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden bg-bigbro-card border border-white/[0.06] select-none"
    >
      {/* After layer (full width, behind) */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <p className="text-[11px] font-light tracking-[0.25em] uppercase text-bigbro-purple-light mb-6">
            Oggi
          </p>
          <div className="grid grid-cols-2 gap-6">
            {afterStats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-extralight text-bigbro-text">
                  {s.value}
                </p>
                <p className="text-[11px] font-light tracking-[0.15em] uppercase text-bigbro-text-muted mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Before layer (clipped) */}
      <div
        className="absolute inset-0 flex items-center justify-center p-8 bg-bigbro-dark border-r border-white/[0.06]"
        style={{ clipPath: `inset(0 ${(1 - sliderPos) * 100}% 0 0)` }}
      >
        <div className="w-full max-w-md">
          <p className="text-[11px] font-light tracking-[0.25em] uppercase text-bigbro-text-muted mb-6">
            Inizio Stagione
          </p>
          <div className="grid grid-cols-2 gap-6">
            {beforeStats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-extralight text-bigbro-text-muted">
                  {s.value}
                </p>
                <p className="text-[11px] font-light tracking-[0.15em] uppercase text-bigbro-text-muted/60 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Draggable divider */}
      <motion.div
        className="absolute top-0 bottom-0 w-10 -ml-5 cursor-grab active:cursor-grabbing z-10 flex items-center justify-center"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: containerWidth }}
        dragElastic={0}
        dragMomentum={false}
      >
        <div className="w-[2px] h-full bg-white/20" />
        <div className="absolute w-10 h-10 rounded-full bg-bigbro-card border border-white/[0.12] flex items-center justify-center shadow-lg">
          <GripVertical className="w-4 h-4 text-bigbro-text-muted" />
        </div>
      </motion.div>
    </div>
  )
}

function ChiSiamoSection() {
  return (
    <Section id="chi-siamo" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.p
          className="text-[11px] font-light tracking-[0.3em] uppercase text-bigbro-purple-light mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Chi Siamo
        </motion.p>

        <motion.h2
          className="text-3xl md:text-4xl font-extralight text-bigbro-text mb-12 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          BigBro FC nasce dalla visione di{' '}
          <span className="text-bigbro-purple-light">Moonryde</span>, presidente
          e fondatore. Una squadra costruita sulla passione, sulla grinta e sul
          desiderio di dominare la Kings League Italia.
        </motion.h2>

        <motion.p
          className="text-bigbro-text-muted font-light leading-relaxed max-w-xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Terzi nel Girone A, ma con la fame di chi punta al vertice. Ogni
          partita e&#39; un passo verso la gloria.
        </motion.p>

        {/* Comparison slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ComparisonSlider />
          <p className="text-center text-[11px] font-light tracking-[0.15em] uppercase text-bigbro-text-muted/50 mt-4">
            Trascina per confrontare
          </p>
        </motion.div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// SECTION 4: La Rosa - Glare Cards
// ---------------------------------------------------------------------------
function GlareCard({
  children,
  className,
  index,
}: {
  children: React.ReactNode
  className?: string
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlare({ x, y, opacity: 0.15 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setGlare((prev) => ({ ...prev, opacity: 0 }))
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-bigbro-card border border-white/[0.06] transition-all duration-500 hover:border-white/[0.1]',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      {/* Glare overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle 250px at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  )
}

function LaRosaSection() {
  return (
    <Section id="la-rosa" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.p
          className="text-[11px] font-light tracking-[0.3em] uppercase text-bigbro-purple-light mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          La Rosa
        </motion.p>

        <motion.h2
          className="text-3xl md:text-4xl font-extralight text-bigbro-text mb-16 max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          I protagonisti del nostro progetto.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {players.map((player, i) => {
            const RoleIcon = getRoleIcon(player.role)
            return (
              <GlareCard key={player.name} index={i} className="p-7 group">
                <div className="relative z-20">
                  {player.image && (
                    <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-bigbro-dark/50">
                      <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" loading="lazy" />
                    </div>
                  )}
                  {/* Number watermark */}
                  <span className="absolute -top-1 -right-1 text-6xl font-extralight text-white/[0.03] select-none">
                    {player.number === 0 ? 'HC' : player.number}
                  </span>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-6">
                    <RoleIcon className="w-4 h-4 text-bigbro-purple-light/70" />
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-light text-bigbro-text mb-1 tracking-wide group-hover:text-bigbro-purple-light transition-colors duration-500">
                    {player.name}
                  </h3>

                  {/* Role */}
                  <p className="text-[11px] font-light tracking-[0.2em] uppercase text-bigbro-text-muted/60 mb-5">
                    {player.role}
                  </p>

                  {/* Description */}
                  <p className="text-sm font-light text-bigbro-text-muted leading-relaxed">
                    {player.description}
                  </p>

                  {/* Bottom line */}
                  <div className="mt-6 h-[1px] bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04]" />
                </div>
              </GlareCard>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// SECTION 5: Pacchetti Sponsor - Moving Border Cards
// ---------------------------------------------------------------------------
function MovingBorderCard({
  children,
  highlighted,
  index,
}: {
  children: React.ReactNode
  highlighted?: boolean
  index: number
}) {
  return (
    <motion.div
      className="relative rounded-2xl p-[1px] group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{
        background: highlighted
          ? undefined
          : 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
      }}
    >
      {/* Animated gradient border for highlighted card */}
      {highlighted && (
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              'conic-gradient(from var(--border-angle, 0deg), #7c3aed, #5b21b6, #a78bfa, #7c3aed)',
            animation: 'borderTravel 4s linear infinite',
          }}
        />
      )}

      {/* Non-highlighted animated border (more subtle) */}
      {!highlighted && (
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              'conic-gradient(from var(--border-angle, 0deg), rgba(124,58,237,0.3), transparent, rgba(167,139,250,0.2), transparent)',
            animation: 'borderTravel 6s linear infinite',
          }}
        />
      )}

      {/* Inner card content */}
      <div className="relative rounded-[15px] bg-bigbro-card p-8 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  )
}

function SponsorSection() {
  const tierIcons = [Crown, Gem, Shield]

  return (
    <Section id="sponsor" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.p
          className="text-[11px] font-light tracking-[0.3em] uppercase text-bigbro-purple-light mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Partnership
        </motion.p>

        <motion.h2
          className="text-3xl md:text-4xl font-extralight text-bigbro-text mb-6 max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Pacchetti Sponsor
        </motion.h2>

        <motion.p
          className="text-bigbro-text-muted font-light mb-16 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Tre livelli di collaborazione per crescere insieme.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sponsorTiers.map((tier, i) => {
            const Icon = tierIcons[i] || Star
            return (
              <MovingBorderCard
                key={tier.id}
                highlighted={tier.highlighted}
                index={i}
              >
                {/* Highlighted badge */}
                {tier.highlighted && (
                  <div className="mb-6">
                    <span className="text-[10px] font-light tracking-[0.25em] uppercase text-bigbro-purple-light border border-bigbro-purple/30 rounded-full px-3 py-1">
                      Consigliato
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-6">
                  <Icon className="w-4 h-4 text-bigbro-purple-light/70" />
                </div>

                {/* Tier label */}
                <p className="text-[11px] font-light tracking-[0.2em] uppercase text-bigbro-text-muted/60 mb-1">
                  {tier.tier}
                </p>

                {/* Name */}
                <h3 className="text-xl font-light text-bigbro-text mb-8 tracking-wide">
                  {tier.name}
                </h3>

                {/* Features */}
                <ul className="space-y-3.5 flex-1">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm font-light text-bigbro-text-muted"
                    >
                      <Check className="w-3.5 h-3.5 text-bigbro-purple/60 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={cn(
                    'mt-8 w-full py-3 rounded-xl text-[13px] font-light tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all duration-300',
                    tier.highlighted
                      ? 'bg-bigbro-purple/90 hover:bg-bigbro-purple text-white'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-bigbro-text border border-white/[0.06]'
                  )}
                  onClick={() => {
                    const el = document.getElementById('contatti')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Contattaci
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </MovingBorderCard>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// SECTION 6: Gobbo News - Apple-style cards carousel
// ---------------------------------------------------------------------------
function NewsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [updateScrollState])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current
    if (!el) return
    const cardWidth = el.querySelector('.news-card')?.clientWidth ?? 360
    el.scrollBy({
      left: direction === 'left' ? -cardWidth - 20 : cardWidth + 20,
      behavior: 'smooth',
    })
  }

  return (
    <Section id="news" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with navigation arrows */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p
              className="text-[11px] font-light tracking-[0.3em] uppercase text-bigbro-purple-light mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              News
            </motion.p>
            <motion.h2
              className="text-3xl md:text-4xl font-extralight text-bigbro-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Gobbo News
            </motion.h2>
          </div>

          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={cn(
                'w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center transition-all duration-300',
                canScrollLeft
                  ? 'hover:bg-white/[0.06] text-bigbro-text'
                  : 'opacity-30 cursor-not-allowed text-bigbro-text-muted'
              )}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={cn(
                'w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center transition-all duration-300',
                canScrollRight
                  ? 'hover:bg-white/[0.06] text-bigbro-text'
                  : 'opacity-30 cursor-not-allowed text-bigbro-text-muted'
              )}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {news.map((article) => (
            <div
              key={article.id}
              className="news-card flex-shrink-0 w-[85vw] sm:w-[360px] snap-start"
            >
              <div className="rounded-2xl bg-bigbro-card border border-white/[0.06] overflow-hidden group cursor-pointer hover:border-white/[0.1] transition-all duration-500">
                {/* Image area placeholder */}
                <div className="h-48 bg-gradient-to-br from-bigbro-dark to-bigbro-card relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-bigbro-purple/[0.06] to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <span
                      className={cn(
                        'text-[10px] font-light tracking-[0.2em] uppercase',
                        getCategoryStyle(article.category)
                      )}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-[11px] font-light tracking-[0.15em] text-bigbro-text-muted/50 mb-3">
                    {article.date}
                  </p>
                  <h3 className="text-base font-light text-bigbro-text mb-3 leading-snug group-hover:text-bigbro-purple-light transition-colors duration-500">
                    {article.title}
                  </h3>
                  <p className="text-sm font-light text-bigbro-text-muted/70 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-bigbro-purple-light/70 text-[12px] font-light tracking-wide group-hover:gap-3 transition-all duration-300">
                    Leggi
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// SECTION 7: Contatti
// ---------------------------------------------------------------------------
function ContattiSection() {
  return (
    <Section id="contatti" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="text-[11px] font-light tracking-[0.3em] uppercase text-bigbro-purple-light mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Contatti
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-extralight text-bigbro-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Parliamo del tuo progetto.
          </motion.h2>
          <motion.p
            className="text-bigbro-text-muted font-light max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Vuoi far parte del mondo BigBro? Compila il form e ti ricontatteremo.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="rounded-2xl bg-bigbro-card border border-white/[0.06] p-8 md:p-12">
            <ContactForm
              inputClassName="bg-white/[0.03] border-white/[0.06] rounded-xl font-light tracking-wide focus:border-bigbro-purple/40 placeholder:text-bigbro-text-muted/30"
              buttonClassName="bg-bigbro-purple/90 hover:bg-bigbro-purple font-light tracking-[0.1em] uppercase rounded-xl"
            />
          </div>

          {/* Contact info below form */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { icon: Mail, text: 'info@bigbrofc.it' },
              { icon: Instagram, text: '@bigbrofc' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-2.5 text-bigbro-text-muted/50"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[13px] font-light tracking-wide">
                    {item.text}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// SECTION 8: Footer
// ---------------------------------------------------------------------------
function FooterSection() {
  const socials = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ]

  return (
    <footer className="border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & name */}
          <div className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="BigBro FC"
              className="w-8 h-8 opacity-80"
            />
            <span className="text-[13px] font-light tracking-[0.2em] uppercase text-bigbro-text-muted/60">
              BigBro FC
            </span>
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
                  className="w-9 h-9 rounded-full border border-white/[0.06] flex items-center justify-center hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5 text-bigbro-text-muted/50 hover:text-bigbro-text-muted transition-colors" />
                </a>
              )
            })}
          </div>

          {/* Copyright */}
          <div className="text-[12px] font-light tracking-[0.1em] text-bigbro-text-muted/30">
            <p>&copy; {new Date().getFullYear()} BigBro FC</p>
            <p className="mt-1">Made with ❤️ by <a href="https://mindblast.it" target="_blank" rel="noopener noreferrer" className="text-bigbro-purple-light hover:text-bigbro-purple transition-colors">Mindblast</a></p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------
export default function Page9_MinimalLuxury() {
  return (
    <>
      <style>{injectStyles}</style>

      <div className="min-h-screen bg-bigbro-black text-bigbro-text overflow-x-hidden selection:bg-bigbro-purple/20 selection:text-bigbro-text">
        <Navbar />

        <main>
          <HeroSection />
          <ChiSiamoSection />
          <LaRosaSection />
          <SponsorSection />
          <NewsSection />
          <ContattiSection />
        </main>

        <FooterSection />
      </div>
    </>
  )
}
