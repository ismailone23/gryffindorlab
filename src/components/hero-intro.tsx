'use client'

import { useEffect, useRef, type RefObject } from 'react'

export function HeroIntro({ destination }: { destination: RefObject<HTMLDivElement | null> }) {
  const intro = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = intro.current
    const artwork = destination.current
    const artboard = artwork?.querySelector<HTMLElement>('[data-hero-artboard]')
    if (!overlay || !artboard) return

    function measure() {
      const start = overlay!.getBoundingClientRect()
      const end = artboard!.getBoundingClientRect()
      overlay!.style.setProperty('--intro-x', `${end.left + end.width / 2 - start.left - start.width / 2}px`)
      overlay!.style.setProperty('--intro-y', `${end.top + end.height / 2 - start.top - start.height / 2}px`)
      overlay!.style.setProperty('--intro-width', `${end.width}px`)
      overlay!.style.setProperty('--intro-height', `${end.height}px`)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(overlay)
    observer.observe(artboard)
    return () => observer.disconnect()
  }, [destination])

  return (
    <div ref={intro} className="hero-intro" aria-hidden="true">
      <div className="hero-intro-panel">
        <img src="/favicon.svg" width="128" height="128" alt="" className="hero-intro-mark" />
      </div>
    </div>
  )
}
