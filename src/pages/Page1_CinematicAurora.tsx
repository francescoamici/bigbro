import { useState, useEffect, useRef, useCallback, type MouseEvent as ReactMouseEvent } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Trophy, Users, Target, Mail, Instagram, Twitter,
  Youtube, ChevronRight, Menu, X, Crown, Shield, Award,
  Check, ExternalLink, ArrowRight, Star,
} from 'lucide-react'
import { players, teamStats, LOGO_URL } from '@/data/players'
import { news } from '@/data/news'
import { sponsorTiers } from '@/data/sponsors'
import { ContactForm } from '@/components/shared/ContactForm'
import { cn } from '@/lib/utils'

// ─── Navbar (hides on scroll down, shows on scroll up) ───────────────────────

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

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img src={LOGO_URL} alt="BigBro FC" className="w-9 h-9 group-hover:drop-shadow-[0_0_12px_rgba(124,58,237,0.7)] transition-all duration-300" />
          <span className="font-heading text-xl font-bold tracking-wider text-bigbro-text">
            BIGBRO <span className="text-bigbro-purple">FC</span>
          </span>
        </a>

        {/* Desktop links */}
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
          <MovingBorderButton href="#contatti" size="sm">
            Diventa Sponsor
          </MovingBorderButton>
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

// ─── Moving‑border CTA button ────────────────────────────────────────────────

function MovingBorderButton({
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
      {/* Animated gradient border */}
      <span
        className="absolute inset-0 rounded-lg"
        style={{
          background: 'conic-gradient(from 0deg, #7c3aed, #a78bfa, #5b21b6, #7c3aed)',
          animation: 'spin-border 3s linear infinite',
        }}
      />
      {/* Inner bg */}
      <span className="absolute inset-[2px] rounded-[6px] bg-bigbro-dark group-hover:bg-bigbro-purple-dark/40 transition-colors duration-300" />
      {inner}
    </>
  )

  if (href) {
    return (
      <a href={href} className={wrapperClass}>
        {content}
      </a>
    )
  }
  return <span className={wrapperClass}>{content}</span>
}

// ─── Aurora blobs (CSS animated) ─────────────────────────────────────────────

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Blob 1 */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
          top: '-15%',
          left: '10%',
          animation: 'aurora-drift-1 12s ease-in-out infinite alternate',
        }}
      />
      {/* Blob 2 */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
          top: '10%',
          right: '5%',
          animation: 'aurora-drift-2 15s ease-in-out infinite alternate',
        }}
      />
      {/* Blob 3 */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, #5b21b6 0%, transparent 70%)',
          bottom: '0%',
          left: '35%',
          animation: 'aurora-drift-3 10s ease-in-out infinite alternate',
        }}
      />
    </div>
  )
}

// ─── Text Generate Effect ────────────────────────────────────────────────────

function TextGenerateEffect({ words, className }: { words: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const wordArray = words.split(' ')

  return (
    <h1 ref={ref} className={cn('font-heading font-bold uppercase tracking-wider', className)}>
      {wordArray.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: i * 0.15, duration: 0.5, ease: 'easeOut' }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  )
}

// ─── Section wrapper with in‑view fade ───────────────────────────────────────

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

// ─── 3D Player Card ──────────────────────────────────────────────────────────

function PlayerCard3D({ player, index }: { player: typeof players[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg)')

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)')
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
        style={{ transform, transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
        className="relative bg-bigbro-card border border-white/5 rounded-2xl overflow-hidden group cursor-default"
      >
        {/* Glow accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bigbro-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-6 md:p-7">
          {/* Number + role icon */}
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
      </div>
    </motion.div>
  )
}

// ─── Sponsor Card with spotlight ─────────────────────────────────────────────

function SpotlightCard({ tier, index }: { tier: typeof sponsorTiers[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 })

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setSpotlight((s) => ({ ...s, opacity: 0 }))
  }, [])

  const tierIcons = [Crown, Award, Star]
  const TierIcon = tierIcons[index] ?? Star

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'relative rounded-2xl overflow-hidden bg-bigbro-card border transition-all duration-300 h-full',
          tier.highlighted
            ? 'border-bigbro-purple/60 shadow-[0_0_40px_rgba(124,58,237,0.15)]'
            : 'border-white/5 hover:border-white/10',
        )}
      >
        {/* Spotlight radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(124,58,237,0.12), transparent 60%)`,
          }}
        />

        {tier.highlighted && (
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-bigbro-purple to-transparent" />
        )}

        <div className="relative p-7 md:p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={cn(
                'w-11 h-11 rounded-xl flex items-center justify-center',
                tier.highlighted ? 'bg-bigbro-purple/20' : 'bg-white/5',
              )}
            >
              <TierIcon className={cn('w-5 h-5', tier.highlighted ? 'text-bigbro-purple-light' : 'text-bigbro-text-muted')} />
            </div>
            <span className="text-xs font-mono text-bigbro-text-muted uppercase tracking-widest">
              {tier.tier}
            </span>
          </div>

          <h3
            className={cn(
              'font-heading text-2xl font-bold mb-5',
              tier.highlighted ? 'text-gradient' : 'text-bigbro-text',
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
            >
              Contattaci <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Horizontally auto‑scrolling news ────────────────────────────────────────

function NewsScroller() {
  // Duplicate for seamless loop
  const duplicated = [...news, ...news]

  const categoryColors: Record<string, string> = {
    mercato: 'bg-emerald-500/20 text-emerald-400',
    match: 'bg-bigbro-purple/20 text-bigbro-purple-light',
    lifestyle: 'bg-amber-500/20 text-amber-400',
    team: 'bg-cyan-500/20 text-cyan-400',
  }

  return (
    <div className="overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bigbro-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bigbro-black to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-6"
        style={{
          animation: 'scroll-news 30s linear infinite',
          width: 'max-content',
        }}
      >
        {duplicated.map((article, i) => (
          <div
            key={`${article.id}-${i}`}
            className="w-[320px] shrink-0 bg-bigbro-card border border-white/5 rounded-2xl overflow-hidden group hover:border-bigbro-purple/30 transition-colors duration-300"
          >
            {/* Colored top bar */}
            <div className="h-1 bg-gradient-to-r from-bigbro-purple via-bigbro-purple-light to-bigbro-purple-dark" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={cn('text-xs font-bold uppercase px-2.5 py-1 rounded-full', categoryColors[article.category] ?? 'bg-white/10 text-white/60')}>
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
                Leggi <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Stat counter animated ───────────────────────────────────────────────────

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
      <div className="w-14 h-14 rounded-2xl bg-bigbro-purple/10 flex items-center justify-center mb-1">
        <Icon className="w-6 h-6 text-bigbro-purple-light" />
      </div>
      <span className="text-3xl md:text-4xl font-heading font-bold text-bigbro-text">
        {count}{suffix}
      </span>
      <span className="text-bigbro-text-muted text-sm">{label}</span>
    </motion.div>
  )
}

