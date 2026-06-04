import { motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import profileImage from "@/assets/profile.jpg";
import { Starfield } from "@/components/Starfield";
import { CursorCore } from "@/components/CursorCore";
import { SpaceStationDashboard } from "@/components/SpaceStationDashboard";
import { RocketScroller } from "@/components/RocketScroller";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adarsh Dadwal — Builder of Intelligent Products" },
      {
        name: "description",
        content:
          "Portfolio of Adarsh Dadwal. Full-stack & mobile engineer crafting thoughtful products at the intersection of code, design and AI.",
      },
      { property: "og:title", content: "Adarsh Dadwal — Builder of Intelligent Products" },
      { property: "og:description", content: "An interactive cosmic portfolio." },
    ],
  }),
  component: Index,
});

/* ----------------------------- Section wrapper ----------------------------- */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------- Elements ----------------------------- */
const ELEMENTS = [
  {
    key: "fire",
    glyph: "✦",
    name: "Fire",
    tagline: "Ambition",
    color: "var(--ember)",
    soft: "color-mix(in oklab, var(--ember) 8%, var(--card))",
    title: "Shipping code to production",
    body: "My first real coding breakthrough wasn't a school project. It was the drive to see my applications run live in the wild, which pushed me to master hosting, databases, and deployment pipelines independently. That focus on production-ready software still drives every line I write.",
  },
  {
    key: "water",
    glyph: "◐",
    name: "Water",
    tagline: "Adaptability",
    color: "var(--tide)",
    soft: "color-mix(in oklab, var(--tide) 8%, var(--card))",
    title: "Learning by shipping",
    body: "Working with SVP Studios in my second year, I contributed to shipping a major cross-platform React Native app to real devices. Seeing users interact with code I helped write rewired how I think about engineering — it's not just syntax, it's organizational impact.",
  },
  {
    key: "air",
    glyph: "✧",
    name: "Air",
    tagline: "Innovation",
    color: "var(--aurora)",
    soft: "color-mix(in oklab, var(--aurora) 8%, var(--card))",
    title: "Curiosity, on a loop",
    body: "Today I sit at the intersection of full-stack, mobile and intelligent systems. I'm drawn to software that thinks, assists and scales human capability — and to the quiet craft of making complex things feel effortless.",
  },
  {
    key: "earth",
    glyph: "◆",
    name: "Earth",
    tagline: "Execution",
    color: "var(--solar)",
    soft: "color-mix(in oklab, var(--solar) 8%, var(--card))",
    title: "Consistency over breakthroughs",
    body: "Maintaining a 9+ GPA across recent semesters while shipping side projects taught me what engineering really rewards: showing up every day and improving in small, stubborn increments.",
  },
] as const;

/* ----------------------------- Space Station Dashboard Import used below ----------------------------- */

/* ----------------------------- Skills ----------------------------- */
const SKILL_GROUPS = [
  { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "C++"] },
  {
    label: "Frameworks",
    items: ["React", "React Native", "Redux", "FastAPI", "LangChain", "LangGraph", "TensorFlow"],
  },
  {
    label: "Platforms",
    items: ["PostgreSQL", "Supabase", "ChromaDB", "Ollama", "Vercel", "Expo", "Git", "Figma"],
  },
  { label: "Foundations", items: ["DSA", "OOP", "DBMS", "Operating Systems"] },
];

