import { useState, useEffect, useRef, useCallback, type MouseEvent as ReactMouseEvent } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion'
import {
  Trophy, Users, Star, Target, Mail, Instagram, Twitter,
  Youtube, Box, Layers, Move3d, Crown, Shield, Check,
  ArrowRight, Grip, Maximize, Menu, X,
} from 'lucide-react'
import { players, teamStats, LOGO_URL, MOONRYDE_IMAGE_URL } from '@/data/players'
import { news } from '@/data/news'
import { sponsorTiers } from '@/data/sponsors'
import { ContactForm } from '@/components/shared/ContactForm'
import { cn } from '@/lib/utils'

// ─── Inline Keyframes ───────────────────────────────────────────────────────

const keyframes = `
  @keyframes vortex-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes float-shape {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(180deg); }
  }
  @keyframes pulse-depth {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
  }
  @keyframes depth-parallax {
    0%, 100% { transform: translateZ(0) translateY(0); }
    50% { transform: translateZ(20px) translateY(-5px); }
  }
`

// ─── Navbar with depth/shadow ───────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Chi Siamo', href: '#chi-siamo' },
    { label: 'Rosa', href: '#rosa' },
    { label: 'Sponsor', href: '#sponsor' },
    { label: 'News', href: '#news' },
    { label: 'Contatti', href: '#contatti' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(10, 10, 10, 0.92)'
          : 'rgba(10, 10, 10, 0.6)',
        backdropFilter: 'blur(16px)',
        boxShadow: scrolled
          ? '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(124,58,237,0.15), inset 0 -1px 0 rgba(255,255,255,0.05)'
          : '0 4px 16px rgba(0,0,0,0.3)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        transform: `perspective(800px) translateZ(${scrolled ? 30 : 0}px)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img
            src={LOGO_URL}
            alt="BigBro FC"
            className="w-9 h-9 group-hover:drop-shadow-[0_0_12px_rgba(124,58,237,0.7)] transition-all duration-300"
            style={{ transform: 'translateZ(10px)' }}
          />
          <span className="font-heading text-xl font-bold tracking-wider text-bigbro-text">
            BIGBRO <span className="text-bigbro-purple">FC</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-bigbro-text-muted hover:text-bigbro-purple-light transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contatti"
            className="px-5 py-2 text-sm font-bold text-white bg-bigbro-purple hover:bg-bigbro-purple-dark rounded-lg transition-all duration-300"
            style={{
              boxShadow: '0 4px 20px rgba(124,58,237,0.3), 0 0 40px rgba(124,58,237,0.1)',
            }}
          >
            Diventa Sponsor
          </a>
        </div>

        <button
          className="md:hidden text-bigbro-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-bigbro-dark/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-bigbro-text-muted hover:text-bigbro-purple-light transition-colors py-1"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contatti"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-block text-center py-3 bg-bigbro-purple hover:bg-bigbro-purple-dark rounded-lg font-bold text-white transition-colors"
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

// ─── Vortex Background ──────────────────────────────────────────────────────

function VortexBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Layer 1: outer vortex ring */}
      <div
        className="absolute w-[1200px] h-[1200px] opacity-40"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'conic-gradient(from 0deg, #7c3aed, transparent 30%, #5b21b6, transparent 60%, #a78bfa, transparent 90%, #7c3aed)',
          borderRadius: '50%',
          animation: 'vortex-spin 20s linear infinite',
          filter: 'blur(60px)',
        }}
      />
      {/* Layer 2: mid ring */}
      <div
        className="absolute w-[800px] h-[800px] opacity-30"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'conic-gradient(from 120deg, #a78bfa, transparent 25%, #7c3aed, transparent 55%, #5b21b6, transparent 85%, #a78bfa)',
          borderRadius: '50%',
          animation: 'vortex-spin 15s linear infinite reverse',
          filter: 'blur(40px)',
        }}
      />
      {/* Layer 3: inner ring */}
      <div
        className="absolute w-[500px] h-[500px] opacity-35"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'conic-gradient(from 240deg, #5b21b6, transparent 20%, #a78bfa, transparent 50%, #7c3aed, transparent 80%, #5b21b6)',
          borderRadius: '50%',
          animation: 'vortex-spin 10s linear infinite',
          filter: 'blur(30px)',
        }}
      />
      {/* Radial tunnel effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(10,10,10,0.4) 30%, rgba(10,10,10,0.85) 70%, #0a0a0a 100%)',
        }}
      />
      {/* Center glow */}
      <div
        className="absolute w-[300px] h-[300px] opacity-50"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
          animation: 'pulse-depth 4s ease-in-out infinite',
        }}
      />
    </div>
  )
}

