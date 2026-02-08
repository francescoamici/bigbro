import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LOGO_URL } from '@/data/players'
import { Sparkles, Zap, BookOpen, LayoutGrid, GlassWater, Sun, Star, Box, Gem, Cpu } from 'lucide-react'

const pages = [
  { id: 1, name: 'Cinematic Aurora', desc: 'Atmosferico, etereo, luci del nord', icon: Sparkles, gradient: 'from-violet-600 to-indigo-900' },
  { id: 2, name: 'Hyperspeed Gaming', desc: 'Velocità, gaming aggressivo, glitch', icon: Zap, gradient: 'from-purple-600 to-pink-800' },
  { id: 3, name: 'Parallax Storytelling', desc: 'Narrativo, cinematografico, scroll-driven', icon: BookOpen, gradient: 'from-violet-700 to-slate-900' },
  { id: 4, name: 'Bento Grid Stats', desc: 'Data-driven, moderno, dashboard-like', icon: LayoutGrid, gradient: 'from-purple-700 to-violet-950' },
  { id: 5, name: 'Glassmorphic Dock', desc: 'Glassmorphism, trasparenze, eleganza', icon: GlassWater, gradient: 'from-indigo-600 to-purple-900' },
  { id: 6, name: 'Spotlight Drama', desc: 'Teatrale, luci nella notte, focus drammatico', icon: Sun, gradient: 'from-violet-800 to-black' },
  { id: 7, name: 'Meteor Shower', desc: 'Cosmico, spaziale, stelle cadenti', icon: Star, gradient: 'from-purple-600 to-indigo-950' },
  { id: 8, name: '3D Immersive', desc: 'Profondità, immersione, tridimensionale', icon: Box, gradient: 'from-violet-700 to-purple-950' },
  { id: 9, name: 'Minimal Luxury', desc: 'Lusso minimale, premium, raffinato', icon: Gem, gradient: 'from-purple-800 to-gray-900' },
  { id: 10, name: 'Cyberpunk Arena', desc: 'Cyberpunk, neon, arena digitale', icon: Cpu, gradient: 'from-violet-600 to-fuchsia-900' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bigbro-black">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
          <motion.img
            src={LOGO_URL}
            alt="BigBro FC"
            className="w-24 h-24 mx-auto mb-8 drop-shadow-[0_0_30px_rgba(124,58,237,0.5)]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
          />
          <motion.h1
            className="text-5xl md:text-7xl font-bold font-heading uppercase tracking-wider mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-gradient">BIGBRO</span> <span className="text-bigbro-text">FC</span>
          </motion.h1>
          <motion.p
            className="text-bigbro-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            10 Landing Page — Kings League Italia
          </motion.p>
          <motion.p
            className="text-bigbro-text-muted/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Ogni pagina, stesso contenuto, design radicalmente diverso.
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {pages.map((page, i) => {
            const Icon = page.icon
            return (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <Link
                  to={`/${page.id}`}
                  className="group block relative overflow-hidden rounded-2xl bg-bigbro-card border border-white/5 hover:border-bigbro-purple/50 transition-all duration-500"
                >
                  {/* Gradient preview */}
                  <div className={`h-32 bg-gradient-to-br ${page.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center`}>
                    <Icon className="w-10 h-10 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-bigbro-purple font-bold">/{page.id}</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-bigbro-text group-hover:text-bigbro-purple-light transition-colors">
                      {page.name}
                    </h3>
                    <p className="text-bigbro-text-muted text-sm mt-1 leading-relaxed">
                      {page.desc}
                    </p>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bigbro-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
