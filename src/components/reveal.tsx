"use client";

import { useEffect } from "react";

// Fade-and-rise for headings and [data-reveal] blocks as they enter (styles in index.css).
// The hidden state only applies once this runs, so content stays visible without JS.
export function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll(".section-title, [data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.documentElement.classList.add("js-reveal");
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// For server-rendered pages that cannot call the hook themselves.
export function Reveal() {
  useReveal();
  return null;
}