// ─── Section wrapper ────────────────────────────────────────────────────────

function Section({
  id,
  children,
  className,
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={cn('relative py-20 md:py-28', className)}
    >
      {children}
    </motion.section>
  )
}

// ─── Section heading ────────────────────────────────────────────────────────

function SectionHeading({
  overline,
  title,
  icon: Icon,
}: {
  overline: string
  title: string
  icon?: typeof Box
}) {
  return (
    <div className="text-center mb-14 md:mb-16">
      {Icon && (
        <div className="flex justify-center mb-4">
          <div
            className="w-14 h-14 rounded-2xl bg-bigbro-purple/10 flex items-center justify-center"
            style={{
              boxShadow: '0 8px 24px rgba(124,58,237,0.15)',
              transform: 'perspective(400px) translateZ(10px)',
            }}
          >
            <Icon className="w-6 h-6 text-bigbro-purple-light" />
          </div>
        </div>
      )}
      <span className="text-bigbro-purple text-sm font-bold uppercase tracking-[0.2em] block mb-3">
        {overline}
      </span>
      <h2 className="font-heading text-3xl md:text-5xl font-bold text-bigbro-text uppercase tracking-wider">
        {title}
      </h2>
      <div className="mt-4 mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-bigbro-purple to-transparent" />
    </div>
  )
}

// ─── Animated stat counter ──────────────────────────────────────────────────

function AnimatedStat({
  icon: Icon,
  value,
  label,
  suffix,
  delay,
}: {
  icon: typeof Trophy
  value: number
  label: string
  suffix?: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = Math.ceil(value / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 30)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: 45 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center gap-2"
      style={{ perspective: '600px' }}
    >
      <div
        className="w-14 h-14 rounded-2xl bg-bigbro-purple/10 flex items-center justify-center mb-1"
        style={{
          boxShadow: '0 10px 30px rgba(124,58,237,0.2)',
          transform: 'translateZ(20px)',
        }}
      >
        <Icon className="w-6 h-6 text-bigbro-purple-light" />
      </div>
      <span className="text-3xl md:text-4xl font-heading font-bold text-bigbro-text">
        {count}{suffix}
      </span>
      <span className="text-bigbro-text-muted text-sm">{label}</span>
    </motion.div>
  )
}

// ─── Parallax Multi-Layer Cards (Chi Siamo) ─────────────────────────────────

