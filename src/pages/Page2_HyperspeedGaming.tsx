import { useRef, useState, useEffect, useCallback, type MouseEvent as ReactMouseEvent } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
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
  ChevronRight,
  Zap,
  Swords,
  Shield,
  Crown,
  Check,
  ArrowRight,
  Hand,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useCountUp(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!startOnView || !inView) return
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration, startOnView, inView])

  return { count, ref }
}

/* ─────────────────────────────────────────────
   INLINE STYLES / KEYFRAMES
   (injected via <style> tag for pseudo-elements)
───────────────────────────────────────────── */
const glitchCSS = `
@keyframes glitch-anim-1 {
  0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, -1px); }
  10% { clip-path: inset(15% 0 65% 0); transform: translate(2px, 1px); }
  20% { clip-path: inset(80% 0 1% 0); transform: translate(-1px, 2px); }
  30% { clip-path: inset(10% 0 85% 0); transform: translate(1px, -2px); }
  40% { clip-path: inset(55% 0 35% 0); transform: translate(-2px, 0px); }
  50% { clip-path: inset(25% 0 58% 0); transform: translate(2px, 2px); }
  60% { clip-path: inset(70% 0 10% 0); transform: translate(-1px, -1px); }
  70% { clip-path: inset(5% 0 80% 0); transform: translate(1px, 1px); }
  80% { clip-path: inset(45% 0 40% 0); transform: translate(2px, -2px); }
  90% { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 2px); }
  100% { clip-path: inset(30% 0 55% 0); transform: translate(0px, 0px); }
}
@keyframes glitch-anim-2 {
  0% { clip-path: inset(25% 0 58% 0); transform: translate(2px, 1px); }
  10% { clip-path: inset(70% 0 10% 0); transform: translate(-2px, -2px); }
  20% { clip-path: inset(5% 0 80% 0); transform: translate(1px, 2px); }
  30% { clip-path: inset(60% 0 20% 0); transform: translate(-1px, -1px); }
  40% { clip-path: inset(40% 0 45% 0); transform: translate(2px, 0px); }
  50% { clip-path: inset(10% 0 85% 0); transform: translate(-2px, -2px); }
  60% { clip-path: inset(55% 0 30% 0); transform: translate(1px, 1px); }
  70% { clip-path: inset(80% 0 5% 0); transform: translate(-1px, 2px); }
  80% { clip-path: inset(15% 0 70% 0); transform: translate(2px, -1px); }
  90% { clip-path: inset(50% 0 35% 0); transform: translate(-2px, 1px); }
  100% { clip-path: inset(35% 0 50% 0); transform: translate(0px, 0px); }
}
@keyframes speed-lines {
  0% { transform: translateX(-100%) translateY(-100%); }
  100% { transform: translateX(100%) translateY(100%); }
}
@keyframes speed-lines-reverse {
  0% { transform: translateX(100%) translateY(-100%); }
  100% { transform: translateX(-100%) translateY(100%); }
}
@keyframes lightning-bolt {
  0%, 100% { opacity: 0; }
  5% { opacity: 1; }
  10% { opacity: 0.3; }
  15% { opacity: 0.8; }
  20% { opacity: 0; }
  45% { opacity: 0; }
  50% { opacity: 0.6; }
  55% { opacity: 0; }
}
@keyframes scan-line {
  0% { top: -10%; }
  100% { top: 110%; }
}
@keyframes energy-pulse {
  0%, 100% { box-shadow: 0 0 5px rgba(124,58,237,0.3), inset 0 0 5px rgba(124,58,237,0.1); }
  50% { box-shadow: 0 0 20px rgba(124,58,237,0.6), inset 0 0 10px rgba(124,58,237,0.2); }
}
.glitch-text {
  position: relative;
  display: inline-block;
}
.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.glitch-text::before {
  color: #ff0040;
  animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
  z-index: -1;
}
.glitch-text::after {
  color: #00ffff;
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
  z-index: -1;
}
`

