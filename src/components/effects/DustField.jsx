import React, { useEffect, useRef } from "react";

/**
 * Full-viewport, canvas-2D (no three.js) dust field.
 *  - A slow drift of faint mono specks fills the page.
 *  - A soft puff of "dust" lingers and fades along the pointer's trail.
 * Theme-aware (reads context above the canvas), dpr-capped, and honours
 * prefers-reduced-motion (single static frame, no trail, no drift).
 */
export const DustField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    const resize = () => {
      W = Math.floor(window.innerWidth * dpr);
      H = Math.floor(window.innerHeight * dpr);
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COUNT = window.innerWidth < 640 ? 42 : 95;

    const stars = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.6 + 0.15, // depth → brightness/size
      vx: (Math.random() - 0.5) * 0.00016,
      vy: -0.00004 - Math.random() * 0.00014,
      tw: Math.random() * Math.PI * 2, // twinkle phase
    }));

    const trail = [];
    const onMove = (e) => {
      if (reduced) return;
      trail.push({ x: e.clientX, y: e.clientY, life: 1, r: Math.random() * 1.2 + 0.5 });
      if (trail.length > 26) trail.shift();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Dust follows the active palette's primary colour, re-read slowly.
    let tint = "0 0% 100%";
    let tintRead = -1;
    const paint = (now) => {
      ctx.clearRect(0, 0, W, H);
      if (tintRead < 0 || now - tintRead > 500) {
        tint =
          getComputedStyle(document.documentElement)
            .getPropertyValue("--primary")
            .trim() || tint;
        tintRead = now;
      }

      // drifting specks
      for (const s of stars) {
        if (!reduced) {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x > 1.03) s.x = -0.03;
          if (s.x < -0.03) s.x = 1.03;
          if (s.y < -0.03) {
            s.y = 1.03;
            s.x = Math.random();
          }
        }
        const tw = reduced ? 0.7 : 0.5 + 0.5 * Math.sin(s.tw + now / 900);
        ctx.globalAlpha = (0.12 + 0.5 * tw) * (0.35 + s.z);
        ctx.fillStyle = `hsl(${tint})`;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, (0.4 + s.z * 1.1) * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      // fading pointer dust
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= 0.03;
        p.r += 0.04;
        if (p.life <= 0) {
          trail.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life * 0.45;
        ctx.fillStyle = `hsl(${tint})`;
        ctx.beginPath();
        ctx.arc(p.x * dpr, p.y * dpr, p.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduced) raf = requestAnimationFrame(paint);
    };
    let raf = 0;
    raf = requestAnimationFrame(paint);

    const onResize = () => {
      resize();
      if (reduced) {
        cancelAnimationFrame(raf);
        paint(0);
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
    />
  );
};