function ParallaxLayers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMouse({ x, y })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0, y: 0 })
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[400px] md:h-[450px]"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* Background layer (z: -40px) */}
      <div
        className="absolute inset-4 rounded-2xl bg-bigbro-purple/5 border border-bigbro-purple/10"
        style={{
          transform: `translateZ(-40px) translateX(${mouse.x * -10}px) translateY(${mouse.y * -10}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Layers className="w-32 h-32 text-bigbro-purple" />
        </div>
      </div>

      {/* Mid layer (z: 0) */}
      <div
        className="absolute inset-0 rounded-2xl bg-bigbro-card/80 border border-white/5 backdrop-blur-sm"
        style={{
          transform: `translateZ(0px) translateX(${mouse.x * 5}px) translateY(${mouse.y * 5}px)`,
          transition: 'transform 0.25s ease-out',
        }}
      >
        <div className="p-8 md:p-10 h-full flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-bigbro-purple" />
            <span className="font-heading text-2xl font-bold bg-gradient-to-r from-bigbro-purple to-bigbro-purple-light bg-clip-text text-transparent">
              Kings League Italia
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-white/5">
              <p className="text-2xl font-heading font-bold text-bigbro-text">{teamStats.position}°</p>
              <p className="text-xs text-bigbro-text-muted mt-1">Posizione</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <p className="text-2xl font-heading font-bold text-bigbro-text">{teamStats.wins}</p>
              <p className="text-xs text-bigbro-text-muted mt-1">Vittorie</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <p className="text-2xl font-heading font-bold text-bigbro-text">{teamStats.goals}</p>
              <p className="text-xs text-bigbro-text-muted mt-1">Gol</p>
            </div>
          </div>
        </div>
      </div>

      {/* Foreground layer (z: 30px) */}
      <div
        className="absolute bottom-6 right-6 bg-bigbro-dark border border-bigbro-purple/20 rounded-xl p-4"
        style={{
          transform: `translateZ(30px) translateX(${mouse.x * 15}px) translateY(${mouse.y * 15}px)`,
          transition: 'transform 0.2s ease-out',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.1)',
        }}
      >
        <div className="flex items-center gap-2 text-bigbro-purple-light text-sm">
          <Users className="w-4 h-4" />
          <span>{players.length} giocatori in rosa</span>
        </div>
      </div>

      {/* Floating accent layer (z: 50px) */}
      <div
        className="absolute top-4 right-8"
        style={{
          transform: `translateZ(50px) translateX(${mouse.x * 20}px) translateY(${mouse.y * 20}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div
          className="w-12 h-12 rounded-full bg-bigbro-purple/20 flex items-center justify-center"
          style={{ boxShadow: '0 10px 30px rgba(124,58,237,0.3)' }}
        >
          <Move3d className="w-5 h-5 text-bigbro-purple-light" />
        </div>
      </div>
    </div>
  )
}

// ─── 3D Pin Player Card ─────────────────────────────────────────────────────

function PinPlayerCard({ player, index }: { player: typeof players[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  const roleIcons: Record<string, typeof Shield> = {
    Attaccante: Target,
    Centrocampista: Star,
    Difensore: Shield,
    'Difensore/Centrocampista': Shield,
    Allenatore: Crown,
  }
  const RoleIcon = roleIcons[player.role] ?? Users

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative"
      style={{ perspective: '800px' }}
    >
      {/* Pin shadow on surface */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-300"
        style={{
          width: hovered ? '60%' : '80%',
          height: '8px',
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.3) 0%, transparent 70%)',
          filter: `blur(${hovered ? 6 : 4}px)`,
          transform: `translateX(-50%) translateY(${hovered ? 16 : 4}px)`,
        }}
      />

      {/* Pin connector */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-300"
        style={{
          width: '2px',
          height: hovered ? '20px' : '8px',
          background: 'linear-gradient(to bottom, rgba(124,58,237,0.4), transparent)',
          transformOrigin: 'top center',
        }}
      />

      {/* Card body */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative bg-bigbro-card border border-white/5 rounded-2xl overflow-hidden group cursor-default transition-all duration-300"
        style={{
          transform: hovered
            ? 'perspective(800px) translateZ(40px) translateY(-12px) rotateX(2deg)'
            : 'perspective(800px) translateZ(10px) translateY(0) rotateX(0deg)',
          transformStyle: 'preserve-3d',
          boxShadow: hovered
            ? '0 30px 60px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.15)'
            : '0 10px 30px rgba(0,0,0,0.3), 0 0 10px rgba(124,58,237,0.05)',
        }}
      >
        {/* Top glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bigbro-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-6 md:p-7">
          {player.image && (
            <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-bigbro-dark/50">
              <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" loading="lazy" />
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <span className="text-5xl font-heading font-bold text-bigbro-purple/20 leading-none select-none">
              {player.number === 0 ? '--' : String(player.number).padStart(2, '0')}
            </span>
            <div className="w-10 h-10 rounded-full bg-bigbro-purple/10 flex items-center justify-center">
              <RoleIcon className="w-5 h-5 text-bigbro-purple-light" />
            </div>
          </div>

          <h3 className="font-heading text-xl font-bold text-bigbro-text mb-1 group-hover:text-bigbro-purple-light transition-colors">
            {player.name}
          </h3>
          <p className="text-bigbro-purple text-sm font-semibold uppercase tracking-wider mb-3">
            {player.role}
          </p>
          <p className="text-bigbro-text-muted text-sm leading-relaxed">
            {player.description}
          </p>
        </div>

        {/* Hover popup detail */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute -bottom-2 left-4 right-4 bg-bigbro-purple/90 backdrop-blur-sm rounded-lg px-4 py-2 text-center"
              style={{
                transform: 'translateZ(60px)',
                boxShadow: '0 10px 30px rgba(124,58,237,0.4)',
              }}
            >
              <p className="text-white text-xs font-bold">
                #{player.number === 0 ? 'HC' : player.number} - {player.role}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Wobble Sponsor Card ────────────────────────────────────────────────────

function WobbleSponsorCard({ tier, index }: { tier: typeof sponsorTiers[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 15, mass: 0.5 })
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 15, mass: 0.5 })

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const offsetX = (e.clientX - centerX) / (rect.width / 2)
      const offsetY = (e.clientY - centerY) / (rect.height / 2)
      rotateX.set(offsetY * -12)
      rotateY.set(offsetX * 12)
    },
    [rotateX, rotateY],
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  const tierIcons = [Crown, Shield, Star]
  const TierIcon = tierIcons[index] ?? Star

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        className={cn(
          'relative rounded-2xl overflow-hidden bg-bigbro-card border transition-shadow duration-300 h-full cursor-default',
          tier.highlighted
            ? 'border-bigbro-purple/60 shadow-[0_0_40px_rgba(124,58,237,0.15)]'
            : 'border-white/5 hover:border-white/10',
        )}
      >
        {/* 3D highlight */}
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 50%, rgba(167,139,250,0.05) 100%)',
          }}
        />

        {tier.highlighted && (
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-bigbro-purple to-transparent" />
        )}

        <div className="relative p-7 md:p-8 flex flex-col h-full" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-center gap-3 mb-2">
            <div
              className={cn(
                'w-11 h-11 rounded-xl flex items-center justify-center',
                tier.highlighted ? 'bg-bigbro-purple/20' : 'bg-white/5',
              )}
              style={{
                transform: 'translateZ(10px)',
                boxShadow: tier.highlighted ? '0 8px 20px rgba(124,58,237,0.2)' : 'none',
              }}
            >
              <TierIcon
                className={cn('w-5 h-5', tier.highlighted ? 'text-bigbro-purple-light' : 'text-bigbro-text-muted')}
              />
            </div>
            <span className="text-xs font-mono text-bigbro-text-muted uppercase tracking-widest">
              {tier.tier}
            </span>
          </div>

          <h3
            className={cn(
              'font-heading text-2xl font-bold mb-5',
              tier.highlighted
                ? 'bg-gradient-to-r from-bigbro-purple to-bigbro-purple-light bg-clip-text text-transparent'
                : 'text-bigbro-text',
            )}
          >
            {tier.name}
          </h3>

          <ul className="space-y-3 flex-1">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 text-bigbro-purple mt-0.5 shrink-0" />
                <span className="text-bigbro-text-muted">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <a
              href="#contatti"
              className={cn(
                'flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all duration-300',
                tier.highlighted
                  ? 'bg-bigbro-purple hover:bg-bigbro-purple-dark text-white'
                  : 'bg-white/5 hover:bg-white/10 text-bigbro-text',
              )}
              style={{
                boxShadow: tier.highlighted ? '0 4px 20px rgba(124,58,237,0.3)' : 'none',
              }}
            >
              Contattaci <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Parallax Scroll News Columns ───────────────────────────────────────────

function ParallaxNewsColumns() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const leftY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const rightY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  const leftCol = news.filter((_, i) => i % 2 === 0)
  const rightCol = news.filter((_, i) => i % 2 !== 0)

  const categoryColors: Record<string, string> = {
    mercato: 'bg-emerald-500/20 text-emerald-400',
    match: 'bg-bigbro-purple/20 text-bigbro-purple-light',
    lifestyle: 'bg-amber-500/20 text-amber-400',
    team: 'bg-cyan-500/20 text-cyan-400',
  }

  const renderCard = (article: typeof news[0]) => (
    <div
      key={article.id}
      className="bg-bigbro-card border border-white/5 rounded-2xl overflow-hidden group hover:border-bigbro-purple/30 transition-all duration-300"
      style={{
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      }}
    >
      <div className="h-1 bg-gradient-to-r from-bigbro-purple via-bigbro-purple-light to-bigbro-purple-dark" />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={cn(
              'text-xs font-bold uppercase px-2.5 py-1 rounded-full',
              categoryColors[article.category] ?? 'bg-white/10 text-white/60',
            )}
          >
            {article.category}
          </span>
          <span className="text-xs text-bigbro-text-muted">{article.date}</span>
        </div>
        <h4 className="font-heading text-lg font-bold text-bigbro-text mb-2 group-hover:text-bigbro-purple-light transition-colors line-clamp-2">
          {article.title}
        </h4>
        <p className="text-bigbro-text-muted text-sm leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
        <button className="mt-4 flex items-center gap-1 text-sm text-bigbro-purple hover:text-bigbro-purple-light transition-colors font-semibold">
          Leggi <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left column - scrolls up */}
        <motion.div style={{ y: leftY }} className="flex flex-col gap-6">
          {leftCol.map(renderCard)}
        </motion.div>

        {/* Right column - scrolls down */}
        <motion.div style={{ y: rightY }} className="flex flex-col gap-6">
          {rightCol.map(renderCard)}
        </motion.div>
      </div>
    </div>
  )
}

