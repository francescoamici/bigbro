import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('./pages/HomePage'))
const Page1 = lazy(() => import('./pages/Page1_CinematicAurora'))
const Page2 = lazy(() => import('./pages/Page2_HyperspeedGaming'))
const Page3 = lazy(() => import('./pages/Page3_ParallaxStory'))
const Page4 = lazy(() => import('./pages/Page4_BentoStats'))
const Page5 = lazy(() => import('./pages/Page5_GlassmorphicDock'))
const Page6 = lazy(() => import('./pages/Page6_SpotlightDrama'))
const Page7 = lazy(() => import('./pages/Page7_MeteorShower'))
const Page8 = lazy(() => import('./pages/Page8_3DImmersive'))
const Page9 = lazy(() => import('./pages/Page9_MinimalLuxury'))
const Page10 = lazy(() => import('./pages/Page10_CyberpunkArena'))
const Page11 = lazy(() => import('./pages/Page11_OfficialLanding'))

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-bigbro-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-bigbro-purple border-t-transparent rounded-full animate-spin" />
        <p className="text-bigbro-text-muted font-heading text-lg tracking-wider uppercase">Loading BigBro...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/1" element={<Page1 />} />
          <Route path="/2" element={<Page2 />} />
          <Route path="/3" element={<Page3 />} />
          <Route path="/4" element={<Page4 />} />
          <Route path="/5" element={<Page5 />} />
          <Route path="/6" element={<Page6 />} />
          <Route path="/7" element={<Page7 />} />
          <Route path="/8" element={<Page8 />} />
          <Route path="/9" element={<Page9 />} />
          <Route path="/10" element={<Page10 />} />
          <Route path="/11" element={<Page11 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
