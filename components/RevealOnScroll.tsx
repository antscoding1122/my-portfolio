"use client";

// Client component that applies ScrollReveal animations across the page.
// Every top-level block inside each section fades/slides in on scroll.
// ScrollReveal is imported dynamically because it touches browser APIs
// at module load time, which breaks SSR prerendering.
import { useEffect } from "react";

export default function RevealOnScroll() {
  useEffect(() => {
    let sr: typeof import("scrollreveal") | null = null;
    let cancelled = false;

    import("scrollreveal").then(({ default: ScrollReveal }) => {
      if (cancelled) return;
      sr = ScrollReveal({
        distance: "24px",
        duration: 700,
        easing: "ease-out",
        origin: "bottom",
        viewFactor: 0.15,
        reset: false,
      });
      sr.reveal("section > *", { interval: 120 });
    });

    return () => {
      cancelled = true;
      sr?.clean("section > *");
    };
  }, []);

  return null;
}