/* ─────────────────────────────────────────────
   SPEED LINES BACKGROUND
───────────────────────────────────────────── */
function SpeedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-[1px] opacity-20"
          style={{
            width: `${60 + Math.random() * 40}%`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 50 - 25}%`,
            background: i % 2 === 0
              ? 'linear-gradient(90deg, transparent, rgba(167,139,250,0.8), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
            transform: `rotate(${-25 + Math.random() * 10}deg)`,
            animation: `speed-lines ${3 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   LIGHTNING DIVIDER
───────────────────────────────────────────── */
function LightningDivider() {
  return (
    <div className="relative h-16 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 64"
        preserveAspectRatio="none"
        style={{ animation: 'lightning-bolt 4s ease-in-out infinite' }}
      >
        <path
          d="M0,32 L100,28 L200,36 L280,20 L350,40 L400,24 L500,38 L580,18 L650,42 L720,26 L800,36 L880,22 L950,40 L1020,28 L1100,34 L1200,32"
          fill="none"
          stroke="url(#lightning-gradient)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="70%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
          animation: 'lightning-bolt 4s ease-in-out infinite',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   TILT CARD (3D Mouse Tracking)
───────────────────────────────────────────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('perspective(600px) rotateX(0deg) rotateY(0deg)')

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12
    setTransform(`perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)')
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn('transition-transform duration-300 ease-out', className)}
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────
   SPOTLIGHT CARD (Cursor Following Gradient)
───────────────────────────────────────────── */
function SpotlightCard({
  children,
  className,
  highlighted,
}: {
  children: React.ReactNode
  className?: string
  highlighted?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setSpotlightPos({ x, y })
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${
            highlighted ? 'rgba(124,58,237,0.25)' : 'rgba(167,139,250,0.15)'
          }, transparent 60%)`,
        }}
      />
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────
   BLUR-IN TEXT (Sharpens on scroll)
───────────────────────────────────────────── */
function BlurInText({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : { filter: 'blur(10px)', opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────── */
function Section({
  id,
  children,
  className,
  withLightning = true,
}: {
  id: string
  children: React.ReactNode
  className?: string
  withLightning?: boolean
}) {
  return (
    <>
      {withLightning && <LightningDivider />}
      <section id={id} className={cn('relative py-20 md:py-28', className)}>
        {children}
      </section>
    </>
  )
}

/* ─────────────────────────────────────────────
   ROLE ICON MAP
───────────────────────────────────────────── */
const roleIcons: Record<string, typeof Trophy> = {
  Portiere: Hand,
  Attaccante: Target,
  Centrocampista: Swords,
  Difensore: Shield,
  Allenatore: Crown,
}

/* ─────────────────────────────────────────────
   CATEGORY COLORS
───────────────────────────────────────────── */
const categoryColors: Record<string, string> = {
  mercato: 'bg-emerald-600',
  match: 'bg-bigbro-purple',
  lifestyle: 'bg-amber-600',
  team: 'bg-cyan-600',
}

/* =============================================================
   MAIN PAGE COMPONENT
============================================================= */
export default function Page2_HyperspeedGaming() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Chi Siamo', href: '#chi-siamo' },
    { label: 'Rosa', href: '#rosa' },
    { label: 'Sponsor', href: '#sponsor' },
    { label: 'News', href: '#news' },
    { label: 'Contatti', href: '#contatti' },
  ]

  /* ─── Stat counters ─── */
  const positionCounter = useCountUp(teamStats.position, 1200)
  const winsCounter = useCountUp(teamStats.wins, 1400)
  const goalsCounter = useCountUp(teamStats.goals, 2000)

  return (
    <div className="min-h-screen bg-bigbro-black text-bigbro-text overflow-x-hidden">
      {/* Inject keyframe CSS for glitch + speed lines */}
      <style dangerouslySetInnerHTML={{ __html: glitchCSS }} />

      {/* ═══════════════════════════════════════════
          1. NAVBAR
      ═══════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bigbro-black/90 backdrop-blur-md border-b border-bigbro-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <img
                src={LOGO_URL}
                alt="BigBro FC"
                className="w-10 h-10 drop-shadow-[0_0_10px_rgba(124,58,237,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(124,58,237,0.8)] transition-all"
              />
              <span className="font-heading text-xl font-bold tracking-wider uppercase text-bigbro-text">
                BIG<span className="text-bigbro-purple">BRO</span>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-heading uppercase tracking-wider text-bigbro-text-muted hover:text-bigbro-purple-light transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-bigbro-purple group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <a
                href="#contatti"
                className="ml-4 px-5 py-2 bg-bigbro-purple hover:bg-bigbro-purple-dark text-white font-heading text-sm uppercase tracking-wider transition-all duration-300 skew-x-[-6deg] hover:skew-x-0 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]"
              >
                <span className="inline-block skew-x-[6deg] hover:skew-x-0 transition-transform">
                  Diventa Sponsor
                </span>
              </a>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  'w-6 h-0.5 bg-bigbro-text transition-all duration-300',
                  mobileMenuOpen && 'rotate-45 translate-y-2'
                )}
              />
              <span
                className={cn(
                  'w-6 h-0.5 bg-bigbro-text transition-all duration-300',
                  mobileMenuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'w-6 h-0.5 bg-bigbro-text transition-all duration-300',
                  mobileMenuOpen && '-rotate-45 -translate-y-2'
                )}
              />
            </button>
          </div>

          {/* Mobile menu */}
          <motion.div
            className="md:hidden overflow-hidden"
            initial={false}
            animate={{ height: mobileMenuOpen ? 'auto' : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="py-4 space-y-2 border-t border-white/5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-2 font-heading uppercase tracking-wider text-bigbro-text-muted hover:text-bigbro-purple-light transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contatti"
                className="block mx-4 mt-3 px-5 py-3 bg-bigbro-purple text-white text-center font-heading uppercase tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                Diventa Sponsor
              </a>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          2. HERO
      ═══════════════════════════════════════════ */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Speed lines bg */}
        <SpeedLines />

        {/* Scan line overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute left-0 w-full h-[2px] bg-bigbro-purple/20"
            style={{ animation: 'scan-line 4s linear infinite' }}
          />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Logo */}
          <motion.img
            src={LOGO_URL}
            alt="BigBro FC"
            className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-8 drop-shadow-[0_0_40px_rgba(124,58,237,0.6)]"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100, duration: 1 }}
          />

          {/* Glitch title */}
          <motion.h1
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-heading font-bold uppercase leading-none mb-4"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          >
            <span
              className="glitch-text text-gradient"
              data-text="BIGBRO"
            >
              BIGBRO
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="font-heading text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.3em] text-bigbro-purple-light mb-2"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            IL GOBBO NON MOLLA MAI
          </motion.p>
          <motion.p
            className="text-bigbro-text-muted text-sm uppercase tracking-widest mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Kings League Italia
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            {[
              { label: '3a POSIZIONE', value: positionCounter, suffix: '°', icon: Trophy },
              { label: 'VITTORIE', value: winsCounter, suffix: '', icon: Star },
              { label: 'GOL SEGNATI', value: goalsCounter, suffix: '', icon: Target },
            ].map((stat) => {
              const StatIcon = stat.icon
              return (
                <div key={stat.label} className="text-center group">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <StatIcon className="w-5 h-5 text-bigbro-purple" />
                  </div>
                  <span
                    ref={stat.value.ref}
                    className="block text-5xl md:text-6xl font-heading font-bold text-bigbro-text"
                  >
                    {stat.value.count}
                    {stat.suffix}
                  </span>
                  <span className="text-xs font-heading uppercase tracking-widest text-bigbro-text-muted mt-1 block">
                    {stat.label}
                  </span>
                </div>
              )
            })}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-xs font-heading uppercase tracking-widest text-bigbro-text-muted">
              Scroll
            </span>
            <motion.div
              className="w-5 h-8 rounded-full border-2 border-bigbro-purple/40 flex items-start justify-center p-1"
              animate={{ borderColor: ['rgba(124,58,237,0.4)', 'rgba(124,58,237,0.8)', 'rgba(124,58,237,0.4)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-bigbro-purple"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          3. CHI SIAMO
      ═══════════════════════════════════════════ */}
      <Section id="chi-siamo" className="bg-bigbro-dark">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-bigbro-purple" />
              <span className="font-heading text-sm uppercase tracking-[0.3em] text-bigbro-purple-light">
                Chi Siamo
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-4xl md:text-6xl font-heading font-bold uppercase mb-12"
            >
              LA SQUADRA DEL{' '}
              <span className="text-gradient">GOBBO</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text side */}
            <BlurInText>
              <p className="text-lg md:text-xl leading-relaxed text-bigbro-text-muted mb-8">
                BigBro FC nasce dalla visione di{' '}
                <span className="text-bigbro-purple-light font-semibold">Moonryde</span>, presidente e fondatore.
                Una squadra costruita sulla passione, sulla grinta e sul desiderio di dominare la Kings League Italia.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-bigbro-text-muted mb-8">
                Terzi nel Girone A, ma con la fame di chi punta al vertice.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#rosa"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-bigbro-purple hover:bg-bigbro-purple-dark text-white font-heading uppercase tracking-wider text-sm transition-all duration-300 skew-x-[-4deg] hover:skew-x-0 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                >
                  <span className="inline-block skew-x-[4deg] hover:skew-x-0 transition-transform">
                    Scopri la Rosa
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </BlurInText>

            {/* Stats / Moonryde card */}
            <BlurInText className="relative">
              <div
                className="relative bg-bigbro-card border border-bigbro-purple/20 p-8 overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)' }}
              >
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-bigbro-purple/40" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <img src={MOONRYDE_IMAGE_URL} alt="Moonryde" className="w-12 h-12 rounded-full object-cover border-2 border-bigbro-purple/30" />
                  <div>
                    <h3 className="font-heading text-2xl font-bold uppercase">Moonryde</h3>
                    <p className="text-bigbro-text-muted text-sm">Presidente & Fondatore</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-bigbro-black/50 border border-white/5">
                    <span className="block text-2xl font-heading font-bold text-bigbro-purple-light">
                      {teamStats.positionLabel}
                    </span>
                    <span className="text-xs text-bigbro-text-muted uppercase tracking-wider">Classifica</span>
                  </div>
                  <div className="text-center p-3 bg-bigbro-black/50 border border-white/5">
                    <span className="block text-2xl font-heading font-bold text-bigbro-purple-light">
                      {teamStats.wins}
                    </span>
                    <span className="text-xs text-bigbro-text-muted uppercase tracking-wider">Vittorie</span>
                  </div>
                  <div className="text-center p-3 bg-bigbro-black/50 border border-white/5">
                    <span className="block text-2xl font-heading font-bold text-bigbro-purple-light">
                      {teamStats.goals}
                    </span>
                    <span className="text-xs text-bigbro-text-muted uppercase tracking-wider">Gol</span>
                  </div>
                </div>

                <p className="text-bigbro-text-muted text-sm italic">
                  &ldquo;Questa squadra ha fame, il nostro obiettivo e chiaro: arrivare fino in fondo.&rdquo;
                </p>

                {/* Energy pulse border effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ animation: 'energy-pulse 3s ease-in-out infinite' }}
                />
              </div>
            </BlurInText>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════
          4. LA ROSA
      ═══════════════════════════════════════════ */}
      <Section id="rosa" className="bg-bigbro-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-bigbro-purple" />
              <span className="font-heading text-sm uppercase tracking-[0.3em] text-bigbro-purple-light">
                La Rosa
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-4xl md:text-6xl font-heading font-bold uppercase mb-16"
            >
              I NOSTRI{' '}
              <span className="text-gradient">GUERRIERI</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {players.map((player, i) => {
              const RoleIcon = roleIcons[player.role] || Star
              return (
                <motion.div key={player.name} variants={fadeInUp} custom={i}>
                  <TiltCard>
                    <div
                      className="relative bg-bigbro-card border border-white/5 hover:border-bigbro-purple/40 transition-colors duration-500 overflow-hidden group"
                      style={{
                        clipPath:
                          'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                      }}
                    >
                      {/* Top accent bar */}
                      <div className="h-1 w-full bg-gradient-to-r from-bigbro-purple via-bigbro-purple-light to-bigbro-purple" />

                      {/* Number watermark */}
                      <div className="absolute -right-4 -top-4 text-[8rem] font-heading font-bold text-white/[0.03] leading-none select-none">
                        {player.number}
                      </div>

                      <div className="p-6 relative z-10">
                        {/* Player image */}
                        {player.image && (
                          <div className="w-full h-48 mb-4 overflow-hidden bg-bigbro-dark/50">
                            <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" loading="lazy" />
                          </div>
                        )}
                        {/* Role icon + number */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-bigbro-purple/10 border border-bigbro-purple/20 flex items-center justify-center">
                              <RoleIcon className="w-5 h-5 text-bigbro-purple" />
                            </div>
                            <span className="text-xs font-heading uppercase tracking-widest text-bigbro-text-muted">
                              {player.role}
                            </span>
                          </div>
                          <span className="font-heading text-3xl font-bold text-bigbro-purple/30">
                            #{player.number}
                          </span>
                        </div>

                        {/* Name */}
                        <h3 className="font-heading text-2xl font-bold uppercase tracking-wide mb-3 group-hover:text-bigbro-purple-light transition-colors">
                          {player.name}
                        </h3>

                        {/* Description */}
                        <p className="text-bigbro-text-muted text-sm leading-relaxed">
                          {player.description}
                        </p>
                      </div>

                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bigbro-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════
          5. PACCHETTI SPONSOR
      ═══════════════════════════════════════════ */}
      <Section id="sponsor" className="bg-bigbro-dark">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-bigbro-purple" />
              <span className="font-heading text-sm uppercase tracking-[0.3em] text-bigbro-purple-light">
                Partnership
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-4xl md:text-6xl font-heading font-bold uppercase mb-6"
            >
              PACCHETTI{' '}
              <span className="text-gradient">SPONSOR</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-bigbro-text-muted text-lg max-w-2xl mb-16"
            >
              Entra nel mondo BigBro. Scegli il pacchetto che fa per te e diventa parte della famiglia.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {sponsorTiers.map((tier, i) => (
              <motion.div key={tier.id} variants={fadeInUp} custom={i}>
                <SpotlightCard highlighted={tier.highlighted}>
                  <div
                    className={cn(
                      'relative h-full p-8 border transition-all duration-500',
                      tier.highlighted
                        ? 'bg-bigbro-card border-bigbro-purple/40 shadow-[0_0_30px_rgba(124,58,237,0.15)]'
                        : 'bg-bigbro-card border-white/5 hover:border-bigbro-purple/20'
                    )}
                    style={{
                      clipPath:
                        'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                    }}
                  >
                    {/* Highlighted badge */}
                    {tier.highlighted && (
                      <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bigbro-purple to-transparent" />
                    )}

                    {/* Tier badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 text-xs font-heading uppercase tracking-wider bg-bigbro-purple/10 text-bigbro-purple-light border border-bigbro-purple/20">
                        {tier.tier}
                      </span>
                      {tier.highlighted && (
                        <span className="px-3 py-1 text-xs font-heading uppercase tracking-wider bg-bigbro-purple text-white">
                          Top
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase mb-6">
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
                        'inline-flex items-center gap-2 px-6 py-3 font-heading text-sm uppercase tracking-wider transition-all duration-300',
                        tier.highlighted
                          ? 'bg-bigbro-purple hover:bg-bigbro-purple-dark text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                          : 'border border-bigbro-purple/30 text-bigbro-purple-light hover:bg-bigbro-purple/10'
                      )}
                    >
                      Contattaci
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════
          6. GOBBO NEWS
      ═══════════════════════════════════════════ */}
      <Section id="news" className="bg-bigbro-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-bigbro-purple" />
              <span className="font-heading text-sm uppercase tracking-[0.3em] text-bigbro-purple-light">
                Ultime Notizie
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-4xl md:text-6xl font-heading font-bold uppercase mb-16"
            >
              GOBBO{' '}
              <span className="text-gradient">NEWS</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {news.map((article, i) => (
              <motion.article
                key={article.id}
                variants={fadeInUp}
                custom={i}
                className={cn(
                  'group relative bg-bigbro-card border border-white/5 hover:border-bigbro-purple/30 transition-all duration-500 overflow-hidden cursor-pointer',
                  i === 0 && 'md:col-span-2'
                )}
                style={{
                  clipPath: i % 2 === 0
                    ? 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                    : 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
                }}
              >
                <div className={cn('p-6 md:p-8', i === 0 && 'md:p-10')}>
                  {/* Category + Date */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={cn(
                        'px-3 py-1 text-xs font-heading uppercase tracking-wider text-white',
                        categoryColors[article.category] || 'bg-bigbro-purple'
                      )}
                    >
                      {article.category}
                    </span>
                    <span className="text-xs text-bigbro-text-muted">{article.date}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className={cn(
                      'font-heading font-bold uppercase mb-3 group-hover:text-bigbro-purple-light transition-colors',
                      i === 0 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
                    )}
                  >
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-bigbro-text-muted text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  {/* Read more */}
                  <span className="inline-flex items-center gap-2 text-bigbro-purple-light text-sm font-heading uppercase tracking-wider group-hover:gap-3 transition-all">
                    Leggi
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-bigbro-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════
          7. CONTATTI
      ═══════════════════════════════════════════ */}
      <Section id="contatti" className="bg-bigbro-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-bigbro-purple" />
                <span className="font-heading text-sm uppercase tracking-[0.3em] text-bigbro-purple-light">
                  Contatti
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-6">
                UNISCITI AL{' '}
                <span className="text-gradient">TEAM</span>
              </h2>

              <p className="text-bigbro-text-muted text-lg mb-8 leading-relaxed">
                Vuoi diventare sponsor di BigBro FC? Compila il form e ti ricontatteremo per costruire insieme una partnership vincente.
              </p>

              {/* Lightning energy cards */}
              <div className="space-y-4">
                {[
                  { icon: Zap, label: 'Risposta entro 24h' },
                  { icon: Shield, label: 'Partnership su misura' },
                  { icon: Star, label: 'Visibilita garantita' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 p-4 bg-bigbro-card border border-white/5"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                  >
                    <div className="w-10 h-10 bg-bigbro-purple/10 border border-bigbro-purple/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-bigbro-purple" />
                    </div>
                    <span className="font-heading uppercase tracking-wider text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="bg-bigbro-card border border-white/5 p-6 md:p-8 relative overflow-hidden"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
                }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bigbro-purple via-bigbro-purple-light to-bigbro-purple" />

                <ContactForm
                  inputClassName="!rounded-none !border-white/10 !bg-bigbro-black/50 focus:!border-bigbro-purple"
                  buttonClassName="!rounded-none skew-x-[-3deg] hover:skew-x-0 transition-transform"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════
          8. FOOTER
      ═══════════════════════════════════════════ */}
      <footer className="relative bg-bigbro-black border-t border-bigbro-purple/10 py-12 overflow-hidden">
        {/* Speed lines in footer */}
        <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px]"
              style={{
                width: `${40 + Math.random() * 30}%`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 50}%`,
                background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)',
                transform: `rotate(${-20 + Math.random() * 10}deg)`,
                animation: `speed-lines ${4 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo + name */}
            <div className="flex items-center gap-4">
              <img
                src={LOGO_URL}
                alt="BigBro FC"
                className="w-12 h-12 drop-shadow-[0_0_15px_rgba(124,58,237,0.4)]"
              />
              <div>
                <span className="font-heading text-xl font-bold tracking-wider uppercase block">
                  BIG<span className="text-bigbro-purple">BRO</span> FC
                </span>
                <span className="text-xs text-bigbro-text-muted uppercase tracking-widest">
                  Kings League Italia
                </span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Youtube, label: 'YouTube', href: '#' },
              ].map(({ icon: SocialIcon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-bigbro-card border border-white/5 hover:border-bigbro-purple/40 flex items-center justify-center text-bigbro-text-muted hover:text-bigbro-purple-light transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                >
                  <SocialIcon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-bigbro-text-muted text-xs text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} BigBro FC. Tutti i diritti riservati.</p>
              <p className="text-bigbro-text-muted/50">Kings League Italia</p>
              <p className="mt-1">Made with ❤️ by <a href="https://mindblast.it" target="_blank" rel="noopener noreferrer" className="text-bigbro-purple-light hover:text-bigbro-purple transition-colors">Mindblast</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
