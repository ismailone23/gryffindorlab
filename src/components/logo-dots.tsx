"use client";

import { useEffect, type RefObject } from "react";

const grid = Array.from({ length: 169 }, (_, index) => ({
  x: ((index % 13) - 6) * 10,
  y: (Math.floor(index / 13) - 6) * 10,
}));

export function LogoDots({ round }: { round: boolean }) {
  return grid
    .filter(({ x, y }) => !round || Math.hypot(x, y) <= 61)
    .map(({ x, y }) => (
      <circle
        key={`${x}:${y}`}
        className="service-logo-dot"
        cx={x}
        cy={y}
        r="2.6"
        fill="var(--transparentDots)"
      />
    ));
}

type Dot = {
  element: SVGCircleElement;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
};

export function useInteractiveLogoDots(
  artwork: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const element = artwork.current;
    if (!element) return;

    const groups = [
      ...element.querySelectorAll<SVGGElement>("[data-service-shape]"),
    ].map((group) => ({
      group,
      dots: [
        ...group.querySelectorAll<SVGCircleElement>(".service-logo-dot"),
      ].map(
        (dot): Dot => ({
          element: dot,
          x: Number(dot.getAttribute("cx")),
          y: Number(dot.getAttribute("cy")),
          offsetX: 0,
          offsetY: 0,
        }),
      ),
    }));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pointerX = 0;
    let pointerY = 0;
    let active = false;
    let visible = true;
    let frame = 0;

    function reset() {
      window.cancelAnimationFrame(frame);
      frame = 0;
      for (const { dots } of groups) {
        for (const dot of dots) {
          if (!dot.offsetX && !dot.offsetY) continue;
          dot.offsetX = 0;
          dot.offsetY = 0;
          dot.element.setAttribute("cx", String(dot.x));
          dot.element.setAttribute("cy", String(dot.y));
        }
      }
    }

    function tick() {
      frame = 0;
      let unsettled = false;

      for (const { group, dots } of groups) {
        const matrix = group.getScreenCTM();
        if (!matrix) continue;
        const pointer = active
          ? new DOMPoint(pointerX, pointerY).matrixTransform(matrix.inverse())
          : null;

        for (const dot of dots) {
          const dx = dot.x - (pointer?.x ?? -1000);
          const dy = dot.y - (pointer?.y ?? -1000);
          const distance = Math.hypot(dx, dy);
          const force = pointer ? Math.max(0, 1 - distance / 72) : 0;
          const shift = (force * force * 15) / (distance || 1);
          const targetX = dx * shift;
          const targetY = dy * shift;
          const nextX = dot.offsetX + (targetX - dot.offsetX) * 0.22;
          const nextY = dot.offsetY + (targetY - dot.offsetY) * 0.22;

          if (
            Math.abs(targetX - nextX) > 0.04 ||
            Math.abs(targetY - nextY) > 0.04
          )
            unsettled = true;
          if (
            Math.abs(nextX - dot.offsetX) < 0.01 &&
            Math.abs(nextY - dot.offsetY) < 0.01
          )
            continue;

          dot.offsetX = nextX;
          dot.offsetY = nextY;
          dot.element.setAttribute("cx", String(dot.x + nextX));
          dot.element.setAttribute("cy", String(dot.y + nextY));
        }
      }

      if (unsettled && visible && !reduced.matches)
        frame = window.requestAnimationFrame(tick);
      else if (!active) reset();
    }

    function animate() {
      if (!frame && visible && !reduced.matches)
        frame = window.requestAnimationFrame(tick);
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === "touch" || reduced.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      active = true;
      animate();
    }

    function onPointerLeave() {
      active = false;
      animate();
    }

    function onReducedMotionChange() {
      active = false;
      reset();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) onReducedMotionChange();
    });

    observer.observe(element);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", onPointerLeave);
    reduced.addEventListener("change", onReducedMotionChange);

    return () => {
      observer.disconnect();
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", onPointerLeave);
      reduced.removeEventListener("change", onReducedMotionChange);
      reset();
    };
  }, [artwork]);
}
