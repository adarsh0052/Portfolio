import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";

// Custom brand SVGs for the technology stacks to render authentic colored logos
function TechLogo({ name }: { name: string }) {
  switch (name) {
    case "React Native":
    case "React":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-3.5 h-3.5 fill-none stroke-[#61dafb]"
          strokeWidth="3"
        >
          <ellipse cx="50" cy="50" rx="15" ry="40" transform="rotate(0 50 50)" />
          <ellipse cx="50" cy="50" rx="15" ry="40" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="15" ry="40" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="6" fill="#61dafb" />
        </svg>
      );
    case "Expo":
      return (
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-current text-white">
          <path d="M50 15 L85 75 H15 Z M50 35 L70 70 H30 Z" />
        </svg>
      );
    case "TypeScript":
      return (
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5">
          <rect width="100" height="100" fill="#3178c6" rx="8" />
          <text
            x="88"
            y="82"
            fill="white"
            fontSize="46"
            fontWeight="bold"
            textAnchor="end"
            fontFamily="sans-serif"
          >
            TS
          </text>
        </svg>
      );
    case "Supabase":
      return (
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5">
          <path d="M55 10 L22 58 H48 L45 90 L78 42 H52 Z" fill="#3ecf8e" />
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-[#336791]">
          <path d="M50 10C25 10 15 35 15 55c0 15 10 25 25 30c5-5 5-15 0-20c-15-15-5-40 20-30c10 5 15 15 10 25c5 5 10 0 10-5c0-10-5-20-15-25c5-10 15-10 20 0c5 10 0 20-10 25c10 5 15-5 15-15c0-20-10-45-40-45z" />
        </svg>
      );
    case "FastAPI":
      return (
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5">
          <rect width="100" height="100" fill="#009688" rx="8" />
          <path d="M50 15 L80 40 L65 40 L65 85 L35 85 L35 40 L20 40 Z" fill="#05dec6" />
        </svg>
      );
    case "Python":
      return (
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5">
          <path
            d="M50 10c-15 0-18 2-18 6v10h18v6H22c-6 0-8 3-8 9v14c0 6 2 9 8 9h6v-8c0-8 6-14 14-14h18c6 0 8-3 8-9v-12c0-7-2-11-12-11H50zm0 18c-2.5 0-4-1.5-4-4s1.5-4 4-4 4 1.5 4 4-1.5 4-4 4z"
            fill="#3776ab"
          />
          <path
            d="M50 90c15 0 18-2 18-6v-10H50v-6h28c6 0 8-3 8-9v-14c0-6-2-9-8-9h-6v8c0 8-6 14-14 14H40c-6 0-8 3-8 9v12c0 7 2 11 12 11h16zm0-18c2.5 0 4 1.5 4 4s-1.5 4-4 4-4-1.5-4-4 1.5-4 4-4z"
            fill="#ffd343"
          />
        </svg>
      );
    case "LangChain":
      return (
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5">
          <circle cx="50" cy="50" r="45" fill="#1e293b" />
          <text
            x="50"
            y="65"
            fill="#38bdf8"
            fontSize="42"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
          >
            🦜
          </text>
        </svg>
      );
    case "LLMs":
      return (
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5">
          <rect width="90" height="90" x="5" y="5" fill="#8b5cf6" rx="12" />
          <path d="M30 30 H70 V70 H30 Z" fill="none" stroke="white" strokeWidth="4" />
          <circle cx="50" cy="50" r="10" fill="#f43f5e" />
          <line x1="50" y1="5" x2="50" y2="30" stroke="white" strokeWidth="4" />
          <line x1="50" y1="70" x2="50" y2="95" stroke="white" strokeWidth="4" />
          <line x1="5" y1="50" x2="30" y2="50" stroke="white" strokeWidth="4" />
          <line x1="70" y1="50" x2="95" y2="50" stroke="white" strokeWidth="4" />
        </svg>
      );
    case "SciPy":
      return (
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5">
          <circle cx="50" cy="50" r="42" fill="#134e5e" />
          <path d="M25 50 Q40 20 50 50 T75 50" fill="none" stroke="#00f2fe" strokeWidth="5" />
        </svg>
      );
    case "Matplotlib":
      return (
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5">
          <rect width="100" height="100" fill="#1e293b" rx="8" />
          <rect x="20" y="55" width="12" height="25" fill="#3b82f6" />
          <rect x="42" y="30" width="12" height="50" fill="#10b981" />
          <rect x="64" y="15" width="12" height="65" fill="#f59e0b" />
        </svg>
      );
    case "Decision Systems":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-3.5 h-3.5 fill-none stroke-[#f59e0b]"
          strokeWidth="8"
        >
          <circle cx="50" cy="50" r="40" />
          <path d="M50 20 L60 50 L50 80 L40 50 Z" fill="#ef4444" stroke="none" />
          <path d="M50 50 L60 50 L50 80 L40 50 Z" fill="#3b82f6" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

interface ProjectModule {
  id: string;
  name: string;
  role: string;
  codeName: string;
  stack: { name: string }[];
  problem: string;
  solution: string;
  color: string;
  link: string;
  tag: string;
  flow: string[];
}

const STATION_MODULES: ProjectModule[] = [
  {
    id: "spenwyse",
    name: "SpenWyse",
    role: "Smart expense tracking & personal finance engine",
    codeName: "PROJECT 01",
    tag: "MOBILE // SYSTEM ACTIVE",
    stack: [
      { name: "React Native" },
      { name: "Expo" },
      { name: "TypeScript" },
      { name: "Supabase" },
      { name: "PostgreSQL" },
    ],
    problem:
      "Personal finance categories are often rigid, making it difficult to analyze spending pools and daily budgets.",
    solution:
      "I engineered a finance engine serving as a single source of truth for spending limits, heatmaps, and habit streaks.",
    color: "#60a5fa", // tide blue
    link: "https://github.com/adarsh0052/SpenWyse",
    flow: ["Expo Client", "Supabase Auth", "PostgreSQL DB"],
  },
  {
    id: "resurank",
    name: "ResuRank",
    role: "Automated candidate screening & scoring dashboard",
    codeName: "PROJECT 02",
    tag: "AI & WEB // SYSTEM ACTIVE",
    stack: [
      { name: "React" },
      { name: "FastAPI" },
      { name: "Python" },
      { name: "LangChain" },
      { name: "LLMs" },
    ],
    problem:
      "Recruiting pipelines are overwhelmed by high volumes of resumes, causing matching errors and letting qualified candidates slip through manual screens.",
    solution:
      "I designed and deployed ResuRank to parse resumes against custom criteria, ranking candidates with transparent explanations and detailed matching breakdowns.",
    color: "#c084fc", // nebula purple
    link: "https://github.com/adarsh0052/Resurank",
    flow: ["Resume PDF", "LangChain Parse", "LLM Matcher"],
  },
  {
    id: "tradepilot",
    name: "TradePilot",
    role: "Market signals & algorithmic decision companion",
    codeName: "PROJECT 03",
    tag: "ALGORITHMIC // ARCHIVED",
    stack: [
      { name: "Python" },
      { name: "SciPy" },
      { name: "Matplotlib" },
      { name: "Decision Systems" },
    ],
    problem:
      "Market decision-making suffers from emotional bias, noisy chart data, and lack of repeatable signals.",
    solution:
      "I developed a decision companion built around statistical market indicators and rigid risk containment rules.",
    color: "#f59e0b", // amber (less highlighted)
    link: "https://github.com/adarsh0052/TradePilot",
    flow: ["Ticker Stream", "Signal Metrics", "Risk Gate"],
  },
];

export function SpaceStationDashboard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const activeModule = STATION_MODULES[activeIdx] || STATION_MODULES[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] items-stretch w-full max-w-6xl mx-auto font-mono text-sm text-foreground/85">
      {/* LEFT: Structural Space Station Blueprint Layout */}
      <div className="relative rounded-3xl border border-border bg-card/10 p-6 flex flex-col items-center justify-center min-h-[520px] overflow-visible">
        {/* Soft elegant gradient blur in center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.015)_0%,transparent_70%)] pointer-events-none" />

        {/* Architectural grid paper texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-grid-cyber pointer-events-none" />

        {/* Space Station Schematic SVG (Upscaled for larger image size) */}
        <div className="w-full max-w-[480px] relative z-10 aspect-square my-2 select-none">
          <svg
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Concentric orbit guide lines */}
            <circle
              cx="250"
              cy="250"
              r="200"
              stroke="var(--border)"
              strokeWidth="0.75"
              strokeDasharray="3 5"
              opacity="0.3"
            />
            <circle
              cx="250"
              cy="250"
              r="140"
              stroke="var(--border)"
              strokeWidth="0.75"
              strokeDasharray="5 5"
              opacity="0.3"
            />

            {/* CORRIDORS (Longer and thicker) */}
            {/* Corridor to TradePilot (Top Left) */}
            <line
              x1="250"
              y1="250"
              x2="110"
              y2="110"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="4"
              className="transition-all duration-300"
            />
            {activeIdx === 2 && (
              <line
                x1="250"
                y1="250"
                x2="110"
                y2="110"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray="5 3"
              />
            )}

            {/* Corridor to ResuRank (Top Right) */}
            <line
              x1="250"
              y1="250"
              x2="390"
              y2="110"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="4"
              className="transition-all duration-300"
            />
            {activeIdx === 1 && (
              <line
                x1="250"
                y1="250"
                x2="390"
                y2="110"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray="5 3"
              />
            )}

            {/* Corridor to SpenWyse (Bottom) */}
            <line
              x1="250"
              y1="250"
              x2="250"
              y2="400"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="4"
              className="transition-all duration-300"
            />
            {activeIdx === 0 && (
              <line
                x1="250"
                y1="250"
                x2="250"
                y2="400"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray="5 3"
              />
            )}

            {/* SOLAR PANELS / TRUSS STRUCTURES (Detailed engineering layout) */}
            {/* Left Solar Panel Boom */}
            <line x1="250" y1="250" x2="40" y2="250" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="6" />
            {/* Right Solar Panel Boom */}
            <line x1="250" y1="250" x2="460" y2="250" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="6" />

            {/* Structural diagonal trusses connecting core to outer rails */}
            <line x1="250" y1="250" x2="100" y2="160" stroke="#ffffff" strokeWidth="1.2" opacity="0.35" />
            <line x1="250" y1="250" x2="100" y2="340" stroke="#ffffff" strokeWidth="1.2" opacity="0.35" />
            <line x1="250" y1="250" x2="400" y2="160" stroke="#ffffff" strokeWidth="1.2" opacity="0.35" />
            <line x1="250" y1="250" x2="400" y2="340" stroke="#ffffff" strokeWidth="1.2" opacity="0.35" />
            <line x1="100" y1="160" x2="100" y2="340" stroke="#ffffff" strokeWidth="2.5" opacity="0.5" />
            <line x1="400" y1="160" x2="400" y2="340" stroke="#ffffff" strokeWidth="2.5" opacity="0.5" />

            {/* Left Solar Wing Array (Solid white, detailed cells) */}
            <g className="animate-solar-pitch origin-[110px_250px] transition-all">
              <line x1="45" y1="100" x2="45" y2="400" stroke="#cbd5e1" strokeWidth="3" />
              {/* Upper Panels */}
              <rect x="25" y="100" width="40" height="60" rx="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <line x1="25" y1="120" x2="65" y2="120" stroke="#000000" strokeWidth="0.5" />
              <line x1="25" y1="140" x2="65" y2="140" stroke="#000000" strokeWidth="0.5" />
              
              <rect x="25" y="170" width="40" height="60" rx="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <line x1="25" y1="190" x2="65" y2="190" stroke="#000000" strokeWidth="0.5" />
              <line x1="25" y1="210" x2="65" y2="210" stroke="#000000" strokeWidth="0.5" />

              {/* Lower Panels */}
              <rect x="25" y="270" width="40" height="60" rx="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <line x1="25" y1="290" x2="65" y2="290" stroke="#000000" strokeWidth="0.5" />
              <line x1="25" y1="310" x2="65" y2="310" stroke="#000000" strokeWidth="0.5" />
              
              <rect x="25" y="340" width="40" height="60" rx="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <line x1="25" y1="360" x2="65" y2="360" stroke="#000000" strokeWidth="0.5" />
              <line x1="25" y1="380" x2="65" y2="380" stroke="#000000" strokeWidth="0.5" />
            </g>

            {/* Right Solar Wing Array (Solid white, detailed cells) */}
            <g
              className="animate-solar-pitch origin-[390px_250px] transition-all"
              style={{ animationDelay: "3s" }}
            >
              <line x1="455" y1="100" x2="455" y2="400" stroke="#cbd5e1" strokeWidth="3" />
              {/* Upper Panels */}
              <rect x="435" y="100" width="40" height="60" rx="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <line x1="435" y1="120" x2="475" y2="120" stroke="#000000" strokeWidth="0.5" />
              <line x1="435" y1="140" x2="475" y2="140" stroke="#000000" strokeWidth="0.5" />

              <rect x="435" y="170" width="40" height="60" rx="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <line x1="435" y1="190" x2="475" y2="190" stroke="#000000" strokeWidth="0.5" />
              <line x1="435" y1="210" x2="475" y2="210" stroke="#000000" strokeWidth="0.5" />

              {/* Lower Panels */}
              <rect x="435" y="270" width="40" height="60" rx="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <line x1="435" y1="290" x2="475" y2="290" stroke="#000000" strokeWidth="0.5" />
              <line x1="435" y1="310" x2="475" y2="310" stroke="#000000" strokeWidth="0.5" />

              <rect x="435" y="340" width="40" height="60" rx="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <line x1="435" y1="360" x2="475" y2="360" stroke="#000000" strokeWidth="0.5" />
              <line x1="435" y1="380" x2="475" y2="380" stroke="#000000" strokeWidth="0.5" />
            </g>

            {/* CENTRAL COMMAND CORE (Solid white with dark inner bay) */}
            <g>
              <circle
                cx="250"
                cy="250"
                r="48"
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="2.5"
              />
              <circle
                cx="250"
                cy="250"
                r="36"
                fill="#1e293b"
                stroke="#ffffff"
                strokeWidth="1"
              />
              <circle cx="250" cy="250" r="16" fill="rgba(255, 255, 255, 0.15)" />
              <circle cx="250" cy="250" r="6" fill="#ffffff" className="animate-pulse" />
            </g>

            {/* MODULE DOCK PANELS (Solid white with technical panel detailing) */}
            {/* SpenWyse Docking Port */}
            <g className="cursor-pointer" onClick={() => setActiveIdx(0)}>
              <rect
                x="220"
                y="355"
                width="60"
                height="65"
                rx="8"
                fill="#ffffff"
                stroke={activeIdx === 0 ? "#000000" : "rgba(255, 255, 255, 0.4)"}
                strokeWidth="2"
                className="transition-all duration-300"
                style={{
                  filter: activeIdx === 0 ? "drop-shadow(0 0 16px rgba(255, 255, 255, 0.8))" : "none",
                }}
              />
              <line x1="220" y1="375" x2="280" y2="375" stroke="#475569" strokeWidth="0.75" />
              <line x1="220" y1="395" x2="280" y2="395" stroke="#475569" strokeWidth="0.75" />
              <circle cx="250" cy="385" r="4" fill="#030306" className="animate-pulse" />
            </g>

            {/* ResuRank Docking Port */}
            <g className="cursor-pointer" onClick={() => setActiveIdx(1)}>
              <circle
                cx="390"
                cy="110"
                r="26"
                fill="#ffffff"
                stroke={activeIdx === 1 ? "#000000" : "rgba(255, 255, 255, 0.4)"}
                strokeWidth="2"
                className="transition-all duration-300"
                style={{
                  filter: activeIdx === 1 ? "drop-shadow(0 0 16px rgba(255, 255, 255, 0.8))" : "none",
                }}
              />
              <circle cx="390" cy="110" r="18" fill="none" stroke="#475569" strokeWidth="0.5" />
              <circle cx="390" cy="110" r="4" fill="#030306" className="animate-pulse" />
            </g>

            {/* TradePilot Docking Port */}
            <g className="cursor-pointer" onClick={() => setActiveIdx(2)}>
              <polygon
                points="110,80 138,108 128,144 92,144 82,108"
                fill="#ffffff"
                stroke={activeIdx === 2 ? "#000000" : "rgba(255, 255, 255, 0.4)"}
                strokeWidth="2"
                className="transition-all duration-300"
                style={{
                  filter: activeIdx === 2 ? "drop-shadow(0 0 12px rgba(255, 255, 255, 0.7))" : "none",
                }}
              />
              <line x1="110" y1="108" x2="110" y2="135" stroke="#475569" strokeWidth="0.75" />
              <circle cx="110" cy="116" r="4.5" fill="#030306" />
            </g>
          </svg>
        </div>

        {/* ABSOLUTE INTERACTIVE LABELS (PROJECT BADGES) - Stacked on mobile to prevent layout overflow */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 w-full md:contents">
          {/* Project 01: SpenWyse (Bottom) */}
          <div
            onClick={() => setActiveIdx(0)}
            onMouseEnter={() => setHoveredIdx(0)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`relative md:absolute md:bottom-3 md:left-1/2 md:-translate-x-1/2 cursor-pointer z-20 rounded-xl px-4 py-2 border text-center transition-all duration-300 backdrop-blur-md w-full max-w-[240px] md:w-[170px] select-none ${
              activeIdx === 0
                ? "bg-white/10 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                : "bg-background/80 border-border hover:border-slate-400 text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="font-mono text-[8px] uppercase tracking-widest opacity-60">
              PRIMARY PROJECT
            </div>
            <div className="text-xs font-bold font-mono mt-0.5">01 / SpenWyse</div>
          </div>

          {/* Project 02: ResuRank (Top Right) */}
          <div
            onClick={() => setActiveIdx(1)}
            onMouseEnter={() => setHoveredIdx(1)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`relative md:absolute md:top-10 md:right-6 cursor-pointer z-20 rounded-xl px-4 py-2 border transition-all duration-300 backdrop-blur-md w-full max-w-[240px] md:w-[170px] text-center md:text-left select-none ${
              activeIdx === 1
                ? "bg-white/10 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                : "bg-background/80 border-border hover:border-slate-400 text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="font-mono text-[8px] uppercase tracking-widest opacity-60">
              PRIMARY PROJECT
            </div>
            <div className="text-xs font-bold font-mono mt-0.5">02 / ResuRank</div>
          </div>

          {/* Project 03: TradePilot (Top Left - Muted Highlight) */}
          <div
            onClick={() => setActiveIdx(2)}
            onMouseEnter={() => setHoveredIdx(2)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`relative md:absolute md:top-10 md:left-6 cursor-pointer z-20 rounded-xl px-4 py-2 border transition-all duration-300 backdrop-blur-md w-full max-w-[240px] md:w-[170px] text-center md:text-left select-none ${
              activeIdx === 2
                ? "bg-white/10 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                : "bg-background/60 border-border/80 hover:border-slate-500 text-muted-foreground/75 hover:text-foreground/90"
            }`}
          >
            <div className="font-mono text-[8px] uppercase tracking-widest opacity-50">
              AUX SYSTEM
            </div>
            <div className="text-xs font-bold font-mono mt-0.5">03 / TradePilot</div>
          </div>
        </div>
      </div>

      {/* RIGHT: Editorial Dossier Card */}
      <div className="relative border border-border bg-card/40 rounded-3xl p-5 sm:p-8 shadow-soft flex flex-col justify-between overflow-hidden">
        {/* Soft grid background */}
        <div className="absolute inset-0 opacity-[0.015] bg-grid-cyber pointer-events-none" />

        {/* Content Segment */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 pt-2"
            >
              <div>
                <h3 className="font-display text-5xl md:text-6xl text-foreground font-semibold italic">
                  {activeModule.name}
                </h3>
                <p className="mt-2 text-lg md:text-xl text-foreground/90 leading-relaxed font-sans font-light">
                  {activeModule.role}
                </p>
              </div>

              {/* SPECIFICATION DETAILS */}
              <div className="space-y-5 pt-5 border-t border-border/40 font-sans">
                <div>
                  <h4 className="font-mono text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-bold">
                    The Challenge
                  </h4>
                  <p className="mt-1 text-base text-foreground/85 leading-relaxed font-light text-justify">
                    {activeModule.problem}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-bold">
                    The Solution
                  </h4>
                  <p className="mt-1 text-base text-foreground/85 leading-relaxed font-light text-justify">
                    {activeModule.solution}
                  </p>
                </div>
              </div>

              {/* DYNAMIC PIPELINE CHART FLOW */}
              <div className="pt-5 border-t border-border/40">
                <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-bold">
                  Data Pipeline Architecture
                </span>
                <div className="mt-3 flex flex-col md:flex-row md:items-center items-center gap-2 md:gap-1.5 font-mono text-sm text-muted-foreground w-full">
                  {activeModule.flow.map((step, i) => (
                    <div key={step} className="flex flex-col md:flex-row items-center gap-2 md:gap-1.5 w-full md:w-auto">
                      <span className="bg-background/80 border border-border/60 px-3 py-1.5 md:px-2.5 md:py-1 rounded text-foreground text-xs text-center w-full md:w-auto block">
                        {step}
                      </span>
                      {i < activeModule.flow.length - 1 && (
                        <>
                          {/* Desktop Chevron */}
                          <ChevronRight className="hidden md:block w-3.5 h-3.5 opacity-60" />
                          {/* Mobile Chevron */}
                          <ChevronDown className="block md:hidden w-4 h-4 opacity-60 text-muted-foreground/80 my-0.5" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Tag Array with Respective Icons */}
              <div className="pt-5 border-t border-border/40 font-mono">
                <span className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-bold">
                  Integrated Stack
                </span>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {activeModule.stack.map((tech) => {
                    return (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 rounded border border-border bg-background/50 px-2.5 py-1 text-sm text-muted-foreground shadow-sm"
                      >
                        <TechLogo name={tech.name} />
                        {tech.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dossier Footer with Starry Link */}
        <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-end font-mono">
          <a
            href={activeModule.link}
            target="_blank"
            rel="noreferrer"
            className="text-white-starry hover:underline transition-all flex items-center gap-1.5 font-bold text-base"
          >
            <span>GitHub Repository Link</span>
            <ChevronRight className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}
