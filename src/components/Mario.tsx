type MarioProps = {
  size?: number;
  direction?: "right" | "left";
  jumping?: boolean;
};

export default function Mario({
  size = 40,
  direction = "right",
  jumping = false,
}: MarioProps) {
  const flip = direction === "left" ? "scaleX(-1)" : "";
  const jump = jumping ? " translateY(-4px)" : "";

  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className="block [image-rendering:pixelated]"
      style={{ transform: `${flip}${jump}` }}
    >
      {/* Hat */}
      <rect x="3" y="0" width="5" height="1" fill="#E52521" />
      <rect x="2" y="1" width="8" height="1" fill="#E52521" />
      {/* Hair/Face */}
      <rect x="2" y="2" width="3" height="1" fill="#8B4513" />
      <rect x="5" y="2" width="1" height="1" fill="#FDBCB4" />
      <rect x="6" y="2" width="1" height="1" fill="#8B4513" />
      <rect x="7" y="2" width="1" height="1" fill="#FDBCB4" />
      {/* Face row */}
      <rect x="1" y="3" width="1" height="1" fill="#8B4513" />
      <rect x="2" y="3" width="1" height="1" fill="#FDBCB4" />
      <rect x="3" y="3" width="1" height="1" fill="#8B4513" />
      <rect x="4" y="3" width="1" height="1" fill="#FDBCB4" />
      <rect x="5" y="3" width="3" height="1" fill="#FDBCB4" />
      {/* Face bottom */}
      <rect x="1" y="4" width="1" height="1" fill="#8B4513" />
      <rect x="2" y="4" width="1" height="1" fill="#FDBCB4" />
      <rect x="3" y="4" width="2" height="1" fill="#8B4513" />
      <rect x="5" y="4" width="3" height="1" fill="#FDBCB4" />
      <rect x="8" y="4" width="1" height="1" fill="#8B4513" />
      {/* Overalls top */}
      <rect x="2" y="5" width="2" height="1" fill="#FDBCB4" />
      <rect x="4" y="5" width="1" height="1" fill="#E52521" />
      <rect x="5" y="5" width="1" height="1" fill="#4A90D9" />
      <rect x="6" y="5" width="1" height="1" fill="#E52521" />
      <rect x="7" y="5" width="1" height="1" fill="#FDBCB4" />
      {/* Overalls */}
      <rect x="1" y="6" width="1" height="1" fill="#FDBCB4" />
      <rect x="2" y="6" width="1" height="1" fill="#E52521" />
      <rect x="3" y="6" width="4" height="1" fill="#4A90D9" />
      <rect x="7" y="6" width="1" height="1" fill="#E52521" />
      <rect x="8" y="6" width="1" height="1" fill="#FDBCB4" />
      {/* Body */}
      <rect x="2" y="7" width="6" height="1" fill="#4A90D9" />
      {/* Overalls bottom */}
      <rect x="2" y="8" width="2" height="1" fill="#4A90D9" />
      <rect x="6" y="8" width="2" height="1" fill="#4A90D9" />
      {/* Shoes */}
      <rect x="1" y="9" width="3" height="1" fill="#8B4513" />
      <rect x="6" y="9" width="3" height="1" fill="#8B4513" />
      {/* Eyes (tiny pixels) */}
      <rect x="4" y="3" width="0.8" height="0.8" fill="#000" />
      <rect x="6" y="3" width="0.8" height="0.8" fill="#000" />
    </svg>
  );
}
