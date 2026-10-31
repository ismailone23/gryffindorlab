// The four-shape Gryffindorlab mark, drawn inline so it can take any fill.
export function Mark({
  className,
  fill = "var(--orange)",
  stroke,
  style,
}: {
  className?: string;
  fill?: string;
  stroke?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} style={style}>
      <g
        transform="rotate(-15 20 20)"
        fill={stroke ? "none" : fill}
        stroke={stroke}
        strokeWidth={stroke ? 0.5 : undefined}
      >
        <circle cx="12" cy="12" r="7" />
        <rect x="21" y="5" width="14" height="14" />
        <rect x="5" y="21" width="14" height="14" />
        <circle cx="28" cy="28" r="7" />
      </g>
    </svg>
  );
}
