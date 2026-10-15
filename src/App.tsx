import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Showcase } from '@/components/showcase'
import { ProjectBrief } from '@/components/project-brief'

export default function App() {
  return (
    <Dialog>
      <a href="#main" className="fixed top-3 left-4 z-50 -translate-y-[160%] bg-foreground px-4 py-3 text-background focus:translate-y-0">
        Skip to content
      </a>

      <div className="mx-auto w-full max-w-[1680px] px-6 min-[901px]:px-[clamp(32px,4.4vw,80px)]">
        <header className="flex h-[86px] items-center justify-between gap-4 border-b border-border min-[901px]:h-[106px]" aria-label="Site header">
          <a href="/" aria-label="Gryffindorlab home" className="group inline-flex min-w-0 items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--violet)] min-[901px]:gap-3">
            <img src="/favicon.svg" width="40" height="40" alt="" aria-hidden="true" className="size-9 shrink-0 rounded-[4px] transition-transform duration-500 ease-[var(--ease-out)] group-hover:-rotate-6 min-[901px]:size-10" />
            <span className="flex flex-col justify-center">
              <span className="font-[family-name:var(--display)] text-[18px] leading-none font-semibold tracking-[-0.035em] min-[901px]:text-[23px]">Gryffindorlab<span className="text-[var(--violet)]">.</span></span>
              <span className="mt-1.5 text-xs leading-none tracking-[0.02em] text-[var(--muted)] max-[480px]:hidden">Independent creative studio</span>
            </span>
          </a>

          <p className="hidden items-center gap-3 text-sm tracking-[-0.01em] text-[var(--muted)] min-[901px]:flex" aria-label="Video editing, website development, and graphic design">
            <span className="size-1.5 rounded-full bg-[var(--violet)]" aria-hidden="true" />
            Video <span className="text-[var(--rule)]">/</span> Web <span className="text-[var(--rule)]">/</span> Design
          </p>

          <DialogTrigger asChild>
            <Button className="group h-11 shrink-0 gap-3 rounded-full bg-foreground py-1.5 pr-1.5 pl-4 text-base text-background shadow-none transition-colors duration-300 hover:bg-[var(--violet)] max-[360px]:size-11 max-[360px]:p-1.5 min-[901px]:h-[50px] min-[901px]:gap-5 min-[901px]:pl-5">
              <span className="max-[360px]:sr-only">Let’s talk</span>
              <span className="grid size-8 place-items-center rounded-full bg-white/15 min-[901px]:size-9">
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Button>
          </DialogTrigger>
        </header>

        <main id="main">
          <section aria-labelledby="hero-heading" className="grid min-h-[min(740px,calc(100svh-106px))] grid-cols-1 items-center gap-10 py-[59px] min-[901px]:grid-cols-[1.32fr_1fr] min-[901px]:gap-[clamp(40px,5.4vw,90px)] min-[901px]:py-[78px] min-[1500px]:py-[100px] min-[901px]:max-[1100px]:grid-cols-[1.25fr_1fr] min-[901px]:max-[1100px]:gap-[35px]">
            <div className="min-w-0">
              <h1 id="hero-heading" className="m-0 font-[family-name:var(--display)] text-[clamp(48px,15.4vw,60px)] leading-[0.99] font-semibold tracking-[-0.04em] [font-variation-settings:'opsz'_96,'wdth'_98] min-[391px]:text-[clamp(65px,12vw,88px)] min-[901px]:text-[clamp(76px,8.5vw,136px)] min-[901px]:max-[1100px]:text-[clamp(72px,8.4vw,94px)]">
                <span className="block overflow-clip pb-[0.1em] -mb-[0.1em] motion-reduce:overflow-visible"><span className="block animate-[headline-arrive_1.05s_var(--ease-out)_both] motion-reduce:animate-none">Good ideas.</span></span>
                <span className="block overflow-clip pb-[0.1em] -mb-[0.1em] motion-reduce:overflow-visible"><span className="block animate-[headline-arrive_1.05s_var(--ease-out)_0.12s_both] motion-reduce:animate-none">Made real<span className="text-[var(--violet)]">.</span></span></span>
              </h1>

              <div className="mt-6 animate-[details-arrive_1.1s_var(--ease-out)_0.15s_both] motion-reduce:animate-none min-[901px]:mt-8">
                <p className="m-0 max-w-[370px] text-base leading-[1.7] font-[450] tracking-[-0.025em] text-[var(--muted)] min-[901px]:max-w-[400px] min-[901px]:text-[clamp(16px,1.22vw,19px)] min-[901px]:leading-[1.75]">
                  We turn your next big idea into videos,<br className="max-[900px]:hidden" /> websites, and design that make<br className="max-[900px]:hidden" /> people look twice.
                </p>
                <DialogTrigger asChild>
                  <Button className="group mt-[25px] h-[54px] gap-[30px] rounded-full bg-foreground py-0 pr-2 pl-[22px] text-background transition-[background,transform] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:bg-[var(--violet)] min-[901px]:mt-8 min-[901px]:h-[58px] min-[901px]:pr-[9px] min-[901px]:pl-[25px]">
                    <span className="text-lg">Start a project</span>
                    <span className="grid size-9 place-items-center rounded-full border border-white/20 min-[901px]:size-[39px]">
                      <ArrowUpRight aria-hidden="true" className="size-[19px] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Button>
                </DialogTrigger>
              </div>
            </div>

            <Showcase />
          </section>
        </main>
      </div>
      <ProjectBrief />
    </Dialog>
  )
}
