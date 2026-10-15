"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export function WordReveal({
  text,
  start = 0,
  accentDot = false,
}: {
  text: string;
  start?: number;
  accentDot?: boolean;
}) {
  const words = text.split(" ");

  return words.map((word, index) => (
    <span key={index}>
      {index > 0 && " "}
      <span className="word-wave-mask">
        <span
          className="word-wave-piece"
          style={{ "--word-index": start + index } as CSSProperties}
        >
          {accentDot && index === words.length - 1 && word.endsWith(".") ? (
            <>
              {word.slice(0, -1)}
              <span className="text-ring">.</span>
            </>
          ) : (
            word
          )}
        </span>
      </span>
    </span>
  ));
}

export function useScrollWordReveal() {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = heading.current;
    if (
      !element ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let lastScrollY = window.scrollY;
    let direction: "up" | "down" = "down";
    let outside = true;

    function onScroll() {
      const nextY = window.scrollY;
      if (nextY !== lastScrollY)
        direction = nextY > lastScrollY ? "down" : "up";
      lastScrollY = nextY;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          outside = true;
          element.classList.remove("word-wave-active");
        } else if (outside && entry.intersectionRatio >= 0.35) {
          outside = false;
          if (direction === "down") element.classList.add("word-wave-active");
        }
      },
      { threshold: [0, 0.35] },
    );

    window.addEventListener("scroll", onScroll, { passive: true });
    observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return heading;
}
