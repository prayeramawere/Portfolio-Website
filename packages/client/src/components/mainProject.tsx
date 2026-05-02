import { useState, useEffect, useRef, useCallback } from "react";

/*
  ╔══════════════════════════════════════════════════════╗
  ║  ProjectCarousel.tsx — Prayer Mawere Portfolio       ║
  ║  Drop-in React + Tailwind component                  ║
  ║  Add to index.html / _document.tsx:                  ║
  ║  <link href="https://fonts.googleapis.com/css2?      ║
  ║    family=Syne:wght@700;800&                         ║
  ║    family=DM+Sans:wght@300;400&display=swap"         ║
  ║    rel="stylesheet" />                               ║
  ╚══════════════════════════════════════════════════════╝
*/

// ─── Types ────────────────────────────────────────────────────────────────────
interface Slide {
  id: number;
  tag: string;
  step: string;
  title: string;
  description: string;
  image: string;
  accent: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECT_NAME = "StreamSync";
const PROJECT_TAGLINE = "Real-time collaboration platform";
const TECH_STACK = ["React", "Node.js", "WebSockets", "PostgreSQL", "Docker"];

const slides: Slide[] = [
  {
    id: 0,
    tag: "Overview",
    step: "01",
    title: "The Big Picture",
    description:
      "StreamSync enables distributed teams to collaborate in real time across documents, whiteboards, and video — all in one workspace. Built for speed, designed for humans.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&fit=crop",
    accent: "#5b8dee",
  },
  {
    id: 1,
    tag: "Design",
    step: "02",
    title: "UI / UX System",
    description:
      "A component-driven design system built in Figma. Dark surfaces, accessible contrast, and micro-animations that feel native — every interaction is intentional.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=85&fit=crop",
    accent: "#7c5cbf",
  },
  {
    id: 2,
    tag: "Frontend",
    step: "03",
    title: "React Architecture",
    description:
      "Modular React 18 + TypeScript. Zustand for global state, React Query for server sync, and custom hooks for WebSocket event streams. Zero prop drilling.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=85&fit=crop",
    accent: "#0ea5c8",
  },
  {
    id: 3,
    tag: "Backend",
    step: "04",
    title: "API & Real-time Engine",
    description:
      "Express REST API paired with Socket.IO. PostgreSQL via Prisma ORM for structured data; Redis pub/sub for broadcasting real-time deltas across all nodes.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&fit=crop",
    accent: "#10b981",
  },
  {
    id: 4,
    tag: "DevOps",
    step: "05",
    title: "CI/CD Pipeline",
    description:
      "Dockerised with Docker Compose. GitHub Actions for lint, test, build, and deploy. Hosted on Render with zero-downtime blue-green rollouts.",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1400&q=85&fit=crop",
    accent: "#f59e0b",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function MainProject() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<"r" | "l">("r");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragX = useRef<number | null>(null);
  const DURATION = 5000;
  const total = slides.length;

  // ── Go to slide ─────────────────────────────────────────────────────────────
  const go = useCallback(
    (idx: number, d: "r" | "l") => {
      if (busy) return;
      setDir(d);
      setBusy(true);
      setProgress(0);
      setTimeout(() => {
        setActive(idx);
        setBusy(false);
      }, 500);
    },
    [busy],
  );

  const next = useCallback(
    () => go((active + 1) % total, "r"),
    [active, total, go],
  );
  const prev = useCallback(
    () => go((active - 1 + total) % total, "l"),
    [active, total, go],
  );

  // ── Timers ──────────────────────────────────────────────────────────────────
  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progRef.current) clearInterval(progRef.current);
  }, []);

  const startTimers = useCallback(() => {
    clearTimers();
    setProgress(0);
    const step = 100 / (DURATION / 40);
    progRef.current = setInterval(
      () => setProgress((p) => Math.min(p + step, 100)),
      40,
    );
    timerRef.current = setInterval(next, DURATION);
  }, [clearTimers, next]);

  useEffect(() => {
    if (!paused) startTimers();
    else clearTimers();
    return clearTimers;
  }, [paused, active, startTimers, clearTimers]);

  // ── Swipe ───────────────────────────────────────────────────────────────────
  const onPD = (e: React.PointerEvent) => {
    dragX.current = e.clientX;
  };
  const onPU = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const d = e.clientX - dragX.current;
    if (Math.abs(d) > 40) {
      d < 0 ? next() : prev();
      startTimers();
    }
    dragX.current = null;
  };

  const slide = slides[active];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&display=swap');

        .pmf-d  { font-family:'Syne','sans-serif'; }
        .pmf-b  { font-family:'DM Sans',sans-serif; }

        @keyframes pmIn  { from{opacity:0;transform:translate(56px,0) scale(.96)} to{opacity:1;transform:translate(0,0) scale(1)} }
        @keyframes pmInL { from{opacity:0;transform:translate(-56px,0) scale(.96)} to{opacity:1;transform:translate(0,0) scale(1)} }
        @keyframes pmOut { from{opacity:1;transform:translate(0,0)} to{opacity:0;transform:translate(-48px,0)} }
        @keyframes pmOtR { from{opacity:1;transform:translate(0,0)} to{opacity:0;transform:translate(48px,0)} }

        .pm-in  { animation:pmIn  .5s cubic-bezier(.22,1,.36,1) both; }
        .pm-inl { animation:pmInL .5s cubic-bezier(.22,1,.36,1) both; }
        .pm-out { animation:pmOut .5s cubic-bezier(.22,1,.36,1) both; }
        .pm-otr { animation:pmOtR .5s cubic-bezier(.22,1,.36,1) both; }

        @keyframes orb { 0%,100%{transform:translateY(0) scale(1);opacity:.18} 50%{transform:translateY(-22px) scale(1.08);opacity:.10} }
        .pm-orb { animation:orb var(--t,9s) ease-in-out infinite; }

        @keyframes shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        .pm-sh {
          background:linear-gradient(90deg,#111d35 25%,#1a2a4a 50%,#111d35 75%);
          background-size:1200px 100%;
          animation:shimmer 1.8s infinite;
        }

        .pm-dot-w { transition:width .4s cubic-bezier(.22,1,.36,1), background-color .3s; }
        .pm-btn   { transition:background .2s, transform .15s, box-shadow .2s; }
        .pm-btn:hover { transform:scale(1.07); }
        .pm-thumb-btn { transition:border-color .3s, transform .3s, filter .3s; }

        ::-webkit-scrollbar { display:none; }
      `}</style>

      {/* ── Root wrapper ──────────────────────────────────────────────────── */}
      <div
        className="relative w-[80%] overflow-hidden"
        style={{
          background: "#0b1120",
          borderRadius: "18px",
          border: "1px solid #1a2640",
          boxShadow: "0 32px 80px #000a, 0 0 0 1px #ffffff05",
          fontFamily: "'DM Sans', sans-serif",
          userSelect: "none",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={onPD}
        onPointerUp={onPU}
      >
        {/* Ambient orbs */}
        {[
          {
            s: "260px",
            t: "14%",
            l: "-6%",
            c: "#3b6be8",
            dur: "10s",
            del: "0s",
          },
          {
            s: "180px",
            t: "70%",
            l: "55%",
            c: "#5b8dee",
            dur: "13s",
            del: "2s",
          },
          {
            s: "140px",
            t: "-5%",
            l: "75%",
            c: "#7c5cbf",
            dur: "8s",
            del: "4s",
          },
        ].map((o, i) => (
          <span
            key={i}
            className="pm-orb absolute rounded-full pointer-events-none"
            style={
              {
                width: o.s,
                height: o.s,
                top: o.t,
                left: o.l,
                background: o.c,
                filter: "blur(80px)",
                "--t": o.dur,
                animationDelay: o.del,
              } as React.CSSProperties
            }
          />
        ))}

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div
          className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-5 pt-5 pb-4"
          style={{ borderBottom: "1px solid #162035" }}
        >
          <div>
            <div className="flex items-center gap-2.5">
              <span className="pmf-d text-white text-[1.15rem] font-bold tracking-tight leading-none">
                {PROJECT_NAME}
              </span>
              <span
                className="pmf-b text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full"
                style={{
                  background: "#5b8dee1a",
                  color: "#5b8dee",
                  border: "1px solid #5b8dee30",
                }}
              >
                Featured
              </span>
            </div>
            <p
              className="pmf-b text-[11px] mt-0.5"
              style={{ color: "#4e607e" }}
            >
              {PROJECT_TAGLINE}
            </p>
          </div>
          <div className="hidden sm:flex flex-wrap gap-1.5">
            {TECH_STACK.map((t) => (
              <span
                key={t}
                className="pmf-b text-[10px] px-2 py-[3px] rounded"
                style={{
                  background: "#131e35",
                  color: "#5a7099",
                  border: "1px solid #1c2d4a",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Main body ─────────────────────────────────────────────────── */}
        <div
          className="relative flex flex-col md:flex-row"
          style={{ minHeight: "340px" }}
        >
          {/* Image */}
          <div
            className="relative overflow-hidden md:w-[58%]"
            style={{ minHeight: "260px" }}
          >
            <div className="pm-sh absolute inset-0" />
            <img
              key={`img-${slide.id}`}
              src={slide.image}
              alt={slide.title}
              draggable={false}
              className={`absolute inset-0 w-full h-full object-cover ${
                busy
                  ? dir === "r"
                    ? "pm-out"
                    : "pm-otr"
                  : dir === "r"
                    ? "pm-in"
                    : "pm-inl"
              }`}
              style={{ filter: "brightness(.72) saturate(1.15)" }}
            />
            {/* gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right,transparent 50%,#0b1120 100%),linear-gradient(to top,#0b1120bb 0%,transparent 45%)",
              }}
            />
            {/* giant step number */}
            <span
              className="pmf-d absolute top-2 left-3 pointer-events-none select-none"
              style={{
                fontSize: "88px",
                fontWeight: 800,
                color: "#ffffff07",
                lineHeight: 1,
                letterSpacing: "-6px",
              }}
            >
              {slide.step}
            </span>
            {/* tag chip */}
            <div
              className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "#080f1c99",
                backdropFilter: "blur(10px)",
                border: `1px solid ${slide.accent}44`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: slide.accent }}
              />
              <span
                className="pmf-b text-[10px] font-semibold tracking-[.15em] uppercase"
                style={{ color: slide.accent }}
              >
                {slide.tag}
              </span>
            </div>
          </div>

          {/* Text */}
          <div
            className="flex flex-col justify-center md:w-[42%] px-7 py-8"
            style={{ background: "#080e1c" }}
          >
            <p
              className="pmf-b text-[10px] font-semibold tracking-[.22em] uppercase mb-3"
              style={{ color: "#5b8dee" }}
            >
              Part {slide.step} of {String(total).padStart(2, "0")}
            </p>

            <h2
              key={`h-${slide.id}`}
              className={`pmf-d text-white leading-[1.15] mb-4 ${
                busy
                  ? dir === "r"
                    ? "pm-out"
                    : "pm-otr"
                  : dir === "r"
                    ? "pm-in"
                    : "pm-inl"
              }`}
              style={{
                fontSize: "clamp(1.45rem,2.2vw,1.9rem)",
                fontWeight: 800,
              }}
            >
              {slide.title}
            </h2>

            <p
              key={`p-${slide.id}`}
              className={`pmf-b text-sm leading-relaxed mb-7 ${
                busy
                  ? dir === "r"
                    ? "pm-out"
                    : "pm-otr"
                  : dir === "r"
                    ? "pm-in"
                    : "pm-inl"
              }`}
              style={{
                color: "#5a738f",
                fontWeight: 300,
                animationDelay: "55ms",
              }}
            >
              {slide.description}
            </p>

            {/* Progress bar */}
            <div
              className="rounded-full overflow-hidden mb-6"
              style={{ height: "2px", background: "#162035" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg,#5b8dee,${slide.accent})`,
                  transition: "width 40ms linear",
                  boxShadow: `0 0 8px ${slide.accent}88`,
                }}
              />
            </div>

            {/* Dots + buttons */}
            <div className="flex items-center justify-between">
              {/* dot indicators */}
              <div className="flex items-center gap-[7px]">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      go(i, i > active ? "r" : "l");
                      startTimers();
                    }}
                    className="pm-dot-w rounded-full cursor-pointer border-0 p-0"
                    style={{
                      width: i === active ? "22px" : "6px",
                      height: "6px",
                      background: i === active ? "#5b8dee" : "#1c2d48",
                    }}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* nav buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    prev();
                    startTimers();
                  }}
                  className="pm-btn flex items-center justify-center rounded-full cursor-pointer border-0"
                  style={{
                    width: "38px",
                    height: "38px",
                    background: "#131d35",
                    outline: "1px solid #1c2d48",
                    color: "#5a7099",
                  }}
                  aria-label="Previous"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M8.5 2L4 6.5L8.5 11"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    next();
                    startTimers();
                  }}
                  className="pm-btn flex items-center justify-center rounded-full cursor-pointer border-0"
                  style={{
                    width: "38px",
                    height: "38px",
                    background: "#5b8dee",
                    outline: "1px solid #4a7add",
                    color: "#fff",
                    boxShadow: "0 4px 16px #5b8dee55",
                  }}
                  aria-label="Next"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M4.5 2L9 6.5L4.5 11"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Thumbnail strip ──────────────────────────────────────────── */}
        <div
          className="flex items-center gap-2 px-4 py-3 overflow-x-auto"
          style={{ background: "#060c18", borderTop: "1px solid #111d32" }}
        >
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                go(i, i > active ? "r" : "l");
                startTimers();
              }}
              className="pm-thumb-btn relative flex-shrink-0 rounded-lg overflow-hidden cursor-pointer p-0 border-0"
              style={{
                width: "72px",
                height: "46px",
                outline:
                  i === active ? `2px solid ${s.accent}` : "2px solid #162035",
                transform: i === active ? "scale(1.07)" : "scale(1)",
              }}
              aria-label={`Jump to ${s.tag}`}
            >
              <img
                src={s.image}
                alt={s.tag}
                draggable={false}
                className="w-full h-full object-cover"
                style={{
                  filter: i === active ? "brightness(.9)" : "brightness(.38)",
                }}
              />
              {i === active && (
                <div className="absolute bottom-0 left-0 right-0 px-1 pb-[3px]">
                  <span
                    className="pmf-b block text-center"
                    style={{
                      fontSize: "7.5px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                      color: s.accent,
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
              )}
            </button>
          ))}

          {/* Spacer + CTA */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="pmf-b ml-auto flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer no-underline"
            style={{
              color: "#5b8dee",
              border: "1px solid #1a2d4a",
              background: "transparent",
              transition: "background .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#131e35")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            View Project
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1.5 8.5L8.5 1.5M8.5 1.5H4.5M8.5 1.5V5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
