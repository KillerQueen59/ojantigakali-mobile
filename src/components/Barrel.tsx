type BarrelProps = {
  color?: string;
  size?: number;
  rolling?: boolean;
  smashed?: boolean;
};

// Color helpers — derive bands and shadow from base color
function darken(hex: string, amt: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (n >> 16) - amt);
  const g = Math.max(0, ((n >> 8) & 0xff) - amt);
  const b = Math.max(0, (n & 0xff) - amt);
  return `rgb(${r},${g},${b})`;
}

// 12×14 pixel-art barrel
function barrelPixels(base: string) {
  const d = darken(base, 40); // darker stave shade
  const band = "#FFD700"; // gold metal bands
  const bandD = "#C8A600"; // darker band edge
  return [
    //           0  1  2  3  4  5  6  7  8  9 10 11
    /* 0 */ [0, 0, 0, d, base, base, base, base, base, d, 0, 0],
    /* 1 */ [0, 0, d, base, base, base, base, base, base, base, d, 0],
    /* 2 */ [0, d, base, base, base, base, base, base, base, base, d, 0],
    /* 3 */ [
      0,
      bandD,
      band,
      band,
      band,
      band,
      band,
      band,
      band,
      band,
      bandD,
      0,
    ],
    /* 4 */ [0, d, base, base, d, base, base, d, base, base, d, 0],
    /* 5 */ [d, base, base, base, d, base, base, d, base, base, base, d],
    /* 6 */ [d, base, base, base, d, base, base, d, base, base, base, d],
    /* 7 */ [d, base, base, base, d, base, base, d, base, base, base, d],
    /* 8 */ [d, base, base, base, d, base, base, d, base, base, base, d],
    /* 9 */ [0, d, base, base, d, base, base, d, base, base, d, 0],
    /*10 */ [
      0,
      bandD,
      band,
      band,
      band,
      band,
      band,
      band,
      band,
      band,
      bandD,
      0,
    ],
    /*11 */ [0, d, base, base, base, base, base, base, base, base, d, 0],
    /*12 */ [0, 0, d, base, base, base, base, base, base, d, 0, 0],
    /*13 */ [0, 0, 0, d, d, d, d, d, d, d, 0, 0],
  ];
}

export default function Barrel({
  color = "#8B4513",
  size = 40,
  rolling = false,
  smashed = false,
}: BarrelProps) {
  if (smashed) {
    return (
      <svg
        viewBox="0 0 14 14"
        width={size}
        height={size}
        className="block [image-rendering:pixelated] opacity-40"
      >
        <rect
          x="1"
          y="8"
          width="4"
          height="3"
          fill={color}
          opacity={0.6}
          transform="rotate(-12 3 9.5)"
        />
        <rect
          x="8"
          y="7"
          width="4"
          height="3"
          fill={color}
          opacity={0.6}
          transform="rotate(15 10 8.5)"
        />
        <rect x="4" y="10" width="5" height="1" fill="#FFD700" opacity={0.4} />
      </svg>
    );
  }

  const px = barrelPixels(color);
  const w = px[0].length;
  const h = px.length;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={Math.round(size * (h / w))}
      className="block [image-rendering:pixelated]"
      style={{
        animation: rolling ? "barrelRoll 0.6s linear infinite" : undefined,
      }}
    >
      {px.map((row, y) =>
        row.map((c, x) =>
          c ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={typeof c === "string" ? c : undefined}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
