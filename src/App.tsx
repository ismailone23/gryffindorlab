"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Showcase } from "@/components/showcase";
import { Services } from "@/components/services";
import { WorkSlider } from "@/components/work-slider";
import { ProjectBrief } from "@/components/project-brief";
import { WordReveal } from "@/components/word-reveal";
import { Testimonials } from "@/components/testimonials";
import { MorphingCta } from "@/components/morphing-cta";

export default function App() {
  return (
    <Dialog>
      <a
        href="#main"
        className="fixed top-3 left-4 z-50 translate-y-[-160%] bg-foreground px-4 py-3 text-background focus:translate-y-0"
      >
        Skip to content
      </a>

      <div className="mx-auto w-full max-w-[1680px] px-6 min-[901px]:px-[clamp(32px,4.4vw,80px)]">
        <header
          className="flex h-21.5 items-center justify-between gap-4 border-b border-border min-[901px]:h-26.5"
          aria-label="Site header"
        >
          <Link
            href="/"
            aria-label="Gryffindorlab home"
            className="group inline-flex min-w-0 items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring min-[901px]:gap-3"
          >
            <img
              src="/favicon.svg"
              width="40"
              height="40"
              alt=""
              aria-hidden="true"
              className="size-9 shrink-0 rounded-sm transition-transform duration-500 ease-out group-hover:-rotate-6 min-[901px]:size-10"
            />
            <span className="flex flex-col justify-center">
              <span className="font-(family-name:--display) text-[18px] leading-none font-semibold tracking-[-0.035em] min-[901px]:text-[23px]">
                Gryffindorlab<span className="text-ring">.</span>
              </span>
              <span className="mt-1.5 text-xs leading-none tracking-[0.02em] text-muted-foreground max-[480px]:hidden">
                Independent creative studio
              </span>
            </span>
          </Link>

          <p
            className="hidden items-center gap-3 text-sm tracking-[-0.01em] text-muted-foreground min-[901px]:flex"
            aria-label="Video editing, website development, and graphic design"
          >
            <span
              className="size-1.5 rounded-full bg-ring"
              aria-hidden="true"
            />
            Video <span className="text-(--rule)">/</span> Web{" "}
            <span className="text-(--rule)">/</span> Design
          </p>

          <DialogTrigger asChild>
            <Button className="group h-11 shrink-0 gap-3 rounded-full bg-foreground py-1.5 pr-1.5 pl-4 text-base text-background shadow-none transition-colors duration-300 hover:bg-ring max-[360px]:size-11 max-[360px]:p-1.5 min-[901px]:h-12.5 min-[901px]:gap-5 min-[901px]:pl-5">
              <span className="max-[360px]:sr-only">Let’s talk</span>
              <span className="grid size-8 place-items-center rounded-full bg-white/15 min-[901px]:size-9">
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Button>
          </DialogTrigger>
        </header>
      </div>

      <main id="main">
        <div className="mx-auto w-full max-w-[1680px] px-6 min-[901px]:px-[clamp(32px,4.4vw,80px)]">
          <section
            aria-labelledby="hero-heading"
            className="grid min-h-[min(740px,calc(100svh-106px))] grid-cols-1 items-center gap-10 py-14.75 min-[901px]:grid-cols-[1.32fr_1fr] min-[901px]:gap-[clamp(40px,5.4vw,90px)] min-[901px]:py-19.5 min-[1500px]:py-25 min-[901px]:max-[1100px]:grid-cols-[1.25fr_1fr] min-[901px]:max-[1100px]:gap-8.75"
          >
            <div className="min-w-0">
              <h1
                id="hero-heading"
                className="word-wave-active m-0 font-(family-name:--display) text-[clamp(48px,15.4vw,60px)] leading-[0.99] font-semibold tracking-[-0.04em] [font-variation-settings:'opsz'_96,'wdth'_98] min-[391px]:text-[clamp(65px,12vw,88px)] min-[901px]:text-[clamp(76px,8.5vw,136px)] min-[901px]:max-[1100px]:text-[clamp(72px,8.4vw,94px)]"
              >
                <span className="block"><WordReveal text="Good ideas." /></span>
                <span className="block"><WordReveal text="Made real." start={2} accentDot /></span>
              </h1>

              <div className="mt-6 min-[901px]:mt-8">
                <p className="m-0 max-w-92.5 animate-[details-arrive_1.1s_var(--ease-out)_0.15s_both] text-base leading-[1.7] font-[450] tracking-tight text-muted-foreground motion-reduce:animate-none min-[901px]:max-w-100 min-[901px]:text-[clamp(16px,1.22vw,19px)] min-[901px]:leading-[1.75]">
                  Some ideas stay with you for a reason. Let’s see how far yours can go.
                </p>
                <MorphingCta />
              </div>
            </div>

            <Showcase />
          </section>
          <Services />
        </div>
        <WorkSlider />
        <Testimonials />
      </main>
      <ProjectBrief />
    </Dialog>
  );
}
