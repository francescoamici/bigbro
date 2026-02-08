import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion'
import {
  Trophy,
  Users,
  Star,
  Target,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  BarChart3,
  TrendingUp,
  Activity,
  Hash,
  Crown,
  Shield,
  Check,
  ArrowRight,
  Zap,
} from 'lucide-react'
import { players, teamStats, LOGO_URL } from '@/data/players'
import { news } from '@/data/news'
import { sponsorTiers } from '@/data/sponsors'
import { ContactForm } from '@/components/shared/ContactForm'
import { cn } from '@/lib/utils'

/* ============================================================
   HELPER: NumberTicker - Animated count-up from 0 to target
   ============================================================ */
function NumberTicker({ value, duration = 2, prefix = '', suffix = '' }: { value: number; duration?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionVal = useMotionValue(0)
  const rounded = useTransform(motionVal, (v) => Math.round(v))
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(motionVal, value, { duration, ease: 'easeOut' })
    return controls.stop
  }, [isInView, value, duration, motionVal])

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v))
    return unsub
  }, [rounded])

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}{display}{suffix}
    </span>
  )
}

/* ============================================================
   HELPER: BorderBeamCard - Card with animated light beam border
   ============================================================ */
function BorderBeamCard({ children, highlighted, className }: { children: React.ReactNode; highlighted?: boolean; className?: string }) {
  return (
    <div className={cn('relative group', className)}>
      {/* Animated border beam */}
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
        <div
          className={cn(
            'absolute inset-0 rounded-2xl',
            highlighted
              ? 'bg-[conic-gradient(from_var(--beam-angle),transparent_0%,#7c3aed_10%,#a78bfa_20%,transparent_30%)]'
              : 'bg-[conic-gradient(from_var(--beam-angle),transparent_0%,#7c3aed_10%,transparent_20%)]'
          )}
          style={{
            animation: 'beam-rotate 3s linear infinite',
          }}
        />
      </div>
      {/* Neon glow */}
      {highlighted && (
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-bigbro-purple via-bigbro-purple-light to-bigbro-purple opacity-20 blur-xl animate-pulse-glow" />
      )}
      {/* Card content */}
      <div className="relative rounded-2xl bg-bigbro-card border border-white/5 overflow-hidden">
        {children}
      </div>
    </div>
  )
}

/* ============================================================
   HELPER: ShimmerText - Text with a shiny sweep
   ============================================================ */
function ShimmerText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent',
        'bg-[length:200%_100%] animate-shimmer',
        'bg-[linear-gradient(110deg,#f5f5f5_35%,#a78bfa_50%,#f5f5f5_65%)]',
        className
      )}
    >
      {children}
    </span>
  )
}

/* ============================================================
   HELPER: Marquee - Infinite scrolling ticker
   ============================================================ */
function Marquee({ children, speed = 30, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <div
        className="inline-flex"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
        }}
      >
        <div className="inline-flex items-center">{children}</div>
        <div className="inline-flex items-center">{children}</div>
      </div>
    </div>
  )
}

/* ============================================================
   HELPER: Particles - Floating dots background
   ============================================================ */
