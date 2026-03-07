type PacManProps = {
  size?: number;
  direction?: "right" | "left" | "up" | "down";
};

export default function PacMan({
  size = 40,
  direction = "right",
}: PacManProps) {
  const rotations = { right: 0, down: 90, left: 180, up: 270 };
  const rotate = rotations[direction];

  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className="block"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <circle cx="16" cy="16" r="14" fill="#ffcc00" />
      {/* Mouth — animated via CSS on parent */}
      <path
        d="M16,16 L30,8.5 L30,23.5 Z"
        fill="#000"
        className="pacman-mouth"
      />
      {/* Eye */}
      <circle cx="16" cy="8" r="2.5" fill="#000" />
    </svg>
  );
}
