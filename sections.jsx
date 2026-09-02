/* 토니네 — 섹션 컴포넌트 */
const { useEffect, useRef } = React;

// 스크롤 진입 시 .is-in 부여 (App의 스크롤 루프가 위치를 보고 토글)
function Reveal({ children, as = "div", delay = 0, className = "", style = {} }) {
  const Tag = as;
  return (
    <Tag className={"reveal " + className} style={{ "--d": delay + "ms", ...style }}>
      {children}
    </Tag>);

}

function Hero() {
  const c = window.TN_CONTENT.hero;
  return (
    <section className="hero" id="hero" data-screen-label="Hero">
      <div className="hero-video" aria-hidden="true">
        <video
          ref={(el) => {if (el) {el.muted = true;el.defaultMuted = true;el.volume = 0;}}}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={(e) => {e.currentTarget.closest(".hero-video").classList.add("video-failed");}}
          onLoadedData={(e) => {e.currentTarget.closest(".hero-video").classList.add("video-ok");}}>
          
          <source src="assets/meat.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
      </div>
      <div className="ghostword" aria-hidden="true">TONYNE</div>
      <div className="wrap">
        <Reveal as="div" className="eyebrow" delay={0}>{c.eyebrow}</Reveal>
        <h1>
          {c.lines.map((l, i) =>
          <span className="line" key={i}>
              <Reveal as="span" delay={120 + i * 110}>{l}</Reveal>
            </span>
          )}
        </h1>
        <Reveal as="p" className="sub" delay={120 + c.lines.length * 110 + 80}>{c.sub}</Reveal>
        <Reveal as="div" className="actions" delay={120 + c.lines.length * 110 + 180}>
          <a className="btn btn-primary" href="#contact">프로젝트 시작하기 <span className="arr">→</span></a>
          <a className="btn btn-ghost" href="#work">포트폴리오</a>
        </Reveal>
      </div>
      <div className="scroll-cue"><span className="bar"></span> SCROLL</div>
    </section>);

}

const FOUNDER_PHOTOS = [
  "assets/tony-1.png",
];

function FounderSlideshow() {
  const [idx, setIdx] = React.useState(0);
  const reduce = React.useRef(false);
  React.useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) return;
    const t = setInterval(() => setIdx(i => (i + 1) % FOUNDER_PHOTOS.length), 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="founder-slides">
      {FOUNDER_PHOTOS.map((src, i) =>
      <img key={i} src={src} alt="대표 토니" className={i === idx ? "is-active" : ""} />
      )}
    </div>
  );
}

