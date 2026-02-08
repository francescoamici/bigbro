import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, useInView, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'
import {
  Trophy, Users, Star, Target, Mail, Instagram, Twitter,
  Youtube, Cpu, Binary, Zap, Crown, Shield, Check,
  ArrowRight, Terminal, Wifi, Radio, Menu, X, Hand,
} from 'lucide-react'
import { players, teamStats, LOGO_URL } from '@/data/players'
import { news } from '@/data/news'
import { sponsorTiers } from '@/data/sponsors'
import { ContactForm } from '@/components/shared/ContactForm'
import { cn } from '@/lib/utils'

// ─── Constants ────────────────────────────────────────────────────────────────

const CHAR_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*'
const NAV_LINKS = [
  { label: 'Chi Siamo', href: '#chi-siamo' },
  { label: 'Rosa', href: '#rosa' },
  { label: 'Sponsor', href: '#sponsor' },
  { label: 'News', href: '#news' },
  { label: 'Contatti', href: '#contatti' },
]

// ─── Utility: random character ────────────────────────────────────────────────

function randomChar(): string {
  return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)]
}

function generateMatrixGrid(rows: number, cols: number): string {
  let result = ''
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result += randomChar()
    }
    if (r < rows - 1) result += '\n'
  }
  return result
}

// ─── Neon Beam Divider ────────────────────────────────────────────────────────

function NeonBeamDivider() {
  return (
    <div className="relative w-full h-px my-0">
      <div className="absolute inset-0 bg-bigbro-purple/40" />
      <motion.div
        className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-transparent via-bigbro-purple to-transparent"
        animate={{ x: ['-128px', 'calc(100vw + 128px)'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <div
        className="absolute inset-0"
        style={{ boxShadow: '0 0 8px 1px rgba(124,58,237,0.5), 0 0 20px 2px rgba(124,58,237,0.2)' }}
      />
    </div>
  )
}

// ─── Scan Lines Overlay ───────────────────────────────────────────────────────

function ScanLines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)',
      }}
    />
  )
}

// ─── Background Beams ─────────────────────────────────────────────────────────

function BackgroundBeams() {
  const beams = useMemo(() => [
    { angle: -25, duration: 6, delay: 0, width: 1, opacity: 0.4, color: '#7c3aed' },
    { angle: -35, duration: 8, delay: 1, width: 2, opacity: 0.25, color: '#a78bfa' },
    { angle: -15, duration: 5, delay: 2.5, width: 1, opacity: 0.35, color: '#ffffff' },
    { angle: -45, duration: 7, delay: 0.5, width: 1.5, opacity: 0.2, color: '#7c3aed' },
    { angle: -20, duration: 9, delay: 3, width: 1, opacity: 0.3, color: '#a78bfa' },
    { angle: -30, duration: 4, delay: 1.5, width: 2, opacity: 0.15, color: '#ffffff' },
    { angle: 10, duration: 10, delay: 4, width: 1, opacity: 0.2, color: '#7c3aed' },
    { angle: -50, duration: 6.5, delay: 2, width: 1, opacity: 0.25, color: '#a78bfa' },
  ], [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {beams.map((beam, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: `${beam.width}px`,
            height: '200%',
            background: `linear-gradient(180deg, transparent 0%, ${beam.color} 30%, ${beam.color} 70%, transparent 100%)`,
            opacity: beam.opacity,
            transform: `rotate(${beam.angle}deg)`,
            left: `${10 + i * 12}%`,
            top: '-50%',
            filter: `blur(${beam.width > 1 ? 1 : 0}px)`,
            boxShadow: `0 0 ${beam.width * 4}px ${beam.color}`,
          }}
          animate={{
            y: ['-100%', '100%'],
            opacity: [beam.opacity, beam.opacity * 1.5, beam.opacity, beam.opacity * 2, beam.opacity],
          }}
          transition={{
            y: { duration: beam.duration, repeat: Infinity, ease: 'linear', delay: beam.delay },
            opacity: { duration: beam.duration * 0.5, repeat: Infinity, ease: 'easeInOut', delay: beam.delay },
          }}
        />
      ))}
      {/* Flash / collision bursts */}
      <motion.div
        className="absolute w-4 h-4 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.8) 0%, transparent 70%)',
          left: '30%',
          top: '40%',
          filter: 'blur(4px)',
        }}
        animate={{ opacity: [0, 0, 1, 0], scale: [0.5, 0.5, 3, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute w-3 h-3 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.9) 0%, transparent 70%)',
          left: '65%',
          top: '55%',
          filter: 'blur(3px)',
        }}
        animate={{ opacity: [0, 0, 0, 1, 0], scale: [0.5, 0.5, 0.5, 4, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
      />
      <motion.div
        className="absolute w-5 h-5 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
          left: '50%',
          top: '25%',
          filter: 'blur(6px)',
        }}
        animate={{ opacity: [0, 0, 1, 0, 0], scale: [1, 1, 5, 1, 1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 6 }}
      />
    </div>
  )
}

