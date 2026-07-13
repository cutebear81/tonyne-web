/* 토니네 — App: 스크롤 배경 전환 + 무드/타이포 Tweaks */
const { useState, useEffect, useRef, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mood": "warm",
  "type": "serif",
  "typeScale": 1.0,
  "motion": 60
}/*EDITMODE-END*/;

const SECTION_ORDER = ["hero", "about", "services", "work", "clients", "contact"];

function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setShow(window.scrollY > window.innerHeight * 0.8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <button
      className={"scroll-top" + (show ? " is-show" : "")}
      aria-label="맨 위로"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span className="st-arrow" aria-hidden="true">↑</span>
    </button>
  );
}

function applyTheme(t) {
  const moods = window.TN_MOODS;
  const fonts = window.TN_TYPE;
  const root = document.documentElement;
  // 타이포
  const f = fonts[t.type] || fonts.modern;
  root.style.setProperty("--font-display", f.display);
  root.style.setProperty("--font-body", f.body);
  root.style.fontSize = (t.typeScale * 100) + "%";
  // 모션 강도
  const m = (t.motion ?? 60) / 100;
  root.style.setProperty("--reveal-shift", (12 + m * 46).toFixed(0) + "px");
  // 무드
  document.body.setAttribute("data-mood", t.mood);
  document.body.setAttribute("data-type", t.type);
  return moods[t.mood] || moods.mono;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const activeIdx = useRef(-1);
  const ghostRef = useRef(null);
  const scrolledRef = useRef(false);

  const mood = window.TN_MOODS[t.mood] || window.TN_MOODS.mono;

  // 테마(폰트/무드 메타) 적용
  useEffect(() => { applyTheme(t); activeIdx.current = -1; }, [t.mood, t.type, t.typeScale, t.motion]);

  // 스크롤 오케스트레이션: 가장 화면 중앙에 가까운 섹션의 색을 적용
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const setColors = (theme) => {
      root.style.setProperty("--bg", theme.bg);
      root.style.setProperty("--fg", theme.fg);
      root.style.setProperty("--accent", theme.accent);
      root.style.setProperty("--muted", `color-mix(in srgb, ${theme.fg} 56%, transparent)`);
      root.style.setProperty("--hair", `color-mix(in srgb, ${theme.fg} 14%, transparent)`);
      root.style.setProperty("--glow-color", theme.glow || "transparent");
      root.style.setProperty("--glow-opacity", theme.glowO ?? 0);
    };
    // 즉시(동기) 실행되는 한 패스 — 색 전환 + 등장 토글 + 패럴랙스
    const pass = () => {
      const vh = window.innerHeight;
      const ref = vh * 0.42;
      let idx = 0;
      for (let i = 0; i < SECTION_ORDER.length; i++) {
        const el = document.getElementById(SECTION_ORDER[i]);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= ref) idx = i;
      }
      if (idx !== activeIdx.current) {
        activeIdx.current = idx;
        setColors(mood.sections[idx]);
      }
      const nav = document.querySelector(".nav");
      if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 40);
        // 히어로(영상) 위에서는 내비를 밝게
        nav.classList.toggle("over-hero", idx === 0 && window.scrollY < window.innerHeight * 0.6);
      }
      document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("is-in");
      });
      if (ghostRef.current) {
        const m = (t.motion ?? 60) / 100;
        ghostRef.current.style.transform = `translateX(${-window.scrollY * 0.18 * m}px)`;
      }
    };
    const onScroll = () => {
      scrolledRef.current = true;
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; pass(); });
    };
    // 초기: 색을 즉시 적용하고, 화면 안 요소를 바로 노출 (rAF가 잠든 환경에서도 안전)
    activeIdx.current = -1;
    ghostRef.current = document.querySelector(".ghostword");
    setColors(mood.sections[0]);
    pass();
    // 보험: 폰트/레이아웃 안정화 후 한 번 더
    const t1 = setTimeout(pass, 120);
    const t2 = setTimeout(pass, 600);
    // 안전망: 스크롤 이벤트가 전혀 없는 환경(전체높이 렌더 등)에서는
    // 일정 시간 뒤 모든 요소를 노출해 콘텐츠가 영구히 가려지지 않도록 한다.
    const t3 = setTimeout(() => {
      if (!scrolledRef.current) {
        document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => el.classList.add("is-in"));
      }
    }, 2600);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, [t.mood, t.motion]);

  const C = window.TN_CONTENT;

  return (
    <React.Fragment>
      <nav className="nav">
        <div className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{C.brand}</div>
        <div className="links">
          {C.nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          <a className="cta" href="#contact">문의하기</a>
        </div>
      </nav>

      <Hero />
      <About photo={mood.photo} />
      <Services />
      <Work />
      <Clients />
      <Contact />

      <ScrollTop />

      <TweaksPanel>
        <TweakSection label="무드" />
        <TweakRadio
          label="톤 / 분위기"
          value={t.mood}
          options={[
            { value: "mono", label: "모노크롬" },
            { value: "warm", label: "웜" },
            { value: "vivid", label: "비비드" },
          ]}
          onChange={(v) => setTweak("mood", v)}
        />
        <TweakSection label="타이포그래피" />
        <TweakSelect
          label="서체 스타일"
          value={t.type}
          options={[
            { value: "modern", label: "모던 산세리프" },
            { value: "serif", label: "감성 세리프" },
            { value: "bold", label: "대담한 헤드라인" },
          ]}
          onChange={(v) => setTweak("type", v)}
        />
        <TweakSlider label="타입 스케일" value={t.typeScale} min={0.85} max={1.2} step={0.01}
          onChange={(v) => setTweak("typeScale", v)} />
        <TweakSection label="모션" />
        <TweakSlider label="스크롤 모션 강도" value={t.motion} min={0} max={100} step={1} unit="%"
          onChange={(v) => setTweak("motion", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
