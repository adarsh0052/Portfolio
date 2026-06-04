import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function RocketScroller() {
  const { scrollY, scrollYProgress } = useScroll();

  // Track scroll velocity to make the thruster flame responsive to speed
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 60, damping: 15 });

  // Map scroll velocity to thruster flame size (bigger flame when scrolling faster)
  const flameScaleY = useTransform(smoothVelocity, [-3000, 0, 3000], [2, 1, 2]);
  const flameScaleX = useTransform(smoothVelocity, [-3000, 0, 3000], [1.3, 1, 1.3]);

  // Map scroll progress to vertical position (from 10vh to 90vh)
  const yProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const rocketY = useTransform(yProgress, [0, 1], ["8vh", "88vh"]);

  // Calculate tilt angle based on scroll direction/speed
  const rocketRotate = useTransform(smoothVelocity, [-2000, 2000], [-15, 15]);
  const smoothRotate = useSpring(rocketRotate, { stiffness: 80, damping: 12 });

  // Hover barrel roll animation trigger
  const [hoverRotate, setHoverRotate] = useState(0);

  // Generate particle trails based on scroll activity
  const [particles, setParticles] = useState<
    { id: number; top: string; left: string; scale: number }[]
  >([]);
  const particleId = useRef(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const interval = setInterval(() => {
      const currentScrollY = window.scrollY;
      const difference = Math.abs(currentScrollY - lastScrollY);

      // Emit particles if scrolling or randomly at lower rates when idle
      if (difference > 5 || Math.random() < 0.15) {
        const id = particleId.current++;
        // Position particles slightly offset under the engine (which is at the bottom of the rocket container)
        setParticles((prev) => [
          ...prev.slice(-15), // Keep last 15 particles
          {
            id,
            top: "100%",
            left: `${Math.random() * 20 + 40}%`, // centered under rocket nozzle
            scale: Math.random() * 0.8 + 0.4,
          },
        ]);
      }
      lastScrollY = currentScrollY;
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const triggerBarrelRoll = () => {
    setHoverRotate((prev) => prev + 360);
  };

  return (
    <div className="fixed right-4 md:right-8 top-0 bottom-0 w-12 pointer-events-none z-40 hidden sm:block">
      {/* Scroll track (dotted atmospheric orbit path) */}
      <div className="absolute left-1/2 top-[8vh] bottom-[8vh] w-px border-l border-dashed border-border/30 -translate-x-1/2 pointer-events-none">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-[var(--aurora)]/10 to-transparent" />
      </div>

      {/* Main Rocket Container */}
      <motion.div
        style={{
          top: rocketY,
          rotate: smoothRotate,
          y: "-50%", // Center on its current position
          x: "-50%",
          left: "50%",
        }}
        className="absolute w-12 h-20 pointer-events-auto cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onClick={triggerBarrelRoll}
      >
        <motion.div
          animate={{ rotateY: hoverRotate }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          {/* Engine Exhaust Glow Area */}
          <motion.div
            style={{ scaleY: flameScaleY, scaleX: flameScaleX }}
            className="absolute bottom-[-18px] left-[35%] w-[30%] h-6 origin-top"
          >
            {/* Inner intense flame */}
            <div className="w-full h-full bg-gradient-to-b from-[var(--solar)] via-[var(--ember)] to-transparent rounded-b-full blur-[1px]" />
            {/* Outer heat distortion/glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--solar)] to-transparent rounded-b-full blur-[3px] opacity-75" />
          </motion.div>

          {/* Detailed Rocket SVG */}
          <svg
            viewBox="0 0 100 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(255,255,255,0.08)]"
          >
            {/* Fin Shadow */}
            <path d="M15 110 L35 125 L35 100 Z" fill="#0c0d12" opacity="0.2" />
            <path d="M85 110 L65 125 L65 100 Z" fill="#0c0d12" opacity="0.2" />

            {/* Left Fin */}
            <path
              d="M35 85 L10 120 C10 130 20 132 30 126 L35 120 Z"
              fill="var(--tide)"
              stroke="var(--cosmos)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Right Fin */}
            <path
              d="M65 85 L90 120 C90 130 80 132 70 126 L65 120 Z"
              fill="var(--tide)"
              stroke="var(--cosmos)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Center Engine/Nozzle */}
            <path
              d="M40 120 L35 132 H65 L60 120 Z"
              fill="#2e303f"
              stroke="var(--cosmos)"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Main Rocket Body (Fuselage) */}
            <path
              d="M35 50 C35 25 50 10 50 10 C50 10 65 25 65 50 V120 H35 V50 Z"
              fill="white"
              stroke="var(--cosmos)"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            {/* Nose Cone Accent */}
            <path
              d="M38 40 C43 25 50 10 50 10 C50 10 57 25 62 40 Z"
              fill="var(--ember)"
              stroke="var(--cosmos)"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Porthole/Window Border */}
            <circle
              cx="50"
              cy="55"
              r="13"
              fill="#1e2230"
              stroke="var(--cosmos)"
              strokeWidth="2.5"
            />

            {/* Window Glass */}
            <circle cx="50" cy="55" r="10" fill="var(--aurora)" />

            {/* Window Shine */}
            <path
              d="M43 51 C45 47 49 46 52 47"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Lateral Booster Details (Lines on Body) */}
            <line x1="35" y1="75" x2="65" y2="75" stroke="#e4e7eb" strokeWidth="2" />
            <line x1="35" y1="95" x2="65" y2="95" stroke="#e4e7eb" strokeWidth="2" />

            {/* Decorative Stripe */}
            <rect x="36.5" y="80" width="27" height="8" fill="var(--aurora)" opacity="0.8" />
          </svg>
        </motion.div>

        {/* Floating Sparks/Particles emitting from engine */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: 0, opacity: 0.8, x: 0, scale: p.scale }}
            animate={{
              y: [0, Math.random() * 30 + 20],
              x: [0, (Math.random() - 0.5) * 16],
              opacity: [0.8, 0],
              scale: [p.scale, 0],
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: p.top,
              left: p.left,
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              backgroundColor: Math.random() > 0.5 ? "var(--solar)" : "var(--ember)",
              boxShadow: "0 0 8px var(--ember)",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