function ConstellationBg({ index }: { index: number }) {
  switch (index) {
    case 0: // Ursa Major (Big Dipper)
      return (
        <svg className="absolute right-4 top-4 w-28 h-28 text-white/5 pointer-events-none select-none z-0 animate-twinkle" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="15" cy="50" r="1.5" fill="currentColor" />
          <circle cx="30" cy="45" r="1.5" fill="currentColor" />
          <circle cx="45" cy="48" r="1.5" fill="currentColor" />
          <circle cx="58" cy="58" r="1.5" fill="currentColor" />
          <circle cx="62" cy="78" r="1.5" fill="currentColor" />
          <circle cx="85" cy="80" r="1.5" fill="currentColor" />
          <circle cx="82" cy="60" r="1.5" fill="currentColor" />
          <path d="M15 50 L30 45 L45 48 L58 58 L62 78 L85 80 L82 60 L58 58" strokeDasharray="2 3" />
        </svg>
      );
    case 1: // Orion
      return (
        <svg className="absolute right-4 top-4 w-28 h-28 text-white/5 pointer-events-none select-none z-0 animate-twinkle" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="30" cy="20" r="1.5" fill="currentColor" />
          <circle cx="70" cy="25" r="1.5" fill="currentColor" />
          <circle cx="45" cy="50" r="1.2" fill="currentColor" />
          <circle cx="50" cy="50" r="1.2" fill="currentColor" />
          <circle cx="55" cy="50" r="1.2" fill="currentColor" />
          <circle cx="35" cy="80" r="1.5" fill="currentColor" />
          <circle cx="65" cy="78" r="1.5" fill="currentColor" />
          <path d="M30 20 L70 25 L55 50 L65 78 L35 80 L45 50 L30 20" strokeDasharray="2 3" />
          <path d="M45 50 L55 50" />
        </svg>
      );
    case 2: // Cassiopeia (W)
      return (
        <svg className="absolute right-4 top-4 w-28 h-28 text-white/5 pointer-events-none select-none z-0 animate-twinkle" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="15" cy="30" r="1.5" fill="currentColor" />
          <circle cx="35" cy="55" r="1.5" fill="currentColor" />
          <circle cx="50" cy="40" r="1.5" fill="currentColor" />
          <circle cx="65" cy="60" r="1.5" fill="currentColor" />
          <circle cx="85" cy="35" r="1.5" fill="currentColor" />
          <path d="M15 30 L35 55 L50 40 L65 60 L85 35" strokeDasharray="2 3" />
        </svg>
      );
    case 3: // Cygnus (The Cross)
      return (
        <svg className="absolute right-4 top-4 w-28 h-28 text-white/5 pointer-events-none select-none z-0 animate-twinkle" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="15" r="1.5" fill="currentColor" />
          <circle cx="50" cy="50" r="1.5" fill="currentColor" />
          <circle cx="50" cy="85" r="1.5" fill="currentColor" />
          <circle cx="20" cy="45" r="1.5" fill="currentColor" />
          <circle cx="80" cy="55" r="1.5" fill="currentColor" />
          <path d="M50 15 L50 85" strokeDasharray="2 3" />
          <path d="M20 45 L80 55" strokeDasharray="2 3" />
        </svg>
      );
    default:
      return null;
  }
}