// ─── Draggable Decorative Elements ──────────────────────────────────────────

interface DraggableShapeProps {
  shape: 'circle' | 'triangle' | 'square' | 'diamond'
  size: number
  color: string
  initialX: number
  initialY: number
  containerRef: React.RefObject<HTMLDivElement | null>
}

function DraggableShape({ shape, size, color, initialX, initialY, containerRef }: DraggableShapeProps) {
  const shapeContent = () => {
    switch (shape) {
      case 'circle':
        return (
          <div
            className="rounded-full cursor-grab active:cursor-grabbing"
            style={{
              width: size,
              height: size,
              background: color,
              boxShadow: `0 4px 20px ${color}40`,
            }}
          />
        )
      case 'triangle':
        return (
          <div
            className="cursor-grab active:cursor-grabbing"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
              filter: `drop-shadow(0 4px 10px ${color}40)`,
            }}
          />
        )
      case 'square':
        return (
          <div
            className="rounded-md cursor-grab active:cursor-grabbing"
            style={{
              width: size,
              height: size,
              background: color,
              boxShadow: `0 4px 20px ${color}40`,
            }}
          />
        )
      case 'diamond':
        return (
          <div
            className="rounded-sm cursor-grab active:cursor-grabbing"
            style={{
              width: size,
              height: size,
              background: color,
              transform: 'rotate(45deg)',
              boxShadow: `0 4px 20px ${color}40`,
            }}
          />
        )
    }
  }

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.3}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileDrag={{ scale: 1.2, zIndex: 50 }}
      className="absolute"
      style={{ left: initialX, top: initialY, zIndex: 10 }}
    >
      {shapeContent()}
    </motion.div>
  )
}

