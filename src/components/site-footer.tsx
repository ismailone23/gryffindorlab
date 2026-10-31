export function SiteFooter() {
  return (
    <footer className="bg-black px-(--gutter) pb-12 text-sm text-[#8a8a8a]">
      <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-4 border-t border-[#1f1f1f] pt-6">
        <span>© {new Date().getFullYear()} Gryffindorlab</span>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-6">
          <a href="#services" className="hover:text-(--paper)">Services</a>
          <a href="#work" className="hover:text-(--paper)">Work</a>
          <a href="#voices" className="hover:text-(--paper)">Voices</a>
          <a href="#main" className="hover:text-(--paper)">Back to top</a>
        </nav>
      </div>
    </footer>
  );
}