function About({ photo }) {
  const c = window.TN_CONTENT.about;
  return (
    <section className="about" id="about" data-screen-label="About">
      <div className="wrap">
        <Reveal as="div" className="eyebrow" style={{ marginBottom: "26px" }}>{c.eyebrow}</Reveal>
        <Reveal as="p" className="lead" delay={60}>
          {c.lead.map((seg, i) => i % 2 === 1 ? <em key={i}>{seg}</em> : <React.Fragment key={i}>{seg}</React.Fragment>)}
        </Reveal>
        <div className="about-grid">
          <div className="founder-col">
            <Reveal className="founder-photo" delay={80}>
              <FounderSlideshow />
              <span className="tag">{c.founderTag}</span>
            </Reveal>
            <Reveal delay={140}>
              <a className="insta-btn" href="https://www.instagram.com/creatortonyne/" target="_blank" rel="noopener noreferrer" aria-label="인스타그램 @creatortonyne">
                <svg className="insta-ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5.5"></rect>
                  <circle cx="12" cy="12" r="4.2"></circle>
                  <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"></circle>
                </svg>
                <span className="insta-handle">@creatortonyne</span>
                <span className="insta-arr" aria-hidden="true">↗</span>
              </a>
            </Reveal>
          </div>
          <div className="values">
            <Reveal as="p" delay={40} style={{ fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.5, letterSpacing: "-0.02em", marginBottom: "8px" }}>
              {c.founderNote}
            </Reveal>
            {c.values.map((v, i) =>
            <Reveal className="value-item" key={i} delay={120 + i * 90}>
                <div className="k">{v.k}</div>
                <h3>{v.h}</h3>
                <p>{v.p}</p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>);

}

function SectionHead({ eyebrow, title, note }) {
  return (
    <div className="section-head">
      <div>
        <Reveal as="div" className="eyebrow" style={{ marginBottom: "18px" }}>{eyebrow}</Reveal>
        <Reveal as="h2" delay={60}>{title}</Reveal>
      </div>
      <Reveal as="p" className="note" delay={120}>{note}</Reveal>
    </div>);

}

function Services() {
  const c = window.TN_CONTENT.services;
  return (
    <section className="services" id="services" data-screen-label="Services">
      <div className="wrap">
        <SectionHead eyebrow={c.eyebrow} title={c.title} note={c.note} />
        <div className="services-list">
          {c.items.map((s, i) =>
          <Reveal className="service" key={i} delay={i * 80}>
              <div className="num">{String(i + 1).padStart(2, "0")}</div>
              <div className="body">
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
              <div className="tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

function Work() {
  const c = window.TN_CONTENT.work;
  return (
    <section className="work-sec" id="work" data-screen-label="Work">
      <div className="wrap">
        <SectionHead eyebrow={c.eyebrow} title={c.title} note={c.note} />
        <div className="work-split">
          {c.items.map((w, i) =>
          <a className="reveal work-tile" key={i} href={w.href} target="_blank" rel="noopener noreferrer" style={{ "--d": i * 90 + "ms" }}>
              <div className="wt-top">
                <span className="wt-cat">{w.cat}</span>
                <span className="wt-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="wt-main">
                <h3>{w.h}</h3>
                <p>{w.p}</p>
                <span className="wt-link">바로가기</span>
              </div>
            </a>
          )}
        </div>
        <AppFeature />
      </div>
    </section>);

}

function AppFeature() {
  const a = window.TN_CONTENT.work.app;
  return (
    <div className="app-feature">
      <Reveal className="af-head">
        <span className="af-cat">{a.cat}</span>
        <span className="af-badge">{a.badge}</span>
      </Reveal>
      <Reveal className="af-intro" delay={60}>
        <h3 className="af-title">{a.title}</h3>
        <p className="af-lead">{a.lead}</p>
        <div className="af-stores">
          <span className="af-store"><StoreMark k="ios" /><span className="af-st-txt"><b>App Store</b><i>8개 앱 출시 완료</i></span></span>
          <span className="af-store is-soon" aria-disabled="true"><StoreMark k="android" /><span className="af-st-txt"><b>Google Play</b><i>출시 예정</i></span></span>
        </div>
      </Reveal>
      <div className="af-apps">
        {a.items.map((it, i) =>
        <a className="reveal app-card" key={it.name} href={it.href} target="_blank" rel="noopener noreferrer" style={{ "--d": i * 70 + "ms" }}>
            <img className="ac-icon" src={it.icon} alt={it.name + " 앱 아이콘"} loading="lazy" />
            <div className="ac-body">
              <div className="ac-top">
                <h4>{it.name}</h4>
                <span className="ac-arr" aria-hidden="true">↗</span>
              </div>
              <p className="ac-tag">{it.tagline}</p>
              <p className="ac-one">{it.one}</p>
              <div className="ac-meta"><span>{it.cat}</span><span className="ac-dot">·</span><span>{it.date}</span></div>
              {it.disclaimer && <p className="ac-note">{it.disclaimer}</p>}
            </div>
          </a>
        )}
      </div>
    </div>);

}

function StoreMark({ k }) {
  if (k === "ios") {
    return (
      <svg className="af-st-ico" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.6 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.7.7 1.1 0 1.9-1.1 2.6-2.1.5-.8.9-1.6 1.1-2.1-2.1-.8-2.7-2.9-2.7-3.8zM14.3 5.8c.6-.7 1-1.7.9-2.7-.9.1-2 .6-2.6 1.3-.6.6-1 1.6-.9 2.6 1 .1 2-.5 2.6-1.2z" />
      </svg>);

  }
  return (
    <svg className="af-st-ico" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 3.2c-.3.3-.5.7-.5 1.3v15c0 .6.2 1 .5 1.3l8.1-7.9L4 3.2zm9.2 6.9l2.6-2.6-8.3-4.7c-.3-.2-.6-.2-.9-.1l6.6 7.4zm0 3.8l-6.6 7.4c.3.1.6.1.9-.1l8.3-4.7-2.6-2.6zm5.6-3.1l-2.1-1.2-2.8 2.8 2.8 2.8 2.1-1.2c.8-.5.8-1.9 0-2.4z" />
    </svg>);

}

function Clients() {
  const c = window.TN_CONTENT.clients;
  const [open, setOpen] = React.useState({});
  const toggle = (i, e) => {
    setOpen((o) => ({ ...o, [i]: !o[i] }));
    // iOS Safari: 클래스 변경만으로는 펼침 영역이 즉시 리페인트되지 않아
    // 스크롤 전까지 안 보이는 문제가 있어, 해당 그룹을 강제로 다시 그린다.
    const group = e.currentTarget.closest(".client-group");
    if (group) {
      const items = group.querySelector(".cg-items");
      requestAnimationFrame(() => {
        if (items) {
          items.style.willChange = "max-height, opacity";
          void items.offsetHeight; // reflow
          requestAnimationFrame(() => { items.style.willChange = ""; });
        }
      });
    }
  };
  return (
    <section className="clients" id="clients" data-screen-label="Clients">
      <div className="wrap">
        <SectionHead eyebrow={c.eyebrow} title={c.title} note={c.note} />
        <div className="client-groups">
          {c.groups.map((g, gi) =>
          <Reveal className={"client-group" + (open[gi] ? " open" : "")} key={gi} delay={gi * 70}>
              <button className="cg-cat" onClick={(e) => toggle(gi, e)} aria-expanded={!!open[gi]}>
                <span className="cg-plus" aria-hidden="true"></span>
                {g.cat}
              </button>
              <div className="cg-items">
                {g.items.map((n, ci) => <span className="cg-chip" style={{ "--ci": ci }} key={n}>{n}</span>)}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

function Contact() {
  const c = window.TN_CONTENT.contact;
  return (
    <section className="contact" id="contact" data-screen-label="Contact">
      <div className="wrap">
        <Reveal as="div" className="eyebrow" style={{ marginBottom: "26px" }}>{c.eyebrow}</Reveal>
        <h2 className="big">
          {c.big.map((l, i) => <span className="line" key={i} style={{ display: "block", overflow: "hidden" }}><Reveal as="span" delay={i * 110}>{l}</Reveal></span>)}
        </h2>
        <div className="row">
          <div className="info">
            {c.items.map((it, i) =>
            <Reveal key={i} delay={i * 80}>
                <div className="label">{it.label}</div>
                <a href={it.href}>{it.value}</a>
              </Reveal>
            )}
          </div>
          <Reveal delay={120}>
            <a className="btn btn-primary" href={c.items[0].href}>메일 보내기 <span className="arr">→</span></a>
          </Reveal>
        </div>
        <div className="foot">
          <span>ⓒ 2017. 토니네 All rights reserved.</span>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Reveal, Hero, About, Services, Work, Clients, Contact });