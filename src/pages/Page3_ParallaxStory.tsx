import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion'
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
  BookOpen,
  Clock,
  Calendar,
  Shield,
  Crown,
  Check,
  ArrowRight,
  Circle,
  Hand,
} from 'lucide-react'
import { players, teamStats, LOGO_URL } from '@/data/players'
import { news } from '@/data/news'
import { sponsorTiers } from '@/data/sponsors'
import { ContactForm } from '@/components/shared/ContactForm'
import { cn } from '@/lib/utils'

/* ---------- Lamp Section Header ---------- */
function LampHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="relative flex flex-col items-center mb-16">
      {/* Lamp glow */}
      <motion.div
        className="absolute -top-20 w-[2px] h-20 bg-gradient-to-b from-transparent to-bigbro-purple"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
      />
      <motion.div
        className="absolute -top-2 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-bigbro-purple to-transparent"
        initial={{ width: 0 }}
        animate={isInView ? { width: 320 } : { width: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-bigbro-purple/20 blur-3xl"
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={
          isInView
            ? { width: 400, height: 120, opacity: 1 }
            : { width: 0, height: 0, opacity: 0 }
        }
        transition={{ duration: 1.2, delay: 0.6 }}
      />
      <motion.h2
        className="relative z-10 text-4xl md:text-6xl font-heading font-bold uppercase tracking-wider text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <span className="text-gradient">{title}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          className="relative z-10 text-bigbro-text-muted mt-4 text-lg text-center max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

/* ---------- Category Icon Map ---------- */
const categoryIcons: Record<string, typeof Trophy> = {
  mercato: Target,
  match: Trophy,
  lifestyle: Star,
  team: Users,
}

/* ---------- 1. NAVBAR ---------- */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const links = [
    { label: 'Chi Siamo', href: '#chi-siamo' },
    { label: 'Rosa', href: '#rosa' },
    { label: 'Sponsor', href: '#sponsor' },
    { label: 'News', href: '#news' },
    { label: 'Contatti', href: '#contatti' },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0">
          <img src={LOGO_URL} alt="BigBro FC" className="w-9 h-9" />
          <span className="font-heading font-bold text-lg tracking-wider uppercase text-bigbro-text">
            BigBro<span className="text-bigbro-purple">FC</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-bigbro-text-muted hover:text-bigbro-purple-light transition-colors duration-300 tracking-wide uppercase font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contatti"
            className="ml-2 px-5 py-2 bg-bigbro-purple hover:bg-bigbro-purple-dark rounded-lg text-sm font-bold tracking-wider uppercase transition-all duration-300"
          >
            Diventa Sponsor
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <motion.span
            className="block w-6 h-0.5 bg-bigbro-text"
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-bigbro-text"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-bigbro-text"
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden overflow-hidden bg-bigbro-dark/95 backdrop-blur-xl border-t border-white/5"
        initial={false}
        animate={{ height: mobileOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-bigbro-text-muted hover:text-bigbro-purple-light transition-colors uppercase text-sm tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contatti"
            onClick={() => setMobileOpen(false)}
            className="px-5 py-3 bg-bigbro-purple hover:bg-bigbro-purple-dark rounded-lg text-sm font-bold tracking-wider uppercase text-center transition-all duration-300"
          >
            Diventa Sponsor
          </a>
        </div>
      </motion.div>
    </motion.nav>
  )
}

/* ---------- 2. HERO - Parallax Layers ---------- */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Background moves slower (parallax)
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  // Midground
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  // Foreground text moves faster
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const fgOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const fgScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85])

  const smoothBgY = useSpring(bgY, { stiffness: 80, damping: 30 })
  const smoothMidY = useSpring(midY, { stiffness: 80, damping: 30 })
  const smoothFgY = useSpring(fgY, { stiffness: 80, damping: 30 })

  return (
    <section
      ref={ref}
      className="relative h-[120vh] overflow-hidden flex items-center justify-center"
    >
      {/* Background layer - gradient + radial glow */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: smoothBgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bigbro-black via-bigbro-dark to-bigbro-black" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-bigbro-purple/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bigbro-black to-transparent" />
      </motion.div>

      {/* Mid layer - decorative grid lines + floating shapes */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ y: smoothMidY }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Floating circles */}
        <motion.div
          className="absolute top-[20%] left-[15%] w-3 h-3 rounded-full bg-bigbro-purple/30"
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[35%] right-[20%] w-2 h-2 rounded-full bg-bigbro-purple-light/20"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[60%] left-[70%] w-4 h-4 rounded-full border border-bigbro-purple/20"
          animate={{ y: [0, -25, 0], rotate: [0, 180, 360] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Foreground layer - main content */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ y: smoothFgY, opacity: fgOpacity, scale: fgScale }}
      >
        <motion.img
          src={LOGO_URL}
          alt="BigBro FC"
          className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-8 drop-shadow-[0_0_50px_rgba(124,58,237,0.5)]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] font-heading font-bold uppercase leading-none tracking-tighter">
            <span className="text-gradient">BIG</span>
            <span className="text-bigbro-text">BRO</span>
          </h1>
        </motion.div>

        <motion.p
          className="text-bigbro-text-muted text-lg md:text-2xl tracking-[0.3em] uppercase mt-6 font-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Il Gobbo Non Molla Mai
        </motion.p>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          {[
            {
              icon: Trophy,
              value: `${teamStats.positionLabel}`,
              label: 'Posizione',
            },
            { icon: Star, value: `${teamStats.wins} Vit`, label: 'Vittorie' },
            { icon: Target, value: `${teamStats.goals} Gol`, label: 'Gol Fatti' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <s.icon className="w-5 h-5 text-bigbro-purple-light" />
              <span className="text-3xl md:text-4xl font-heading font-bold text-bigbro-text">
                {s.value}
              </span>
              <span className="text-xs text-bigbro-text-muted uppercase tracking-widest">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-bigbro-text-muted">
            Scorri
          </span>
          <ChevronRight className="w-5 h-5 text-bigbro-purple rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ---------- 3. CHI SIAMO - Sticky Scroll Reveal ---------- */
function ChiSiamoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const paragraphs = [
    'BigBro FC nasce dalla visione di Moonryde, presidente e fondatore.',
    'Una squadra costruita sulla passione, sulla grinta e sul desiderio di dominare la Kings League Italia.',
    'Terzi nel Girone A, ma con la fame di chi punta al vertice.',
    'Ogni partita e una battaglia. Ogni gol e una dichiarazione. Il Gobbo non molla mai.',
  ]

  return (
    <section id="chi-siamo" ref={containerRef} className="relative" style={{ height: `${(paragraphs.length + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-bigbro-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-bigbro-purple/5 blur-[150px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: title + icon */}
          <div>
            <LampHeader title="Chi Siamo" />
            <div className="flex items-center gap-4 mt-8">
              <div className="w-16 h-16 rounded-2xl bg-bigbro-purple/10 border border-bigbro-purple/20 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-bigbro-purple" />
              </div>
              <div>
                <p className="text-bigbro-text font-heading text-xl font-semibold">
                  La Nostra Storia
                </p>
                <p className="text-bigbro-text-muted text-sm">
                  Kings League Italia 2025
                </p>
              </div>
            </div>
          </div>

          {/* Right: paragraphs revealed by scroll (overlapping in place) */}
          <div className="relative h-[120px] md:h-[100px]">
            {paragraphs.map((text, i) => {
              const start = (i + 0.5) / (paragraphs.length + 1)
              const end = (i + 1.2) / (paragraphs.length + 1)
              return (
                <StickyParagraph
                  key={i}
                  text={text}
                  scrollProgress={scrollYProgress}
                  start={start}
                  end={end}
                  index={i}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function StickyParagraph({
  text,
  scrollProgress,
  start,
  end,
  index,
}: {
  text: string
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
  start: number
  end: number
  index: number
}) {
  const opacity = useTransform(scrollProgress, [start - 0.05, start, end, end + 0.05], [0, 1, 1, 0])
  const y = useTransform(scrollProgress, [start - 0.05, start], [30, 0])
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="absolute inset-0 flex gap-4 items-start"
      style={{ opacity: smoothOpacity, y: smoothY }}
    >
      <div className="mt-1 shrink-0">
        <Circle
          className={cn(
            'w-3 h-3',
            index === 0 ? 'text-bigbro-purple fill-bigbro-purple' : 'text-bigbro-purple/40'
          )}
        />
      </div>
      <p className="text-xl md:text-2xl leading-relaxed text-bigbro-text font-light">
        {text}
      </p>
    </motion.div>
  )
}

/* ---------- 4. LA ROSA - Card Stack ---------- */
function RosaSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const roleIcons: Record<string, typeof Trophy> = {
    Portiere: Hand,
    Attaccante: Target,
    Centrocampista: Star,
    Difensore: Shield,
    Allenatore: Crown,
  }

  return (
    <section id="rosa" ref={sectionRef} className="relative py-32 bg-bigbro-black">
      <div className="max-w-7xl mx-auto px-6">
        <LampHeader title="La Rosa" subtitle="I gladiatori del Gobbo" />

        <div className="relative flex flex-col items-center">
          {/* Card Stack */}
          <div className="relative w-full max-w-md h-[420px]">
            {players.map((player, i) => {
              const offset = i - activeIndex
              const isActive = i === activeIndex
              const isBehind = offset > 0 && offset <= 3
              const Icon = roleIcons[player.role] || Users

              return (
                <motion.div
                  key={player.name}
                  className={cn(
                    'absolute inset-0 rounded-2xl border overflow-hidden cursor-pointer',
                    isActive
                      ? 'border-bigbro-purple/50 bg-bigbro-card z-30'
                      : 'border-white/5 bg-bigbro-dark z-10'
                  )}
                  initial={false}
                  animate={{
                    y: isBehind ? offset * 16 : isActive ? 0 : -20,
                    scale: isBehind ? 1 - offset * 0.04 : isActive ? 1 : 0.9,
                    opacity: isActive ? 1 : isBehind ? 0.6 - offset * 0.15 : 0,
                    rotateX: isBehind ? -2 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{ zIndex: isActive ? 30 : isBehind ? 20 - offset : 0 }}
                  onClick={() => {
                    if (isActive) {
                      setActiveIndex((prev) => (prev + 1) % players.length)
                    } else {
                      setActiveIndex(i)
                    }
                  }}
                >
                  {/* Card gradient top */}
                  <div className="h-2 w-full bg-gradient-to-r from-bigbro-purple via-bigbro-purple-light to-bigbro-purple" />

                  <div className="p-8 flex flex-col h-full">
                    {player.image && (
                      <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-bigbro-dark/50">
                        <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" loading="lazy" />
                      </div>
                    )}
                    {/* Number + role icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-6xl font-heading font-bold text-bigbro-purple/20">
                        #{player.number}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-bigbro-purple/10 border border-bigbro-purple/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-bigbro-purple" />
                      </div>
                    </div>

                    {/* Name + role */}
                    <h3 className="text-3xl font-heading font-bold text-bigbro-text uppercase tracking-wide">
                      {player.name}
                    </h3>
                    <span className="text-bigbro-purple-light text-sm uppercase tracking-widest mt-1 font-semibold">
                      {player.role}
                    </span>

                    {/* Description */}
                    <p className="text-bigbro-text-muted mt-6 leading-relaxed flex-1">
                      {player.description}
                    </p>

                    {/* Progress bar decoration */}
                    <div className="mt-6">
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-bigbro-purple to-bigbro-purple-light rounded-full"
                          initial={{ width: 0 }}
                          animate={isActive && isInView ? { width: '75%' } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Navigation dots */}
          <div className="flex gap-3 mt-10">
            {players.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  i === activeIndex
                    ? 'bg-bigbro-purple scale-125'
                    : 'bg-white/20 hover:bg-white/40'
                )}
                aria-label={`Giocatore ${i + 1}`}
              />
            ))}
          </div>

          {/* Instruction */}
          <p className="text-bigbro-text-muted text-sm mt-4 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            Clicca la card per sfogliare
          </p>
        </div>
      </div>
    </section>
  )
}

/* ---------- 5. PACCHETTI SPONSOR - 3D Scroll Rotation ---------- */
function SponsorSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section id="sponsor" ref={containerRef} className="relative py-32 bg-bigbro-dark">
      <div className="max-w-7xl mx-auto px-6">
        <LampHeader title="Sponsor" subtitle="Unisciti alla famiglia BigBro" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sponsorTiers.map((tier, i) => (
            <SponsorCard
              key={tier.id}
              tier={tier}
              index={i}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function SponsorCard({
  tier,
  index,
  scrollProgress,
}: {
  tier: (typeof sponsorTiers)[number]
  index: number
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const rotateY = useTransform(
    scrollProgress,
    [0.1 + index * 0.05, 0.4 + index * 0.05],
    [45, 0]
  )
  const opacity = useTransform(
    scrollProgress,
    [0.1 + index * 0.05, 0.35 + index * 0.05],
    [0, 1]
  )
  const smoothRotate = useSpring(rotateY, { stiffness: 80, damping: 20 })
  const smoothOpacity = useSpring(opacity, { stiffness: 80, damping: 20 })

  const tierIcons = [Crown, Shield, Star]
  const Icon = tierIcons[index] || Star

  return (
    <motion.div
      className="perspective-[1200px]"
      style={{ opacity: smoothOpacity }}
    >
      <motion.div
        className={cn(
          'relative rounded-2xl p-8 border transition-colors duration-500 h-full',
          tier.highlighted
            ? 'bg-bigbro-card border-bigbro-purple/50'
            : 'bg-bigbro-card border-white/5 hover:border-white/10'
        )}
        style={{ rotateY: smoothRotate, transformStyle: 'preserve-3d' }}
      >
        {/* Highlighted badge */}
        {tier.highlighted && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-bigbro-purple rounded-full text-xs font-bold tracking-wider uppercase">
            Consigliato
          </div>
        )}

        {/* Glow on highlighted */}
        {tier.highlighted && (
          <div className="absolute inset-0 rounded-2xl bg-bigbro-purple/5 pointer-events-none" />
        )}

        <div className="relative z-10">
          {/* Icon */}
          <div
            className={cn(
              'w-14 h-14 rounded-xl flex items-center justify-center mb-6',
              tier.highlighted
                ? 'bg-bigbro-purple/20 border border-bigbro-purple/30'
                : 'bg-white/5 border border-white/10'
            )}
          >
            <Icon
              className={cn(
                'w-7 h-7',
                tier.highlighted ? 'text-bigbro-purple' : 'text-bigbro-text-muted'
              )}
            />
          </div>

          {/* Tier label */}
          <span className="text-xs uppercase tracking-[0.2em] text-bigbro-purple-light font-semibold">
            {tier.tier}
          </span>
          <h3 className="text-2xl font-heading font-bold text-bigbro-text mt-2 uppercase">
            {tier.name}
          </h3>

          {/* Features */}
          <ul className="mt-6 space-y-3">
            {tier.features.map((f, fi) => (
              <li key={fi} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-bigbro-purple mt-0.5 shrink-0" />
                <span className="text-bigbro-text-muted text-sm">{f}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contatti"
            className={cn(
              'mt-8 w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300',
              tier.highlighted
                ? 'bg-bigbro-purple hover:bg-bigbro-purple-dark text-white'
                : 'bg-white/5 hover:bg-white/10 text-bigbro-text border border-white/10'
            )}
          >
            Contattaci
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------- 6. GOBBO NEWS - Vertical Timeline ---------- */
function NewsSection() {
  return (
    <section id="news" className="relative py-32 bg-bigbro-black">
      <div className="max-w-4xl mx-auto px-6">
        <LampHeader title="Gobbo News" subtitle="Le ultime dal campo" />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-bigbro-purple/50 via-bigbro-purple/20 to-transparent hidden md:block" />
          {/* Mobile: left line */}
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-bigbro-purple/50 via-bigbro-purple/20 to-transparent md:hidden" />

          <div className="space-y-12 md:space-y-0">
            {news.map((article, i) => (
              <TimelineEntry key={article.id} article={article} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineEntry({
  article,
  index,
}: {
  article: (typeof news)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0

  const Icon = categoryIcons[article.category] || Star

  return (
    <div
      ref={ref}
      className={cn('relative md:flex md:items-center md:mb-16', isLeft ? 'md:flex-row' : 'md:flex-row-reverse')}
    >
      {/* Dot on timeline */}
      <motion.div
        className={cn(
          'absolute z-20 w-4 h-4 rounded-full border-2 border-bigbro-purple bg-bigbro-black',
          'left-[10px] md:left-1/2 md:-translate-x-1/2'
        )}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
      />

      {/* Content card */}
      <motion.div
        className={cn(
          'ml-12 md:ml-0 md:w-[45%]',
          isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
        )}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -60 : 60 }}
        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="p-6 rounded-2xl bg-bigbro-card border border-white/5 hover:border-bigbro-purple/30 transition-colors duration-500 group">
          {/* Category + date */}
          <div
            className={cn(
              'flex items-center gap-3 mb-3 text-xs uppercase tracking-widest',
              isLeft ? 'md:justify-end' : 'md:justify-start'
            )}
          >
            <Icon className="w-4 h-4 text-bigbro-purple" />
            <span className="text-bigbro-purple-light font-semibold">
              {article.category}
            </span>
            <span className="text-bigbro-text-muted flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {article.date}
            </span>
          </div>

          <h3 className="text-lg font-heading font-bold text-bigbro-text group-hover:text-bigbro-purple-light transition-colors duration-300 uppercase">
            {article.title}
          </h3>
          <p className="text-bigbro-text-muted text-sm mt-2 leading-relaxed">
            {article.excerpt}
          </p>

          <div
            className={cn(
              'mt-4 flex items-center gap-2 text-bigbro-purple text-xs font-semibold uppercase tracking-wider',
              isLeft ? 'md:justify-end' : 'md:justify-start'
            )}
          >
            <Clock className="w-3 h-3" />
            Leggi di piu
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </motion.div>

      {/* Spacer for other side */}
      <div className="hidden md:block md:w-[45%]" />
    </div>
  )
}

/* ---------- 7. CONTATTI - Tracing Beam ---------- */
function ContattiSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const beamScaleY = useTransform(scrollYProgress, [0.1, 0.8], [0, 1])
  const smoothBeam = useSpring(beamScaleY, { stiffness: 60, damping: 20 })

  return (
    <section id="contatti" ref={sectionRef} className="relative py-32 bg-bigbro-dark">
      <div className="max-w-5xl mx-auto px-6">
        <LampHeader title="Contatti" subtitle="Parliamo di partnership" />

        <div className="relative flex gap-8 md:gap-16">
          {/* Tracing beam - left side */}
          <div className="hidden md:flex flex-col items-center shrink-0">
            {/* Track */}
            <div className="relative w-[2px] h-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-bigbro-purple via-bigbro-purple-light to-bigbro-purple rounded-full"
                style={{
                  scaleY: smoothBeam,
                  transformOrigin: 'top',
                  height: '100%',
                }}
              />
            </div>
            {/* Glow dot at beam tip */}
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-bigbro-purple blur-sm"
              style={{
                top: useTransform(smoothBeam, (v) => `${v * 100}%`),
              }}
            />
          </div>

          {/* Form content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-bigbro-text uppercase">
                    Diventa Sponsor
                  </h3>
                  <p className="text-bigbro-text-muted mt-3 leading-relaxed">
                    Unisciti a BigBro FC e porta il tuo brand nella Kings League
                    Italia. Visibilita, community e passione.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      label: 'Email',
                      value: 'sponsor@bigbrofc.it',
                    },
                    {
                      icon: Instagram,
                      label: 'Instagram',
                      value: '@bigbrofc',
                    },
                    {
                      icon: Users,
                      label: 'Community',
                      value: '50K+ Tifosi',
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl bg-bigbro-card border border-white/5"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-bigbro-purple/10 border border-bigbro-purple/20 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-bigbro-purple" />
                      </div>
                      <div>
                        <p className="text-xs text-bigbro-text-muted uppercase tracking-wider">
                          {item.label}
                        </p>
                        <p className="text-bigbro-text font-medium">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <motion.div
                  className="p-8 rounded-2xl bg-bigbro-card border border-white/5"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 8. FOOTER ---------- */
function Footer() {
  const socials = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  return (
    <footer className="relative bg-bigbro-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="BigBro FC" className="w-10 h-10" />
            <div>
              <span className="font-heading font-bold text-xl tracking-wider uppercase">
                BigBro<span className="text-bigbro-purple">FC</span>
              </span>
              <p className="text-bigbro-text-muted text-xs mt-0.5">
                Kings League Italia
              </p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                aria-label={s.label}
                className="w-10 h-10 rounded-lg bg-bigbro-card border border-white/5 hover:border-bigbro-purple/50 flex items-center justify-center transition-all duration-300 group"
                whileHover={{ y: -3 }}
              >
                <s.icon className="w-4 h-4 text-bigbro-text-muted group-hover:text-bigbro-purple transition-colors" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-bigbro-text-muted text-xs text-center md:text-right">
            &copy; {new Date().getFullYear()} BigBro FC. Tutti i diritti riservati.
            <br />
            <span className="text-bigbro-text-muted/50">
              Parallax Storytelling Edition
            </span>
          </p>
          <p className="mt-1 text-bigbro-text-muted text-sm">Made with ❤️ by <a href="https://mindblast.it" target="_blank" rel="noopener noreferrer" className="text-bigbro-purple-light hover:text-bigbro-purple transition-colors">Mindblast</a></p>
        </div>
      </div>
    </footer>
  )
}

/* ---------- PAGE COMPONENT ---------- */
export default function Page3_ParallaxStory() {
  return (
    <div className="min-h-screen bg-bigbro-black text-bigbro-text overflow-x-clip">
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
