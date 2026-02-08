import { useState, useRef, useEffect, useCallback, type MouseEvent as ReactMouseEvent } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { players, teamStats, LOGO_URL } from '@/data/players'
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
  Eye,
  Crown,
  Shield,
  Check,
  ArrowRight,
  Lightbulb,
  Flame,
  Menu,
  X,
  Hand,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  STYLE: Keyframes injected via <style> tag for spotlight-specific   */
/* ------------------------------------------------------------------ */
const spotlightStyles = `
@keyframes spotlight-glow-pulse {
  0%, 100% { box-shadow: 0 0 15px rgba(124,58,237,0.25), 0 0 30px rgba(124,58,237,0.1); }
  50% { box-shadow: 0 0 25px rgba(124,58,237,0.5), 0 0 60px rgba(124,58,237,0.25); }
}
@keyframes dot-float {
  0% { transform: translateY(0) scale(1); opacity: 0.3; }
  50% { transform: translateY(-12px) scale(1.3); opacity: 0.7; }
  100% { transform: translateY(0) scale(1); opacity: 0.3; }
}
.spotlight-glow-border {
  animation: spotlight-glow-pulse 2.5s ease-in-out infinite;
}
`

/* ------------------------------------------------------------------ */
/*  HELPER: Direction-aware hover detection                            */
/* ------------------------------------------------------------------ */
function getDirection(ev: ReactMouseEvent, el: HTMLElement): 'top' | 'bottom' | 'left' | 'right' {
  const { width, height, top, left } = el.getBoundingClientRect()
  const x = (ev.clientX - left - width / 2) * (width > height ? height / width : 1)
  const y = (ev.clientY - top - height / 2) * (height > width ? width / height : 1)
  const d = Math.round(Math.atan2(y, x) / (Math.PI / 2) + 5) % 4
  return (['top', 'right', 'bottom', 'left'] as const)[d]
}

const directionVariants = {
  top: { initial: { y: '-100%', x: 0 }, exit: { y: '-100%', x: 0 } },
  bottom: { initial: { y: '100%', x: 0 }, exit: { y: '100%', x: 0 } },
  left: { initial: { x: '-100%', y: 0 }, exit: { x: '-100%', y: 0 } },
  right: { initial: { x: '100%', y: 0 }, exit: { x: '100%', y: 0 } },
}

