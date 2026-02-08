import{r as n,j as e}from"./index-Dj4jx_9e.js";import{L as p}from"./players-CNqBD9x7.js";const b=[{name:"MOONRYDE",role:"Presidente",image:"https://kingsleague.pro/_ipx/fit_outside&s_672x428/kama/production/staff/415aa4e9-aa18-4b42-9b14-98b6c81a3d3c/27214244.png"},{name:"RENATO FRACCI",role:"Allenatore",image:"https://kingsleague.pro/_ipx/s_256x360/kama/production/staff/58bf349e-1b56-4650-835b-5d7ef70d78d5/134334366.png"}],u=[{position:"Portieri",players:[{name:"STEFANO PROCIDA",number:77,role:"Portiere",image:"https://kingsleague-cdn.kama.football/account/production/player/4a40088d-4172-49e5-a0d0-2eca495362c8/406802932.png"},{name:"LEANDRO CASAPIERI",number:22,role:"Portiere",image:"https://kingsleague-cdn.kama.football/account/production/player/ebd00bff-e85c-4066-8d50-46bdde70bee5/30595931.png"}]},{position:"Difensori",players:[{name:"ALESSANDRO GARILLI",number:14,role:"Difensore",image:"https://kingsleague-cdn.kama.football/account/production/player/db27a45a-9a65-430e-a641-85bd3c5de5dc/563739485.png"},{name:"ALESSANDRO TUIA",number:13,role:"Difensore",image:"https://kingsleague-cdn.kama.football/account/production/player/74460a1a-18be-452e-973f-d3bf2537a11d/227052856.png"},{name:"ALEX FRANA",number:19,role:"Difensore",image:"https://kingsleague-cdn.kama.football/account/production/player/412b1c1c-dce6-437f-95b5-f369b94ae178/106467418.png"},{name:"YASIN ZOUGUI",number:23,role:"Difensore",image:"https://kingsleague-cdn.kama.football/account/production/player/5f71f37e-5ff7-4d57-9ba0-84d764c23a51/982379586.png"}]},{position:"Centrocampisti",players:[{name:"SEBASTIANO FINARDI",number:4,role:"Centrocampista",image:"https://kingsleague-cdn.kama.football/account/production/player/24d541b6-e59f-4955-8377-70ba6daa490e/998593378.png"},{name:"SPIZZI",number:24,role:"Centrocampista",image:"https://kingsleague-cdn.kama.football/account/production/player/008b5218-37bb-455d-9231-69dddb8d4436/548211308.png"}]},{position:"Attaccanti",players:[{name:"ANDREA STRADA",number:21,role:"Attaccante",image:"https://kingsleague-cdn.kama.football/account/production/player/327cd48e-2ecd-4721-9d9b-81ef401ef91c/267306880.png"},{name:"MATTIA PESCA",number:17,role:"Attaccante",image:"https://kingsleague-cdn.kama.football/account/production/player/f54a485d-994f-4392-a5ab-a76a36e857ae/283251797.png"},{name:"DAVIDE MOSCARDELLI",number:9,role:"Attaccante",image:"https://kingsleague-cdn.kama.football/account/production/player/721fb04b-287c-4ac2-98ee-14f39674a1cd/28101621.png"}]}],x=[{target:11,label:"Giocatori"},{target:4,label:"Posizioni"},{target:1,label:"Obiettivo"},{target:null,label:"Passione",display:"∞"}];function k(){const c=n.useRef(null),d=n.useRef([]),m=n.useRef([]);n.useEffect(()=>{const a=()=>{c.current?.classList.toggle("p11-scrolled",window.scrollY>60)};return window.addEventListener("scroll",a,{passive:!0}),()=>window.removeEventListener("scroll",a)},[]),n.useEffect(()=>{const a=new IntersectionObserver(r=>{r.forEach(t=>{t.isIntersecting&&(t.target.classList.add("p11-visible"),a.unobserve(t.target))})},{threshold:.15,rootMargin:"0px 0px -40px 0px"});return d.current.forEach(r=>r&&a.observe(r)),()=>a.disconnect()},[]),n.useEffect(()=>{const a=new IntersectionObserver(r=>{r.forEach(t=>{if(t.isIntersecting){const l=t.target,o=parseInt(l.dataset.target||"0");if(!o)return;let s=0;const f=Math.max(1,Math.floor(o/30)),h=setInterval(()=>{s+=f,s>=o&&(s=o,clearInterval(h)),l.textContent=String(s)},40);a.unobserve(l)}})},{threshold:.5});return m.current.forEach(r=>r&&a.observe(r)),()=>a.disconnect()},[]);let g=0;const i=a=>{const r=g++;return{ref:t=>{d.current[r]=t},className:`p11-reveal${a?` p11-reveal-delay-${a}`:""}`}};return e.jsxs("div",{className:"p11-root",children:[e.jsx("style",{children:v}),e.jsxs("nav",{ref:c,className:"p11-nav",children:[e.jsxs("a",{href:"#",className:"p11-nav-logo",children:[e.jsx("img",{src:p,alt:"BigBro Logo"}),e.jsx("span",{children:"BIGBRO"})]}),e.jsxs("ul",{className:"p11-nav-links",children:[e.jsx("li",{children:e.jsx("a",{href:"#p11-leadership",children:"Leadership"})}),e.jsx("li",{children:e.jsx("a",{href:"#p11-roster",children:"Roster"})}),e.jsx("li",{children:e.jsx("a",{href:"#p11-stats",children:"Stats"})})]})]}),e.jsxs("section",{className:"p11-hero",children:[e.jsxs("div",{className:"p11-hero-bg",children:[e.jsx("div",{className:"p11-hero-slash"}),e.jsx("div",{className:"p11-hero-slash-2"})]}),e.jsxs("div",{className:"p11-hero-content",children:[e.jsx("img",{className:"p11-hero-logo",src:p,alt:"BigBro Crest"}),e.jsx("h1",{className:"p11-hero-title",children:"BIGBRO"}),e.jsx("p",{className:"p11-hero-subtitle",children:"Kings League Italia"}),e.jsx("p",{className:"p11-hero-tagline",children:"Passione, grinta e spettacolo. Un solo obiettivo: la corona."}),e.jsx("div",{className:"p11-hero-cta",children:e.jsx("a",{href:"#p11-roster",children:"Scopri la Squadra"})})]}),e.jsxs("div",{className:"p11-scroll-indicator",children:[e.jsx("span",{children:"Scorri"}),e.jsx("div",{className:"p11-scroll-line"})]})]}),e.jsxs("section",{id:"p11-leadership",className:"p11-section p11-section-dark",children:[e.jsx("div",{className:"p11-section-topline"}),e.jsx("div",{...i(),children:e.jsxs("div",{className:"p11-section-header",children:[e.jsx("p",{className:"p11-section-label",children:"La Guida"}),e.jsxs("h2",{className:"p11-section-title",children:["MENTE E ",e.jsx("span",{className:"p11-accent",children:"STRATEGIA"})]}),e.jsx("div",{className:"p11-section-divider"})]})}),e.jsx("div",{className:"p11-leadership-grid",children:b.map((a,r)=>e.jsx("div",{...i(r+1),children:e.jsxs("div",{className:"p11-leader-card",children:[e.jsx("div",{className:"p11-leader-img-wrap",children:e.jsx("img",{src:a.image,alt:a.name,loading:"lazy"})}),e.jsxs("div",{className:"p11-leader-info",children:[e.jsx("p",{className:"p11-leader-role",children:a.role}),e.jsx("h3",{className:"p11-leader-name",children:a.name})]})]})},a.name))})]}),e.jsx("div",{className:"p11-stats-bar",id:"p11-stats",children:e.jsx("div",{className:"p11-stats-inner",children:x.map((a,r)=>e.jsx("div",{...i(r>0?r:void 0),children:e.jsxs("div",{className:"p11-stat-item",children:[e.jsx("div",{className:"p11-stat-num",ref:t=>{m.current[r]=t},"data-target":a.target??void 0,children:a.display??"0"}),e.jsx("p",{className:"p11-stat-label",children:a.label})]})},a.label))})}),e.jsxs("section",{id:"p11-roster",className:"p11-section",children:[e.jsx("div",{...i(),children:e.jsxs("div",{className:"p11-section-header",children:[e.jsx("p",{className:"p11-section-label",children:"La Squadra"}),e.jsxs("h2",{className:"p11-section-title",children:["MEET THE ",e.jsx("span",{className:"p11-accent",children:"TEAM"})]}),e.jsx("div",{className:"p11-section-divider"})]})}),u.map(a=>e.jsx("div",{...i(),children:e.jsxs("div",{className:"p11-position-group",children:[e.jsx("div",{className:"p11-position-label",children:a.position}),e.jsx("div",{className:"p11-roster-grid",children:a.players.map((r,t)=>e.jsx("div",{...i(t+1),children:e.jsxs("div",{className:"p11-player-card",children:[e.jsx("span",{className:"p11-player-number",children:r.number}),e.jsx("div",{className:"p11-player-img-wrap",children:e.jsx("img",{src:r.image,alt:r.name,loading:"lazy"})}),e.jsxs("div",{className:"p11-player-info",children:[e.jsx("p",{className:"p11-player-pos",children:r.role}),e.jsx("h3",{className:"p11-player-name",children:r.name}),e.jsxs("p",{className:"p11-player-num-small",children:["#",r.number]})]})]})},r.name))})]})},a.position))]}),e.jsxs("footer",{className:"p11-footer",children:[e.jsx("img",{className:"p11-footer-logo",src:p,alt:"BigBro"}),e.jsxs("p",{className:"p11-footer-credit",children:["Made with ",e.jsx("em",{className:"p11-heart",children:"♥"})," by Mindblast"]}),e.jsx("p",{className:"p11-footer-sub",children:"BigBro — Kings League Italia 2025"})]})]})}const v=`
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

  /* ─── LEADERSHIP ─── */
  .p11-leadership-grid {
    display: flex;
    justify-content: center;
    gap: 3rem;
    max-width: 900px;
    margin: 0 auto;
    flex-wrap: wrap;
  }

  .p11-leader-card {
    position: relative;
    width: 340px;
    background: var(--p11-dark-card);
    border: 1px solid rgba(255,255,255,0.05);
    overflow: hidden;
    transition: transform 0.4s, border-color 0.4s;
  }

  .p11-leader-card:hover {
    transform: translateY(-8px);
    border-color: rgba(227,82,5,0.2);
  }

  .p11-leader-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--p11-gradient-h);
    z-index: 1;
  }

  .p11-leader-img-wrap {
    position: relative;
    width: 100%;
    height: 360px;
    overflow: hidden;
    background: linear-gradient(135deg, #1a1a1a, #0d0d0d);
  }

  .p11-leader-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    transition: transform 0.6s, filter 0.6s;
    filter: grayscale(30%);
  }

  .p11-leader-card:hover .p11-leader-img-wrap img {
    transform: scale(1.06);
    filter: grayscale(0%);
  }

  .p11-leader-img-wrap::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, var(--p11-dark-card), transparent);
  }

  .p11-leader-info {
    padding: 1.5rem 2rem 2rem;
    position: relative;
  }

  .p11-leader-role {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    background: var(--p11-gradient-h);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.4rem;
  }

  .p11-leader-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    letter-spacing: 0.05em;
    color: var(--p11-light);
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
  .p11-position-group {
    max-width: 1200px;
    margin: 0 auto 4rem;
  }

  .p11-position-group:last-child {
    margin-bottom: 0;
  }

  .p11-position-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem;
    letter-spacing: 0.2em;
    color: var(--p11-muted);
    margin-bottom: 1.5rem;
    padding-left: 0.5rem;
    border-left: 3px solid var(--p11-orange);
    padding-bottom: 0.1rem;
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

  /* ─── FOOTER ─── */
  .p11-footer {
    background: var(--p11-black);
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 3rem 2rem;
    text-align: center;
  }

  .p11-footer-logo {
    height: 50px;
    width: auto;
    opacity: 0.4;
    margin-bottom: 1.5rem;
    filter: grayscale(1);
    transition: all 0.4s;
  }

  .p11-footer-logo:hover {
    opacity: 0.8;
    filter: grayscale(0);
  }

  .p11-footer-credit {
    font-family: 'Barlow', sans-serif;
    font-weight: 400;
    font-size: 0.9rem;
    color: var(--p11-muted);
    letter-spacing: 0.05em;
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

  .p11-footer-sub {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.15);
    margin-top: 1rem;
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
    .p11-leadership-grid { gap: 1.5rem; }
    .p11-leader-card { width: 100%; max-width: 340px; }
    .p11-roster-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; }
    .p11-player-img-wrap { height: 200px; }
    .p11-player-number { font-size: 2rem; }
    .p11-player-name { font-size: 1.15rem; }
    .p11-section { padding: 4rem 1.25rem; }
    .p11-stats-inner { gap: 1.5rem; }
    .p11-stat-num { font-size: 2.5rem; }
  }
`;export{k as default};
