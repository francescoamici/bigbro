import { useState, useEffect, useRef, useCallback, useMemo, type MouseEvent as ReactMouseEvent } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Trophy, Users, Star, Target, Mail, Instagram, Twitter,
  Youtube, Sparkles, Moon, Crown, Shield, Check, ArrowRight,
  Rocket, Gem, Menu, X,
} from 'lucide-react'
import { players, teamStats, LOGO_URL, MOONRYDE_IMAGE_URL } from '@/data/players'
import { news } from '@/data/news'
import { sponsorTiers } from '@/data/sponsors'
import { ContactForm } from '@/components/shared/ContactForm'
import { cn } from '@/lib/utils'

// ─── Keyframes (inline styles) ──────────────────────────────────────────────

const keyframes = `
  @keyframes meteor-fall-1 {
    0% { transform: translate(0, 0) rotate(-35deg); opacity: 0; }
    5% { opacity: 1; }
    60% { opacity: 1; }
    100% { transform: translate(-600px, 600px) rotate(-35deg); opacity: 0; }
  }
  @keyframes meteor-fall-2 {
    0% { transform: translate(0, 0) rotate(-40deg); opacity: 0; }
    8% { opacity: 1; }
    55% { opacity: 1; }
    100% { transform: translate(-500px, 700px) rotate(-40deg); opacity: 0; }
  }
  @keyframes meteor-fall-3 {
    0% { transform: translate(0, 0) rotate(-30deg); opacity: 0; }
    4% { opacity: 1; }
    50% { opacity: 1; }
    100% { transform: translate(-700px, 500px) rotate(-30deg); opacity: 0; }
  }
  @keyframes aurora-text-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes spin-border {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
  @keyframes confetti-burst {
    0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
    100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0); opacity: 0; }
  }
`

// ─── Star Field Background ─────────────────────────────────────────────────

function StarField({ count = 80 }: { count?: number }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      twinkle: Math.random() > 0.6,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }))
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animation: star.twinkle
              ? `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`
              : undefined,
          }}
        />
      ))}
    </div>
  )
}

// ─── Meteor Shower Background ───────────────────────────────────────────────

