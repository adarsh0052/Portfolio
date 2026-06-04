import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export function CursorCore() {
  // Disable cursor trail completely on touch-only mobile devices to optimize scrolling performance
  const isTouchDevice = typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);
  if (isTouchDevice) return null;

  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const move = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      const lastX = mouseRef.current.x;
      const lastY = mouseRef.current.y;
      
      mouseRef.current.lastX = lastX;
      mouseRef.current.lastY = lastY;
      mouseRef.current.x = x;
      mouseRef.current.y = y;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 80}px, ${y - 80}px, 0)`;
      }

      // Compute cursor velocity vectors
      const dx = x - lastX;
      const dy = y - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Spawn shooting star trail particles on movement
      if (speed > 1) {
        const count = Math.min(Math.floor(speed / 4) + 1, 4);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: x + (Math.random() - 0.5) * 6,
            y: y + (Math.random() - 0.5) * 6,
            // Drag velocity opposite to cursor movement direction
            vx: -dx * 0.18 + (Math.random() - 0.5) * 1.5,
            vy: -dy * 0.18 + (Math.random() - 0.5) * 1.5,
            size: Math.random() * 1.8 + 0.6,
            alpha: 1.0,
            life: 0,
            maxLife: 20 + Math.random() * 25,
          });
        }
      }
    };
    window.addEventListener("mousemove", move);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98; // atmospheric drag
        p.vy *= 0.98;
        p.life++;
        p.alpha = 1.0 - p.life / p.maxLife;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle streak (shooting star look)
        ctx.beginPath();
        const grad = ctx.createLinearGradient(p.x, p.y, p.x - p.vx * 2.5, p.y - p.vy * 2.5);
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 0.9})`);
        grad.addColorStop(0.5, `rgba(254, 243, 199, ${p.alpha * 0.45})`); // warm starlight tint
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = p.size;
        ctx.lineCap = "round";
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 2.5, p.y - p.vy * 2.5);
        ctx.stroke();

        // Draw core star spark glow
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.95})`;
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 w-full h-full z-[98]"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[100] h-6 w-6 rounded-full mix-blend-screen"
        style={{
          left: 0,
          top: 0,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 70%)",
          willChange: "transform",
        }}
      />
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-[99] h-40 w-40 rounded-full opacity-30 blur-2xl"
        style={{
          left: 0,
          top: 0,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 70%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
