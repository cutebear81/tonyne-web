/* 토니네 — 콘텐츠 & 무드 테마 정의
   (실제 카피/이미지는 추후 교체. 플레이스홀더는 점선 박스로 표시) */

// 무드별 섹션 색상 시퀀스: [hero, about, services, work, clients, contact]
// 스크롤하면 JS가 활성 섹션의 색을 --bg/--fg/--accent 로 부드럽게 전환한다.
window.TN_MOODS = {
  mono: {
    label: "모노크롬",
    photo: "assets/tony-mono.jpg",
    sections: [
      { bg: "#0a0a0a", fg: "#f6f5f3", accent: "#f6f5f3", glow: "rgba(255,255,255,0.05)", glowO: 0.6 },
      { bg: "#f4f3f1", fg: "#121212", accent: "#121212", glow: "transparent", glowO: 0 },
      { bg: "#0e0e0e", fg: "#f6f5f3", accent: "#f6f5f3", glow: "rgba(255,255,255,0.04)", glowO: 0.5 },
      { bg: "#e9e8e5", fg: "#121212", accent: "#121212", glow: "transparent", glowO: 0 },
      { bg: "#f4f3f1", fg: "#121212", accent: "#121212", glow: "transparent", glowO: 0 },
      { bg: "#0a0a0a", fg: "#f6f5f3", accent: "#f6f5f3", glow: "rgba(255,255,255,0.05)", glowO: 0.6 },
    ],
  },
  warm: {
    label: "웜 톤",
    photo: "assets/tony-warm.jpg",
    sections: [
      { bg: "#ece1d0", fg: "#2a2420", accent: "#b85c38", glow: "rgba(184,92,56,0.12)", glowO: 1 },
      { bg: "#e4d5bf", fg: "#2a2420", accent: "#b85c38", glow: "rgba(184,92,56,0.08)", glowO: 1 },
      { bg: "#2a2420", fg: "#f3e9db", accent: "#e0a06f", glow: "rgba(224,160,111,0.10)", glowO: 1 },
      { bg: "#efe6d7", fg: "#2a2420", accent: "#b85c38", glow: "rgba(184,92,56,0.07)", glowO: 1 },
      { bg: "#e4d5bf", fg: "#2a2420", accent: "#b85c38", glow: "transparent", glowO: 0 },
      { bg: "#b85c38", fg: "#fbf3e8", accent: "#fbf3e8", glow: "rgba(255,255,255,0.08)", glowO: 1 },
    ],
  },
  vivid: {
    label: "비비드",
    photo: "assets/tony-vivid.jpg",
    sections: [
      { bg: "#2436ff", fg: "#ffffff", accent: "#ffe600", glow: "rgba(255,230,0,0.18)", glowO: 1 },
      { bg: "#f6f5f3", fg: "#0a0a0a", accent: "#ff3b1f", glow: "transparent", glowO: 0 },
      { bg: "#ff3b1f", fg: "#ffffff", accent: "#ffe600", glow: "rgba(255,255,255,0.10)", glowO: 1 },
      { bg: "#0a0a0a", fg: "#ffffff", accent: "#ffe600", glow: "rgba(36,54,255,0.22)", glowO: 1 },
      { bg: "#f6f5f3", fg: "#0a0a0a", accent: "#2436ff", glow: "transparent", glowO: 0 },
      { bg: "#ffe600", fg: "#0a0a0a", accent: "#2436ff", glow: "rgba(36,54,255,0.10)", glowO: 1 },
    ],
  },
};

window.TN_TYPE = {
  modern:  { label: "모던 산세리프", display: '"Pretendard", system-ui, sans-serif', body: '"Pretendard", system-ui, sans-serif' },
  serif:   { label: "감성 세리프",   display: '"Nanum Myeongjo", serif',            body: '"Pretendard", system-ui, sans-serif' },
  bold:    { label: "대담한 헤드라인", display: '"Black Han Sans", sans-serif',       body: '"Pretendard", system-ui, sans-serif' },
};

