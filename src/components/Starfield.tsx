import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  phase: number;
  twinkleSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  dx: number;
  dy: number;
  length: number;
  speed: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function Starfield({ count = 120, className = "" }: { count?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isMobile = window.innerWidth < 768;

    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];

    // Accretion disk particles
    interface BlackHoleParticle {
      r: number;
      angle: number;
      speed: number;
      size: number;
      color: string;
    }
    const bhParticles: BlackHoleParticle[] = [];

    const initStars = (w: number, h: number) => {
      stars.length = 0;
      // Uniformly distributed stars representing a realistic starry night sky (reduced on mobile)
      const starCount = isMobile ? 40 : Math.max(count * 2.5, 320);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 4 + 1, // depth parallax
          size: Math.random() * 1.3 + 0.25, // small, sharp starlight nodes
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.008 + Math.random() * 0.022, // slow, organic twinkling
        });
      }
    };

    const initBlackHoleParticles = (w: number, h: number) => {
      bhParticles.length = 0;
      const R_bh = Math.min(w, h) * 0.065 + 12; // event horizon radius
      const numParticles = isMobile ? 120 : 180;
      const maxAllowedDist = w / 2 - 20; // 20px padding from screen edge

      for (let i = 0; i < numParticles; i++) {
        // Calculate a safe maximum orbit radius for this screen width to prevent horizontal overflow
        const maxR = Math.max(
          R_bh * 1.25,
          Math.min(
            R_bh * 1.25 + (Math.min(w, h) * (isMobile ? 0.08 : 0.22)),
            maxAllowedDist * 0.8
          )
        );
        const minR = R_bh * 1.25;

        // Radius of accretion disk orbits (scaled down on mobile to prevent screen overflow)
        const r = minR + Math.random() * (maxR - minR);
        const angle = isMobile
  ? (i / numParticles) * Math.PI * 2   // evenly spaced for static ring
  : Math.random() * Math.PI * 2; 
        // Keplerian orbital speed (slower further out)
        const speed = (0.003 + Math.random() * 0.003) * Math.sqrt((R_bh * 1.4) / r);
        const size = Math.random() * 1.7 + 0.55;

        // Custom orange-yellow glow brand spectrum
        const colorRand = Math.random();
        let color = "";
        if (colorRand > 0.82) {
          color = "rgba(255, 255, 255, "; // hot white core
        } else if (colorRand > 0.45) {
          color = "rgba(254, 215, 170, "; // light amber gas
        } else if (colorRand > 0.18) {
          color = "rgba(253, 186, 116, "; // warm orange
        } else {
          color = "rgba(249, 115, 22, "; // deep reddish orange
        }

        bhParticles.push({ r, angle, speed, size, color });
      }
    };

    const handleResize = () => {
      // Use client dimensions to exclude scrollbar widths and prevent overflow
      width = document.documentElement.clientWidth;
      height = document.documentElement.clientHeight;
      isMobile = width < 768; // Update closure variable

      // Throttle DPR on mobile to reduce WebKit context blending and scroll-stutter
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initStars(width, height);
      initBlackHoleParticles(width, height);

      // Force-render a frame on resize to prevent flashes
      wakeUpLoop();
    };



    const spawnShootingStar = () => {
      if (Math.random() > 0.0006) return;
      if (shootingStars.length >= 2) return;

      const startX = Math.random() * width;
      const startY = (Math.random() * height) / 3;

      const angle = Math.PI / 6 + Math.random() * (Math.PI / 6);
      const speed = Math.random() * 7 + 4;

      shootingStars.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length: Math.random() * 70 + 40,
        speed,
        opacity: 0.9,
        life: 0,
        maxLife: Math.random() * 20 + 20,
      });
    };

    let smoothScrollY = scrollYRef.current;
    let frameCount = 0;
    let isRunning = true;

    const drawFrame = (bhOpacity: number) => {
      // Deep celestial dark backdrop
      ctx.fillStyle = "#020204";
      ctx.fillRect(0, 0, width, height);

      // Draw normal background stars (Twinkling, uniform layout like night sky)
      stars.forEach((star) => {
        const starParallax = smoothScrollY * (0.04 + 0.12 / star.z);
        let drawY = (star.y - starParallax) % height;
        if (drawY < 0) drawY += height;

        star.phase += star.twinkleSpeed;
        const opacity = 0.22 + Math.abs(Math.sin(star.phase)) * 0.78;
        const size = star.size * (1.15 / Math.sqrt(star.z));

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.95})`;

        if (star.size > 1.1 && !isMobile) {
          ctx.shadowBlur = 3;
          ctx.shadowColor = "rgba(255, 255, 255, 0.75)";
        }

        ctx.arc(star.x, drawY, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // RENDER LIVE BLACK HOLE (Desktop only to prevent mobile rendering lag and layout overflow)
      if (bhOpacity > 0) {
        const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;

        const spacer = document.getElementById("blackhole-spacer");
        let centerX = w / 2;
        let centerY = h * 0.42 - smoothScrollY;

        if (spacer) {
          const rect = spacer.getBoundingClientRect();
          if (rect.width > 0) {
            const absoluteSpacerY = rect.top + window.scrollY;
            centerY = absoluteSpacerY + rect.height / 2 - smoothScrollY;
            // Align with spacer center exactly
            centerX = rect.left + rect.width / 2;
          }
        }

        const R_bh = Math.min(width, height) * 0.065 + 12; // event horizon radius

        // 1. Draw lensed space nebula backdrop around the singularity
        const nebGrad = ctx.createRadialGradient(
          centerX,
          centerY,
          R_bh * 0.5,
          centerX,
          centerY,
          R_bh * 6,
        );
        nebGrad.addColorStop(0, `rgba(29, 78, 216, ${0.28 * bhOpacity})`); // deep cosmic blue
        nebGrad.addColorStop(0.35, `rgba(88, 28, 135, ${0.14 * bhOpacity})`); // indigo purple
        nebGrad.addColorStop(0.7, `rgba(8, 15, 30, ${0.06 * bhOpacity})`); // dark outline
        nebGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = nebGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, R_bh * 6, 0, Math.PI * 2);
        ctx.fill();

        // Update accretion disk particle vectors (only on desktop to make mobile fully static)
        if (!isMobile) {
          bhParticles.forEach((p) => {
            p.angle += p.speed;
          });
        }

        // 2. Draw BACK HALF of lensed accretion disk (where particles orbit behind singularity: sin(angle) <= 0)
        if (isMobile) {
          // Clean static rings — no particles
          [
            { r: R_bh * 3.0, color: "rgba(249, 115, 22,",   lineW: 14, alpha: 0.13 },
            { r: R_bh * 2.3, color: "rgba(253, 186, 116,",  lineW: 9,  alpha: 0.22 },
            { r: R_bh * 1.75, color: "rgba(254, 215, 170,", lineW: 5,  alpha: 0.30 },
          ].forEach(({ r, color, lineW, alpha }) => {
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
            ctx.strokeStyle = `${color}${alpha * bhOpacity})`;
            ctx.lineWidth = lineW;
            ctx.stroke();
          });
        } else {
        bhParticles.forEach((p) => {
          const sinA = Math.sin(p.angle);
          if (sinA <= 0) {
            // Flat orbit coordinates (tilted by 0.2)
            const x_flat = Math.cos(p.angle) * p.r;
            const y_flat = sinA * p.r * 0.2;

            // Apply physical gravitational lensing distortion: bend coordinates around event horizon
            const d = Math.sqrt(x_flat * x_flat + y_flat * y_flat) || 0.001;
            const d_lensed = d + (R_bh * R_bh * 1.35) / d;
            const px = centerX + x_flat * (d_lensed / d);
            const py = centerY + y_flat * (d_lensed / d);

            const size = p.size * (0.85 + (1 - d / (R_bh * 4)) * 0.4);
            const alpha = bhOpacity * (0.35 + Math.abs(Math.sin(p.angle)) * 0.65);
            ctx.fillStyle = `${p.color}${alpha.toFixed(3)})`;

            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        })};

        // 3. Draw Event Horizon (The dark void sphere)
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(centerX, centerY, R_bh, 0, Math.PI * 2);
        ctx.fill();

        // 4. Draw Photon Sphere Ring (Einstein Ring wrapping horizon)
        const ringGrad = ctx.createRadialGradient(
          centerX,
          centerY,
          R_bh * 0.92,
          centerX,
          centerY,
          R_bh * 1.38,
        );
        ringGrad.addColorStop(0, `rgba(0, 0, 0, ${bhOpacity})`);
        ringGrad.addColorStop(0.12, `rgba(255, 255, 255, ${bhOpacity})`); // white hot inner boundary
        ringGrad.addColorStop(0.35, `rgba(253, 186, 116, ${0.9 * bhOpacity})`); // amber ring
        ringGrad.addColorStop(0.7, `rgba(249, 115, 22, ${0.45 * bhOpacity})`); // orange ring edge
        ringGrad.addColorStop(1, `rgba(0, 0, 0, 0)`);
        ctx.fillStyle = ringGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, R_bh * 1.4, 0, Math.PI * 2);
        ctx.fill();

        // 5. Draw FRONT HALF of accretion disk (passing in front of singularity: sin(angle) > 0)
        if (!isMobile) {
        bhParticles.forEach((p) => {
          const sinA = Math.sin(p.angle);
          if (sinA > 0) {
            const x_flat = Math.cos(p.angle) * p.r;
            const y_flat = sinA * p.r * 0.2;

            const d = Math.sqrt(x_flat * x_flat + y_flat * y_flat) || 0.001;
            const d_lensed = d + (R_bh * R_bh * 1.35) / d;
            const px = centerX + x_flat * (d_lensed / d);
            const py = centerY + y_flat * (d_lensed / d);

            const size = p.size * (0.85 + (1 - d / (R_bh * 4)) * 0.4);
            const alpha = bhOpacity * (0.35 + Math.abs(Math.sin(p.angle)) * 0.65);
            ctx.fillStyle = `${p.color}${alpha.toFixed(3)})`;

            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        })};
      }

      // Draw shooting stars (only when scrolled down or when black hole is muted to keep focus clean)
      if (bhOpacity < 0.6) {
        spawnShootingStar();
        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const ss = shootingStars[i];

          ctx.beginPath();
          const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.dx * 1.5, ss.y - ss.dy * 1.5);
          grad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
          grad.addColorStop(0.3, `rgba(220, 240, 255, ${ss.opacity * 0.5})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.0;
          ctx.lineCap = "round";
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(ss.x - ss.dx * (ss.length / ss.speed), ss.y - ss.dy * (ss.length / ss.speed));
          ctx.stroke();

          ss.x += ss.dx;
          ss.y += ss.dy;
          ss.life++;

          if (ss.life > ss.maxLife * 0.7) {
            ss.opacity = 0.9 * (1 - (ss.life - ss.maxLife * 0.7) / (ss.maxLife * 0.3));
          }

          if (ss.life >= ss.maxLife || ss.x > width || ss.y > height) {
            shootingStars.splice(i, 1);
          }
        }
      }
    };

    const animate = () => {
      smoothScrollY += (scrollYRef.current - smoothScrollY) * 0.1;

      // Skip alternate frames on mobile to double rendering performance (runs at a stable 30fps)
      frameCount++;
      if (isMobile && frameCount % 2 !== 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const scrollDelta = Math.abs(scrollYRef.current - smoothScrollY);
      const bhOpacity = Math.max(0, 1 - smoothScrollY / (height * 0.85));

      // If mobile: turn static (no animations/loop updates at all) as soon as scroll settles (scrollDelta < 0.15).
      // If desktop: pause once the black hole fades out and scroll settles.
      const shouldPause = isMobile 
        ? (scrollDelta < 0.15) 
        : (bhOpacity === 0 && scrollDelta < 0.15);

      if (shouldPause) {
        drawFrame(bhOpacity); // Draw final aligned static frame
        isRunning = false;
        return;
      }

      drawFrame(bhOpacity);
      animationFrameId = requestAnimationFrame(animate);
    };

    const wakeUpLoop = () => {
      if (!isRunning) {
        isRunning = true;
        frameCount = 0; // Reset skip frame throttle
        animate();
      }
    };

    // Scroll listener inside the main useEffect to directly wake up the animation loop
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      wakeUpLoop();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial loop execution
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed z-0 ${className}`}
      style={{ left: 0, top: 0, width: "100%", height: "100%" }}
    />
  );
}
