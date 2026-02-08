import { useEffect, useRef } from 'react'
import { players, teamStats, LOGO_URL, MOONRYDE_IMAGE_URL } from '@/data/players'
import { news } from '@/data/news'
import { sponsorTiers } from '@/data/sponsors'
import { ContactForm } from '@/components/shared/ContactForm'

// ─── Component ───────────────────────────────────────────────────────────────

export default function Page11_OfficialLanding() {
  const navRef = useRef<HTMLElement>(null)
  const revealRefs = useRef<(HTMLElement | null)[]>([])
  const statRefs = useRef<(HTMLDivElement | null)[]>([])

  const stats = [
    { target: teamStats.position, label: 'Posizione', suffix: '°' },
    { target: teamStats.wins, label: 'Vittorie' },
    { target: teamStats.goals, label: 'Gol Segnati' },
    { target: players.length, label: 'Giocatori' },
  ]

  const categoryColors: Record<string, string> = {
    mercato: '#10b981',
    match: '#e35205',
    lifestyle: '#f59e0b',
    team: '#06b6d4',
  }

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle('p11-scrolled', window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('p11-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    revealRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Stat counter animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLDivElement
            const target = parseInt(el.dataset.target || '0')
            if (!target) return
            let current = 0
            const step = Math.max(1, Math.floor(target / 30))
            const interval = setInterval(() => {
              current += step
              if (current >= target) {
                current = target
                clearInterval(interval)
              }
              const suffix = el.dataset.suffix || ''
              el.textContent = String(current) + suffix
            }, 40)
            obs.unobserve(el)
          }
        })
      },
      { threshold: 0.5 },
    )
    statRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  let revealIdx = 0
  const revealRef = (delay?: number) => {
    const idx = revealIdx++
    return {
      ref: (el: HTMLElement | null) => { revealRefs.current[idx] = el },
      className: `p11-reveal${delay ? ` p11-reveal-delay-${delay}` : ''}`,
    }
  }

  return (
    <div className="p11-root">
      <style>{pageStyles}</style>

      {/* NAVIGATION */}
      <nav ref={navRef} className="p11-nav">
        <a href="#" className="p11-nav-logo">
          <img src={LOGO_URL} alt="BigBro Logo" />
          <span>BIGBRO</span>
        </a>
        <ul className="p11-nav-links">
          <li><a href="#p11-chi-siamo">Chi Siamo</a></li>
          <li><a href="#p11-roster">Rosa</a></li>
          <li><a href="#p11-sponsor">Sponsor</a></li>
          <li><a href="#p11-news">News</a></li>
          <li><a href="#p11-contatti">Contatti</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="p11-hero">
        <div className="p11-hero-bg">
          <div className="p11-hero-slash" />
          <div className="p11-hero-slash-2" />
        </div>
        <div className="p11-hero-content">
          <img className="p11-hero-logo" src={LOGO_URL} alt="BigBro Crest" />
          <h1 className="p11-hero-title">BIGBRO</h1>
          <p className="p11-hero-subtitle">Kings League Italia</p>
          <p className="p11-hero-tagline">Passione, grinta e spettacolo. Un solo obiettivo: la corona.</p>
          <div className="p11-hero-cta">
            <a href="#p11-sponsor">Diventa Sponsor</a>
          </div>
        </div>
        <div className="p11-scroll-indicator">
          <span>Scorri</span>
          <div className="p11-scroll-line" />
        </div>
      </section>

      {/* CHI SIAMO */}
      <section id="p11-chi-siamo" className="p11-section p11-section-dark">
        <div className="p11-section-topline" />
        <div {...revealRef()}>
          <div className="p11-section-header">
            <p className="p11-section-label">La Nostra Storia</p>
            <h2 className="p11-section-title">CHI <span className="p11-accent">SIAMO</span></h2>
            <div className="p11-section-divider" />
          </div>
        </div>
        <div className="p11-about-grid">
          <div {...revealRef(1)}>
            <div className="p11-about-text">
              <p>
                BigBro FC nasce dalla visione di <strong>Moonryde</strong>, presidente e fondatore.
                Una squadra costruita sulla passione, sulla grinta e sul desiderio di dominare la Kings League Italia.
                Terzi nel Girone A, ma con la fame di chi punta al vertice.
              </p>
              <p>
                Ogni partita è una battaglia, ogni gol una dichiarazione. Il Gobbo non molla mai,
                dentro e fuori dal campo. Con una rosa di talento e un progetto ambizioso,
                BigBro FC punta a scrivere la storia della Kings League.
              </p>
            </div>
          </div>
          <div {...revealRef(2)}>
            <div className="p11-about-card">
              <div className="p11-about-card-top" />
              <div className="p11-about-card-inner">
                <div className="p11-about-moonryde">
                  <img src={MOONRYDE_IMAGE_URL} alt="Moonryde" />
                  <div>
                    <h3 className="p11-about-name">MOONRYDE</h3>
                    <p className="p11-about-role">Presidente & Fondatore</p>
                  </div>
                </div>
                <div className="p11-about-stats-row">
                  <div className="p11-about-stat">
                    <span className="p11-about-stat-value">{teamStats.positionLabel}</span>
                    <span className="p11-about-stat-label">Classifica</span>
                  </div>
                  <div className="p11-about-stat">
                    <span className="p11-about-stat-value">{teamStats.wins}</span>
                    <span className="p11-about-stat-label">Vittorie</span>
                  </div>
                  <div className="p11-about-stat">
                    <span className="p11-about-stat-value">{teamStats.goals}</span>
                    <span className="p11-about-stat-label">Gol</span>
                  </div>
                </div>
                <p className="p11-about-quote">
                  &ldquo;Questa squadra ha fame, il nostro obiettivo è chiaro: arrivare fino in fondo.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="p11-stats-bar" id="p11-stats">
        <div className="p11-stats-inner">
          {stats.map((stat, i) => (
            <div key={stat.label} {...revealRef(i > 0 ? i : undefined)} >
              <div className="p11-stat-item">
                <div
                  className="p11-stat-num"
                  ref={(el) => { statRefs.current[i] = el }}
                  data-target={stat.target}
                  data-suffix={stat.suffix || ''}
                >
                  0
                </div>
                <p className="p11-stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROSTER */}
      <section id="p11-roster" className="p11-section">
        <div {...revealRef()}>
          <div className="p11-section-header">
            <p className="p11-section-label">La Squadra</p>
            <h2 className="p11-section-title">LA <span className="p11-accent">ROSA</span></h2>
            <div className="p11-section-divider" />
          </div>
        </div>

        <div className="p11-roster-grid p11-roster-grid-full">
          {players.map((player, pi) => (
            <div key={player.name} {...revealRef(pi % 4 + 1)}>
              <div className="p11-player-card">
                <span className="p11-player-number">{player.number}</span>
                {player.image && (
                  <div className="p11-player-img-wrap">
                    <img src={player.image} alt={player.name} loading="lazy" />
                  </div>
                )}
                <div className="p11-player-info">
                  <p className="p11-player-pos">{player.role}</p>
                  <h3 className="p11-player-name">{player.name.toUpperCase()}</h3>
                  <p className="p11-player-num-small">#{player.number}</p>
                  <p className="p11-player-desc">{player.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPONSOR */}
      <section id="p11-sponsor" className="p11-section p11-section-dark">
        <div className="p11-section-topline" />
        <div {...revealRef()}>
          <div className="p11-section-header">
            <p className="p11-section-label">Partnership</p>
            <h2 className="p11-section-title">PACCHETTI <span className="p11-accent">SPONSOR</span></h2>
            <div className="p11-section-divider" />
          </div>
        </div>
        <div className="p11-sponsor-grid">
          {sponsorTiers.map((tier, i) => (
            <div key={tier.id} {...revealRef(i + 1)}>
              <div className={`p11-sponsor-card${tier.highlighted ? ' p11-sponsor-highlighted' : ''}`}>
                {tier.highlighted && <div className="p11-sponsor-badge">TOP</div>}
                <div className="p11-sponsor-tier">{tier.tier}</div>
                <h3 className="p11-sponsor-name">{tier.name}</h3>
                <ul className="p11-sponsor-features">
                  {tier.features.map((f) => (
                    <li key={f}>
                      <span className="p11-check">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#p11-contatti" className="p11-sponsor-cta">
                  Contattaci &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section id="p11-news" className="p11-section">
        <div {...revealRef()}>
          <div className="p11-section-header">
            <p className="p11-section-label">Ultime Notizie</p>
            <h2 className="p11-section-title">GOBBO <span className="p11-accent">NEWS</span></h2>
            <div className="p11-section-divider" />
          </div>
        </div>
        <div className="p11-news-grid">
          {news.map((article, i) => (
            <div key={article.id} {...revealRef(i + 1)}>
              <div className={`p11-news-card${i === 0 ? ' p11-news-featured' : ''}`}>
                <div className="p11-news-meta">
                  <span
                    className="p11-news-category"
                    style={{ background: categoryColors[article.category] || '#e35205' }}
                  >
                    {article.category}
                  </span>
                  <span className="p11-news-date">{article.date}</span>
                </div>
                <h3 className="p11-news-title">{article.title}</h3>
                <p className="p11-news-excerpt">{article.excerpt}</p>
                <span className="p11-news-read">Leggi &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTATTI */}
      <section id="p11-contatti" className="p11-section p11-section-dark">
        <div className="p11-section-topline" />
        <div {...revealRef()}>
          <div className="p11-section-header">
            <p className="p11-section-label">Scrivici</p>
            <h2 className="p11-section-title">DIVENTA <span className="p11-accent">PARTNER</span></h2>
            <div className="p11-section-divider" />
          </div>
        </div>
        <div {...revealRef(1)}>
          <div className="p11-contact-wrap">
            <div className="p11-contact-info">
              <p>
                Vuoi diventare partner di BigBro FC? Compila il form e ti ricontatteremo
                per costruire insieme una partnership vincente.
              </p>
              <div className="p11-contact-features">
                <div className="p11-contact-feature">
                  <span className="p11-contact-feature-icon">&#9889;</span>
                  <span>Risposta entro 24h</span>
                </div>
                <div className="p11-contact-feature">
                  <span className="p11-contact-feature-icon">&#9733;</span>
                  <span>Partnership su misura</span>
                </div>
                <div className="p11-contact-feature">
                  <span className="p11-contact-feature-icon">&#9670;</span>
                  <span>Visibilità garantita</span>
                </div>
              </div>
            </div>
            <div className="p11-contact-form-wrap">
              <div className="p11-contact-form-top" />
              <ContactForm
                inputClassName="p11-form-input"
                buttonClassName="p11-form-button"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p11-footer">
        <div className="p11-footer-inner">
          <div className="p11-footer-brand">
            <img className="p11-footer-logo" src={LOGO_URL} alt="BigBro" />
            <div>
              <span className="p11-footer-name">BIGBRO FC</span>
              <span className="p11-footer-league">Kings League Italia</span>
            </div>
          </div>
          <div className="p11-footer-socials">
            <a href="#" aria-label="Instagram" className="p11-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className="p11-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" aria-label="YouTube" className="p11-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>
          <div className="p11-footer-copy">
            <p>&copy; {new Date().getFullYear()} BigBro FC. Tutti i diritti riservati.</p>
            <p className="p11-footer-credit">Made with <em className="p11-heart">&hearts;</em> by <a href="https://mindblast.it" target="_blank" rel="noopener noreferrer">Mindblast</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── Scoped styles ───────────────────────────────────────────────────────────

const pageStyles = /* css */ `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@300;400;500&display=swap');

  .p11-root {
    --p11-orange: #e35205;
    --p11-gold: #f4af23;
    --p11-black: #0a0a0a;
    --p11-dark: #111111;
    --p11-dark-card: #161616;
    --p11-grey: #1e1e1e;
    --p11-light: #f0ece6;
    --p11-muted: #8a8580;
    --p11-gradient: linear-gradient(135deg, var(--p11-orange), var(--p11-gold));
    --p11-gradient-h: linear-gradient(90deg, var(--p11-orange), var(--p11-gold));

    font-family: 'Barlow', sans-serif;
    background: var(--p11-black);
    color: var(--p11-light);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }

  /* Noise overlay */
  .p11-root::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px;
  }

  /* ─── NAVIGATION ─── */
  .p11-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1.25rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(10,10,10,0.7);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: all 0.4s ease;
  }

  .p11-nav.p11-scrolled {
    padding: 0.75rem 3rem;
    background: rgba(10,10,10,0.92);
  }

  .p11-nav-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
  }

  .p11-nav-logo img {
    height: 40px;
    width: auto;
    filter: drop-shadow(0 0 12px rgba(227,82,5,0.3));
  }

  .p11-nav-logo span {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.6rem;
    letter-spacing: 0.15em;
    background: var(--p11-gradient-h);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .p11-nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .p11-nav-links a {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--p11-muted);
    text-decoration: none;
    transition: color 0.3s;
    position: relative;
  }

  .p11-nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--p11-gradient-h);
    transition: width 0.3s;
  }

  .p11-nav-links a:hover { color: var(--p11-light); }
  .p11-nav-links a:hover::after { width: 100%; }

  /* ─── HERO ─── */
  .p11-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .p11-hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .p11-hero-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 40%, rgba(227,82,5,0.12) 0%, transparent 70%),
      radial-gradient(ellipse 60% 50% at 70% 60%, rgba(244,175,35,0.08) 0%, transparent 60%);
  }

  .p11-hero-bg::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, var(--p11-black), transparent);
    z-index: 1;
  }

  .p11-hero-slash {
    position: absolute;
    top: -10%;
    right: -5%;
    width: 45%;
    height: 140%;
    background: linear-gradient(135deg, rgba(227,82,5,0.04), rgba(244,175,35,0.02));
    transform: skewX(-12deg);
    z-index: 0;
  }

  .p11-hero-slash-2 {
    position: absolute;
    top: -10%;
    right: 8%;
    width: 3px;
    height: 140%;
    background: linear-gradient(to bottom, transparent, rgba(227,82,5,0.15), transparent);
    transform: skewX(-12deg);
    z-index: 0;
  }

  .p11-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
  }

  .p11-hero-logo {
    width: 160px;
    height: 160px;
    object-fit: contain;
    margin-bottom: 2rem;
    filter: drop-shadow(0 0 60px rgba(227,82,5,0.35));
    animation: p11-heroFloat 6s ease-in-out infinite;
  }

  @keyframes p11-heroFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }

  .p11-hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(5rem, 14vw, 12rem);
    line-height: 0.85;
    letter-spacing: 0.06em;
    background: var(--p11-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 4px 30px rgba(227,82,5,0.25));
    animation: p11-titleIn 1s ease-out both;
  }

  @keyframes p11-titleIn {
    from { opacity: 0; transform: translateY(40px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .p11-hero-subtitle {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: var(--p11-muted);
    margin-top: 1rem;
    animation: p11-fadeUp 1s 0.3s ease-out both;
  }

  .p11-hero-tagline {
    font-family: 'Barlow', sans-serif;
    font-weight: 300;
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    color: var(--p11-light);
    margin-top: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    opacity: 0.8;
    animation: p11-fadeUp 1s 0.5s ease-out both;
  }

  @keyframes p11-fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .p11-hero-cta {
    margin-top: 3rem;
    animation: p11-fadeUp 1s 0.7s ease-out both;
  }

  .p11-hero-cta a {
    display: inline-block;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--p11-black);
    background: var(--p11-gradient-h);
    padding: 1rem 3rem;
    clip-path: polygon(0 0, 100% 0, 96% 100%, 4% 100%);
    transition: transform 0.3s, filter 0.3s;
  }

  .p11-hero-cta a:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  .p11-scroll-indicator {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    animation: p11-fadeUp 1s 1s ease-out both;
  }

  .p11-scroll-indicator span {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--p11-muted);
  }

  .p11-scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--p11-orange), transparent);
    animation: p11-scrollPulse 2s ease-in-out infinite;
  }

  @keyframes p11-scrollPulse {
    0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
    50% { opacity: 1; transform: scaleY(1); }
  }

  /* ─── SECTIONS ─── */
  .p11-section {
    position: relative;
    padding: 6rem 2rem;
  }

  .p11-section-dark {
    background: var(--p11-dark);
  }

  .p11-section-topline {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(227,82,5,0.3), transparent);
  }

  .p11-section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .p11-section-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--p11-orange);
    margin-bottom: 0.75rem;
  }

  .p11-section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3rem, 7vw, 5.5rem);
    letter-spacing: 0.04em;
    line-height: 0.95;
    color: var(--p11-light);
  }

  .p11-accent {
    background: var(--p11-gradient-h);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .p11-section-divider {
    width: 60px;
    height: 3px;
    background: var(--p11-gradient-h);
    margin: 1.5rem auto 0;
  }

  /* ─── CHI SIAMO ─── */
  .p11-about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1100px;
    margin: 0 auto;
    align-items: center;
  }

  .p11-about-text {
    font-family: 'Barlow', sans-serif;
    font-weight: 300;
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--p11-muted);
  }

  .p11-about-text p {
    margin-bottom: 1.5rem;
  }

  .p11-about-text strong {
    color: var(--p11-orange);
    font-weight: 500;
  }

  .p11-about-card {
    background: var(--p11-dark-card);
    border: 1px solid rgba(255,255,255,0.05);
    overflow: hidden;
    position: relative;
  }

  .p11-about-card-top {
    height: 3px;
    background: var(--p11-gradient-h);
  }

  .p11-about-card-inner {
    padding: 2rem;
  }

  .p11-about-moonryde {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .p11-about-moonryde img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(227,82,5,0.3);
  }

  .p11-about-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.6rem;
    letter-spacing: 0.05em;
    color: var(--p11-light);
  }

  .p11-about-role {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 0.75rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--p11-muted);
  }

  .p11-about-stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .p11-about-stat {
    text-align: center;
    padding: 0.75rem;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
  }

  .p11-about-stat-value {
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem;
    background: var(--p11-gradient-h);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .p11-about-stat-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--p11-muted);
  }

  .p11-about-quote {
    font-family: 'Barlow', sans-serif;
    font-style: italic;
    font-weight: 300;
    color: var(--p11-muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  /* ─── STATS BAR ─── */
  .p11-stats-bar {
    background: var(--p11-dark);
    border-top: 1px solid rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding: 3rem 2rem;
  }

  .p11-stats-inner {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .p11-stat-item {
    text-align: center;
  }

  .p11-stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3.5rem;
    line-height: 1;
    background: var(--p11-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .p11-stat-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--p11-muted);
    margin-top: 0.3rem;
  }

  /* ─── ROSTER ─── */
  .p11-roster-grid-full {
    max-width: 1200px;
    margin: 0 auto;
  }

  .p11-roster-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .p11-player-card {
    position: relative;
    background: var(--p11-dark-card);
    border: 1px solid rgba(255,255,255,0.04);
    overflow: hidden;
    cursor: pointer;
    transition: all 0.4s ease;
  }

  .p11-player-card:hover {
    transform: translateY(-6px);
    border-color: rgba(227,82,5,0.15);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(227,82,5,0.05);
  }

  .p11-player-number {
    position: absolute;
    top: 12px;
    right: 14px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.8rem;
    line-height: 1;
    color: rgba(255,255,255,0.04);
    z-index: 1;
    transition: color 0.4s;
  }

  .p11-player-card:hover .p11-player-number {
    color: rgba(227,82,5,0.12);
  }

  .p11-player-img-wrap {
    position: relative;
    width: 100%;
    height: 280px;
    overflow: hidden;
    background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
  }

  .p11-player-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    transition: transform 0.5s, filter 0.5s;
    filter: grayscale(40%) contrast(1.05);
  }

  .p11-player-card:hover .p11-player-img-wrap img {
    transform: scale(1.08);
    filter: grayscale(0%) contrast(1);
  }

  .p11-player-img-wrap::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, var(--p11-dark-card), transparent);
    z-index: 1;
  }

  .p11-player-info {
    padding: 1rem 1.25rem 1.25rem;
    position: relative;
  }

  .p11-player-pos {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--p11-gold);
    margin-bottom: 0.2rem;
  }

  .p11-player-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.4rem;
    letter-spacing: 0.04em;
    color: var(--p11-light);
    line-height: 1.1;
  }

  .p11-player-num-small {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 0.8rem;
    color: var(--p11-muted);
    margin-top: 0.15rem;
  }

  .p11-player-desc {
    font-family: 'Barlow', sans-serif;
    font-weight: 300;
    font-size: 0.8rem;
    color: var(--p11-muted);
    line-height: 1.5;
    margin-top: 0.5rem;
  }

  /* ─── SPONSOR ─── */
  .p11-sponsor-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .p11-sponsor-card {
    position: relative;
    background: var(--p11-dark-card);
    border: 1px solid rgba(255,255,255,0.05);
    padding: 2.5rem 2rem;
    transition: all 0.4s;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .p11-sponsor-card:hover {
    transform: translateY(-6px);
    border-color: rgba(227,82,5,0.15);
  }

  .p11-sponsor-highlighted {
    border-color: rgba(227,82,5,0.3);
    box-shadow: 0 0 40px rgba(227,82,5,0.08);
  }

  .p11-sponsor-highlighted::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--p11-gradient-h);
  }

  .p11-sponsor-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: var(--p11-gradient-h);
    color: var(--p11-black);
    padding: 0.3rem 0.8rem;
  }

  .p11-sponsor-tier {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--p11-orange);
    margin-bottom: 0.75rem;
  }

  .p11-sponsor-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    letter-spacing: 0.04em;
    color: var(--p11-light);
    margin-bottom: 1.5rem;
  }

  .p11-sponsor-features {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem;
    flex: 1;
  }

  .p11-sponsor-features li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-family: 'Barlow', sans-serif;
    font-weight: 300;
    font-size: 0.9rem;
    color: var(--p11-muted);
    margin-bottom: 0.75rem;
    line-height: 1.4;
  }

  .p11-check {
    color: var(--p11-orange);
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }

  .p11-sponsor-cta {
    display: inline-block;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--p11-orange);
    border: 1px solid rgba(227,82,5,0.3);
    padding: 0.75rem 1.5rem;
    text-align: center;
    transition: all 0.3s;
  }

  .p11-sponsor-cta:hover {
    background: var(--p11-orange);
    color: var(--p11-black);
    border-color: var(--p11-orange);
  }

  .p11-sponsor-highlighted .p11-sponsor-cta {
    background: var(--p11-gradient-h);
    color: var(--p11-black);
    border-color: transparent;
  }

  .p11-sponsor-highlighted .p11-sponsor-cta:hover {
    filter: brightness(1.1);
    transform: scale(1.02);
  }

  /* ─── NEWS ─── */
  .p11-news-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .p11-news-card {
    background: var(--p11-dark-card);
    border: 1px solid rgba(255,255,255,0.04);
    padding: 2rem;
    transition: all 0.4s;
    cursor: pointer;
  }

  .p11-news-card:hover {
    transform: translateY(-4px);
    border-color: rgba(227,82,5,0.15);
  }

  .p11-news-featured {
    grid-column: 1 / -1;
  }

  .p11-news-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .p11-news-category {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: white;
    padding: 0.25rem 0.75rem;
    display: inline-block;
  }

  .p11-news-date {
    font-family: 'Barlow', sans-serif;
    font-size: 0.8rem;
    color: var(--p11-muted);
  }

  .p11-news-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.6rem;
    letter-spacing: 0.03em;
    color: var(--p11-light);
    margin-bottom: 0.75rem;
    line-height: 1.1;
    transition: color 0.3s;
  }

  .p11-news-card:hover .p11-news-title {
    color: var(--p11-orange);
  }

  .p11-news-excerpt {
    font-family: 'Barlow', sans-serif;
    font-weight: 300;
    font-size: 0.9rem;
    color: var(--p11-muted);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .p11-news-read {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--p11-orange);
    transition: letter-spacing 0.3s;
  }

  .p11-news-card:hover .p11-news-read {
    letter-spacing: 0.25em;
  }

  /* ─── CONTATTI ─── */
  .p11-contact-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1100px;
    margin: 0 auto;
    align-items: start;
  }

  .p11-contact-info {
    font-family: 'Barlow', sans-serif;
    font-weight: 300;
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--p11-muted);
  }

  .p11-contact-features {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .p11-contact-feature {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--p11-dark-card);
    border: 1px solid rgba(255,255,255,0.05);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--p11-light);
  }

  .p11-contact-feature-icon {
    font-size: 1.2rem;
    color: var(--p11-orange);
  }

  .p11-contact-form-wrap {
    background: var(--p11-dark-card);
    border: 1px solid rgba(255,255,255,0.05);
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .p11-contact-form-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--p11-gradient-h);
  }

  .p11-form-input {
    background: var(--p11-black) !important;
    border: 1px solid rgba(255,255,255,0.08) !important;
    border-radius: 0 !important;
    color: var(--p11-light) !important;
    font-family: 'Barlow', sans-serif !important;
  }

  .p11-form-input:focus {
    border-color: var(--p11-orange) !important;
    outline: none !important;
  }

  .p11-form-button {
    background: var(--p11-gradient-h) !important;
    color: var(--p11-black) !important;
    border-radius: 0 !important;
    font-family: 'Barlow Condensed', sans-serif !important;
    font-weight: 700 !important;
    letter-spacing: 0.15em !important;
    text-transform: uppercase !important;
    transition: filter 0.3s, transform 0.3s !important;
  }

  .p11-form-button:hover {
    filter: brightness(1.1) !important;
    transform: scale(1.02) !important;
    background: var(--p11-gradient-h) !important;
  }

  /* ─── FOOTER ─── */
  .p11-footer {
    background: var(--p11-black);
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 3rem 2rem;
  }

  .p11-footer-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .p11-footer-brand {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .p11-footer-logo {
    height: 40px;
    width: auto;
    opacity: 0.6;
    filter: grayscale(0.5);
    transition: all 0.4s;
  }

  .p11-footer-logo:hover {
    opacity: 1;
    filter: grayscale(0);
  }

  .p11-footer-name {
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.3rem;
    letter-spacing: 0.1em;
    background: var(--p11-gradient-h);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .p11-footer-league {
    display: block;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--p11-muted);
  }

  .p11-footer-socials {
    display: flex;
    gap: 0.75rem;
  }

  .p11-social-link {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,0.08);
    color: var(--p11-muted);
    transition: all 0.3s;
  }

  .p11-social-link:hover {
    border-color: rgba(227,82,5,0.3);
    color: var(--p11-orange);
    background: rgba(227,82,5,0.05);
  }

  .p11-footer-copy {
    text-align: right;
  }

  .p11-footer-copy p {
    font-family: 'Barlow', sans-serif;
    font-size: 0.8rem;
    color: var(--p11-muted);
    margin: 0;
  }

  .p11-footer-credit {
    margin-top: 0.25rem !important;
  }

  .p11-footer-credit a {
    color: var(--p11-orange);
    text-decoration: none;
    transition: color 0.3s;
  }

  .p11-footer-credit a:hover {
    color: var(--p11-gold);
  }

  .p11-heart {
    color: var(--p11-orange);
    display: inline-block;
    animation: p11-heartbeat 1.4s ease-in-out infinite;
    font-style: normal;
  }

  @keyframes p11-heartbeat {
    0%, 100% { transform: scale(1); }
    14% { transform: scale(1.2); }
    28% { transform: scale(1); }
    42% { transform: scale(1.15); }
    56% { transform: scale(1); }
  }

  /* ─── SCROLL REVEAL ─── */
  .p11-reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .p11-reveal.p11-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .p11-reveal-delay-1 { transition-delay: 0.1s; }
  .p11-reveal-delay-2 { transition-delay: 0.2s; }
  .p11-reveal-delay-3 { transition-delay: 0.3s; }
  .p11-reveal-delay-4 { transition-delay: 0.4s; }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 768px) {
    .p11-nav { padding: 1rem 1.5rem; }
    .p11-nav-links { display: none; }
    .p11-hero-logo { width: 110px; height: 110px; }
    .p11-about-grid { grid-template-columns: 1fr; gap: 2rem; }
    .p11-roster-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; }
    .p11-player-img-wrap { height: 200px; }
    .p11-player-number { font-size: 2rem; }
    .p11-player-name { font-size: 1.15rem; }
    .p11-section { padding: 4rem 1.25rem; }
    .p11-stats-inner { gap: 1.5rem; }
    .p11-stat-num { font-size: 2.5rem; }
    .p11-sponsor-grid { grid-template-columns: 1fr; max-width: 400px; }
    .p11-news-grid { grid-template-columns: 1fr; }
    .p11-contact-wrap { grid-template-columns: 1fr; gap: 2rem; }
    .p11-footer-inner { flex-direction: column; text-align: center; }
    .p11-footer-copy { text-align: center; }
  }
`
