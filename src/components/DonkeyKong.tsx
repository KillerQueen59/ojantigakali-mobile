type DonkeyKongProps = {
  size?: number;
};

// Color palette
const C: Record<number, string> = {
  1: "#2C1600", // dark outline / brow
  2: "#8B4513", // brown fur
  3: "#C87832", // light fur highlight
  4: "#DCA060", // skin / tan (face, belly, hands)
  5: "#E52521", // red (tie)
  6: "#FFD700", // yellow (DK letters)
  7: "#111111", // black (eyes, mouth)
  8: "#FFFFFF", // white (eyes)
};

// 16×24 pixel-art sprite — symmetric front-facing pose
const S: number[][] = [
  //                  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
  /* fur crown  */ [0, 0, 0, 3, 2, 3, 2, 3, 3, 2, 3, 2, 3, 0, 0, 0],
  /* head top   */ [0, 0, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 0, 0],
  /* head       */ [0, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 0],
  /* head wide  */ [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  /* brow ridge */ [0, 2, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 0],
  /* eyes       */ [0, 2, 4, 8, 8, 7, 4, 4, 4, 4, 7, 8, 8, 4, 2, 0],
  /* nose       */ [0, 2, 4, 4, 4, 4, 4, 7, 7, 4, 4, 4, 4, 4, 2, 0],
  /* mouth top  */ [0, 2, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 4, 2, 0],
  /* teeth/grin */ [0, 2, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 2, 0],
  /* chin       */ [0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0],
  /* neck       */ [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
  /* tie top    */ [0, 0, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 0, 0],
  /* DK letters */ [0, 2, 2, 5, 5, 6, 5, 5, 5, 5, 6, 5, 5, 2, 2, 0],
  /* chest wide */ [2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2],
  /* arms+body  */ [2, 2, 4, 2, 2, 4, 4, 4, 4, 4, 4, 2, 2, 4, 2, 2],
  /* hands+bell */ [2, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 2],
  /* belly      */ [0, 0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0, 0],
  /* belly 2    */ [0, 0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0, 0],
  /* low belly  */ [0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 2, 2, 0, 0, 0],
  /* waist      */ [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
  /* legs       */ [0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0],
  /* legs 2     */ [0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0],
  /* feet       */ [0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0],
  /* toes       */ [0, 4, 4, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 0],
];

export default function DonkeyKong({ size = 64 }: DonkeyKongProps) {
  const w = S[0].length;
  const h = S.length;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={Math.round(size * (h / w))}
      className="block [image-rendering:pixelated]"
    >
      {S.map((row, y) =>
        row.map((c, x) =>
          c ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={C[c]}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
