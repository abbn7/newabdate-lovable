"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf = 0;
    let lastTime = 0;
    const loop = (time: number) => {
      if (document.visibilityState === "visible") {
        // Throttle to ~60fps to prevent over-working on high-refresh displays
        if (time - lastTime >= 16) {
          lenis.raf(time);
          lastTime = time;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onVis = () => {
      // resume cleanly when tab regains focus
      if (document.visibilityState === "visible") lenis.raf(performance.now());
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      lenis.destroy();
    };
  }, []);
  return null;
}