// ─── Section heading ─────────────────────────────────────────────────────────

function SectionHeading({ overline, title }: { overline: string; title: string }) {
  return (
    <div className="text-center mb-14 md:mb-16">
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

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function Page1CinematicAurora() {
  return (
    <div className="min-h-screen bg-bigbro-black text-bigbro-text overflow-x-hidden">
      {/* Inline keyframe styles */}
      <style>{`
        @keyframes aurora-drift-1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(80px, 40px) scale(1.15); }
        }
        @keyframes aurora-drift-2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-60px, 30px) scale(1.1); }
        }
        @keyframes aurora-drift-3 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, -50px) scale(1.2); }
        }
        @keyframes spin-border {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scroll-news {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <Navbar />

      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AuroraBackground />

        {/* Fine grain noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
          {/* Logo */}
          <motion.img
            src={LOGO_URL}
            alt="BigBro FC"
            className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 drop-shadow-[0_0_50px_rgba(124,58,237,0.5)]"
            initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, duration: 1 }}
          />

          {/* Title with text‑generate effect */}
          <TextGenerateEffect
            words="BIGBRO FC"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 text-bigbro-text"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="font-heading text-lg sm:text-xl md:text-2xl text-bigbro-purple-light tracking-[0.25em] uppercase mb-10"
          >
            IL GOBBO NON MOLLA MAI
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-14 mb-12"
          >
            <AnimatedStat icon={Trophy} value={teamStats.position} label={teamStats.positionLabel} suffix="°" delay={1.4} />
            <AnimatedStat icon={Target} value={teamStats.wins} label="Vittorie" delay={1.6} />
            <AnimatedStat icon={Star} value={teamStats.goals} label="Gol Segnati" delay={1.8} />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <MovingBorderButton href="#sponsor" size="lg">
              Diventa Sponsor <ChevronRight className="w-5 h-5" />
            </MovingBorderButton>
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
          <SectionHeading overline="La Nostra Storia" title="Chi Siamo" />

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
                <div className="w-14 h-14 rounded-full bg-bigbro-purple/20 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-bigbro-purple-light" />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold text-bigbro-text">Moonryde</p>
                  <p className="text-bigbro-text-muted text-sm">Presidente & Fondatore</p>
                </div>
              </div>
            </motion.div>

            {/* Right: visual card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-bigbro-card border border-white/5 rounded-2xl p-8 md:p-10 overflow-hidden">
                {/* Aurora glow behind card */}
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-bigbro-purple/10 blur-[80px]" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-8 h-8 text-bigbro-purple" />
                    <span className="font-heading text-2xl font-bold text-gradient">Kings League Italia</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
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
                  <div className="flex items-center gap-2 text-bigbro-purple-light text-sm">
                    <Users className="w-4 h-4" />
                    <span>{players.length} giocatori in rosa</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ━━━ LA ROSA ━━━ */}
      <Section id="rosa" className="bg-bigbro-dark/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading overline="La Squadra" title="La Rosa" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player, i) => (
              <PlayerCard3D key={player.name} player={player} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ PACCHETTI SPONSOR ━━━ */}
      <Section id="sponsor">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading overline="Partnership" title="Pacchetti Sponsor" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {sponsorTiers.map((tier, i) => (
              <SpotlightCard key={tier.id} tier={tier} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ GOBBO NEWS ━━━ */}
      <Section id="news" className="bg-bigbro-dark/50">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <SectionHeading overline="Ultime Notizie" title="Gobbo News" />
        </div>
        <NewsScroller />
      </Section>

      {/* ━━━ CONTATTI ━━━ */}
      <Section id="contatti">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading overline="Scrivici" title="Contatti" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-bigbro-card border border-white/5 rounded-2xl p-8 md:p-10 overflow-hidden"
          >
            {/* Ambient glow */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-bigbro-purple/8 blur-[100px] rounded-full pointer-events-none" />

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
      <footer className="border-t border-white/5 bg-bigbro-dark/80">
        <div className="max-w-7xl mx-auto px-6 py-12">
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
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-bigbro-purple/20 flex items-center justify-center transition-colors duration-300"
                >
                  <s.icon className="w-4 h-4 text-bigbro-text-muted hover:text-bigbro-purple-light" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-bigbro-text-muted text-sm">
              &copy; {new Date().getFullYear()} BigBro FC. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
