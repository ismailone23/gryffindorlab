"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 4) return;
      setHidden(y > lastY && y > 120);
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-hidden={hidden}
      className="site-header fixed top-4 left-1/2 z-60 flex w-[min(1440px,calc(100%-2*var(--gutter)))] -translate-x-1/2 items-center justify-between gap-4 rounded-[14px] border border-white/8 bg-[#0c0c0cd1] py-2 pr-2 pl-3.5 text-(--light) backdrop-blur-md"
    >
      <Link
        href="/#main"
        aria-label="Gryffindorlab home"
        className="flex items-center gap-2"
      >
        <Image src="/logo.png" width={134} height={38} alt="Gryffindorlab" className="h-8 w-auto" priority />
      </Link>
      <nav
        aria-label="Main navigation"
        className="hidden gap-7 text-sm min-[721px]:flex"
      >
        <a className="nav-link" href="#services">
          Services
        </a>
        <a className="nav-link" href="#work">
          Work
        </a>
        <a className="nav-link" href="#voices">
          Voices
        </a>
      </nav>
      <a href="#contact" className="white-button h-9.5 rounded-lg px-4 text-sm">
        Contact
      </a>
    </header>
  );
}
