// The four-shape Gryffindorlab mark, drawn inline so it can take any fill.
export function Mark({ className, fill = "var(--orange)" }: { className?: string; fill?: string }) {
  return (
    // padded viewBox: the -15° tilt (.mark-shapes in index.css) pushes square corners to radius ~21.2 from center
    <svg viewBox="-2 -2 44 44" aria-hidden="true" className={className}>
      <g className="mark-shapes" fill={fill}>
        <circle cx="12" cy="12" r="7" />
        <rect x="21" y="5" width="14" height="14" />
        <rect x="5" y="21" width="14" height="14" />
        <circle cx="28" cy="28" r="7" />
      </g>
    </svg>
  );
}