function SkillConstellation() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {SKILL_GROUPS.map((g, idx) => (
        <motion.div
          key={g.label}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-7 backdrop-blur-xl shadow-soft"
        >
          <ConstellationBg index={idx} />
          <div className="relative z-10 flex items-baseline justify-between">
            <h4 className="font-display text-xl">{g.label}</h4>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              cluster {String(idx + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {g.items.map((s, i) => (
              <motion.span
                key={s}
                whileHover={{ y: -4, scale: 1.05 }}
                className="relative inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-sm"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full animate-twinkle"
                  style={{
                    background: [
                      "var(--ember)",
                      "var(--tide)",
                      "var(--aurora)",
                      "var(--solar)",
                      "var(--nebula)",
                    ][i % 5],
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ----------------------------- Journey mountains ----------------------------- */
const JOURNEY = [
  {
    year: "Early college",
    title: "System Foundations",
    text: "Dived deep into algorithms, data structures, and command-line automation, building a strong theoretical foundation.",
  },
  {
    year: "Year 2",
    title: "Front-End Developer – SVP Studios",
    text: "Contributed to shipping a major cross-platform React Native app for the organization, designing 20+ reusable UI components and optimizing production builds under constraints.",
  },
  {
    year: "Year 3",
    title: "Academic stride",
    text: "Held a 9+ GPA across the 5th and 6th semesters while building in parallel.",
  },
  {
    year: "2026",
    title: "SpenWyse Engine",
    text: "Built SpenWyse (smart expense tracking & personal finance engine) featuring custom expense pools and offline capabilities.",
  },
  {
    year: "Next",
    title: "Playstore Release & Scaling",
    text: "Deploying SpenWyse to the Google Play Store, while designing intelligent software products at scale.",
  },
];

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2" />
      <motion.div
        className="absolute left-4 top-0 w-px bg-gradient-to-b from-white via-amber-200/50 to-white/10 md:left-1/2"
        style={{ height: lineH }}
      />
      <ul className="space-y-14">
        {JOURNEY.map((j, i) => (
          <motion.li
            key={j.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45 }}
            className="relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-16"
          >
            {/* The absolute circle marker */}
            <div className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2">
              <motion.span
                initial={{ scale: 0.8, borderColor: "rgba(255, 255, 255, 0.2)", boxShadow: "0 0 0px rgba(0,0,0,0)" }}
                whileInView={{
                  scale: 1.1,
                  borderColor: "#ffffff",
                  boxShadow: "0 0 12px rgba(255, 255, 255, 0.8), 0 0 25px var(--solar)",
                }}
                viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.3, boxShadow: "0 0 20px #ffffff, 0 0 35px var(--solar)" }}
                className="block h-4 w-4 rounded-full bg-background border-2 transition-all duration-300"
              />
            </div>

            {/* Alternating layout for desktop, sequential block for mobile */}
            {i % 2 === 0 ? (
              <>
                <div className="md:text-right">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {j.year}
                  </div>
                  <h4 className="mt-1 font-display text-2xl">{j.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-justify">{j.text}</p>
                </div>
                <div className="hidden md:block" />
              </>
            ) : (
              <>
                <div className="hidden md:block" />
                <div className="md:text-left">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {j.year}
                  </div>
                  <h4 className="mt-1 font-display text-2xl">{j.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-justify">{j.text}</p>
                </div>
              </>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------- Contact terminal ----------------------------- */
function ContactTerminal() {
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="relative mx-auto max-w-2xl rounded-3xl border border-border bg-card/80 p-8 shadow-soft backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--ember)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--solar)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--aurora)]" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">
          transmission · open channel
        </span>
      </div>
      <div className="mt-5 space-y-2 font-mono text-sm">
        <p className="text-muted-foreground">{">"} establishing link with adarsh.dadwal ...</p>
        <p className="text-foreground">{">"} channel open. compose your message:</p>
      </div>
      <textarea
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        rows={4}
        placeholder="Type your transmission..."
        className="mt-4 w-full resize-none rounded-2xl border border-border bg-background/60 p-4 font-mono text-sm transmission-textarea"
      />
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            className="hover:text-[var(--ember)] transition"
            href="mailto:adarshdadwal25@gmail.com"
          >
            adarshdadwal25@gmail.com
          </a>
          <a
            className="hover:text-[var(--tide)] transition"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/adarsh0052"
          >
            GitHub
          </a>
          <a
            className="hover:text-[var(--nebula)] transition"
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/adarsh-dadwal-656040223/"
          >
            LinkedIn
          </a>
        </div>
        <motion.a
          href={`mailto:adarshdadwal25@gmail.com?body=${encodeURIComponent(msg)}`}
          onClick={() => setSent(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full btn-starry px-6 py-3 text-sm font-medium text-white shadow-soft transition-all"
        >
          {sent ? "Signal sent ✓" : "Send transmission →"}
        </motion.a>
      </div>
    </div>
  );
}

function OrbitingSatellite({ trailIdx }: { trailIdx: number }) {
  const satelliteRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const orbitCos = Math.cos((-20 * Math.PI) / 180);
    const orbitSin = Math.sin((-20 * Math.PI) / 180);
    const rx = 185;
    const ry = 60;
    
    let animationFrameId: number;
    const startTime = Date.now();
    
    const update = () => {
      // Pause animation when scrolled out of view to save CPU cycles
      if (typeof window !== "undefined" && window.scrollY > 800) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }

      const duration = 7000; // 7s per orbit
      const elapsed = Date.now() - startTime;
      const delay = trailIdx * 140; // 0.14s delay in ms
      const adjustedTime = (elapsed + delay) % duration;
      const progress = adjustedTime / duration;
      const angle = progress * Math.PI * 2;
      
      const x_flat = Math.cos(angle) * rx;
      const y_flat = Math.sin(angle) * ry;
      
      const px = x_flat * orbitCos - y_flat * orbitSin;
      const py = x_flat * orbitSin + y_flat * orbitCos;
      
      const sinA = Math.sin(angle);
      const zIndex = sinA > 0 ? 20 : 2;
      
      const scale = (1.0 - trailIdx * 0.15) * (0.8 + sinA * 0.25);
      const opacity = (1.0 - trailIdx * 0.2) * (0.65 + sinA * 0.35);
      
      if (satelliteRef.current) {
        satelliteRef.current.style.transform = `translate3d(${px}px, ${py}px, 0) scale(${scale})`;
        satelliteRef.current.style.zIndex = `${zIndex}`;
        satelliteRef.current.style.opacity = `${opacity}`;
      }
      
      animationFrameId = requestAnimationFrame(update);
    };
    
    update();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [trailIdx]);

  return (
    <div
      ref={satelliteRef}
      className="absolute rounded-full pointer-events-none"
      style={{
        left: "50%",
        top: "50%",
        width: trailIdx === 0 ? "16px" : "10px",
        height: trailIdx === 0 ? "16px" : "10px",
        marginLeft: trailIdx === 0 ? -8 : -5,
        marginTop: trailIdx === 0 ? -8 : -5,
        background:
          trailIdx === 0
            ? "linear-gradient(to right, #ffffff, #fef3c7)"
            : "rgba(255, 255, 255, 0.15)",
        boxShadow:
          trailIdx === 0
            ? "0 0 16px rgba(255, 255, 255, 0.85)"
            : "0 0 8px rgba(255, 255, 255, 0.2)",
        willChange: "transform, z-index, opacity",
      }}
    />
  );
}

/* ----------------------------- Page ----------------------------- */
function Index() {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const [entered, setEntered] = useState(false);
  const githubScrollRef = useRef<HTMLDivElement>(null);

  const handleGithubImageLoad = () => {
    if (githubScrollRef.current) {
      githubScrollRef.current.scrollLeft = githubScrollRef.current.scrollWidth;
    }
  };

  useEffect(() => {
    if (githubScrollRef.current) {
      githubScrollRef.current.scrollLeft = githubScrollRef.current.scrollWidth;
    }
  }, []);

  const enter = () => {
    setEntered(true);
    requestAnimationFrame(() => {
      document.getElementById("vision")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <Starfield count={100} className="fixed inset-0 z-0" />
      <main className="relative z-10 bg-transparent text-foreground overflow-x-hidden w-full">
        <CursorCore />
        <RocketScroller />

        {/* progress comet */}
        <motion.div
          className="fixed left-0 top-0 z-50 h-[3px] origin-left"
          style={{
            scaleX: scrollYProgress,
            background: "linear-gradient(90deg, #ffffff, #fcd34d, #ffffff)",
            width: "100%",
          }}
        />

        {/* HERO */}
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 text-center pt-8 pb-4">
            {/* Central Logo dot removed by user request */}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-2 font-serif text-5xl tracking-tight text-white leading-[1.0] sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            >
              Adarsh <span className="italic font-semibold text-starry">Dadwal</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-5 mb-10 max-w-2xl text-lg text-muted-foreground/90 sm:text-xl md:text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed text-justify"
            >
              Building intelligent products through code, design and a curiosity that refuses to
              settle.
            </motion.p>

            {/* Spacer for Centered Black Hole Visual (Pulled slightly up and smaller to fit Enter button) */}
            <div id="blackhole-spacer" className="w-full h-[60px] sm:h-[80px] md:h-[95px] pointer-events-none" />

            {/* Descriptive Person Summary Grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-18 grid grid-cols-1 gap-6 sm:grid-cols-3 w-full max-w-4xl border border-white/10 bg-slate-950/40 rounded-2xl p-6 backdrop-blur-lg text-left font-sans shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
            >
              <div className="border-b border-border/40 pb-4 sm:border-b-0 sm:pb-0 sm:border-r sm:pr-6">
                <span className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                  Focus Area
                </span>
                <h4 className="mt-1 text-lg sm:text-xl font-bold text-foreground font-sans">
                  Gen-AI & Mobile Development
                </h4>
                <p className="mt-1.5 text-sm sm:text-base text-muted-foreground text-justify">
                  Engineering fluid mobile frontends and secure databases.
                </p>
              </div>
              <div className="border-b border-border/40 py-4 sm:border-b-0 sm:py-0 sm:border-r sm:px-6">
                <span className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                  Affiliation
                </span>
                <h4 className="mt-1 text-lg sm:text-xl font-bold text-foreground font-sans">
                  Shoolini University
                </h4>
                <p className="mt-1.5 text-sm sm:text-base text-muted-foreground text-justify">
                  B.Tech Computer Science student building for production.
                </p>
              </div>
              <div className="pt-4 sm:pt-0 sm:pl-6">
                <span className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                  Active Mission
                </span>
                <h4 className="mt-1 text-lg sm:text-xl font-bold text-foreground font-sans">
                  Deploying SpenWyse Mobile
                </h4>
                <p className="mt-1.5 text-sm sm:text-base text-muted-foreground text-justify">
                  Launching smart expense pools directly to the PlayStore.
                </p>
              </div>
            </motion.div>

            <motion.button
              type="button"
              onClick={enter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative mt-6 inline-flex items-center gap-3 rounded-full btn-starry px-8 py-4 text-sm font-medium text-white"
            >
              <span className="relative font-mono uppercase tracking-[0.3em]">
                {entered ? "Universe online" : "Enter the universe"}
              </span>
              <motion.span
                className="relative"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </section>

        {/* INTRO / VISION */}
        <section id="vision" className="relative px-6 py-14">
          <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <div className="relative mx-auto h-[380px] w-[300px]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-6 rounded-[2rem] border border-dashed"
                  style={{ borderColor: "color-mix(in oklab, var(--cosmos) 25%, transparent)" }}
                />
                <div
                  className="absolute -inset-8 rounded-[2.5rem] opacity-60 blur-2xl"
                  style={{ background: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(251, 191, 36, 0.08) 50%, transparent 100%)" }}
                />
                <img
                  src={profileImage}
                  alt="Adarsh Dadwal portrait"
                  className="relative h-full w-full rounded-[1.75rem] object-cover shadow-soft"
                  style={{ zIndex: 10, transform: "translate3d(0, 0, 0)" }}
                />

                {/* Dashed Ellipse Orbit Track */}
                <svg
                  className="absolute inset-[-60px] pointer-events-none w-[calc(100%+120px)] h-[calc(100%+120px)]"
                  style={{ transform: "rotate(-20deg)", zIndex: 5 }}
                >
                  <ellipse
                    cx="50%"
                    cy="50%"
                    rx="185"
                    ry="60"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="1.2"
                    strokeDasharray="4 6"
                  />
                </svg>

                {/* Orbiting Satellite with 3D Depth Sorting and Trail */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <OrbitingSatellite key={i} trailIdx={i} />
                ))}

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 rounded-2xl border border-border bg-card px-4 py-3 text-xs font-mono shadow-soft z-20"
                >
                  <div className="text-muted-foreground">currently</div>
                  <div>orbiting Solan, IN</div>
                </motion.div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  ◐ chapter one · the engineer
                </div>
                <h2 className="mt-3 font-display text-5xl leading-tight md:text-6xl">
                  Most developers write syntax to learn. I build{" "}
                  <em className="not-italic text-starry">products</em> to master the craft.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-justify">
                  I believe that software engineering is fully realized when code meets the user.
                  Building systems, deploying them to live users, and iterating based on direct
                  usage metrics is the heartbeat of my workflow. Every project I tackle is a step
                  toward building faster, cleaner, and more resilient systems.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-justify">
                  I'm a B.Tech CS student at Shoolini University, focused on building end-to-end
                  applications, optimizing performance at the intersection of full-stack and mobile,
                  and crafting high-fidelity user experiences.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ELEMENTS — story */}
        <section className="relative px-6 py-14">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                ✧ four elements · one story
              </div>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">
                A journey through what shaped me
              </h2>
            </div>
          </Reveal>

          <div className="relative mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2">
            {ELEMENTS.map((el, i) => (
              <motion.article
                key={el.key}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-8 shadow-soft backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
              >
                <motion.div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-20 blur-2xl"
                  style={{ background: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(251, 191, 36, 0.08) 60%, transparent 100%)" }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 6, repeat: Infinity, delay: i * 0.5 }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40 + i * 5, repeat: Infinity, ease: "linear" }}
                  className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full text-white text-xl font-display border border-white/10 bg-slate-950/60 shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                >
                  <span className="text-starry">{el.glyph}</span>
                </motion.div>
                <div className="relative">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                    {el.name} · {el.tagline}
                  </div>
                  <h3 className="mt-4 font-display text-3xl">{el.title}</h3>
                  <p className="mt-4 text-foreground/75 leading-relaxed text-justify">{el.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* PROJECTS (SPACE STATION DOCKING HUB) */}
        <section className="relative px-6 py-14 overflow-hidden bg-gradient-to-b from-transparent via-[var(--cosmos)]/5 to-transparent">
          <div className="absolute inset-0 bg-grid-cyber opacity-15 pointer-events-none" />
          <Reveal>
            <div className="mx-auto max-w-4xl text-center mb-10">
              <h2 className="mt-3 font-display text-5xl md:text-6xl">Space Station Docking Hub</h2>
              <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-justify">
                Interact with the modules of the space station below to inspect the telemetry,
                engineering architecture, and integrated tech stacks of my shipped products.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto max-w-6xl relative z-10">
            <SpaceStationDashboard />
          </div>
        </section>

        {/* EXPERIENCE / JOURNEY */}
        <section className="relative px-6 py-14">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                ◆ earth world · the climb
              </div>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">The path so far</h2>
            </div>
          </Reveal>
          <div className="mt-10">
            <Journey />
          </div>
        </section>

        {/* SKILLS */}
        <section className="relative px-6 py-14">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                ✧ air world · the toolkit
              </div>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">What I work with</h2>
            </div>
          </Reveal>
          <div className="mx-auto mt-10 max-w-5xl">
            <SkillConstellation />
          </div>
        </section>

        {/* GITHUB ACTIVITY */}
        <section className="relative px-6 py-14">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mt-3 font-display text-5xl md:text-6xl">Signals from the workshop</h2>
              <p className="mt-5 text-muted-foreground text-justify">
                A live look at where my commits are landing this orbit.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-8 max-w-5xl">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-6 shadow-soft backdrop-blur-xl sm:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(255, 255, 255, 0.08), transparent 70%)" }}
                />
                <div className="relative flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      @adarsh0052 · contribution constellation
                    </div>
                    <h3 className="mt-2 font-display text-2xl">One year of starlight pixels</h3>
                  </div>
                  <a
                    href="https://github.com/adarsh0052"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full btn-starry px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em]"
                  >
                    View on GitHub ↗
                  </a>
                </div>
                <div ref={githubScrollRef} className="relative mt-8 overflow-x-auto">
                  <img
                    src="https://ghchart.rshah.org/000000/adarsh0052"
                    alt="Adarsh Dadwal's GitHub contribution chart"
                    className="min-w-[680px] w-full github-chart"
                    loading="lazy"
                    onLoad={handleGithubImageLoad}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section className="relative px-6 py-14">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                ✦ open a channel
              </div>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">Let's build something</h2>
              <p className="mt-5 text-muted-foreground text-justify">
                Working on something interesting? Looking for a collaborator? Send a transmission.
              </p>
            </div>
          </Reveal>
          <div className="mt-8">
            <ContactTerminal />
          </div>
        </section>

        <footer className="relative border-t border-border px-6 py-10 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            ✦ Adarsh Dadwal · crafted with curiosity · 2026
          </p>
        </footer>
      </main>
    </>
  );
}