function Particles({ count = 40 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      })),
    [count]
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-bigbro-purple/30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [0.2, 0.6, 0.3, 0.7, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ============================================================
   HELPER: OrbitingCircles - Small dots orbiting central element
   ============================================================ */
function OrbitingCircles({ radius = 120, count = 6, duration = 12, reverse = false, iconSize = 8 }: { radius?: number; count?: number; duration?: number; reverse?: boolean; iconSize?: number }) {
  const icons = [Trophy, Star, Target, Shield, Crown, Zap]
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {Array.from({ length: count }, (_, i) => {
        const Icon = icons[i % icons.length]
        const angle = (360 / count) * i
        return (
          <div
            key={i}
            className="absolute"
            style={{
              animation: `orbit ${duration}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
              animationDelay: `${-(duration / count) * i}s`,
            }}
          >
            <div
              className="flex items-center justify-center rounded-full bg-bigbro-purple/20 border border-bigbro-purple/30"
              style={{
                width: iconSize * 4,
                height: iconSize * 4,
                transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
              }}
            >
              <Icon size={iconSize * 1.5} className="text-bigbro-purple-light" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ============================================================
   CSS Keyframes injected via <style>
   ============================================================ */
function InlineStyles() {
  return (
    <style>{`
      @property --beam-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
      }
      @keyframes beam-rotate {
        to { --beam-angle: 360deg; }
      }
      @keyframes marquee-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes orbit {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes orbit-item {
        from { transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg); }
        to { transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg); }
      }
    `}</style>
  )
}

/* ============================================================
   SECTION 1: Navbar
   ============================================================ */
const navLinks = ['Chi Siamo', 'Rosa', 'Sponsor', 'News', 'Contatti']

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = useCallback((link: string) => {
    setMenuOpen(false)
    const id = link.toLowerCase().replace(/\s+/g, '-')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bigbro-black/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img src={LOGO_URL} alt="BigBro FC" className="w-9 h-9 object-contain group-hover:scale-110 transition-transform" />
          <span className="font-heading text-lg font-bold tracking-wider hidden sm:block">
            BIGBRO <span className="text-bigbro-purple">FC</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className="text-sm text-bigbro-text-muted hover:text-bigbro-text font-medium tracking-wide transition-colors relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bigbro-purple group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <button
            onClick={() => handleNavClick('Contatti')}
            className="px-5 py-2 bg-bigbro-purple hover:bg-bigbro-purple-dark text-white text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Zap size={14} />
            Diventa Sponsor
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={cn('w-6 h-0.5 bg-bigbro-text transition-all', menuOpen && 'rotate-45 translate-y-2')} />
          <span className={cn('w-6 h-0.5 bg-bigbro-text transition-all', menuOpen && 'opacity-0')} />
          <span className={cn('w-6 h-0.5 bg-bigbro-text transition-all', menuOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bigbro-dark/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className="text-left py-3 px-4 text-bigbro-text-muted hover:text-bigbro-text hover:bg-white/5 rounded-lg transition-all"
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('Contatti')}
                className="mt-2 py-3 px-4 bg-bigbro-purple hover:bg-bigbro-purple-dark text-white font-semibold rounded-lg transition-all flex items-center gap-2 justify-center"
              >
                <Zap size={14} />
                Diventa Sponsor
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ============================================================
   SECTION 2: Hero - Bento Grid Stats
   ============================================================ */
const heroStats = [
  { icon: Trophy, label: 'Posizione', value: teamStats.position, suffix: '°' },
  { icon: Target, label: 'Vittorie', value: teamStats.wins, suffix: '' },
  { icon: BarChart3, label: 'Gol Fatti', value: teamStats.goals, suffix: '' },
  { icon: Users, label: 'Giocatori', value: players.length, suffix: '' },
]

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div className="absolute inset-0 bg-gradient-radial" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[minmax(100px,auto)]">
          {/* Title tile - spans 2 cols on md */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-2 row-span-2 bg-bigbro-card/60 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-center backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity size={14} className="text-bigbro-purple-light" />
              <span className="text-xs font-mono text-bigbro-text-muted uppercase tracking-widest">Kings League Italia</span>
            </div>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-none mb-4"
              style={{
                background: 'linear-gradient(135deg, #f5f5f5 0%, #a78bfa 40%, #7c3aed 60%, #5b21b6 80%, #a78bfa 100%)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-shift 4s ease infinite',
              }}
            >
              BIGBRO
            </h1>
            <p className="text-bigbro-text-muted font-mono text-sm md:text-base tracking-wide">
              IL GOBBO NON MOLLA MAI
            </p>
          </motion.div>

          {/* Logo tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-1 row-span-2 bg-bigbro-card/60 border border-white/5 rounded-2xl flex items-center justify-center p-4 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-bigbro-purple/5 to-transparent" />
            <img
              src={LOGO_URL}
              alt="BigBro FC Logo"
              className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(124,58,237,0.3)]"
            />
          </motion.div>

          {/* Stats tiles */}
          {heroStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className={cn(
                'bg-bigbro-card/60 border border-white/5 rounded-2xl p-4 md:p-5 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden group hover:border-bigbro-purple/30 transition-colors duration-500',
                i === 0 && 'col-span-1'
              )}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-bigbro-purple/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-bigbro-purple/10 transition-colors" />
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={14} className="text-bigbro-purple-light" />
                <span className="text-xs font-mono text-bigbro-text-muted uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-3xl md:text-4xl font-heading font-bold text-bigbro-text">
                <NumberTicker value={stat.value} suffix={stat.suffix} />
              </div>
            </motion.div>
          ))}

          {/* CTA tile - full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="col-span-2 md:col-span-4 bg-gradient-to-r from-bigbro-purple/20 via-bigbro-card/60 to-bigbro-purple/20 border border-bigbro-purple/20 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <TrendingUp size={18} className="text-bigbro-purple-light" />
              <span className="font-mono text-sm text-bigbro-text-muted">
                Girone A &mdash; {teamStats.positionLabel}
              </span>
            </div>
            <button
              onClick={() => document.getElementById('sponsor')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 bg-bigbro-purple hover:bg-bigbro-purple-dark text-white font-semibold text-sm rounded-lg transition-all duration-300 flex items-center gap-2 group"
            >
              Diventa Sponsor
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   SECTION 3: Chi Siamo - with Orbiting Circles
   ============================================================ */
function ChiSiamoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="chi-siamo" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Orbiting logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Orbit rings */}
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <div className="absolute inset-[-30px] rounded-full border border-white/[0.03]" />
              <div className="absolute inset-[-60px] rounded-full border border-white/[0.02]" />

              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-bigbro-card border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(124,58,237,0.2)]">
                  <img src={LOGO_URL} alt="BigBro FC" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
                </div>
              </div>

              {/* Orbiting circles - ring 1 */}
              <OrbitingCircles radius={110} count={4} duration={16} iconSize={6} />
              {/* Orbiting circles - ring 2 (reverse) */}
              <OrbitingCircles radius={155} count={3} duration={22} reverse iconSize={5} />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Hash size={14} className="text-bigbro-purple-light" />
              <span className="text-xs font-mono text-bigbro-text-muted uppercase tracking-widest">Chi Siamo</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              LA STORIA DEL{' '}
              <span className="text-gradient">GOBBO</span>
            </h2>
            <p className="text-bigbro-text-muted leading-relaxed text-base md:text-lg mb-8">
              BigBro FC nasce dalla visione di Moonryde, presidente e fondatore. Una squadra costruita sulla passione, sulla grinta e sul desiderio di dominare la Kings League Italia. Terzi nel Girone A, ma con la fame di chi punta al vertice.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Crown, label: 'Presidente', value: 'Moonryde' },
                { icon: Shield, label: 'Allenatore', value: 'Coach Fracci' },
                { icon: Trophy, label: 'Classifica', value: teamStats.positionLabel },
                { icon: Target, label: 'Gol Fatti', value: String(teamStats.goals) },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-bigbro-card/60 border border-white/5 rounded-xl p-4 group hover:border-bigbro-purple/20 transition-colors"
                >
                  <item.icon size={16} className="text-bigbro-purple-light mb-2" />
                  <p className="text-xs font-mono text-bigbro-text-muted uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-semibold text-bigbro-text mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   SECTION 4: La Rosa - Bento player grid + Marquee
   ============================================================ */
const roleIcons: Record<string, React.ElementType> = {
  Attaccante: Target,
  Centrocampista: Activity,
  Difensore: Shield,
  'Difensore/Centrocampista': Shield,
  Allenatore: Crown,
}

function RosaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Bento layout: first two cards are larger
  const gridClasses = [
    'col-span-2 md:col-span-2 row-span-1',
    'col-span-2 md:col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-2 md:col-span-1 row-span-1',
  ]

  return (
    <section id="rosa" className="relative py-24 md:py-32 overflow-hidden">
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users size={14} className="text-bigbro-purple-light" />
            <span className="text-xs font-mono text-bigbro-text-muted uppercase tracking-widest">La Rosa</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            I NOSTRI <span className="text-gradient">GUERRIERI</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {players.map((player, i) => {
            const Icon = roleIcons[player.role] || Star
            return (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className={cn(
                  'bg-bigbro-card/60 border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden group hover:border-bigbro-purple/30 transition-all duration-500',
                  gridClasses[i]
                )}
              >
                {/* Hover glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-bigbro-purple/0 to-bigbro-purple/0 group-hover:from-bigbro-purple/5 group-hover:to-transparent transition-all duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon size={14} className="text-bigbro-purple-light" />
                      <span className="text-xs font-mono text-bigbro-text-muted uppercase tracking-wider">{player.role}</span>
                    </div>
                    <span className="text-2xl md:text-3xl font-heading font-bold text-white/10 group-hover:text-bigbro-purple/20 transition-colors">
                      #{player.number}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-heading font-bold mb-2 text-bigbro-text group-hover:text-bigbro-purple-light transition-colors">
                    {player.name}
                  </h3>
                  <p className="text-xs md:text-sm text-bigbro-text-muted leading-relaxed line-clamp-3">
                    {player.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Marquee */}
        <div className="mt-12 border-y border-white/5 py-4">
          <Marquee speed={25}>
            {players.map((p) => (
              <span key={p.name} className="flex items-center gap-3 mx-6">
                <span className="text-bigbro-purple font-mono text-sm">#{p.number}</span>
                <span className="font-heading text-lg font-bold text-bigbro-text/60 uppercase tracking-wider">{p.name}</span>
                <Star size={10} className="text-bigbro-purple/40" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   SECTION 5: Pacchetti Sponsor - Border beam + neon glow
   ============================================================ */
function SponsorSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="sponsor" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap size={14} className="text-bigbro-purple-light" />
            <span className="text-xs font-mono text-bigbro-text-muted uppercase tracking-widest">Sponsor</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            PACCHETTI <span className="text-gradient">SPONSOR</span>
          </h2>
          <p className="mt-4 text-bigbro-text-muted max-w-xl mx-auto">
            Unisciti alla famiglia BigBro. Scegli il pacchetto pi&ugrave; adatto alla tua azienda e cresci con noi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {sponsorTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
            >
              <BorderBeamCard highlighted={tier.highlighted} className={tier.highlighted ? 'md:-translate-y-4' : ''}>
                <div className="p-6 md:p-8">
                  {/* Tier badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-bigbro-text-muted uppercase tracking-widest">{tier.tier}</span>
                    {tier.highlighted && (
                      <span className="px-3 py-1 text-xs font-mono font-semibold bg-bigbro-purple/20 text-bigbro-purple-light rounded-full border border-bigbro-purple/30">
                        Consigliato
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-heading font-bold mb-2 text-bigbro-text">{tier.name}</h3>

                  {/* Decorative line */}
                  <div className={cn(
                    'h-0.5 w-12 rounded-full mb-6',
                    tier.highlighted ? 'bg-gradient-to-r from-bigbro-purple to-bigbro-purple-light' : 'bg-white/10'
                  )} />

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-bigbro-text-muted">
                        <Check size={16} className={cn(
                          'shrink-0 mt-0.5',
                          tier.highlighted ? 'text-bigbro-purple-light' : 'text-bigbro-text-muted/60'
                        )} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })}
                    className={cn(
                      'w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2',
                      tier.highlighted
                        ? 'bg-bigbro-purple hover:bg-bigbro-purple-dark text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                        : 'bg-white/5 hover:bg-white/10 text-bigbro-text border border-white/10'
                    )}
                  >
                    Scopri di pi&ugrave;
                    <ArrowRight size={14} />
                  </button>
                </div>
              </BorderBeamCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   SECTION 6: Gobbo News - Shimmer titles + bottom marquee
   ============================================================ */
const categoryColors: Record<string, string> = {
  mercato: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  match: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  lifestyle: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  team: 'text-bigbro-purple-light bg-bigbro-purple/10 border-bigbro-purple/20',
}

function NewsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="news" className="relative py-24 md:py-32 overflow-hidden">
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 size={14} className="text-bigbro-purple-light" />
            <span className="text-xs font-mono text-bigbro-text-muted uppercase tracking-widest">News</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            GOBBO <span className="text-gradient">NEWS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="bg-bigbro-card/60 border border-white/5 rounded-2xl p-6 group hover:border-bigbro-purple/20 transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-bigbro-purple/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className={cn(
                    'px-3 py-1 text-xs font-mono font-medium rounded-full border',
                    categoryColors[article.category]
                  )}>
                    {article.category}
                  </span>
                  <span className="text-xs font-mono text-bigbro-text-muted">{article.date}</span>
                </div>

                <h3 className="text-lg md:text-xl font-heading font-bold mb-3 leading-tight">
                  <ShimmerText>{article.title}</ShimmerText>
                </h3>

                <p className="text-sm text-bigbro-text-muted leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-2 text-bigbro-purple-light text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Leggi tutto <ArrowRight size={14} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* News ticker */}
        <div className="mt-12 border-y border-white/5 py-3">
          <Marquee speed={35}>
            {news.map((article) => (
              <span key={article.id} className="flex items-center gap-3 mx-8">
                <span className={cn(
                  'w-2 h-2 rounded-full',
                  article.category === 'mercato' ? 'bg-emerald-400' :
                  article.category === 'match' ? 'bg-blue-400' :
                  article.category === 'lifestyle' ? 'bg-amber-400' : 'bg-bigbro-purple-light'
                )} />
                <span className="font-mono text-sm text-bigbro-text-muted">{article.title}</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   SECTION 7: Contatti - Contact form + Particles
   ============================================================ */
function ContattiSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contatti" className="relative py-24 md:py-32 overflow-hidden">
      <Particles count={35} />
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail size={14} className="text-bigbro-purple-light" />
            <span className="text-xs font-mono text-bigbro-text-muted uppercase tracking-widest">Contatti</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            SCRIVICI <span className="text-gradient">ORA</span>
          </h2>
          <p className="mt-4 text-bigbro-text-muted max-w-lg mx-auto">
            Vuoi diventare sponsor o collaborare con BigBro FC? Compila il form e ti ricontatteremo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-bigbro-card/60 border border-white/5 rounded-2xl p-6 md:p-10 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Decorative grid lines */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          <div className="relative z-10">
            <ContactForm
              inputClassName="!bg-bigbro-black/50 !border-white/10 focus:!border-bigbro-purple"
              buttonClassName="!bg-bigbro-purple hover:!bg-bigbro-purple-dark !shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================
   SECTION 8: Footer
   ============================================================ */
const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-bigbro-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="BigBro FC" className="w-10 h-10 object-contain" />
            <div>
              <span className="font-heading text-lg font-bold tracking-wider">
                BIGBRO <span className="text-bigbro-purple">FC</span>
              </span>
              <p className="text-xs text-bigbro-text-muted font-mono">Kings League Italia</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => {
                  const id = link.toLowerCase().replace(/\s+/g, '-')
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-xs text-bigbro-text-muted hover:text-bigbro-text transition-colors font-mono uppercase tracking-wider"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center justify-center md:justify-end gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-bigbro-text-muted hover:text-bigbro-purple-light hover:border-bigbro-purple/30 hover:bg-bigbro-purple/10 transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-bigbro-text-muted font-mono">
            &copy; {new Date().getFullYear()} BigBro FC. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-bigbro-text-muted/50 font-mono">
            Kings League Italia &bull; Powered by Passion
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   PAGE EXPORT
   ============================================================ */
export default function Page4_BentoStats() {
  return (
    <div className="min-h-screen bg-bigbro-black text-bigbro-text overflow-x-hidden">
      <InlineStyles />
      <Navbar />
      <HeroSection />
      <ChiSiamoSection />
      <RosaSection />
      <SponsorSection />
      <NewsSection />
      <ContattiSection />
      <Footer />
    </div>
  )
}
