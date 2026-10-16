"use client";

import { useRef, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Showcase } from "@/components/showcase";
import { Services } from "@/components/services";
import { WorkSlider } from "@/components/work-slider";
import { ProjectBrief } from "@/components/project-brief";
import { WordReveal } from "@/components/word-reveal";
import { Testimonials } from "@/components/testimonials";
import { MorphingCta } from "@/components/morphing-cta";
import { HeroIntro } from "@/components/hero-intro";
import { SiteHeader } from "@/components/site-header";
import { ContactFinale } from "@/components/contact-finale";
import { SiteFooter } from "@/components/site-footer";

export default function App() {
  const artworkDestination = useRef<HTMLDivElement>(null);
  const [darkBrief, setDarkBrief] = useState(false);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setDarkBrief(false);
      }}
    >
      <a
        href="#main"
        className="fixed top-3 left-4 z-50 translate-y-[-160%] bg-foreground px-4 py-3 text-background focus:translate-y-0"
      >
        Skip to content
      </a>

      <SiteHeader onStartProject={(dark) => setDarkBrief(dark)} />
      <noscript>
        <style>{".site-header{position:absolute!important}"}</style>
      </noscript>

      <main id="main" className="pt-24 min-[901px]:pt-26.5">
        <div className="mx-auto w-full max-w-[1680px] px-6 min-[901px]:px-[clamp(32px,4.4vw,80px)]">
          <section
            aria-labelledby="hero-heading"
            className="hero-intro-host relative grid min-h-[min(740px,calc(100svh-106px))] grid-cols-1 items-center gap-10 py-14.75 min-[901px]:grid-cols-[1.32fr_1fr] min-[901px]:gap-[clamp(40px,5.4vw,90px)] min-[901px]:py-19.5 min-[1500px]:py-25 min-[901px]:max-[1100px]:grid-cols-[1.25fr_1fr] min-[901px]:max-[1100px]:gap-8.75"
          >
            <div className="min-w-0">
              <h1
                id="hero-heading"
                className="word-wave-active m-0 font-(family-name:--display) text-[clamp(48px,15.4vw,60px)] leading-[0.99] font-semibold tracking-[-0.04em] [font-variation-settings:'opsz'_96,'wdth'_98] min-[391px]:text-[clamp(65px,12vw,88px)] min-[901px]:text-[clamp(76px,8.5vw,136px)] min-[901px]:max-[1100px]:text-[clamp(72px,8.4vw,94px)]"
              >
                <span className="block">
                  <WordReveal text="Good ideas." />
                </span>
                <span className="block">
                  <WordReveal text="Made real." start={2} accentDot />
                </span>
              </h1>

              <div className="mt-6 min-[901px]:mt-8">
                <p className="hero-details m-0 max-w-92.5 animate-[details-arrive_1.1s_var(--ease-out)_0.15s_both] text-base leading-[1.7] font-[450] tracking-tight text-muted-foreground motion-reduce:animate-none min-[901px]:max-w-100 min-[901px]:text-[clamp(16px,1.22vw,19px)] min-[901px]:leading-[1.75]">
                  Some ideas stay with you for a reason. Let’s see how far yours
                  can go.
                </p>
                <MorphingCta />
              </div>
            </div>

            <div ref={artworkDestination} className="min-w-0">
              <Showcase />
            </div>
            <HeroIntro destination={artworkDestination} />
            <noscript>
              <style>{".hero-intro { display: none !important; }"}</style>
            </noscript>
          </section>
          <Services />
        </div>
        <WorkSlider />
        <Testimonials />
        <ContactFinale onStartProject={() => setDarkBrief(true)} />
      </main>
      <SiteFooter />
      <ProjectBrief dark={darkBrief} />
    </Dialog>
  );
}