function DraggableDecorations({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const shapes: DraggableShapeProps[] = [
    { shape: 'circle', size: 24, color: '#7c3aed', initialX: 30, initialY: 20, containerRef },
    { shape: 'triangle', size: 20, color: '#a78bfa', initialX: 150, initialY: 60, containerRef },
    { shape: 'square', size: 18, color: '#5b21b6', initialX: 280, initialY: 30, containerRef },
    { shape: 'diamond', size: 16, color: '#7c3aed', initialX: 80, initialY: 120, containerRef },
    { shape: 'circle', size: 14, color: '#a78bfa', initialX: 320, initialY: 100, containerRef },
    { shape: 'triangle', size: 16, color: '#5b21b6', initialX: 200, initialY: 10, containerRef },
    { shape: 'square', size: 12, color: '#a78bfa', initialX: 50, initialY: 80, containerRef },
    { shape: 'diamond', size: 20, color: '#7c3aed', initialX: 350, initialY: 50, containerRef },
  ]

  return (
    <>
      {shapes.map((s, i) => (
        <DraggableShape key={i} {...s} />
      ))}
    </>
  )
}

// ─── Main Page Component ────────────────────────────────────────────────────

export default function Page8_3DImmersive() {
  const contactDecorRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-bigbro-black text-bigbro-text overflow-x-hidden">
      <style>{keyframes}</style>

      <Navbar />

      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <VortexBackground />

        {/* Semi-transparent overlay for readability */}
        <div className="absolute inset-0 bg-bigbro-black/40 pointer-events-none" />

        <div
          className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16"
          style={{ perspective: '1200px' }}
        >
          {/* Logo */}
          <motion.img
            src={LOGO_URL}
            alt="BigBro FC"
            className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8"
            style={{
              filter: 'drop-shadow(0 0 50px rgba(124,58,237,0.5))',
            }}
            initial={{ opacity: 0, scale: 0.3, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 14, duration: 1.2 }}
          />

          {/* Title with 3D perspective */}
          <motion.h1
            initial={{ opacity: 0, rotateX: 60, y: 60 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-wider text-bigbro-text mb-6"
            style={{
              textShadow: '0 4px 20px rgba(124,58,237,0.3), 0 8px 40px rgba(0,0,0,0.5)',
              transformStyle: 'preserve-3d',
            }}
          >
            BIGBRO
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-heading text-lg sm:text-xl md:text-2xl text-bigbro-purple-light tracking-[0.25em] uppercase mb-10"
          >
            IL GOBBO NON MOLLA MAI
          </motion.p>

          {/* Stats with 3D perspective */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-14 mb-12"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <AnimatedStat icon={Trophy} value={teamStats.position} label={teamStats.positionLabel} suffix="°" delay={1.2} />
            <AnimatedStat icon={Target} value={teamStats.wins} label="Vittorie" delay={1.4} />
            <AnimatedStat icon={Star} value={teamStats.goals} label="Gol Segnati" delay={1.6} />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <a
              href="#sponsor"
              className="inline-flex items-center gap-2 px-9 py-4 text-lg font-bold text-white bg-bigbro-purple hover:bg-bigbro-purple-dark rounded-lg transition-all duration-300"
              style={{
                boxShadow: '0 8px 30px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.15)',
                transform: 'perspective(600px) translateZ(10px)',
              }}
            >
              <Box className="w-5 h-5" />
              Diventa Sponsor
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-bigbro-text-muted/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-bigbro-purple rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ━━━ CHI SIAMO ━━━ */}
      <Section id="chi-siamo">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading overline="La Nostra Storia" title="Chi Siamo" icon={Layers} />

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-bigbro-text-muted leading-relaxed text-base md:text-lg mb-6">
                BigBro FC nasce dalla visione di Moonryde, presidente e fondatore. Una squadra costruita
                sulla passione, sulla grinta e sul desiderio di dominare la Kings League Italia. Terzi nel
                Girone A, ma con la fame di chi punta al vertice.
              </p>
              <p className="text-bigbro-text-muted leading-relaxed text-base md:text-lg mb-8">
                Ogni partita e una battaglia, ogni gol una dichiarazione. Il Gobbo non molla mai, dentro e
                fuori dal campo. Con una rosa di talento e un progetto ambizioso, BigBro FC punta a scrivere
                la storia della Kings League.
              </p>
              <div className="flex items-center gap-4">
                <img src={MOONRYDE_IMAGE_URL} alt="Moonryde" className="w-14 h-14 rounded-full object-cover border-2 border-bigbro-purple/30" />
                <div>
                  <p className="font-heading text-lg font-bold text-bigbro-text">Moonryde</p>
                  <p className="text-bigbro-text-muted text-sm">Presidente & Fondatore</p>
                </div>
              </div>
            </motion.div>

            {/* Right: parallax multi-layer cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ParallaxLayers />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ━━━ LA ROSA ━━━ */}
      <Section id="rosa" className="bg-bigbro-dark/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading overline="La Squadra" title="La Rosa" icon={Grip} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {players.map((player, i) => (
              <PinPlayerCard key={player.name} player={player} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ PACCHETTI SPONSOR ━━━ */}
      <Section id="sponsor">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading overline="Partnership" title="Pacchetti Sponsor" icon={Maximize} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {sponsorTiers.map((tier, i) => (
              <WobbleSponsorCard key={tier.id} tier={tier} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ GOBBO NEWS ━━━ */}
      <Section id="news" className="bg-bigbro-dark/50">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <SectionHeading overline="Ultime Notizie" title="Gobbo News" icon={Move3d} />
        </div>
        <ParallaxNewsColumns />
      </Section>

      {/* ━━━ CONTATTI ━━━ */}
      <Section id="contatti">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading overline="Scrivici" title="Contatti" icon={Mail} />

          <div className="relative" ref={contactDecorRef}>
            {/* Draggable decorative elements */}
            <DraggableDecorations containerRef={contactDecorRef} />

            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-bigbro-card border border-white/5 rounded-2xl p-8 md:p-10 overflow-hidden"
              style={{
                boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(124,58,237,0.08)',
                perspective: '800px',
              }}
            >
              {/* Ambient glow */}
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-bigbro-purple/[0.08] blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-bigbro-purple/[0.06] blur-[80px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-6 h-6 text-bigbro-purple" />
                  <p className="text-bigbro-text-muted text-sm">
                    Vuoi diventare partner di BigBro FC? Compila il form e ti ricontatteremo.
                  </p>
                </div>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ━━━ FOOTER ━━━ */}
      <footer
        className="relative border-t border-white/5 overflow-hidden"
        style={{ perspective: '600px' }}
      >
        {/* Background depth layer */}
        <div
          className="absolute inset-0 bg-bigbro-dark/80"
          style={{
            transform: 'translateZ(-20px) scale(1.05)',
          }}
        />

        {/* Mid depth accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.05) 0%, transparent 60%)',
            transform: 'translateZ(-10px)',
          }}
        />

        {/* Foreground content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo + name */}
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="BigBro FC"
                className="w-8 h-8"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(124,58,237,0.3))',
                }}
              />
              <span className="font-heading text-lg font-bold tracking-wider">
                BIGBRO <span className="text-bigbro-purple">FC</span>
              </span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'Youtube' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-bigbro-purple/20 flex items-center justify-center transition-all duration-300 group"
                  style={{
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                >
                  <s.icon className="w-4 h-4 text-bigbro-text-muted group-hover:text-bigbro-purple-light transition-colors" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-bigbro-text-muted text-sm">
              <p>&copy; {new Date().getFullYear()} BigBro FC. Tutti i diritti riservati.</p>
              <p className="mt-1">Made with ❤️ by <a href="https://mindblast.it" target="_blank" rel="noopener noreferrer" className="text-bigbro-purple-light hover:text-bigbro-purple transition-colors">Mindblast</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