// ─── Encrypted Text Background Layer ──────────────────────────────────────────

function EncryptedTextOverlay({ className }: { className?: string }) {
  const [grid, setGrid] = useState(() => generateMatrixGrid(12, 30))

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid(generateMatrixGrid(12, 30))
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none select-none', className)}>
      <pre
        className="text-[9px] leading-[11px] font-mono text-bigbro-purple/[0.07] whitespace-pre break-all w-full h-full"
        aria-hidden="true"
      >
        {grid}
      </pre>
    </div>
  )
}

// ─── Text Encrypt Effect Hook ─────────────────────────────────────────────────

function useTextEncrypt(target: string, triggerOnView: boolean = true) {
  const [display, setDisplay] = useState(target.split('').map(() => randomChar()).join(''))
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (triggerOnView && isInView) setStarted(true)
    if (!triggerOnView) setStarted(true)
  }, [isInView, triggerOnView])

  useEffect(() => {
    if (!started) return

    const letters = target.split('')
    let resolvedCount = 0
    const currentDisplay = letters.map(() => randomChar())

    // Cycling random characters interval
    const cycleInterval = setInterval(() => {
      for (let i = resolvedCount; i < letters.length; i++) {
        currentDisplay[i] = randomChar()
      }
      setDisplay(currentDisplay.join(''))
    }, 50)

    // Resolve letters one by one
    const resolveInterval = setInterval(() => {
      if (resolvedCount < letters.length) {
        currentDisplay[resolvedCount] = letters[resolvedCount]
        resolvedCount++
        setDisplay(currentDisplay.join(''))
      }
      if (resolvedCount >= letters.length) {
        clearInterval(cycleInterval)
        clearInterval(resolveInterval)
      }
    }, 180)

    return () => {
      clearInterval(cycleInterval)
      clearInterval(resolveInterval)
    }
  }, [started, target])

  return { display, ref }
}

// ─── Glitch Text Component ────────────────────────────────────────────────────

function GlitchText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn('relative inline-block', className)}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute top-0 left-0 z-0 text-cyan-400/50"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
          animation: 'glitch-top 2.5s infinite linear alternate-reverse',
        }}
        aria-hidden="true"
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 z-0 text-red-400/50"
        style={{
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
          animation: 'glitch-bottom 3s infinite linear alternate-reverse',
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  )
}

// ─── Iridescent Card Wrapper ──────────────────────────────────────────────────

