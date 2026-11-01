"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

// Adapted from the 21st.dev "perspective-tunnel-hero": progress comes from real page scroll
// over a pinned stage (no wheel hijacking), colours follow the site, cards are decorative and still (no pointer drift).

export type TunnelItem = { src: string; title: string };

type Card = {
  item: TunnelItem;
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
};

type Stage = { width: number; height: number; isMobile: boolean };

function toCards(items: TunnelItem[]): Card[] {
  return items.map((item, i) => {
    const golden = i * 137.5 * (Math.PI / 180);
    return {
      item,
      angleCos: Math.cos(golden),
      angleSin: Math.sin(golden),
      radiusFactorX: 0.28 + (i % 3) * 0.08,
      radiusFactorY: 0.26 + (i % 2) * 0.09,
      rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
      index: i,
    };
  });
}

function TunnelCard({
  card,
  progress,
  total,
  stage,
}: {
  card: Card;
  progress: MotionValue<number>;
  total: number;
  stage: Stage;
}) {
  const span = 0.55;
  const start = (card.index / total) * (1 - span);
  const local = useTransform(progress, [start, start + span], [0, 1]);

  const z = useTransform(local, [0, 1], stage.isMobile ? [-1200, 350] : [-1700, 500]);
  const opacity = useTransform(local, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

  const width = stage.isMobile
    ? Math.max(110, Math.min(160, stage.width * 0.34))
    : Math.max(180, Math.min(270, stage.width * 0.18));
  const baseX = card.angleCos * stage.width * card.radiusFactorX;
  const baseY = card.angleSin * stage.height * card.radiusFactorY;
  const transform = useTransform(
    z,
    (currZ) => `translate3d(calc(-50% + ${baseX}px), calc(-50% + ${baseY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`,
  );

  return (
    <motion.div
      style={{ width, transform, opacity, zIndex: card.index + 1 }}
      className="absolute top-1/2 left-1/2 aspect-[4/5] will-change-transform"
    >
      <div className="relative size-full overflow-hidden rounded-2xl bg-[#111] shadow-2xl shadow-black/90 ring-1 ring-white/12">
        <img src={card.item.src} alt="" draggable={false} className="size-full object-cover" />
        <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/80 via-black/10 to-transparent p-4">
          <span className="font-(family-name:--font-pixel) text-xs text-white/95">{card.item.title}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PerspectiveTunnelHero({ items, children }: { items: TunnelItem[]; children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>({ width: 1440, height: 900, isMobile: false });

  useEffect(() => {
    const update = () =>
      setStage({ width: window.innerWidth, height: window.innerHeight, isMobile: window.innerWidth < 768 });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  // Start part-way in so cards are already floating on first paint.
  const progress = useSpring(useTransform(scrollYProgress, [0, 1], [0.25, 1]), {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0001,
  });

  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0.65, 0.95], [1, 0]);

  const cards = toCards(items);

  return (
    <div ref={container} className="relative h-[250vh]">
      <div
        className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden"
        style={{ perspective: stage.isMobile ? "900px" : "1200px", transformStyle: "preserve-3d" }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {cards.map((card) => (
            <TunnelCard
              key={card.index}
              card={card}
              progress={progress}
              total={cards.length}
              stage={stage}
            />
          ))}
        </div>

        {/* Above the cards so the headline stays readable and the buttons stay clickable. */}
        <motion.div
          style={{ scale: contentScale, opacity: contentOpacity }}
          className="relative z-20 flex flex-col items-center px-(--gutter) text-center"
        >
          {/* Soft dark backing so passing cards don't fight the text. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-16 -inset-y-20 -z-10 bg-[radial-gradient(closest-side,#000d_40%,transparent)]"
          />
          {children}
        </motion.div>

      </div>
    </div>
  );
}