function MeteorShowerBg({ count = 10 }: { count?: number }) {
  const meteors = useMemo(() => {
    const animations = ['meteor-fall-1', 'meteor-fall-2', 'meteor-fall-3']
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 40 - 10}%`,
      left: `${Math.random() * 60 + 40}%`,
      width: Math.random() * 80 + 80,
      animation: animations[i % 3],
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 8,
    }))
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {meteors.map((m) => (
        <div
          key={m.id}
          className="absolute"
          style={{
            top: m.top,
            left: m.left,
            width: m.width,
            height: 2,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(167,139,250,0.5), transparent)',
            borderRadius: '2px',
            animation: `${m.animation} ${m.duration}s linear ${m.delay}s infinite`,
            boxShadow: '0 0 6px rgba(167,139,250,0.4)',
          }}
        />
      ))}
    </div>
  )
}

// ─── Sparkle Behind Title ───────────────────────────────────────────────────

function SparkleField() {
  const sparkles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 1.5,
    }))
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="text-bigbro-purple-light" style={{ width: s.size, height: s.size }} />
        </motion.div>
      ))}
    </div>
  )
}

// ─── Navbar with Star Sparkle Effects ───────────────────────────────────────

function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 80 && y > lastY.current)
      lastY.current = y
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

  const navSparkles = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${15 + Math.random() * 70}%`,
      delay: Math.random() * 4,
      duration: Math.random() * 2 + 2,
    }))
  }, [])

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-bigbro-black/60 backdrop-blur-xl border-b border-white/5" />

      {/* Subtle star sparkles in navbar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {navSparkles.map((s) => (
          <motion.div
            key={s.id}
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: s.left }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.3, 1, 0.3] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
          >
            <Star className="w-2 h-2 text-bigbro-purple-light/40" />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img
            src={LOGO_URL}
            alt="BigBro FC"
            className="w-9 h-9 group-hover:drop-shadow-[0_0_12px_rgba(124,58,237,0.7)] transition-all duration-300"
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
          <ShineBorderButton href="#contatti" size="sm">
            <Rocket className="w-4 h-4" />
            Diventa Sponsor
          </ShineBorderButton>
        </div>

        <button
          className="md:hidden text-bigbro-text relative z-10"
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
    </motion.nav>
  )
}

// ─── Shine Border Button (animated conic-gradient border) ────────────────

function ShineBorderButton({
  children,
  href,
  size = 'md',
  className,
}: {
  children: React.ReactNode
  href?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizeClasses = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-9 py-4 text-lg',
  }

  const inner = (
    <span className={cn('relative z-10 font-bold flex items-center gap-2', sizeClasses[size])}>
      {children}
    </span>
  )

  const wrapperClass = cn(
    'relative inline-block rounded-lg overflow-hidden group cursor-pointer',
    className,
  )

  const content = (
    <>
      <span
        className="absolute inset-0 rounded-lg"
        style={{
          background: 'conic-gradient(from 0deg, #7c3aed, #a78bfa, #5b21b6, #c084fc, #7c3aed)',
          animation: 'spin-border 3s linear infinite',
        }}
      />
      <span className="absolute inset-[2px] rounded-[6px] bg-bigbro-dark group-hover:bg-bigbro-purple-dark/40 transition-colors duration-300" />
      {inner}
    </>
  )

  if (href) {
    return <a href={href} className={wrapperClass}>{content}</a>
  }
  return <span className={wrapperClass}>{content}</span>
}

// ─── Aurora Shimmer Text ────────────────────────────────────────────────────

function AuroraText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn('bg-clip-text text-transparent font-heading font-bold uppercase tracking-wider', className)}
      style={{
        backgroundImage: 'linear-gradient(90deg, #7c3aed, #a78bfa, #c084fc, #8b5cf6, #5b21b6, #a78bfa, #7c3aed)',
        backgroundSize: '300% 100%',
        animation: 'aurora-text-shift 4s ease-in-out infinite',
        WebkitBackgroundClip: 'text',
      }}
    >
      {children}
    </span>
  )
}

// ─── Section Wrapper with InView ────────────────────────────────────────────

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

// ─── Section Heading ────────────────────────────────────────────────────────

function SectionHeading({ overline, title, icon: Icon }: { overline: string; title: string; icon?: typeof Star }) {
  return (
    <div className="text-center mb-14 md:mb-16">
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-bigbro-purple/10 flex items-center justify-center">
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

// ─── Animated Stat Counter ──────────────────────────────────────────────────

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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="w-14 h-14 rounded-2xl bg-bigbro-purple/10 border border-bigbro-purple/20 flex items-center justify-center mb-1">
        <Icon className="w-6 h-6 text-bigbro-purple-light" />
      </div>
      <span className="text-3xl md:text-4xl font-heading font-bold text-bigbro-text">
        {count}{suffix}
      </span>
      <span className="text-bigbro-text-muted text-sm">{label}</span>
    </motion.div>
  )
}

// ─── Magic Player Card (radial gradient follows cursor) ─────────────────────

function MagicPlayerCard({ player, index }: { player: typeof players[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0, active: false })

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setGlowPos((prev) => ({ ...prev, active: false }))
  }, [])

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-bigbro-card border border-white/5 rounded-2xl overflow-hidden group cursor-default transition-all duration-300 hover:border-bigbro-purple/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
      >
        {/* Radial glow that follows cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: glowPos.active ? 1 : 0,
            background: `radial-gradient(300px circle at ${glowPos.x}px ${glowPos.y}px, rgba(124,58,237,0.15), rgba(167,139,250,0.05) 40%, transparent 70%)`,
          }}
        />

        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bigbro-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative p-6 md:p-7">
          {player.image && (
            <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-bigbro-dark/50">
              <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" loading="lazy" />
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <span className="text-5xl font-heading font-bold text-bigbro-purple/15 leading-none select-none">
              {player.number === 0 ? '--' : String(player.number).padStart(2, '0')}
            </span>
            <div className="w-10 h-10 rounded-full bg-bigbro-purple/10 flex items-center justify-center group-hover:bg-bigbro-purple/20 transition-colors">
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
      </div>
    </motion.div>
  )
}

// ─── Confetti Burst on Tier 1 Hover ─────────────────────────────────────────

function ConfettiBurst({ active }: { active: boolean }) {
  const confettiPieces = useMemo(() => {
    const purples = ['#7c3aed', '#a78bfa', '#5b21b6', '#c084fc', '#8b5cf6', '#ddd6fe']
    return Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * 360
      const distance = 60 + Math.random() * 80
      const tx = Math.cos((angle * Math.PI) / 180) * distance
      const ty = Math.sin((angle * Math.PI) / 180) * distance - 30
      return {
        id: i,
        tx,
        ty,
        rot: Math.random() * 720 - 360,
        color: purples[i % purples.length],
        size: Math.random() * 4 + 3,
      }
    })
  }, [])

  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          {confettiPieces.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
              animate={{
                x: p.tx,
                y: p.ty,
                rotate: p.rot,
                scale: 0,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute rounded-sm"
              style={{
                width: p.size,
                height: p.size * 1.5,
                backgroundColor: p.color,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

// ─── Sponsor Card with Shine Border + Confetti ──────────────────────────────

function ShineBorderCard({ tier, index }: { tier: typeof sponsorTiers[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [confettiActive, setConfettiActive] = useState(false)
  const confettiTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
    if (tier.highlighted) {
      setConfettiActive(true)
      if (confettiTimeout.current) clearTimeout(confettiTimeout.current)
      confettiTimeout.current = setTimeout(() => setConfettiActive(false), 900)
    }
  }, [tier.highlighted])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
  }, [])

  useEffect(() => {
    return () => {
      if (confettiTimeout.current) clearTimeout(confettiTimeout.current)
    }
  }, [])

  const tierIcons = [Crown, Gem, Star]
  const TierIcon = tierIcons[index] ?? Star

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {/* Shine border wrapper */}
      <div className="relative rounded-2xl overflow-hidden">
        {/* Animated conic gradient border */}
        <div
          className="absolute inset-0"
          style={{
            background: hovered || tier.highlighted
              ? 'conic-gradient(from 0deg, #7c3aed, #a78bfa, #5b21b6, #c084fc, #7c3aed)'
              : 'conic-gradient(from 0deg, rgba(255,255,255,0.05), rgba(124,58,237,0.2), rgba(255,255,255,0.05))',
            animation: 'spin-border 3s linear infinite',
            borderRadius: '1rem',
          }}
        />

        {/* Inner card */}
        <div className={cn(
          'relative m-[2px] rounded-[14px] bg-bigbro-card overflow-hidden h-full transition-all duration-300',
          tier.highlighted && 'shadow-[0_0_40px_rgba(124,58,237,0.15)]',
        )}>
          {/* Confetti burst for Tier 1 */}
          {tier.highlighted && <ConfettiBurst active={confettiActive} />}

          <div className="relative p-7 md:p-8 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300',
                  tier.highlighted ? 'bg-bigbro-purple/20' : 'bg-white/5',
                  hovered && !tier.highlighted && 'bg-bigbro-purple/10',
                )}
              >
                <TierIcon className={cn(
                  'w-5 h-5 transition-colors duration-300',
                  tier.highlighted ? 'text-bigbro-purple-light' : 'text-bigbro-text-muted',
                  hovered && !tier.highlighted && 'text-bigbro-purple-light',
                )} />
              </div>
              <span className="text-xs font-mono text-bigbro-text-muted uppercase tracking-widest">
                {tier.tier}
              </span>
            </div>

            <h3 className={cn(
              'font-heading text-2xl font-bold mb-5',
              tier.highlighted ? 'text-bigbro-purple-light' : 'text-bigbro-text',
            )}>
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
              >
                Contattaci <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Retro Grid Background ──────────────────────────────────────────────────

function RetroGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute bottom-0 left-0 right-0 h-[60%]"
        style={{
          perspective: '400px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: 'rotateX(60deg)',
            transformOrigin: 'bottom center',
            backgroundImage: `
              linear-gradient(to right, rgba(124,58,237,0.15) 1px, transparent 1px),
              linear-gradient(to top, rgba(124,58,237,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 40px',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 80%)',
          }}
        />
      </div>
      {/* Horizon glow */}
      <div
        className="absolute left-0 right-0 bottom-[58%] h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(167,139,250,0.5), rgba(124,58,237,0.3), transparent)',
          boxShadow: '0 0 30px rgba(124,58,237,0.3)',
        }}
      />
    </div>
  )
}

// ─── News Card ──────────────────────────────────────────────────────────────

function NewsCard({ article, index }: { article: typeof news[0]; index: number }) {
  const categoryColors: Record<string, string> = {
    mercato: 'bg-emerald-500/20 text-emerald-400',
    match: 'bg-bigbro-purple/20 text-bigbro-purple-light',
    lifestyle: 'bg-amber-500/20 text-amber-400',
    team: 'bg-cyan-500/20 text-cyan-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-bigbro-card border border-white/5 rounded-2xl overflow-hidden group hover:border-bigbro-purple/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.08)]"
    >
      <div className="h-1 bg-gradient-to-r from-bigbro-purple via-bigbro-purple-light to-bigbro-purple-dark" />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className={cn(
            'text-xs font-bold uppercase px-2.5 py-1 rounded-full',
            categoryColors[article.category] ?? 'bg-white/10 text-white/60',
          )}>
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
    </motion.div>
  )
}

// ─── Main Page Component ────────────────────────────────────────────────────

export default function Page7MeteorShower() {
  return (
    <div className="min-h-screen bg-bigbro-black text-bigbro-text overflow-x-hidden">
      <style>{keyframes}</style>

      <Navbar />

      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Deep space background */}
        <div className="absolute inset-0 bg-gradient-to-b from-bigbro-black via-[#0d0520] to-bigbro-black" />

        {/* Star field */}
        <StarField count={100} />

        {/* Shooting meteors */}
        <MeteorShowerBg count={12} />

        {/* Purple nebula glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[150px]"
            style={{
              background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
              top: '-20%',
              left: '20%',
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
              bottom: '10%',
              right: '10%',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
          {/* Logo */}
          <motion.img
            src={LOGO_URL}
            alt="BigBro FC"
            className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 drop-shadow-[0_0_60px_rgba(124,58,237,0.5)]"
            initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, duration: 1 }}
          />

          {/* Sparkles behind title */}
          <div className="relative inline-block">
            <SparkleField />
            {/* Aurora shimmer title */}
            <h1 className="relative z-10">
              <AuroraText className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none">
                BIGBRO
              </AuroraText>
            </h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-heading text-lg sm:text-xl md:text-2xl text-bigbro-purple-light tracking-[0.25em] uppercase mt-6 mb-10"
          >
            IL GOBBO NON MOLLA MAI
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-14 mb-12"
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
            <ShineBorderButton href="#sponsor" size="lg">
              Diventa Sponsor <ArrowRight className="w-5 h-5" />
            </ShineBorderButton>
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
        <StarField count={30} />
        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeading overline="La Nostra Storia" title="Chi Siamo" icon={Moon} />

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-bigbro-text-muted leading-relaxed text-base md:text-lg mb-6">
                BigBro FC nasce dalla visione di Moonryde, presidente e fondatore. Una squadra costruita sulla passione, sulla grinta e sul desiderio di dominare la Kings League Italia. Terzi nel Girone A, ma con la fame di chi punta al vertice.
              </p>
              <p className="text-bigbro-text-muted leading-relaxed text-base md:text-lg mb-8">
                Ogni partita e una battaglia, ogni gol una dichiarazione. Il Gobbo non molla mai, dentro e fuori dal campo. Con una rosa di talento e un progetto ambizioso, BigBro FC punta a scrivere la storia della Kings League.
              </p>
              <div className="flex items-center gap-4">
                <img src={MOONRYDE_IMAGE_URL} alt="Moonryde" className="w-14 h-14 rounded-full object-cover border-2 border-bigbro-purple/30" />
                <div>
                  <p className="font-heading text-lg font-bold text-bigbro-text">Moonryde</p>
                  <p className="text-bigbro-text-muted text-sm">Presidente & Fondatore</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Globe / circular visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              {/* Orbital rings */}
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-bigbro-purple/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-bigbro-purple shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                </motion.div>

                {/* Middle ring */}
                <motion.div
                  className="absolute inset-6 rounded-full border border-bigbro-purple-light/15"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute -bottom-1 right-6 w-2 h-2 rounded-full bg-bigbro-purple-light shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
                </motion.div>

                {/* Inner ring */}
                <motion.div
                  className="absolute inset-12 rounded-full border border-bigbro-purple/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute top-4 -left-1 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,0.5)]" />
                </motion.div>

                {/* Center globe */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-bigbro-purple/30 via-bigbro-purple-dark/20 to-transparent border border-bigbro-purple/20 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-bigbro-purple/10 to-transparent" />
                      <img
                        src={LOGO_URL}
                        alt="BigBro FC"
                        className="w-16 h-16 md:w-20 md:h-20 relative z-10 drop-shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                      />
                    </div>
                    {/* Glow behind globe */}
                    <div className="absolute inset-0 rounded-full bg-bigbro-purple/20 blur-[40px] -z-10" />
                  </div>
                </div>

                {/* Stats floating around the globe */}
                <motion.div
                  className="absolute -top-2 right-4 bg-bigbro-card/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="text-xs text-bigbro-text-muted">Posizione</p>
                  <p className="text-lg font-heading font-bold text-bigbro-purple-light">{teamStats.position}°</p>
                </motion.div>

                <motion.div
                  className="absolute bottom-4 -left-4 bg-bigbro-card/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  <p className="text-xs text-bigbro-text-muted">Gol</p>
                  <p className="text-lg font-heading font-bold text-bigbro-purple-light">{teamStats.goals}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ━━━ LA ROSA ━━━ */}
      <Section id="rosa" className="bg-bigbro-dark/50">
        <StarField count={25} />
        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeading overline="La Squadra" title="La Rosa" icon={Users} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player, i) => (
              <MagicPlayerCard key={player.name} player={player} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ PACCHETTI SPONSOR ━━━ */}
      <Section id="sponsor">
        <StarField count={20} />
        {/* Subtle meteor shower in background */}
        <MeteorShowerBg count={4} />
        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeading overline="Partnership" title="Pacchetti Sponsor" icon={Gem} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {sponsorTiers.map((tier, i) => (
              <ShineBorderCard key={tier.id} tier={tier} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ GOBBO NEWS ━━━ */}
      <Section id="news" className="bg-bigbro-dark/50">
        {/* Retro grid background */}
        <RetroGrid />
        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeading overline="Ultime Notizie" title="Gobbo News" icon={Sparkles} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((article, i) => (
              <NewsCard key={article.id} article={article} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ CONTATTI ━━━ */}
      <Section id="contatti">
        {/* Meteors falling in background */}
        <MeteorShowerBg count={6} />
        <StarField count={30} />
        <div className="relative max-w-3xl mx-auto px-6">
          <SectionHeading overline="Scrivici" title="Contatti" icon={Mail} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-bigbro-card border border-white/5 rounded-2xl p-8 md:p-10 overflow-hidden"
          >
            {/* Ambient cosmic glow */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-bigbro-purple/8 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-bigbro-purple/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative">
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
      </Section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="relative border-t border-white/5 bg-bigbro-dark/80 overflow-hidden">
        {/* Star field in footer */}
        <StarField count={40} />

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo + name */}
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="BigBro FC" className="w-8 h-8" />
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
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-bigbro-purple/20 flex items-center justify-center transition-colors duration-300 group"
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
