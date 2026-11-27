// 11x11 LED-style icons. Hovering the parent `.group` flips each dot from frame A to frame B
// after its own short delay (see .px rules in index.css), so the picture redraws dot by dot.
export const icons: Record<string, [string[], string[]]> = {
  "Website development": [
    [
      "...........",
      "###########",
      "#.#.#.....#",
      "###########",
      "#.........#",
      "#.........#",
      "#.........#",
      "#.........#",
      "#.........#",
      "###########",
      "...........",
    ],
    [
      "...........",
      "...........",
      "......#....",
      "..#...#.#..",
      ".#...#...#.",
      "#....#....#",
      ".#...#...#.",
      "..#.#...#..",
      "....#......",
      "...........",
      "...........",
    ],
  ],
  "Video editing": [
    [
      "...........",
      "...#.......",
      "...##......",
      "...###.....",
      "...####....",
      "...#####...",
      "...####....",
      "...###.....",
      "...##......",
      "...#.......",
      "...........",
    ],
    [
      "...........",
      "...........",
      "..###.###..",
      "..###.###..",
      "..###.###..",
      "..###.###..",
      "..###.###..",
      "..###.###..",
      "..###.###..",
      "...........",
      "...........",
    ],
  ],
  "Graphic design": [
    [
      "...........",
      ".#########.",
      ".#.......#.",
      ".#.......#.",
      ".#.......#.",
      ".#.......#.",
      ".#.......#.",
      ".#.......#.",
      ".#.......#.",
      ".#########.",
      "...........",
    ],
    [
      "...........",
      "....###....",
      "..##...##..",
      "..#.....#..",
      ".#.......#.",
      ".#.......#.",
      ".#.......#.",
      "..#.....#..",
      "..##...##..",
      "....###....",
      "...........",
    ],
  ],
  // The Gryffindorlab mark, sampled from /logo.png; same in both frames so hover only recolours it.
  Branding: [
    [
      ".#########.",
      "###########",
      "###########",
      "###########",
      "#######....",
      "######.....",
      "#####...###",
      "####...####",
      "####..#####",
      "####..#####",
      ".###..#####",
    ],
    [
      ".#########.",
      "###########",
      "###########",
      "###########",
      "#######....",
      "######.....",
      "#####...###",
      "####...####",
      "####..#####",
      "####..#####",
      ".###..#####",
    ],
  ],
  // Four tiles in the logo's shape (bottom-right corner square): "a bit of everything" in Start here.
  Everything: [
    [
      ".###...###.",
      "#####.#####",
      "#####.#####",
      "#####.#####",
      ".####..####",
      "...........",
      ".###...###.",
      "#####.#####",
      "#####.#####",
      "#####.#####",
      ".####..####",
    ],
    [
      ".###...###.",
      "#####.#####",
      "#####.#####",
      "#####.#####",
      ".####..####",
      "...........",
      ".###...###.",
      "#####.#####",
      "#####.#####",
      "#####.#####",
      ".####..####",
    ],
  ],
  // A cube: the product; its top face fills in on hover.
  "Product development": [
    [
      "....###....",
      "..##...##..",
      "##.......##",
      "#.##...##.#",
      "#...###...#",
      "#....#....#",
      "#....#....#",
      "#....#....#",
      "##...#...##",
      "..##.#.##..",
      "....###....",
    ],
    [
      "....###....",
      "..#######..",
      "###########",
      "#.#######.#",
      "#...###...#",
      "#....#....#",
      "#....#....#",
      "#....#....#",
      "##...#...##",
      "..##.#.##..",
      "....###....",
    ],
  ],
};

// Logo silhouette: the 11x11 icon sits inside a 1-dot border (13x13), and the grid's
// top-left, top-right and bottom-left corners are rounded by dropping border dots
// outside the curve, so no icon dot is ever cut. Bottom-right stays square.
const N = 13;
const R = 3;
const outside = (x: number, y: number) => {
  const dx = x < R ? R - x - 0.5 : x >= N - R ? x - (N - R) + 0.5 : 0;
  const dy = y < R ? R - y - 0.5 : y >= N - R ? y - (N - R) + 0.5 : 0;
  const bottomRight = x >= N - R && y >= N - R;
  return !bottomRight && dx > 0 && dy > 0 && Math.hypot(dx, dy) > R - 0.3;
};
const cells = Array.from({ length: N * N }, (_, i) => [i % N, Math.floor(i / N)]);

export function PixelIcon({ name }: { name: string }) {
  const [a, b] = icons[name];
  // Icon rows are offset by the 1-dot border; border cells read as off.
  const at = (rows: string[], x: number, y: number) => rows[y - 1]?.[x - 1] === "#";
  return (
    <span
      aria-hidden="true"
      className="grid w-fit grid-cols-[repeat(13,5px)] gap-0.5"
    >
      {cells.map(([x, y]) => (
        <span
          key={`${x}-${y}`}
          className={`px size-1.25 rounded-[1px] ${outside(x, y) ? "invisible" : ""}`}
          data-a={at(a, x, y) || undefined}
          data-b={at(b, x, y) || undefined}
          // Fixed pseudo-random delay per dot, so server and client render the same.
          style={
            {
              "--d": `${((x * 7 + y * 13) % 11) * 22}ms`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}