/* ------------------------------------------------------------------ */
/*  HELPER: Canvas dots for contact section                            */
/* ------------------------------------------------------------------ */
function CanvasDots() {
  const dots = useRef(
    Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }))
  ).current

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-bigbro-purple/40"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            y: [0, -15, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  SECTION 1: Navbar                                                  */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { label: 'Chi Siamo', href: '#chi-siamo' },
    { label: 'Rosa', href: '#rosa' },
    { label: 'Sponsor', href: '#sponsor' },
    { label: 'News', href: '#news' },
    { label: 'Contatti', href: '#contatti' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bigbro-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src={LOGO_URL}
            alt="BigBro FC"
            className="w-10 h-10 drop-shadow-[0_0_12px_rgba(124,58,237,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(124,58,237,0.8)] transition-all duration-300"
          />
          <span className="font-heading text-xl font-bold tracking-wider text-bigbro-text hidden sm:block">
            BIGBRO <span className="text-bigbro-purple">FC</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-bigbro-text-muted hover:text-bigbro-purple-light transition-colors duration-300 tracking-wide uppercase font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#contatti"
            className="px-5 py-2.5 bg-bigbro-purple hover:bg-bigbro-purple-dark text-white text-sm font-bold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
          >
            Diventa Sponsor
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-bigbro-text">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-bigbro-dark border-t border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-bigbro-text-muted hover:text-bigbro-purple-light transition-colors uppercase text-sm font-medium"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contatti"
                onClick={() => setOpen(false)}
                className="mt-2 px-5 py-3 bg-bigbro-purple text-white text-sm font-bold rounded-lg text-center"
              >
                Diventa Sponsor
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/*  SECTION 2: Hero with Lamp + Spotlight                              */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const heroRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMouse({ x, y })
  }, [])

  const stats = [
    { icon: Trophy, value: `${teamStats.position}°`, label: 'Posizione' },
    { icon: Flame, value: `${teamStats.wins}`, label: 'Vittorie' },
    { icon: Target, value: `${teamStats.goals}`, label: 'Gol' },
  ]

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bigbro-black"
    >
      {/* Lamp effect: conic gradient expanding downward from a point */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 0%, transparent 30%, rgba(124,58,237,0.12) 40%, rgba(124,58,237,0.25) 50%, rgba(124,58,237,0.12) 60%, transparent 70%)',
        }}
      />

      {/* Second layer: radial glow under the lamp */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 35%, rgba(124,58,237,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Spotlight beam following mouse */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-100"
        style={{
          background: `radial-gradient(circle 350px at ${mouse.x}% ${mouse.y}%, rgba(167,139,250,0.08) 0%, transparent 70%)`,
        }}
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,10,10,0.8) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 pt-20">
        {/* Lightbulb icon at top */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <Lightbulb className="w-8 h-8 text-bigbro-purple-light drop-shadow-[0_0_20px_rgba(167,139,250,0.8)]" />
        </motion.div>

        {/* Logo */}
        <motion.img
          src={LOGO_URL}
          alt="BigBro FC"
          className="w-28 h-28 mx-auto mb-8 drop-shadow-[0_0_50px_rgba(124,58,237,0.6)]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 1, delay: 0.4 }}
        />

        {/* Title */}
        <motion.h1
          className="font-heading text-7xl sm:text-8xl md:text-9xl font-bold tracking-widest mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="text-gradient drop-shadow-[0_0_40px_rgba(124,58,237,0.4)]">
            BIGBRO
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-heading text-xl sm:text-2xl md:text-3xl tracking-[0.3em] text-bigbro-text-muted uppercase mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Il Gobbo Non Molla Mai
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex justify-center gap-10 sm:gap-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="text-center group">
                <Icon className="w-5 h-5 text-bigbro-purple mx-auto mb-2 group-hover:drop-shadow-[0_0_12px_rgba(124,58,237,0.8)] transition-all duration-300" />
                <div className="font-heading text-3xl sm:text-4xl font-bold text-bigbro-text">
                  {s.value}
                </div>
                <div className="text-sm text-bigbro-text-muted uppercase tracking-wider mt-1">
                  {s.label}
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-bigbro-purple/40 rounded-full mx-auto flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 bg-bigbro-purple rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  SECTION 3: Chi Siamo - SVG Mask Reveal                             */
/* ------------------------------------------------------------------ */
function ChiSiamoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [maskRadius, setMaskRadius] = useState(0)

  useEffect(() => {
    if (isInView) {
      let frame: number
      let start: number | null = null
      const duration = 1200

      const animate = (timestamp: number) => {
        if (!start) start = timestamp
        const elapsed = timestamp - start
        const progress = Math.min(elapsed / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setMaskRadius(eased * 100)
        if (progress < 1) {
          frame = requestAnimationFrame(animate)
        }
      }
      frame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(frame)
    }
  }, [isInView])

  return (
    <section id="chi-siamo" className="relative py-32 bg-bigbro-black overflow-hidden">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-6">
        <div
          className="relative"
          style={{
            clipPath: `circle(${maskRadius}% at 50% 50%)`,
            transition: maskRadius > 0 ? 'none' : undefined,
          }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-bigbro-purple/5 to-transparent rounded-3xl" />

          <div className="relative bg-bigbro-dark/60 border border-white/5 rounded-3xl p-8 sm:p-12 md:p-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Visual */}
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-bigbro-purple/20 rounded-full blur-3xl" />
                  <img
                    src={LOGO_URL}
                    alt="BigBro FC"
                    className="relative w-40 h-40 drop-shadow-[0_0_40px_rgba(124,58,237,0.5)]"
                  />
                </div>
                <div className="flex gap-6 mt-4">
                  {[
                    { icon: Crown, label: 'Passione' },
                    { icon: Shield, label: 'Grinta' },
                    { icon: Eye, label: 'Visione' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-bigbro-card border border-white/10 flex items-center justify-center mb-2 mx-auto">
                          <Icon className="w-5 h-5 text-bigbro-purple" />
                        </div>
                        <span className="text-xs text-bigbro-text-muted uppercase tracking-wider">
                          {item.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right: Text */}
              <div>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-6 uppercase tracking-wide">
                  Chi <span className="text-gradient">Siamo</span>
                </h2>
                <p className="text-bigbro-text-muted text-lg leading-relaxed mb-6">
                  BigBro FC nasce dalla visione di Moonryde, presidente e fondatore. Una squadra
                  costruita sulla passione, sulla grinta e sul desiderio di dominare la Kings League
                  Italia. Terzi nel Girone A, ma con la fame di chi punta al vertice.
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-bigbro-purple/50 to-transparent" />
                  <Star className="w-4 h-4 text-bigbro-purple" />
                  <span className="text-sm text-bigbro-purple-light font-medium uppercase tracking-wider">
                    Kings League Italia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  SECTION 4: La Rosa - Focus Cards                                   */
/* ------------------------------------------------------------------ */
function RosaSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const roleIcons: Record<string, typeof Trophy> = {
    Portiere: Hand,
    Attaccante: Target,
    Centrocampista: Star,
    Difensore: Shield,
    Allenatore: Crown,
  }

  return (
    <section id="rosa" ref={sectionRef} className="relative py-32 bg-bigbro-dark overflow-hidden">
      {/* Subtle top spotlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 0%, transparent 35%, rgba(124,58,237,0.08) 45%, rgba(124,58,237,0.15) 50%, rgba(124,58,237,0.08) 55%, transparent 65%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Users className="w-6 h-6 text-bigbro-purple mx-auto mb-4" />
          <h2 className="font-heading text-4xl sm:text-5xl font-bold uppercase tracking-wide mb-4">
            La <span className="text-gradient">Rosa</span>
          </h2>
          <p className="text-bigbro-text-muted max-w-xl mx-auto">
            I protagonisti sotto i riflettori. Passa il mouse per illuminare ogni giocatore.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player, i) => {
            const Icon = roleIcons[player.role] || Star
            const isActive = hoveredIndex === i
            const isSiblingHovered = hoveredIndex !== null && hoveredIndex !== i

            return (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  'relative group rounded-2xl bg-bigbro-card border border-white/5 p-6 transition-all duration-500 cursor-pointer',
                  isActive && 'scale-105 border-bigbro-purple/40 shadow-[0_0_30px_rgba(124,58,237,0.2)] z-10',
                  isSiblingHovered && 'opacity-30 blur-sm scale-[0.98]'
                )}
              >
                {/* Spotlight glow on active */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 60%)',
                    }}
                  />
                )}

                <div className="relative z-10">
                  {player.image && (
                    <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-bigbro-dark/50">
                      <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" loading="lazy" />
                    </div>
                  )}
                  {/* Number + Role */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading text-5xl font-bold text-white/5 group-hover:text-bigbro-purple/20 transition-colors duration-500">
                      #{player.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-bigbro-dark border border-white/10 flex items-center justify-center group-hover:border-bigbro-purple/30 transition-colors duration-500">
                      <Icon className="w-5 h-5 text-bigbro-text-muted group-hover:text-bigbro-purple transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="font-heading text-xl font-bold uppercase tracking-wider mb-1 group-hover:text-bigbro-purple-light transition-colors duration-300">
                    {player.name}
                  </h3>

                  {/* Role */}
                  <p className="text-sm text-bigbro-purple font-medium mb-3">{player.role}</p>

                  {/* Description */}
                  <p className="text-sm text-bigbro-text-muted leading-relaxed">
                    {player.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  SECTION 5: Pacchetti Sponsor - Glowing Borders                     */
/* ------------------------------------------------------------------ */
function SponsorSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="sponsor" ref={sectionRef} className="relative py-32 bg-bigbro-black overflow-hidden">
      {/* Radial background glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial opacity-40" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Flame className="w-6 h-6 text-bigbro-purple mx-auto mb-4" />
          <h2 className="font-heading text-4xl sm:text-5xl font-bold uppercase tracking-wide mb-4">
            Pacchetti <span className="text-gradient">Sponsor</span>
          </h2>
          <p className="text-bigbro-text-muted max-w-xl mx-auto">
            Entra sotto i riflettori con BigBro FC. Scegli il pacchetto che illumina il tuo brand.
          </p>
        </motion.div>

        {/* Tier Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {sponsorTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={cn(
                'relative rounded-2xl bg-bigbro-card border p-8 transition-all duration-500 group',
                tier.highlighted
                  ? 'border-bigbro-purple/50 spotlight-glow-border'
                  : 'border-white/5 hover:border-bigbro-purple/30'
              )}
            >
              {/* Highlighted badge */}
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-bigbro-purple text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                  Consigliato
                </div>
              )}

              {/* Top spotlight */}
              <div
                className="absolute top-0 left-0 right-0 h-32 rounded-t-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(124,58,237,0.1) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10">
                {/* Tier label */}
                <span className="text-xs text-bigbro-purple font-mono font-bold uppercase tracking-widest">
                  {tier.tier}
                </span>

                {/* Name */}
                <h3 className="font-heading text-2xl font-bold mt-2 mb-6 uppercase tracking-wider group-hover:text-bigbro-purple-light transition-colors duration-300">
                  {tier.name}
                </h3>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-bigbro-purple mt-0.5 shrink-0" />
                      <span className="text-bigbro-text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contatti"
                  className={cn(
                    'block text-center py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300',
                    tier.highlighted
                      ? 'bg-bigbro-purple hover:bg-bigbro-purple-dark text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                      : 'bg-bigbro-dark border border-white/10 text-bigbro-text hover:border-bigbro-purple/40 hover:text-bigbro-purple-light'
                  )}
                >
                  <span className="flex items-center justify-center gap-2">
                    Contattaci
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  SECTION 6: Gobbo News - Direction-Aware Hover                      */
/* ------------------------------------------------------------------ */
function NewsCard({ article, index, isInView }: { article: typeof news[0]; index: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hoverDir, setHoverDir] = useState<'top' | 'bottom' | 'left' | 'right' | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const dir = getDirection(e, cardRef.current)
    setHoverDir(dir)
    setIsHovered(true)
  }

  const handleMouseLeave = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const dir = getDirection(e, cardRef.current)
    setHoverDir(dir)
    setIsHovered(false)
  }

  const categoryColors: Record<string, string> = {
    mercato: 'text-green-400',
    match: 'text-red-400',
    lifestyle: 'text-blue-400',
    team: 'text-yellow-400',
  }

  const currentDir = hoverDir || 'top'
  const variants = directionVariants[currentDir]

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl bg-bigbro-card border border-white/5 overflow-hidden group cursor-pointer"
    >
      {/* Content */}
      <div className="relative p-6 z-10">
        <div className="flex items-center gap-3 mb-3">
          <span className={cn('text-xs font-bold uppercase tracking-wider', categoryColors[article.category] || 'text-bigbro-purple')}>
            {article.category}
          </span>
          <span className="text-xs text-bigbro-text-muted">{article.date}</span>
        </div>
        <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-bigbro-purple-light transition-colors duration-300">
          {article.title}
        </h3>
        <p className="text-sm text-bigbro-text-muted leading-relaxed">{article.excerpt}</p>

        <div className="flex items-center gap-2 mt-4 text-sm text-bigbro-purple group-hover:text-bigbro-purple-light transition-colors">
          <span className="font-medium">Leggi di pi&ugrave;</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Direction-aware overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-bigbro-purple/10 z-0"
            initial={{ ...variants.initial, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ ...variants.exit, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function NewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="news" ref={sectionRef} className="relative py-32 bg-bigbro-dark overflow-hidden">
      {/* Ambient lighting */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 100% 0%, rgba(124,58,237,0.2) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Eye className="w-6 h-6 text-bigbro-purple mx-auto mb-4" />
          <h2 className="font-heading text-4xl sm:text-5xl font-bold uppercase tracking-wide mb-4">
            Gobbo <span className="text-gradient">News</span>
          </h2>
          <p className="text-bigbro-text-muted max-w-xl mx-auto">
            Le ultime dal mondo BigBro. Notizie illuminate dai riflettori.
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {news.map((article, i) => (
            <NewsCard key={article.id} article={article} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  SECTION 7: Contatti - Canvas Dots Background                       */
/* ------------------------------------------------------------------ */
function ContattiSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="contatti" ref={sectionRef} className="relative py-32 bg-bigbro-black overflow-hidden">
      {/* Canvas dots background */}
      <CanvasDots />

      {/* Ambient spotlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] pointer-events-none"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 0%, transparent 35%, rgba(124,58,237,0.06) 45%, rgba(124,58,237,0.12) 50%, rgba(124,58,237,0.06) 55%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Mail className="w-6 h-6 text-bigbro-purple mx-auto mb-4" />
          <h2 className="font-heading text-4xl sm:text-5xl font-bold uppercase tracking-wide mb-4">
            <span className="text-gradient">Contatti</span>
          </h2>
          <p className="text-bigbro-text-muted max-w-lg mx-auto">
            Vuoi entrare sotto i riflettori con noi? Compila il form e ti ricontatteremo.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative bg-bigbro-dark/80 border border-white/5 rounded-2xl p-8 sm:p-12 backdrop-blur-sm"
        >
          {/* Top glow */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.5) 50%, transparent 100%)',
            }}
          />
          <ContactForm
            inputClassName="bg-bigbro-black/50 border-white/5 focus:border-bigbro-purple/60 focus:shadow-[0_0_15px_rgba(124,58,237,0.15)]"
            buttonClassName="shadow-[0_0_25px_rgba(124,58,237,0.3)] hover:shadow-[0_0_35px_rgba(124,58,237,0.5)]"
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  SECTION 8: Footer                                                  */
/* ------------------------------------------------------------------ */
function Footer() {
  const socials = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ]

  return (
    <footer className="relative bg-bigbro-black border-t border-white/5">
      {/* Top line glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 10%, rgba(124,58,237,0.4) 50%, transparent 90%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <img
            src={LOGO_URL}
            alt="BigBro FC"
            className="w-14 h-14 drop-shadow-[0_0_20px_rgba(124,58,237,0.4)]"
          />

          {/* Name */}
          <div className="font-heading text-2xl font-bold tracking-widest uppercase">
            BIGBRO <span className="text-bigbro-purple">FC</span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full bg-bigbro-card border border-white/5 flex items-center justify-center text-bigbro-text-muted hover:text-bigbro-purple hover:border-bigbro-purple/40 hover:shadow-[0_0_15px_rgba(124,58,237,0.25)] transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>

          {/* Divider */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-bigbro-purple/30 to-transparent" />

          {/* Copyright */}
          <p className="text-sm text-bigbro-text-muted/60 text-center">
            &copy; {new Date().getFullYear()} BigBro FC &mdash; Kings League Italia. Tutti i diritti riservati.
          </p>
          <p className="mt-1 text-sm text-bigbro-text-muted">Made with ❤️ by <a href="https://mindblast.it" target="_blank" rel="noopener noreferrer" className="text-bigbro-purple-light hover:text-bigbro-purple transition-colors">Mindblast</a></p>
        </div>
      </div>
    </footer>
  )
}

/* ================================================================== */
/*  PAGE: Spotlight Drama                                              */
/* ================================================================== */
export default function Page6_SpotlightDrama() {
  return (
    <>
      {/* Inject spotlight-specific keyframes */}
      <style>{spotlightStyles}</style>

      <div className="min-h-screen bg-bigbro-black text-bigbro-text overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <ChiSiamoSection />
        <RosaSection />
        <SponsorSection />
        <NewsSection />
        <ContattiSection />
        <Footer />
      </div>
    </>
  )
}