function IridescentCard({
  children,
  className,
  highlighted = false,
}: {
  children: React.ReactNode
  className?: string
  highlighted?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }, [])

  const hue = mousePos.x * 60 + mousePos.y * 30
  const gradientAngle = Math.atan2(mousePos.y - 0.5, mousePos.x - 0.5) * (180 / Math.PI)

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative rounded-xl overflow-hidden border border-white/10 transition-all duration-300',
        highlighted && 'border-bigbro-purple/50',
        className
      )}
      whileHover={{ scale: 1.02, y: -4 }}
      style={{
        background: `linear-gradient(${gradientAngle}deg,
          hsl(${270 + hue}, 70%, 15%),
          hsl(${290 + hue}, 60%, 12%),
          hsl(${310 + hue}, 50%, 10%),
          hsl(${250 + hue}, 65%, 13%))`,
      }}
    >
      {/* Iridescent shimmer overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%,
            hsl(${280 + hue}, 80%, 60%) 0%,
            hsl(${310 + hue}, 70%, 50%) 25%,
            hsl(${200 + hue}, 60%, 40%) 50%,
            transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  )
}

// ─── CSS Keyframes (injected once) ────────────────────────────────────────────

function CyberpunkStyles() {
  return (
    <style>{`
      @keyframes glitch-top {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(2px, -1px); }
        60% { transform: translate(-1px, 1px); }
        80% { transform: translate(1px, -2px); }
        100% { transform: translate(0); }
      }
      @keyframes glitch-bottom {
        0% { transform: translate(0); }
        25% { transform: translate(2px, 1px); }
        50% { transform: translate(-2px, -1px); }
        75% { transform: translate(1px, 2px); }
        100% { transform: translate(0); }
      }
      @keyframes neon-flicker {
        0%, 100% { opacity: 1; }
        4% { opacity: 0.9; }
        6% { opacity: 1; }
        8% { opacity: 0.4; }
        9% { opacity: 1; }
        50% { opacity: 1; }
        52% { opacity: 0.8; }
        53% { opacity: 1; }
      }
      @keyframes carousel-rotate {
        0% { transform: rotateY(0deg); }
        100% { transform: rotateY(-360deg); }
      }
      .neon-text-purple {
        text-shadow: 0 0 7px #7c3aed, 0 0 10px #7c3aed, 0 0 21px #7c3aed, 0 0 42px #5b21b6;
        animation: neon-flicker 4s infinite;
      }
      .neon-text-purple-sm {
        text-shadow: 0 0 5px #7c3aed, 0 0 10px #7c3aed;
      }
      .neon-box {
        box-shadow: 0 0 5px #7c3aed, 0 0 10px rgba(124,58,237,0.3), inset 0 0 5px rgba(124,58,237,0.1);
      }
      .clip-cyber {
        clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
      }
      .cyber-corner::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 16px;
        height: 16px;
        border-right: 1px solid rgba(124,58,237,0.5);
        border-top: 1px solid rgba(124,58,237,0.5);
        transform: rotate(45deg) translate(3px, 3px);
      }
    `}</style>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 1 - NAVBAR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 left-0 right-0 z-50 bg-bigbro-black/80 backdrop-blur-xl border-b border-bigbro-purple/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src={LOGO_URL}
            alt="BigBro FC"
            className="w-9 h-9 group-hover:drop-shadow-[0_0_12px_rgba(124,58,237,0.8)] transition-all duration-300"
          />
          <span className="font-mono text-xl font-bold tracking-widest text-bigbro-text">
            <GlitchText>BIGBRO</GlitchText>{' '}
            <span className="text-bigbro-purple neon-text-purple-sm">FC</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-mono font-medium text-bigbro-text-muted hover:text-bigbro-purple-light transition-colors duration-200 group"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-bigbro-purple group-hover:w-full transition-all duration-300 shadow-[0_0_5px_#7c3aed]" />
            </a>
          ))}
          <a
            href="#contatti"
            className="relative px-5 py-2 font-mono text-sm font-bold text-bigbro-text bg-bigbro-purple/20 border border-bigbro-purple/60 hover:bg-bigbro-purple/40 hover:border-bigbro-purple transition-all duration-300 clip-cyber neon-box"
          >
            <Terminal className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
            Diventa Sponsor
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-bigbro-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
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
            className="md:hidden overflow-hidden bg-bigbro-black/95 backdrop-blur-xl border-t border-bigbro-purple/20"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-bigbro-text-muted hover:text-bigbro-purple-light transition-colors py-1"
                >
                  <span className="text-bigbro-purple mr-2">&gt;</span>
                  {l.label}
                </a>
              ))}
              <a
                href="#contatti"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 font-mono text-sm font-bold text-center text-bigbro-text bg-bigbro-purple/20 border border-bigbro-purple/60 clip-cyber neon-box"
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 2 - HERO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HeroSection() {
  const { display: bigbroDisplay, ref: bigbroRef } = useTextEncrypt('BIGBRO')
  const { display: fcDisplay, ref: fcRef } = useTextEncrypt('FC')

  const stats = [
    { icon: Trophy, label: 'Posizione', value: `${teamStats.position}° pos`, color: 'text-yellow-400' },
    { icon: Zap, label: 'Vittorie', value: `${teamStats.wins} vit`, color: 'text-green-400' },
    { icon: Target, label: 'Gol', value: `${teamStats.goals} gol`, color: 'text-cyan-400' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bigbro-black">
      <BackgroundBeams />

      {/* Digital noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center px-4">
        {/* Terminal prefix */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-bigbro-purple text-sm md:text-base mb-4 tracking-widest"
        >
          <span className="text-bigbro-text-muted">&gt; </span>
          <span className="text-bigbro-purple-light">system.init</span>
          <span className="text-bigbro-text-muted">(</span>
          <span className="text-green-400">&quot;arena_mode&quot;</span>
          <span className="text-bigbro-text-muted">)</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-bigbro-purple ml-0.5"
          >
            _
          </motion.span>
        </motion.div>

        {/* BIGBRO FC encrypt effect */}
        <div ref={bigbroRef} className="mb-2">
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black font-mono tracking-tighter leading-none">
            <span className="neon-text-purple text-bigbro-purple">
              {bigbroDisplay}
            </span>
          </h1>
        </div>
        <div ref={fcRef}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-mono tracking-[0.3em] leading-none text-bigbro-text mb-6">
            {fcDisplay}
          </h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="font-mono text-lg md:text-xl text-bigbro-text-muted tracking-[0.2em] mb-12 uppercase"
        >
          // IL GOBBO NON MOLLA MAI
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 px-6 py-4 bg-bigbro-card/50 border border-white/10 clip-cyber neon-box"
            >
              <stat.icon className={cn('w-5 h-5', stat.color)} />
              <span
                className={cn('text-2xl md:text-3xl font-mono font-black', stat.color)}
                style={{ textShadow: `0 0 10px currentColor` }}
              >
                {stat.value}
              </span>
              <span className="text-xs font-mono text-bigbro-text-muted uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-12"
        >
          <a
            href="#chi-siamo"
            className="inline-flex items-center gap-2 px-8 py-3 font-mono text-sm font-bold text-bigbro-text bg-bigbro-purple/20 border border-bigbro-purple hover:bg-bigbro-purple/40 transition-all duration-300 clip-cyber neon-box group"
          >
            <Binary className="w-4 h-4" />
            ENTER_ARENA
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bigbro-black to-transparent pointer-events-none" />
    </section>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 3 - CHI SIAMO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CircuitPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
      viewBox="0 0 800 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Horizontal lines */}
      <line x1="0" y1="100" x2="300" y2="100" stroke="#7c3aed" strokeWidth="1" />
      <line x1="350" y1="100" x2="800" y2="100" stroke="#7c3aed" strokeWidth="1" />
      <line x1="0" y1="300" x2="200" y2="300" stroke="#a78bfa" strokeWidth="1" />
      <line x1="250" y1="300" x2="600" y2="300" stroke="#a78bfa" strokeWidth="1" />
      <line x1="650" y1="300" x2="800" y2="300" stroke="#a78bfa" strokeWidth="1" />
      <line x1="100" y1="500" x2="700" y2="500" stroke="#7c3aed" strokeWidth="1" />

      {/* Vertical lines */}
      <line x1="200" y1="0" x2="200" y2="200" stroke="#7c3aed" strokeWidth="1" />
      <line x1="500" y1="100" x2="500" y2="400" stroke="#a78bfa" strokeWidth="1" />
      <line x1="650" y1="200" x2="650" y2="600" stroke="#7c3aed" strokeWidth="1" />

      {/* Diagonal connectors */}
      <line x1="300" y1="100" x2="350" y2="150" stroke="#7c3aed" strokeWidth="1" />
      <line x1="200" y1="300" x2="250" y2="250" stroke="#a78bfa" strokeWidth="1" />
      <line x1="600" y1="300" x2="650" y2="350" stroke="#a78bfa" strokeWidth="1" />

      {/* Nodes */}
      <circle cx="300" cy="100" r="4" fill="#7c3aed" />
      <circle cx="350" cy="100" r="4" fill="#7c3aed" />
      <circle cx="200" cy="300" r="4" fill="#a78bfa" />
      <circle cx="250" cy="300" r="4" fill="#a78bfa" />
      <circle cx="600" cy="300" r="4" fill="#a78bfa" />
      <circle cx="650" cy="300" r="4" fill="#a78bfa" />
      <circle cx="500" cy="100" r="6" fill="#7c3aed" />
      <circle cx="500" cy="400" r="6" fill="#a78bfa" />

      {/* Geometric shapes */}
      <rect x="480" y="80" width="40" height="40" stroke="#7c3aed" strokeWidth="1" fill="none" rx="2" />
      <polygon points="200,280 220,300 200,320 180,300" stroke="#a78bfa" strokeWidth="1" fill="none" />
      <rect x="630" y="330" width="40" height="40" stroke="#7c3aed" strokeWidth="1" fill="none" rx="2" />

      {/* Additional paths */}
      <path d="M 100 500 L 100 450 L 200 450 L 200 300" stroke="#7c3aed" strokeWidth="1" fill="none" />
      <path d="M 700 500 L 700 400 L 650 400 L 650 350" stroke="#7c3aed" strokeWidth="1" fill="none" />
    </svg>
  )
}

function ChiSiamoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="chi-siamo" className="relative py-24 md:py-32 bg-bigbro-dark overflow-hidden">
      <CircuitPattern />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <Cpu className="w-5 h-5 text-bigbro-purple" />
          <span className="font-mono text-sm text-bigbro-purple tracking-widest uppercase">
            // 001 - Chi Siamo
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-mono mb-8 leading-tight">
              <span className="text-bigbro-text">LA </span>
              <span className="text-bigbro-purple neon-text-purple-sm">SQUADRA</span>
              <br />
              <span className="text-bigbro-text-muted text-2xl md:text-3xl">DEL FUTURO</span>
            </h2>

            <div className="space-y-5 text-bigbro-text-muted leading-relaxed">
              <p className="text-base md:text-lg">
                BigBro FC nasce dalla visione di{' '}
                <span className="text-bigbro-purple-light font-semibold">Moonryde</span>, presidente e
                fondatore. Una squadra costruita sulla passione, sulla grinta e sul desiderio di dominare la
                Kings League Italia.
              </p>
              <p className="text-base md:text-lg">
                Terzi nel Girone A, ma con la fame di chi punta al vertice.
              </p>
            </div>

            {/* Data points */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: 'POSITION', value: teamStats.positionLabel, icon: Trophy },
                { label: 'WINS', value: String(teamStats.wins), icon: Star },
                { label: 'GOALS', value: String(teamStats.goals), icon: Target },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-bigbro-card/60 border border-white/5 p-4 clip-cyber neon-box"
                >
                  <item.icon className="w-4 h-4 text-bigbro-purple mb-2" />
                  <div className="font-mono text-lg font-bold text-bigbro-text">{item.value}</div>
                  <div className="font-mono text-[10px] text-bigbro-text-muted tracking-widest mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Logo + visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #7c3aed, #a78bfa, #7c3aed, transparent, #7c3aed)',
                  filter: 'blur(30px)',
                  opacity: 0.3,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />

              {/* Hexagonal border */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                  <polygon
                    points="100,5 185,50 185,150 100,195 15,150 15,50"
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <polygon
                    points="100,20 170,57 170,143 100,180 30,143 30,57"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                </svg>
                <img
                  src={LOGO_URL}
                  alt="BigBro FC"
                  className="w-36 h-36 md:w-44 md:h-44 relative z-10 drop-shadow-[0_0_30px_rgba(124,58,237,0.5)]"
                />
              </div>

              {/* Orbiting elements */}
              <motion.div
                className="absolute w-3 h-3 bg-bigbro-purple rounded-full"
                style={{ top: '10%', left: '50%', boxShadow: '0 0 10px #7c3aed' }}
                animate={{
                  rotate: 360,
                  x: [0, 80, 0, -80, 0],
                  y: [-40, 0, 40, 0, -40],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-2 h-2 bg-bigbro-purple-light rounded-full"
                style={{ bottom: '20%', right: '10%', boxShadow: '0 0 8px #a78bfa' }}
                animate={{
                  rotate: -360,
                  x: [0, -60, 0, 60, 0],
                  y: [30, 0, -30, 0, 30],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* President tag */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-bigbro-card/80 border border-bigbro-purple/30 px-5 py-2 clip-cyber neon-box">
              <div className="font-mono text-[10px] text-bigbro-text-muted tracking-widest">PRESIDENTE</div>
              <div className="font-mono text-sm font-bold text-bigbro-purple-light">MOONRYDE</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 4 - LA ROSA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PlayerCard({ player, index }: { player: typeof players[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [hovered, setHovered] = useState(false)
  const [scrambledName, setScrambledName] = useState(player.name)

  useEffect(() => {
    if (!hovered) {
      setScrambledName(player.name)
      return
    }
    let frame = 0
    const maxFrames = 20
    const interval = setInterval(() => {
      frame++
      const resolved = Math.floor((frame / maxFrames) * player.name.length)
      const result = player.name
        .split('')
        .map((ch, i) => (i < resolved ? ch : ch === ' ' ? ' ' : randomChar()))
        .join('')
      setScrambledName(result)
      if (frame >= maxFrames) {
        clearInterval(interval)
        setScrambledName(player.name)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [hovered, player.name])

  const roleIcons: Record<string, typeof Shield> = {
    Portiere: Hand,
    Attaccante: Target,
    Centrocampista: Radio,
    Difensore: Shield,
    Allenatore: Crown,
  }
  const RoleIcon = roleIcons[player.role] || Users

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <IridescentCard className="h-full">
        <div className="relative p-6 min-h-[240px] flex flex-col justify-between">
          <EncryptedTextOverlay />

          {player.image && (
            <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-bigbro-dark/50">
              <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" loading="lazy" />
            </div>
          )}

          {/* Number badge */}
          <div className="absolute top-4 right-4 font-mono text-4xl font-black text-bigbro-purple/20">
            #{String(player.number).padStart(2, '0')}
          </div>

          <div className="relative z-10">
            {/* Role icon + role */}
            <div className="flex items-center gap-2 mb-3">
              <RoleIcon className="w-4 h-4 text-bigbro-purple" />
              <span className="font-mono text-[10px] text-bigbro-text-muted tracking-widest uppercase">
                {player.role}
              </span>
            </div>

            {/* Name with scramble effect */}
            <h3 className="font-mono text-xl font-black text-bigbro-text mb-3 tracking-tight">
              {scrambledName}
            </h3>

            {/* Description */}
            <p className="text-sm text-bigbro-text-muted leading-relaxed line-clamp-3">
              {player.description}
            </p>
          </div>

          {/* Bottom accent line */}
          <div className="relative z-10 mt-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-bigbro-purple/50 to-transparent" />
            <Wifi className="w-3 h-3 text-bigbro-purple/40" />
          </div>
        </div>
      </IridescentCard>
    </motion.div>
  )
}

function LaRosaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="rosa" className="relative py-24 md:py-32 bg-bigbro-black overflow-hidden">
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <Users className="w-5 h-5 text-bigbro-purple" />
          <span className="font-mono text-sm text-bigbro-purple tracking-widest uppercase">
            // 002 - La Rosa
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black font-mono mb-4"
        >
          <span className="text-bigbro-text">I </span>
          <span className="text-bigbro-purple neon-text-purple-sm">GUERRIERI</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-bigbro-text-muted text-sm mb-12 max-w-lg"
        >
          &gt; roster.load() -- {players.length} unita operative attive
        </motion.p>

        {/* Player grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player, i) => (
            <PlayerCard key={player.name} player={player} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 5 - PACCHETTI SPONSOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SponsorSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const tierIcons = [Crown, Shield, Star]

  return (
    <section id="sponsor" className="relative py-24 md:py-32 bg-bigbro-dark overflow-hidden">
      <CircuitPattern />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <Zap className="w-5 h-5 text-bigbro-purple" />
          <span className="font-mono text-sm text-bigbro-purple tracking-widest uppercase">
            // 003 - Sponsor Packages
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black font-mono mb-4"
        >
          <span className="text-bigbro-text">POWER </span>
          <span className="text-bigbro-purple neon-text-purple-sm">TIERS</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-bigbro-text-muted text-sm mb-16 max-w-lg"
        >
          &gt; sponsor.access_level = &quot;CLASSIFIED&quot;
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sponsorTiers.map((tier, i) => {
            const TierIcon = tierIcons[i] || Star
            const isHighlighted = tier.highlighted

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              >
                <IridescentCard highlighted={isHighlighted} className="h-full">
                  <div className="relative p-8 flex flex-col min-h-[400px]">
                    <EncryptedTextOverlay />

                    {/* Highlighted badge */}
                    {isHighlighted && (
                      <div className="absolute top-0 right-0 bg-bigbro-purple px-3 py-1 font-mono text-[10px] text-white tracking-widest">
                        MAX POWER
                      </div>
                    )}

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Tier icon */}
                      <div
                        className={cn(
                          'w-14 h-14 rounded-lg flex items-center justify-center mb-6',
                          isHighlighted
                            ? 'bg-bigbro-purple/30 neon-box'
                            : 'bg-bigbro-card border border-white/10'
                        )}
                      >
                        <TierIcon
                          className={cn(
                            'w-7 h-7',
                            isHighlighted ? 'text-bigbro-purple-light' : 'text-bigbro-text-muted'
                          )}
                        />
                      </div>

                      {/* Tier label */}
                      <span className="font-mono text-[10px] text-bigbro-purple tracking-widest mb-1">
                        {tier.tier.toUpperCase()}
                      </span>
                      <h3
                        className={cn(
                          'text-2xl font-black font-mono mb-6',
                          isHighlighted ? 'text-bigbro-purple-light neon-text-purple-sm' : 'text-bigbro-text'
                        )}
                      >
                        {tier.name}
                      </h3>

                      {/* Features */}
                      <ul className="space-y-3 flex-1">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-3">
                            <Check
                              className={cn(
                                'w-4 h-4 mt-0.5 shrink-0',
                                isHighlighted ? 'text-bigbro-purple' : 'text-bigbro-text-muted'
                              )}
                            />
                            <span className="text-sm text-bigbro-text-muted font-mono">{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <a
                        href="#contatti"
                        className={cn(
                          'mt-8 py-3 px-6 font-mono text-sm font-bold text-center clip-cyber transition-all duration-300',
                          isHighlighted
                            ? 'bg-bigbro-purple hover:bg-bigbro-purple-dark text-white neon-box'
                            : 'bg-bigbro-card border border-white/10 text-bigbro-text hover:border-bigbro-purple/50 hover:text-bigbro-purple-light'
                        )}
                      >
                        <Terminal className="w-3.5 h-3.5 inline mr-2 -mt-0.5" />
                        ATTIVA ORA
                      </a>
                    </div>
                  </div>
                </IridescentCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 6 - GOBBO NEWS (3D Marquee Carousel)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function NewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [paused, setPaused] = useState(false)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setRotation((prev) => prev - 0.3)
    }, 30)
    return () => clearInterval(interval)
  }, [paused])

  const categoryColors: Record<string, string> = {
    mercato: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
    match: 'text-green-400 border-green-400/30 bg-green-400/10',
    lifestyle: 'text-pink-400 border-pink-400/30 bg-pink-400/10',
    team: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  }

  return (
    <section id="news" className="relative py-24 md:py-32 bg-bigbro-black overflow-hidden">
      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <Radio className="w-5 h-5 text-bigbro-purple" />
          <span className="font-mono text-sm text-bigbro-purple tracking-widest uppercase">
            // 004 - Gobbo News
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black font-mono mb-4"
        >
          <span className="text-bigbro-text">NEWS </span>
          <span className="text-bigbro-purple neon-text-purple-sm">FEED</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-bigbro-text-muted text-sm mb-16 max-w-lg"
        >
          &gt; stream.live() -- broadcasting {news.length} signals
        </motion.p>

        {/* 3D Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[350px] md:h-[400px]"
          style={{ perspective: '1200px' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
              transition: paused ? 'none' : undefined,
            }}
          >
            {news.map((article, i) => {
              const angle = (360 / news.length) * i
              const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 220 : 350

              return (
                <div
                  key={article.id}
                  className="absolute top-1/2 left-1/2 w-72 md:w-80"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px) translateX(-50%) translateY(-50%)`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="bg-bigbro-card/90 border border-white/10 p-6 clip-cyber neon-box backdrop-blur-sm">
                    <EncryptedTextOverlay className="opacity-30" />

                    <div className="relative z-10">
                      {/* Category + Date */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={cn(
                            'px-2 py-0.5 border text-[10px] font-mono tracking-widest uppercase rounded',
                            categoryColors[article.category] || 'text-bigbro-text-muted'
                          )}
                        >
                          {article.category}
                        </span>
                        <span className="font-mono text-[10px] text-bigbro-text-muted">
                          {article.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-mono text-lg font-bold text-bigbro-text mb-3 line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-bigbro-text-muted line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>

                      {/* Read more */}
                      <div className="flex items-center gap-2 text-bigbro-purple font-mono text-xs group cursor-pointer">
                        <span>LEGGI</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Instruction text */}
        <p className="text-center font-mono text-[10px] text-bigbro-text-muted mt-6 tracking-widest">
          [ HOVER TO PAUSE ROTATION ]
        </p>
      </div>
    </section>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 7 - CONTATTI (Following Pointer)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ContattiSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })
  const [showPointer, setShowPointer] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
      if (!showPointer) setShowPointer(true)
    },
    [mouseX, mouseY, showPointer]
  )

  const handleMouseLeave = useCallback(() => {
    setShowPointer(false)
  }, [])

  return (
    <section
      id="contatti"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-24 md:py-32 bg-bigbro-dark overflow-hidden"
    >
      <CircuitPattern />

      {/* Following pointer */}
      {showPointer && (
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-bigbro-purple pointer-events-none z-20 hidden md:block"
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            boxShadow: '0 0 20px 8px rgba(124,58,237,0.5), 0 0 60px 20px rgba(124,58,237,0.2)',
          }}
        />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <Mail className="w-5 h-5 text-bigbro-purple" />
          <span className="font-mono text-sm text-bigbro-purple tracking-widest uppercase">
            // 005 - Contatti
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black font-mono mb-4"
        >
          <span className="text-bigbro-text">OPEN </span>
          <span className="text-bigbro-purple neon-text-purple-sm">CHANNEL</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-bigbro-text-muted text-sm mb-12 max-w-lg"
        >
          &gt; transmit.message() -- canale sicuro attivo
        </motion.p>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-bigbro-card/60 border border-white/10 p-8 md:p-12 clip-cyber neon-box relative"
        >
          <EncryptedTextOverlay />
          <div className="relative z-10">
            <ContactForm
              inputClassName="font-mono bg-bigbro-black/60 border-bigbro-purple/20 focus:border-bigbro-purple neon-box"
              buttonClassName="font-mono clip-cyber neon-box bg-bigbro-purple hover:bg-bigbro-purple-dark"
            />
          </div>
        </motion.div>

        {/* Info row below form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { icon: Mail, label: 'EMAIL', value: 'info@bigbrofc.it' },
            { icon: Instagram, label: 'SOCIAL', value: '@BigBroFC' },
            { icon: Wifi, label: 'STATUS', value: 'ONLINE' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 bg-bigbro-card/40 border border-white/5 px-4 py-3 font-mono"
            >
              <item.icon className="w-4 h-4 text-bigbro-purple shrink-0" />
              <div>
                <div className="text-[10px] text-bigbro-text-muted tracking-widest">{item.label}</div>
                <div className="text-sm text-bigbro-text">{item.value}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 8 - FOOTER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Footer() {
  return (
    <footer className="relative bg-bigbro-black border-t border-bigbro-purple/20 overflow-hidden">
      {/* Top neon line */}
      <div className="relative w-full h-px">
        <div className="absolute inset-0 bg-bigbro-purple/40" />
        <motion.div
          className="absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-transparent via-bigbro-purple-light to-transparent"
          animate={{ x: ['-160px', 'calc(100vw + 160px)'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={LOGO_URL}
                alt="BigBro FC"
                className="w-8 h-8 drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]"
              />
              <span className="font-mono text-lg font-bold text-bigbro-text tracking-widest">
                BIGBRO <span className="text-bigbro-purple">FC</span>
              </span>
            </div>
            <p className="font-mono text-sm text-bigbro-text-muted leading-relaxed">
              Kings League Italia
              <br />
              Il Gobbo Non Molla Mai
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-[10px] text-bigbro-purple tracking-widest mb-4">
              // QUICK_LINKS
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-mono text-sm text-bigbro-text-muted hover:text-bigbro-purple-light transition-colors"
                >
                  <span className="text-bigbro-purple/50 mr-1">&gt;</span>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-[10px] text-bigbro-purple tracking-widest mb-4">
              // SOCIAL_NET
            </h4>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Youtube, label: 'YouTube', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center bg-bigbro-card border border-white/10 text-bigbro-text-muted hover:text-bigbro-purple hover:border-bigbro-purple/50 hover:shadow-[0_0_10px_rgba(124,58,237,0.3)] transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-bigbro-text-muted tracking-widest">
            &copy; {new Date().getFullYear()} BIGBRO FC // ALL RIGHTS RESERVED
          </p>
          <p className="mt-2">Made with ❤️ by <a href="https://mindblast.it" target="_blank" rel="noopener noreferrer" className="text-bigbro-purple-light hover:text-bigbro-purple transition-colors">Mindblast</a></p>
          <p className="font-mono text-[10px] text-bigbro-text-muted/50 tracking-widest">
            <Cpu className="w-3 h-3 inline mr-1 -mt-0.5" />
            CYBERPUNK_ARENA v10.0
          </p>
        </div>
      </div>

      {/* Bottom neon line */}
      <div className="relative w-full h-px">
        <div className="absolute inset-0 bg-bigbro-purple/20" />
        <motion.div
          className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-transparent via-bigbro-purple to-transparent"
          animate={{ x: ['160px', 'calc(-100vw - 160px)'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </footer>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN PAGE COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function Page10_CyberpunkArena() {
  return (
    <div className="min-h-screen bg-bigbro-black text-bigbro-text overflow-x-hidden">
      <CyberpunkStyles />
      <ScanLines />
      <Navbar />

      <main>
        <HeroSection />
        <NeonBeamDivider />
        <ChiSiamoSection />
        <NeonBeamDivider />
        <LaRosaSection />
        <NeonBeamDivider />
        <SponsorSection />
        <NeonBeamDivider />
        <NewsSection />
        <NeonBeamDivider />
        <ContattiSection />
      </main>

      <Footer />
    </div>
  )
}