// ---------------- 콘텐츠 ----------------
window.TN_CONTENT = {
  brand: "토니네",
  nav: [
    { label: "소개", href: "#about" },
    { label: "서비스", href: "#services" },
    { label: "작업", href: "#work" },
    { label: "고객사", href: "#clients" },
    { label: "문의", href: "#contact" },
  ],
  hero: {
    eyebrow: "TONYNE STUDIO",
    lines: ["마음을 담아", "감각으로", "완성합니다"],
    sub: "브랜드와 사람을 잇는 크리에이티브 스튜디오. 토니네는 당신의 이야기를 감성적으로 만들어드립니다.",
  },
  about: {
    eyebrow: "ABOUT",
    lead: ["우리는 ", "좋은 감각", "은 결국 ", "사람을 향한 마음", "에서 나온다고 믿습니다."],
    founderTag: "대표 · 토니",
    founderNote: "“작업의 시작과 끝에는 늘 사람이 있습니다. 토니네는 그 마음을 디자인합니다.”",
    values: [
      { k: "Vision", h: "감각의 기준을 만듭니다", p: "유행을 좇기보다 오래 사랑받을 결과물을 지향합니다." },
      { k: "Craft", h: "디테일에 타협하지 않습니다", p: "보이지 않는 1px까지, 완성도가 곧 태도입니다." },
      { k: "Partner", h: "끝까지 함께합니다", p: "프로젝트가 끝나도 관계는 이어집니다." },
    ],
  },
  services: {
    eyebrow: "SERVICES",
    title: "무엇을 만드나요",
    note: "브랜드의 첫인상부터 경험의 끝까지, 토니네가 함께합니다.",
    items: [
      { h: "행사 스냅 · 영상", p: "행사의 결정적인 순간을 사진과 영상으로 생생하게 기록합니다.", tags: ["현장 스냅", "행사 영상", "하이라이트"] },
      { h: "음식 · 제품 촬영", p: "메뉴와 제품의 매력을 가장 먹음직스럽고 돋보이게 담아냅니다.", tags: ["메뉴 컷", "제품 촬영", "룩북"] },
      { h: "SNS 콘텐츠 · 숏폼", p: "피드 사진부터 숏폼 영상까지, 브랜드의 일상을 감각적으로 전합니다.", tags: ["피드 사진", "숏폼 영상", "릴스"] },
    ],
  },
  work: {
    eyebrow: "SELECTED WORK",
    title: "토니네의 작업",
    note: "사진과 영상, 두 가지 작업을 모아 보실 수 있습니다.",
    items: [
      { cat: "PHOTOGRAPHY", h: "사진", p: "인물·행사·음식·제품", href: "https://tonynestudio.notion.site/de7a302b2d5d4003bc0d55612f4a87b9" },
      { cat: "FILM", h: "영상", p: "YouTube·행사·홍보·MV", href: "https://tonynestudio.notion.site/21392ac17e1d80dc89b3ff182d634f6b" },
    ],
  },
  clients: {
    eyebrow: "CLIENTS & PARTNERS",
    title: "함께한 사람들",
    note: "F&B부터 브랜드·미디어까지, 다양한 분야의 파트너와 호흡을 맞춰왔습니다.",
    groups: [
      { cat: "F&B", items: ["고메정식당", "시그니처랩", "우후루화", "몬도델비노 코리아", "금양인터내셔널", "카페츠키", "원조홍두깨손칼국수", "아콜레이드 와인", "르꼬숑"] },
      { cat: "브랜드", items: ["송화강주", "오늘와인한잔"] },
      { cat: "미디어", items: ["WINEBM", "와인21닷컴"] },
      { cat: "클라이언트", items: ["블루리본 서베이", "메디트리파운더스", "한국전통음식연구소", "유니크우드", "유니크트리", "에이블컴퍼니"] },
    ],
  },
  contact: {
    eyebrow: "CONTACT",
    big: ["함께 만들", "준비가", "되셨나요?"],
    items: [
      { label: "프로젝트 문의", value: "tonyneplanning@gmail.com", href: "mailto:tonyneplanning@gmail.com" },
      { label: "전화", value: "010-2630-0420", href: "tel:01026300420" },
    ],
    foot: "토니네",
  },
};
